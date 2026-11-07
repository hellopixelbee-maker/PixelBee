type ContactChannel = 'phone' | 'whatsapp' | 'email';

type ContactPayload = {
  fullName: string;
  company: string;
  channel: ContactChannel | '';
  contact: string;
  message: string;
  website: string;
};

type ValidationErrors = Partial<Record<keyof ContactPayload, string>>;

type ApiRequest = {
  method?: string;
  body?: unknown;
};

type ApiResponse = {
  setHeader: (name: string, value: string | string[]) => void;
  status: (statusCode: number) => ApiResponse;
  json: (body: unknown) => void;
};

type DeliveryResult = {
  ok: boolean;
  status?: number;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseRequestBody(body: unknown): Record<string, unknown> | null {
  if (typeof body === 'string') {
    try {
      const parsed = JSON.parse(body) as unknown;
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
        ? (parsed as Record<string, unknown>)
        : null;
    } catch {
      return null;
    }
  }

  return body && typeof body === 'object' && !Array.isArray(body)
    ? (body as Record<string, unknown>)
    : null;
}

function singleLine(value: unknown) {
  return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';
}

function multiLine(value: unknown) {
  return typeof value === 'string' ? value.split('\u0000').join('').trim() : '';
}

function sanitizePayload(body: Record<string, unknown>): ContactPayload {
  const rawChannel = singleLine(body.channel);
  const channel: ContactPayload['channel'] =
    rawChannel === 'phone' || rawChannel === 'whatsapp' || rawChannel === 'email'
      ? rawChannel
      : '';

  return {
    fullName: singleLine(body.fullName),
    company: singleLine(body.company),
    channel,
    contact: singleLine(body.contact),
    message: multiLine(body.message),
    website: singleLine(body.website),
  };
}

function validatePayload(payload: ContactPayload) {
  const errors: ValidationErrors = {};

  if (payload.fullName.length < 2 || payload.fullName.length > 120) {
    errors.fullName = 'გთხოვთ, შეიყვანოთ სახელი და გვარი.';
  }

  if (payload.company.length < 2 || payload.company.length > 160) {
    errors.company = 'გთხოვთ, მიუთითოთ კომპანიის ან ბრენდის სახელი.';
  }

  if (!payload.channel) {
    errors.channel = 'გთხოვთ, აირჩიოთ სასურველი საკომუნიკაციო არხი.';
  } else if (payload.channel === 'email') {
    if (payload.contact.length > 254 || !emailPattern.test(payload.contact)) {
      errors.contact = 'გთხოვთ, შეიყვანოთ სწორი ელფოსტა.';
    }
  } else {
    const hasValidPhoneCharacters = /^[+()\d\s-]+$/.test(payload.contact);
    const hasEnoughDigits = payload.contact.replace(/\D/g, '').length >= 6;

    if (payload.contact.length > 254 || !hasValidPhoneCharacters || !hasEnoughDigits) {
      errors.contact =
        payload.channel === 'whatsapp'
          ? 'გთხოვთ, შეიყვანოთ WhatsApp-ის ნომერი.'
          : 'გთხოვთ, შეიყვანოთ ტელეფონის ნომერი.';
    }
  }

  if (payload.message.length > 1000) {
    errors.message = 'შეტყობინება არ უნდა აღემატებოდეს 1,000 სიმბოლოს.';
  }

  return errors;
}

async function saveContactToGoogleSheets(
  webhookUrl: string,
  webhookSecret: string,
  payload: ContactPayload,
  submittedAtIso: string,
): Promise<DeliveryResult> {
  try {
    const sheetsResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: webhookSecret,
        submittedAt: submittedAtIso,
        fullName: payload.fullName,
        company: payload.company,
        channel: payload.channel,
        contact: payload.contact,
        message: payload.message,
      }),
      redirect: 'follow',
    });

    if (!sheetsResponse.ok) {
      return { ok: false, status: sheetsResponse.status };
    }

    const responseBody = (await sheetsResponse.json()) as { ok?: unknown };
    return { ok: responseBody?.ok === true };
  } catch {
    return { ok: false };
  }
}

async function sendContactEmail(
  resendApiKey: string,
  contactToEmail: string,
  contactFromEmail: string,
  payload: ContactPayload,
  submittedAt: string,
): Promise<DeliveryResult> {
  const channelLabels: Record<ContactChannel, string> = {
    phone: 'ტელეფონი',
    whatsapp: 'WhatsApp',
    email: 'ელფოსტა',
  };
  const emailText = [
    'ახალი მოთხოვნა Pixel Bee-ის საიტიდან',
    '',
    `სახელი და გვარი: ${payload.fullName}`,
    `კომპანია/ბრენდი: ${payload.company}`,
    `საკომუნიკაციო არხი: ${channelLabels[payload.channel as ContactChannel]}`,
    `საკონტაქტო ინფორმაცია: ${payload.contact}`,
    `დამატებითი შეტყობინება: ${payload.message || 'არ არის მითითებული'}`,
    `გაგზავნის თარიღი და დრო: ${submittedAt}`,
  ].join('\n');

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: contactFromEmail,
        to: [contactToEmail],
        subject: `ახალი მოთხოვნა Pixel Bee-ის საიტიდან — ${payload.company}`,
        text: emailText,
        ...(payload.channel === 'email' ? { reply_to: payload.contact } : {}),
      }),
    });

    return { ok: resendResponse.ok, status: resendResponse.status };
  } catch {
    return { ok: false };
  }
}

export default async function handler(request: ApiRequest, response: ApiResponse) {
  response.setHeader('Cache-Control', 'no-store');

  if (request.method !== 'POST') {
    response.setHeader('Allow', ['POST']);
    response.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  const body = parseRequestBody(request.body);
  if (!body) {
    response.status(400).json({ error: 'Invalid request body.' });
    return;
  }

  const payload = sanitizePayload(body);

  if (payload.website) {
    response.status(400).json({ error: 'Invalid submission.' });
    return;
  }

  const errors = validatePayload(payload);
  if (Object.keys(errors).length > 0) {
    response.status(400).json({ errors });
    return;
  }

  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const contactToEmail = process.env.CONTACT_TO_EMAIL?.trim();
  const contactFromEmail = process.env.CONTACT_FROM_EMAIL?.trim();
  const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();
  const sheetsWebhookSecret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET?.trim();
  const emailConfigValues = [resendApiKey, contactToEmail, contactFromEmail];
  const hasCompleteEmailConfig = emailConfigValues.every(Boolean);
  const hasPartialEmailConfig = emailConfigValues.some(Boolean) && !hasCompleteEmailConfig;
  const hasCompleteSheetsConfig = Boolean(sheetsWebhookUrl && sheetsWebhookSecret);
  const hasPartialSheetsConfig = Boolean(sheetsWebhookUrl || sheetsWebhookSecret) && !hasCompleteSheetsConfig;

  if (hasPartialEmailConfig || hasPartialSheetsConfig) {
    console.error('Contact delivery environment variables are only partially configured.');
    response.status(503).json({ error: 'Contact service is not configured.' });
    return;
  }

  if (!hasCompleteEmailConfig && !hasCompleteSheetsConfig) {
    console.error('No contact delivery service is configured.');
    response.status(503).json({ error: 'Contact service is not configured.' });
    return;
  }

  const submittedAtDate = new Date();
  const submittedAtIso = submittedAtDate.toISOString();
  const submittedAt = new Intl.DateTimeFormat('ka-GE', {
    dateStyle: 'medium',
    timeStyle: 'medium',
    timeZone: 'Asia/Tbilisi',
  }).format(submittedAtDate);

  // Google Sheets is the durable contact log. If it is configured, only report
  // success after the row has actually been saved.
  if (hasCompleteSheetsConfig) {
    const sheetsResult = await saveContactToGoogleSheets(
      sheetsWebhookUrl as string,
      sheetsWebhookSecret as string,
      payload,
      submittedAtIso,
    );

    if (!sheetsResult.ok) {
      console.error(
        `Google Sheets contact delivery failed${sheetsResult.status ? ` with status ${sheetsResult.status}` : ''}.`,
      );
      response.status(502).json({ error: 'Google Sheets delivery failed.' });
      return;
    }
  }

  // Email stays as the instant notification channel. If Sheets already stored
  // the request, an email outage must not make the visitor submit a duplicate.
  if (hasCompleteEmailConfig) {
    const emailResult = await sendContactEmail(
      resendApiKey as string,
      contactToEmail as string,
      contactFromEmail as string,
      payload,
      submittedAt,
    );

    if (!emailResult.ok) {
      console.error(
        `Contact email delivery failed${emailResult.status ? ` with status ${emailResult.status}` : ''}.`,
      );

      if (!hasCompleteSheetsConfig) {
        response.status(502).json({ error: 'Email delivery failed.' });
        return;
      }
    }
  }

  response.status(200).json({ ok: true });
}

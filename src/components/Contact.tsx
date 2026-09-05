import { useRef, useState, type FormEvent } from 'react';
import {
  CheckCircle2Icon,
  CheckIcon,
  Clock3Icon,
  MessagesSquareIcon,
  SendIcon,
  ShieldCheckIcon,
} from 'lucide-react';

type ContactChannel = 'phone' | 'whatsapp' | 'email' | '';

type FormValues = {
  fullName: string;
  company: string;
  channel: ContactChannel;
  contact: string;
  message: string;
  website: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type ApiResponse = {
  errors?: FormErrors;
};

const initialValues: FormValues = {
  fullName: '',
  company: '',
  channel: '',
  contact: '',
  message: '',
  website: '',
};

const channelOptions: Array<{ value: Exclude<ContactChannel, ''>; label: string }> = [
  { value: 'phone', label: 'ტელეფონი' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'email', label: 'ელფოსტა' },
];

const benefits = [
  { icon: Clock3Icon, label: 'პასუხი 24 საათის განმავლობაში' },
  { icon: MessagesSquareIcon, label: 'პირდაპირ დიზაინერთან კომუნიკაცია' },
  { icon: ShieldCheckIcon, label: 'არანაირი წინასწარი ვალდებულება' },
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getContactField(channel: ContactChannel) {
  switch (channel) {
    case 'email':
      return {
        label: 'ელფოსტა*',
        placeholder: 'მაგალითად: name@company.ge',
        type: 'email',
        autoComplete: 'email',
      } as const;
    case 'whatsapp':
      return {
        label: 'WhatsApp-ის ნომერი*',
        placeholder: 'მაგალითად: +995 5XX XX XX XX',
        type: 'tel',
        autoComplete: 'tel',
      } as const;
    case 'phone':
      return {
        label: 'ტელეფონის ნომერი*',
        placeholder: 'მაგალითად: +995 5XX XX XX XX',
        type: 'tel',
        autoComplete: 'tel',
      } as const;
    default:
      return {
        label: 'საკონტაქტო ინფორმაცია*',
        placeholder: 'ჯერ აირჩიეთ საკომუნიკაციო არხი',
        type: 'text',
        autoComplete: 'off',
      } as const;
  }
}

function validateForm(values: FormValues) {
  const errors: FormErrors = {};
  const fullName = values.fullName.trim();
  const company = values.company.trim();
  const contact = values.contact.trim();

  if (fullName.length < 2 || fullName.length > 120) {
    errors.fullName = 'გთხოვთ, შეიყვანოთ სახელი და გვარი.';
  }

  if (company.length < 2 || company.length > 160) {
    errors.company = 'გთხოვთ, მიუთითოთ კომპანიის ან ბრენდის სახელი.';
  }

  if (!values.channel) {
    errors.channel = 'გთხოვთ, აირჩიოთ სასურველი საკომუნიკაციო არხი.';
  } else if (values.channel === 'email') {
    if (contact.length > 254 || !emailPattern.test(contact)) {
      errors.contact = 'გთხოვთ, შეიყვანოთ სწორი ელფოსტა.';
    }
  } else {
    const hasValidPhoneCharacters = /^[+()\d\s-]+$/.test(contact);
    const hasEnoughDigits = contact.replace(/\D/g, '').length >= 6;

    if (contact.length > 254 || !hasValidPhoneCharacters || !hasEnoughDigits) {
      errors.contact =
        values.channel === 'whatsapp'
          ? 'გთხოვთ, შეიყვანოთ WhatsApp-ის ნომერი.'
          : 'გთხოვთ, შეიყვანოთ ტელეფონის ნომერი.';
    }
  }

  if (values.message.length > 1000) {
    errors.message = 'შეტყობინება არ უნდა აღემატებოდეს 1,000 სიმბოლოს.';
  }

  return errors;
}

export function Contact() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const focusFirstInvalidField = () => {
    window.requestAnimationFrame(() => {
      formRef.current
        ?.querySelector<HTMLElement>('[aria-invalid="true"]')
        ?.focus();
    });
  };

  const updateValue = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (status === 'error') setStatus('idle');
  };

  const selectChannel = (channel: Exclude<ContactChannel, ''>) => {
    setValues((current) => ({ ...current, channel, contact: '' }));
    setErrors((current) => ({ ...current, channel: undefined, contact: undefined }));
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting') return;

    const trimmedValues = {
      ...values,
      fullName: values.fullName.trim(),
      company: values.company.trim(),
      contact: values.contact.trim(),
      message: values.message.trim(),
    };
    const nextErrors = validateForm(trimmedValues);

    setValues(trimmedValues);
    setErrors(nextErrors);
    setStatus('idle');

    if (Object.keys(nextErrors).length > 0) {
      focusFirstInvalidField();
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trimmedValues),
      });

      let responseBody: ApiResponse = {};
      try {
        responseBody = (await response.json()) as ApiResponse;
      } catch {
        responseBody = {};
      }

      if (!response.ok) {
        if (responseBody.errors && Object.keys(responseBody.errors).length > 0) {
          setErrors(responseBody.errors);
          setStatus('idle');
          focusFirstInvalidField();
          return;
        }

        setStatus('error');
        return;
      }

      setValues(initialValues);
      setErrors({});
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const contactField = getContactField(values.channel);

  const fieldClass = (hasError: boolean) =>
    `contact-control min-h-12 w-full rounded-xl border px-4 text-[15px] text-ink outline-none transition placeholder:text-ink/25 focus:ring-2 focus:ring-accent/20 ${
      hasError
        ? 'border-red-400/70 bg-red-400/10 focus:border-red-400'
        : 'border-ink/10 focus:border-accent/60'
    }`;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-20 overflow-hidden border-t border-ink/[0.07] px-5 py-20 sm:px-8 sm:py-28"
    >
      <div aria-hidden="true" className="section-glow -left-56 top-24 bg-cyan-400/10" />
      <div className="relative mx-auto grid w-full max-w-6xl items-start gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
        <div className="lg:sticky lg:top-28">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/80">
            დაგვიკავშირდით
          </p>
          <h2
            id="contact-heading"
            className="mt-3 max-w-xl text-4xl font-bold tracking-[-0.04em] text-ink sm:text-5xl"
          >
            დაგვიტოვეთ საკონტაქტო ინფორმაცია
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-7 text-ink/55 sm:text-base">
            მოკლედ მოგვწერეთ თქვენი ბიზნესისა და დიზაინის საჭიროების შესახებ. თქვენს მოთხოვნას
            გავეცნობით და 24 საათის განმავლობაში თავად დაგიკავშირდებით.
          </p>

          <ul className="mt-9 space-y-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <li key={benefit.label} className="flex items-center gap-3 text-sm font-medium text-ink/70">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-ink/[0.06] shadow-glow backdrop-blur-xl">
                    <Icon className="h-[18px] w-[18px] text-accent" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span>{benefit.label}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="glass-panel rounded-[28px] p-5 sm:rounded-[32px] sm:p-8 lg:p-10">
          {status === 'success' ? (
            <div
              role="status"
              aria-live="polite"
              className="flex min-h-[420px] flex-col items-center justify-center text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-accent to-brandviolet text-white shadow-glow">
                <CheckCircle2Icon className="h-7 w-7" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-2xl font-bold tracking-[-0.025em] text-ink sm:text-3xl">
                მადლობა! თქვენი მოთხოვნა მიღებულია.
              </h3>
              <p className="mt-3 max-w-md text-[15px] leading-7 text-ink/55">
                თქვენს შეტყობინებას გავეცნობით და 24 საათის განმავლობაში დაგიკავშირდებით.
              </p>
            </div>
          ) : (
            <form ref={formRef} noValidate aria-busy={status === 'submitting'} onSubmit={handleSubmit}>
              <div className="grid gap-5 lg:grid-cols-2">
                <div>
                  <label htmlFor="contact-full-name" className="mb-2 block text-sm font-semibold text-ink">
                    სახელი და გვარი*
                  </label>
                  <input
                    id="contact-full-name"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    minLength={2}
                    maxLength={120}
                    required
                    value={values.fullName}
                    onChange={(event) => updateValue('fullName', event.target.value)}
                    placeholder="მაგალითად: ნინო მაისურაძე"
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={errors.fullName ? 'contact-full-name-error' : undefined}
                    className={fieldClass(Boolean(errors.fullName))}
                  />
                  {errors.fullName && (
                    <p id="contact-full-name-error" role="alert" className="mt-1.5 text-xs leading-5 text-red-300">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-company" className="mb-2 block text-sm font-semibold text-ink">
                    კომპანიის ან ბრენდის სახელი*
                  </label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    minLength={2}
                    maxLength={160}
                    required
                    value={values.company}
                    onChange={(event) => updateValue('company', event.target.value)}
                    placeholder="მაგალითად: Margo Studio"
                    aria-invalid={Boolean(errors.company)}
                    aria-describedby={errors.company ? 'contact-company-error' : undefined}
                    className={fieldClass(Boolean(errors.company))}
                  />
                  {errors.company && (
                    <p id="contact-company-error" role="alert" className="mt-1.5 text-xs leading-5 text-red-300">
                      {errors.company}
                    </p>
                  )}
                </div>
              </div>

              <fieldset className="mt-5">
                <legend className="mb-2 block text-sm font-semibold text-ink">
                  როგორ გსურთ, რომ დაგიკავშირდეთ?*
                </legend>
                <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
                  {channelOptions.map((option) => {
                    const isSelected = values.channel === option.value;

                    return (
                      <div key={option.value}>
                        <input
                          id={`contact-channel-${option.value}`}
                          className="peer sr-only"
                          type="radio"
                          name="channel"
                          value={option.value}
                          checked={isSelected}
                          onChange={() => selectChannel(option.value)}
                          aria-invalid={Boolean(errors.channel)}
                          aria-describedby={errors.channel ? 'contact-channel-error' : undefined}
                        />
                        <label
                          htmlFor={`contact-channel-${option.value}`}
                          className={`flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 text-sm font-semibold transition peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent ${
                            isSelected
                              ? 'border-accent/60 bg-accent/20 text-white shadow-glow'
                              : 'border-ink/10 bg-ink/[0.04] text-ink/55 hover:border-ink/25 hover:bg-ink/[0.07] hover:text-ink'
                          }`}
                        >
                          {isSelected && <CheckIcon className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />}
                          {option.label}
                        </label>
                      </div>
                    );
                  })}
                </div>
                {errors.channel && (
                  <p id="contact-channel-error" role="alert" className="mt-1.5 text-xs leading-5 text-red-300">
                    {errors.channel}
                  </p>
                )}
              </fieldset>

              <div className="mt-5">
                <label htmlFor="contact-detail" className="mb-2 block text-sm font-semibold text-ink">
                  {contactField.label}
                </label>
                <input
                  id="contact-detail"
                  name="contact"
                  type={contactField.type}
                  inputMode={values.channel === 'email' ? 'email' : values.channel ? 'tel' : 'text'}
                  autoComplete={contactField.autoComplete}
                  maxLength={254}
                  required
                  disabled={!values.channel}
                  value={values.contact}
                  onChange={(event) => updateValue('contact', event.target.value)}
                  placeholder={contactField.placeholder}
                  aria-invalid={Boolean(errors.contact)}
                  aria-describedby={errors.contact ? 'contact-detail-error' : undefined}
                  className={`${fieldClass(Boolean(errors.contact))} disabled:cursor-not-allowed disabled:bg-ink/[0.025] disabled:text-ink/25`}
                />
                {errors.contact && (
                  <p id="contact-detail-error" role="alert" className="mt-1.5 text-xs leading-5 text-red-300">
                    {errors.contact}
                  </p>
                )}
              </div>

              <div className="mt-5">
                <div className="mb-2 flex items-end justify-between gap-4">
                  <label htmlFor="contact-message" className="block text-sm font-semibold text-ink">
                    რაში შეგვიძლია დაგეხმაროთ?
                  </label>
                  <span className="text-[11px] text-ink/35" aria-live="polite">
                    {values.message.length}/1,000
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  maxLength={1000}
                  value={values.message}
                  onChange={(event) => updateValue('message', event.target.value)}
                  placeholder="მოკლედ აღწერეთ, რა ტიპის დიზაინი გჭირდებათ ან რა იქნებოდა თქვენი პირველი მოთხოვნა."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className={`${fieldClass(Boolean(errors.message))} min-h-36 max-h-80 resize-y py-3.5`}
                />
                {errors.message && (
                  <p id="contact-message-error" role="alert" className="mt-1.5 text-xs leading-5 text-red-300">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.website}
                  onChange={(event) => updateValue('website', event.target.value)}
                />
              </div>

              <p className="mt-5 text-xs leading-5 text-ink/40">
                ინფორმაციის გაგზავნით ეთანხმებით, რომ Pixel Bee დაგიკავშირდეთ თქვენს მოთხოვნასთან დაკავშირებით.
              </p>

              {status === 'error' && (
                <p role="alert" aria-live="assertive" className="mt-4 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm leading-6 text-red-200">
                  შეტყობინების გაგზავნა ვერ მოხერხდა. გთხოვთ, კიდევ ერთხელ სცადოთ ან დაგვიკავშირდეთ ელფოსტაზე.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-gradient-to-r from-[#6f9fff] to-[#8b7cff] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_16px_38px_-16px_rgba(111,159,255,0.75)] transition-all hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-wait disabled:translate-y-0 disabled:opacity-65"
              >
                {status === 'submitting' ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white" aria-hidden="true" />
                    იგზავნება...
                  </>
                ) : (
                  <>
                    დამიკავშირდით
                    <SendIcon className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

# Pixel Bee

React/Vite landing page for the Pixel Bee design service.

The site includes the hero, process, portfolio galleries, services, pricing,
FAQ, contact, and footer sections. It has no authentication, user accounts,
payments, admin dashboard, or database. Contact requests are saved to a private
Google Sheet through a Vercel serverless function. Resend remains available for
instant email notifications.

## Contact form configuration

Add the following server-side environment variables in Vercel:

```bash
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
GOOGLE_SHEETS_WEBHOOK_URL=
GOOGLE_SHEETS_WEBHOOK_SECRET=
```

`CONTACT_FROM_EMAIL` must use a sender/domain verified in Resend. Run the app
through Vercel (deployed or with Vercel Dev) when testing real email delivery.

Google Sheets setup instructions and the Apps Script code are in
[`google-apps-script/`](google-apps-script/). The email and Google Sheets
integrations are independently optional, but at least one complete delivery
method must be configured. When Google Sheets is configured it becomes the
durable contact log; an email outage will not make the visitor resubmit and
create a duplicate row.

## Run locally

```bash
pnpm install
pnpm dev
```

## Production build

```bash
pnpm build
```

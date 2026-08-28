# Pixel Bee

React/Vite landing page for the Pixel Bee design service.

The site includes the hero, process, portfolio galleries, services, pricing,
FAQ, contact, and footer sections. It has no authentication, user accounts,
payments, admin dashboard, or database. Contact requests are delivered through
a Vercel serverless function and Resend.

## Contact form configuration

Add the following server-side environment variables in Vercel:

```bash
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
```

`CONTACT_FROM_EMAIL` must use a sender/domain verified in Resend. Run the app
through Vercel (deployed or with Vercel Dev) when testing real email delivery.

## Run locally

```bash
pnpm install
pnpm dev
```

## Production build

```bash
pnpm build
```

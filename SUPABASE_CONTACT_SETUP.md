# Supabase Contact Form Setup

This portfolio now sends the contact form to a Supabase Edge Function:

```text
https://aoqutjipqixenjaizhgk.supabase.co/functions/v1/contact
```

## Files added

```text
supabase/functions/contact/index.ts
supabase/config.toml
```

## Secrets required in Supabase

Make sure these exist in Supabase Project Settings → Edge Functions → Secrets:

```text
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=abdo.abouelella96@gmail.com
CONTACT_FROM_EMAIL=Portfolio <onboarding@resend.dev>
ALLOWED_ORIGIN=https://abdelrahmanabouelella.github.io
```

## Deploy the function

From inside the project folder:

```bash
supabase login
supabase link --project-ref aoqutjipqixenjaizhgk
supabase functions deploy contact --no-verify-jwt
```

The function is public because the portfolio visitor will not be logged in.

## Important

If Resend blocks sending from `onboarding@resend.dev`, verify your own domain in Resend and change:

```text
CONTACT_FROM_EMAIL=Portfolio <contact@your-domain.com>
```

The frontend already points to the Supabase function URL above. If you deploy the function under another project later, update `VITE_CONTACT_API_URL` or edit the footer endpoint.

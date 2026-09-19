# Vercel deployment

1. Import this GitHub repository into Vercel and select the `develop` branch as the preview branch.
2. Set `NEXT_PUBLIC_APP_URL` to the deployed HTTPS URL. This is what master QRs use—never use `localhost` in production.
3. Configure the custom domain after testing the Vercel preview.
4. For merchant accounts, create a Supabase project, run `db/schema.sql`, and add the two Supabase environment variables in Vercel.

The master QR is a session launcher, not a UPI payment QR. It should be tested from a second device before public release.

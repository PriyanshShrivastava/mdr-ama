# MDR-ama

MDR-ama is a mobile-first, open-source web app for creating guided partial UPI payment sessions from one master QR or link.

It creates payment instructions only. It never handles money, asks for UPI PINs, or claims to verify settlement.

## Run locally

```bash
npm install
npm run dev
```

Validate before shipping:

```bash
npm run test
npm run build
```

## Product boundaries

- All monetary arithmetic is performed in integer paise.
- A master QR opens an HTTPS session, not a UPI debit.
- Each payment is individually launched and authorised by the payer in their UPI app.
- Completion is always payer-reported in this MVP; merchants must confirm funds independently.
- The MDR estimate is informational. MDR-ama makes no guarantee that partial payments receive any particular MDR treatment.

See [Rules](src/app/rules/page.tsx), [Privacy](PRIVACY.md), [Disclaimer](DISCLAIMER.md), and [Security](SECURITY.md).

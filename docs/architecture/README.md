# Architecture

MDR-ama is a Next.js App Router application that generates payment instructions. It does not process money or verify settlement.

## Runtime flow

```text
Merchant form
  → server validates merchant + exact paise plan
  → signed/checksummed 24-hour session payload
  → master HTTPS QR/link
  → payer acknowledgement (server-backed)
  → one UPI intent per chunk
  → payer-reported local completion
```

## Module boundaries

| Module | Runtime responsibility | Persistence |
| --- | --- | --- |
| Session creation | Validate merchant and construct exact chunks | Encoded session payload |
| Payer flow | Present one request at a time and record payer-reported progress | Browser local storage |
| Account/history | Future authenticated merchant history | Supabase schema scaffold only |
| Platform delivery | CSP, CI, Vercel and repository quality gates | GitHub/Vercel |

## Decisions

- [ADR-0001: Client-carried payment sessions](decisions/0001-client-carried-sessions.md)
- [ADR-0002: Integer paise arithmetic](decisions/0002-integer-paise.md)
- [ADR-0003: Server-backed payer acknowledgement](decisions/0003-server-backed-acknowledgement.md)

New structural decisions must receive an ADR rather than being explained only in a PR.

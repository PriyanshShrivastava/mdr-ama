# Session creation progress

- Status: Working MVP
- Owner: Session creation module
- Last updated: 2026-09-20

## Complete

- Merchant UPI/name validation.
- Exact rupee-to-paise parsing and maximum-step chunking.
- Live plan preview and 25-step limit.
- Master HTTPS session QR with 24-hour expiry.
- Server validation before QR generation.

## Next

- Add merchant QR image/camera import.
- Consider server signing for tamper-resistant public sessions.

## Verification

Money, UPI, session and merchant form tests; Next build; live create → master QR smoke.

## Change log

- 2026-09-20: Added test ownership, coverage gates and repository governance.
- 2026-09-20: Added live plan preview and deployment-safe origin handling.

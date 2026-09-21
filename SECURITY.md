# Security Policy

Please report vulnerabilities privately to the repository owner. Do not include UPI PINs, OTPs, bank details, transaction references, UPI IDs, or payment-session URLs in issues.

## Dependency review

Run `npm audit --omit=dev` during release review. Do not use `npm audit fix --force`: framework-major upgrades must go through a dedicated branch, the full `npm run verify` gate, browser regression checks and a pull request into `develop`.

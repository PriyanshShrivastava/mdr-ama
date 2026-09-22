# Changelog

All notable product, security, operational and developer-workflow changes are recorded here.

## Unreleased

### Added

- An accessible active-session navigation dialog that prevents accidental exits from a payer step while keeping normal logo navigation direct.
- Server-owned acknowledgement validation with an inline accessible correction instead of a browser validation bubble.
- Repository quality system with CI, Commitlint, Husky, coverage thresholds and governance checks.
- Unit and component regression coverage for money, UPI, session, rules, merchant creation and payer flow modules.
- Architecture decision records, source verification matrix, repository agent roles and reusable Codex skills.
- Per-module progress logs and a root delivery index.

## 2026-09-20

### Fixed

- Allowed Next.js production bootstrap scripts through the CSP so the Vercel app hydrates.
- Replaced the hydration-dependent payer acknowledgement with a native server-backed form.

### Added

- Live payment-plan preview, responsive navigation and documented visual/UX contracts.
- Vercel production deployment at `https://mdr-ama.vercel.app`.

## 2026-09-18

### Added

- Initial client-side guided partial-UPI-payment MVP.
- Exact paise chunking, master session QR and payer-reported progress.

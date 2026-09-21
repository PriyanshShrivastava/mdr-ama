---
name: mdr-ama-testing
description: Apply MDR-ama's risk-based testing policy whenever changing money, session, UPI, QR, payer-flow, UI behavior, or test infrastructure.
---

# MDR-ama Testing

1. Read `AGENTS.md`, `docs/testing/STRATEGY.md`, and `docs/testing/MATRIX.md` completely.
2. Identify the changed behavior and the failure that a regression would cause.
3. Add or update a test that fails without the implementation change.
4. Cover success, validation failure, and the most important boundary for money/payment/session work.
5. Register every new `.ts` or `.tsx` source file in `docs/testing/MATRIX.md`.
6. Update the affected module's `PROGRESS.md` and `CHANGELOG.md` when applicable.
7. Run `npm run verify`. Do not reduce thresholds or broaden exclusions to obtain a pass.
8. Report actual test counts, coverage and unresolved risk.

Prefer behavior assertions over implementation details. Never use snapshots as the only evidence for a payment or safety flow.

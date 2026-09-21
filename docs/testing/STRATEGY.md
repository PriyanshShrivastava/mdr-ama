# Testing strategy

MDR-ama uses risk-based layers rather than one trivial test per file.

## Gates

1. **Unit tests:** exact paise arithmetic, session integrity/expiry, MDR display rules and UPI URI validation.
2. **Component tests:** merchant form planning/validation, shared navigation/safety content and payer state transitions.
3. **Route smoke gate:** `next build` compiles and renders every App Router entry listed by Next.
4. **Repository governance:** every source file must appear in `MATRIX.md`; CI fails when a new one is unregistered.
5. **Live deployment check:** after deployment, test `/`, `/create`, master QR generation and acknowledgement → first payment.

Coverage thresholds are 80% statements, functions and lines and 70% branches across behavior-bearing library/component code. Thresholds are a floor, not the goal. Payment-critical code should stay materially higher.

## Regression rule

A bug fix begins with a reproducible failing scenario. The fix must add a durable automated assertion at the lowest useful layer and a live browser check when the bug depends on routing, hydration or deployment headers.

## Exceptions

Static route wrappers, CSS, assets and documents do not receive fake unit tests. Their owner is the build, visual/browser verification, governance checker or human review recorded in the matrix.

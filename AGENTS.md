<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# MDR-ama repository rules

## Branches and delivery

- Treat `main` as stable and `develop` as the integration branch.
- Create every implementation branch from the latest `origin/develop`.
- Open a pull request back to `develop`; do not push implementation commits directly to `main` or `develop`.
- Do not commit on the user's behalf without first stating exactly what will be committed.
- Use Conventional Commit messages enforced by Commitlint.

## Tests are part of the change

- Every behavior-bearing source file must be registered in `docs/testing/MATRIX.md` with its test owner or verification gate.
- A behavior change must add or update a test that fails without the change.
- Money, session encoding, QR/session navigation, UPI URI generation and payer-reported state require explicit edge-case coverage.
- Page wrappers are covered by route/build smoke verification; do not create assertions that merely restate static markup.
- Run `npm run verify` before declaring work complete.
- Do not lower coverage thresholds to make a change pass. Add meaningful coverage or record a reviewed exception in the test matrix.

## Documentation and change history

- Update `CHANGELOG.md` under `Unreleased` for user-visible, operational, security or developer-workflow changes.
- Update the relevant `docs/modules/*/PROGRESS.md` file whenever that module changes.
- Update `PROGRESS.md` when a module milestone, risk or deployment state changes.
- Architecture changes require an ADR in `docs/architecture/decisions/` and an index update.

## Product safety

- Keep monetary arithmetic in integer paise.
- A master QR launches an HTTPS payment session; it is never described as a direct UPI debit QR.
- Never claim settlement verification. Completion remains payer-reported until an authorized payment-provider integration exists.
- Never collect or request a UPI PIN.

## Repository skills

- Use `.codex/skills/mdr-ama-testing/SKILL.md` when changing logic, UI behavior or tests.
- Use `.codex/skills/mdr-ama-pr-readiness/SKILL.md` before preparing or reviewing a pull request.

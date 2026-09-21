# Repository agent roles

These are review lenses for Codex or another coding agent. They do not replace human ownership.

| Role | Owns | Required evidence |
| --- | --- | --- |
| Product safety agent | UPI wording, PIN boundaries, payer-reported completion | Safety assertions and PR checklist |
| Test agent | Unit/component coverage, boundaries, test matrix | `npm run test:coverage` and matrix pass |
| Architecture agent | Module boundaries and ADRs | Updated architecture index/ADR |
| PR readiness agent | Branch strategy, commits, docs, rollback | `npm run verify`, Commitlint and PR template |
| Release agent | Exact `develop` commit and Vercel health | Build result, deployment URL and live smoke check |

Repository-specific workflows are encoded as skills under `.codex/skills/` and as rules in `AGENTS.md`.

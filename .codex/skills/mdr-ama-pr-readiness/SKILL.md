---
name: mdr-ama-pr-readiness
description: Prepare or review an MDR-ama pull request against the repository's branch, testing, documentation, safety, and deployment contracts.
---

# MDR-ama PR Readiness

1. Confirm the branch was created from current `origin/develop` and targets `develop`.
2. Read `AGENTS.md`, `.github/PULL_REQUEST_TEMPLATE.md`, `CHANGELOG.md`, and the relevant module progress file.
3. Review the diff for accidental secrets, settlement claims, floating-point money, direct pushes, and unrelated changes.
4. Confirm the test matrix registers all source files and changed behavior has regression coverage.
5. Run `npm run verify` and Commitlint against new commits.
6. Ensure the PR links its issue, explains risk/rollback, and includes screenshots for UI changes.
7. Do not merge with a failing gate. Do not deploy a branch other than the intended `develop` commit.

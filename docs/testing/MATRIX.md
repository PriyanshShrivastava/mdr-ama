# Source verification matrix

Every behavior-bearing TypeScript source file is registered here. `npm run governance:check` fails when a new source file is omitted.

| Source file | Verification owner |
| --- | --- |
| `src/lib/money.ts` | `src/lib/money.test.ts` |
| `src/lib/upi.ts` | `src/lib/upi.test.ts` |
| `src/lib/session.ts` | `src/lib/session.test.ts` |
| `src/lib/rules.ts` | `src/lib/rules.test.ts` |
| `src/components/AnimatedPanel.tsx` | `src/components/static-components.test.tsx` |
| `src/components/CreateSessionForm.tsx` | `src/components/CreateSessionForm.test.tsx` |
| `src/components/Footer.tsx` | `src/components/static-components.test.tsx` |
| `src/components/Landing.tsx` | `src/components/static-components.test.tsx` |
| `src/components/PayerFlow.tsx` | `src/components/PayerFlow.test.tsx` |
| `src/components/SecondaryNav.tsx` | `src/components/static-components.test.tsx` |
| `src/components/SecurityBanner.tsx` | `src/components/static-components.test.tsx` |
| `src/app/layout.tsx` | Next production build + route smoke gate |
| `src/app/page.tsx` | Next production build + `Landing` component tests |
| `src/app/create/page.tsx` | Next production build + `CreateSessionForm` component tests |
| `src/app/master/page.tsx` | Next production build + money/session/UPI unit tests + live QR smoke |
| `src/app/master/[payload]/page.tsx` | Next production build + live master-session smoke |
| `src/app/s/[payload]/page.tsx` | Next production build + `PayerFlow` tests + live acknowledgement smoke |
| `src/app/account/page.tsx` | Next production build; preview-only copy review |
| `src/app/dashboard/page.tsx` | Next production build; preview-only copy review |
| `src/app/rules/page.tsx` | Next production build + rules unit tests |
| `src/app/privacy/page.tsx` | Next production build + policy review |
| `src/app/disclaimer/page.tsx` | Next production build + policy review |
| `src/app/security/page.tsx` | Next production build + security review |

Non-TypeScript owners: `src/app/globals.css` is covered by responsive/live visual QA; `db/schema.sql` requires Supabase migration review before activation; public assets are checked by build/static delivery.

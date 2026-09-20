# MDR-ama UX Contract

Visual intent lives in [DESIGN.md](DESIGN.md). This document owns shared observable behavior.

## Route outcomes and titles

| Route | Primary action | Outcome | Title |
| --- | --- | --- | --- |
| `/` | Create a master QR | `/create` | `MDR-ama — guided UPI sessions` |
| `/create` | Create and show master QR | `/master?...` after inline validation | `Create a payment session — MDR-ama` |
| `/master` | Start on this device | `/s/:payload` | `Master payment QR — MDR-ama` |
| `/s/:payload` | Pay / mark complete | UPI app; then next local step | `Payment session — MDR-ama` |
| policy routes | Home / Create QR | `/` or `/create` | `{Policy} — MDR-ama` |

## Canonical capability ownership

| Capability | Canonical owner | Source of truth | Allowed variants | Verification |
| --- | --- | --- | --- | --- |
| Form | `CreateSessionForm` | This contract | create | inline validation and submit test |
| Select/Listbox | native `<select>` | This contract | merchant classification | keyboard and platform popup |
| Scrollbar | `globals.css` | `DESIGN.md` | none | computed style / narrow viewport |
| CRUD | server route `/master` | PRD and this contract | create session | server validation and QR render |

## Validation, feedback and recovery

The merchant form validates on submit, focuses the first invalid field and describes each correction in text. A server validation failure renders an error card with a return action. Creating a master QR is a navigation, not an asynchronous mutation, so it has no fake loading toast.

Payer-reported completion is stored only in local storage. It never becomes settlement confirmation. The customer can retry with a new attempt reference and can use the fallback UPI QR if an app does not open.

## Accessibility and responsive policy

WCAG 2.2 AA is the target. Native links/buttons keep their roles. Focus rings remain visible; semantic labels are never replaced by placeholders. At narrow widths, columns stack and links remain reachable. Reduced motion disables looping and movement.

## Account boundary

The account/dashboard routes are clearly marked preview until an authenticated persistence provider is configured. Payment history is not represented as saved data before then.

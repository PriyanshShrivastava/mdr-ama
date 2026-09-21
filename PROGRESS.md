# Product progress

| Module | State | Current milestone | Main risk |
| --- | --- | --- | --- |
| [Session creation](docs/modules/session-creation/PROGRESS.md) | Working | Master QR generation and live plan preview | Session payload is checksummed, not server-signed |
| [Payer flow](docs/modules/payer-flow/PROGRESS.md) | Working | Server-backed acknowledgement and local progress | Completion is payer-reported only |
| [Account/history](docs/modules/account-history/PROGRESS.md) | Scaffolded | Schema and UI preview | Authentication/persistence not connected |
| [Platform delivery](docs/modules/platform-delivery/PROGRESS.md) | Working | Vercel deploy plus CI/governance | GitHub↔Vercel auto-link still requires account permission |

## Current priorities

1. Connect an authenticated backend before presenting account history as live.
2. Add provider-backed settlement status only through an authorized integration.
3. Keep rules and MDR messaging revalidated against authoritative sources.

Update this index when a module changes state, milestone or risk.

# ADR-0003: Server-backed payer acknowledgement

- Status: Accepted
- Date: 2026-09-20

## Decision

The payer safety acknowledgement is a native GET form rendered by the server. Interactive payment steps begin only after the acknowledged navigation.

## Consequences

The safety gate works before React hydration and exposes a deliberate checkbox plus Continue action. Client JavaScript remains necessary for local progress and UPI launch behavior after acknowledgement.

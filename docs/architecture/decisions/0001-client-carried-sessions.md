# ADR-0001: Client-carried payment sessions

- Status: Accepted
- Date: 2026-09-18

## Decision

The MVP encodes a checksummed, expiring session in the master URL. It does not require a backend to retrieve the payment plan.

## Consequences

The link must not contain secrets. Payload integrity detects accidental or casual tampering but is not a server signature. Sessions expire after 24 hours, and merchant history requires the future authenticated persistence module.

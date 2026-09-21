# ADR-0002: Integer paise arithmetic

- Status: Accepted
- Date: 2026-09-18

## Decision

All internal monetary calculations use safe integer paise. Decimal rupee strings are parsed once at the boundary and formatted only for display or UPI instructions.

## Consequences

Floating-point money is prohibited. Chunk sums must equal the invoice total exactly, and plans above 25 chunks are rejected.

---
version: alpha
name: "MDR-ama"
description: "A mobile-first payment-session utility with an energetic, calm, high-trust interface."
colors:
  ink: "#201B2B"
  paper: "#FFFAF4"
  primary: "#6246EA"
  primary-strong: "#4A2FE0"
  lavender: "#F0EDFF"
  line: "#DED6CE"
  muted: "#706779"
  success: "#166534"
  warning: "#775006"
  danger: "#A02121"
typography:
  display:
    fontFamily: "Arial, Helvetica, sans-serif"
  body:
    fontFamily: "Arial, Helvetica, sans-serif"
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
rounded:
  DEFAULT: "0.75rem"
  control: "0.75rem"
  card: "1.5rem"
  pill: "999px"
spacing:
  page-max: "65rem"
  content-max: "40.625rem"
  page-gutter: "1.25rem"
components:
  button: {}
  card: {}
  field: {}
  notice: {}
  navigation: {}
---

# MDR-ama Design System

## Overview

### Creative North Star

The QR is the product's object of trust: a crisp black-and-white code inside a soft, almost-paper interface, with an electric-violet signal used only for action and progress. It should feel like a well-designed payment receipt that has learned how to move.

### Product context and register

- **Audience and primary job:** Indian merchants need to create a clear, guided partial-payment session and customers need to complete one deliberate UPI request at a time.
- **Target market(s) and evidence:** India, based on the UPI, rupee and MDR product requirements.
- **Locale(s) and language policy:** English-first; amounts use INR formatting. Do not infer settlement from payer actions.
- **Usage scene:** Phone-first, often in-person, with a merchant preparing a code while a customer waits.
- **Register:** Hybrid. Marketing routes may be expressive; create, master, payer and account routes prioritize unambiguous task completion.
- **Memorable signature:** A violet “signal halo” or progress rail makes the session feel live without imitating a bank app.
- **Restraint:** Forms, safety notices, payee details and payment steps stay quiet, explicit and high contrast.
- **Anti-references:** Fake fintech dashboards, glassy gradients behind payment text, and generic neon “AI SaaS” chrome.
- **Token ownership/runtime mapping:** `src/app/globals.css` is canonical (Model B). This file mirrors its CSS variables and documents their use.

## Colors

`ink` and `paper` carry almost all reading; `primary` is reserved for safe progress and primary actions. Lavender is informational, not a success state. Warnings and errors use text plus a labeled message, never color alone.

## Typography

The display role is compact, tight and conversational; it is reserved for the bill, page title and one decisive phrase. Body copy has a maximum comfortable measure and a 1.5 line-height. Labels use a compact 700 weight rather than all-caps. Numeric amounts use tabular figures where the browser supports them.

## Layout

Desktop uses a quiet, centred editorial column; the active form can expand to two fields only when they remain legible. At 720px and below, fields and actions stack. Important actions never sit below a fixed overlay. The product owns document scrolling and maintains a stable scrollbar gutter.

## Elevation & Depth

Cards use a thin warm border and a restrained shadow only while elevated by hover or focus. The violet halo is an expressive, route-level element; it never sits behind critical information.

## Shapes

Cards are softly rounded; fields are a little tighter; primary actions are pill-shaped. Icons use Lucide's outlined style and always retain a text label for essential controls.

## Components

### Foundational visual states

Inputs visibly change border and ring on focus. Invalid fields receive a persistent text error and `aria-invalid`. Disabled and busy actions preserve their dimensions. Reduced-motion users see only short opacity changes.

### Buttons and actions

One solid violet primary action per decision area; neutral outline actions are secondary. The action vocabulary is explicit: create, start, pay, mark complete, return home.

### Navigation and data display

Every secondary route has an always-visible Home destination and a Create QR shortcut. Account history is an authenticated future capability; preview data must be labeled as preview.

### Forms and overlays

Forms use owned, inline validation before navigation and preserve typed values. Native select is the intentional canonical owner for merchant classification because an operating-system popup is acceptable here.

### Motion

Motion is one coordinated entrance: content rises 12–18px with opacity over 220–420ms, while the violet halo gently rotates. Hover motion is 150–200ms. `prefers-reduced-motion` disables transforms, looping and staggers.

### Content and data visualization

The voice is plain, gently witty only in non-critical marketing copy, and never playful about safety or settlement. Use Indian rupee formatting and “payer-reported” whenever completion has not been independently verified.

## Do's and Don'ts

- **Do:** Make the next safe action obvious and explain what the QR will open.
- **Do:** Preserve entered merchant details when validation fails.
- **Don't:** Make a master session QR look like a UPI debit QR.
- **Don't:** Hide recovery navigation or rely on color, animation or browser validation bubbles alone.

"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, QrCode, Sparkles } from "lucide-react";

type Errors = Partial<Record<"pa" | "pn" | "amount" | "max", string>>;

function numeric(value: string) {
  const parsed = Number(value.replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

export function CreateSessionForm() {
  const reduce = useReducedMotion();
  const firstInvalid = useRef<HTMLInputElement | null>(null);
  const [values, setValues] = useState({ pa: "", pn: "", amount: "", max: "2000", category: "standard" });
  const [errors, setErrors] = useState<Errors>({});
  const total = numeric(values.amount);
  const cap = numeric(values.max);
  const steps = total > 0 && cap > 0 ? Math.ceil(total / cap) : 0;
  const finalStep = steps > 1 ? total - cap * (steps - 1) : total;

  function update(name: keyof typeof values, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    if (name in errors) setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function validate() {
    const next: Errors = {
      pa: values.pa.trim().includes("@") ? undefined : "Enter a valid UPI ID, such as shop@upi.",
      pn: values.pn.trim() ? undefined : "Enter the merchant name customers should verify.",
      amount: total > 0 ? undefined : "Enter a bill amount above ₹0.",
      max: cap <= 0 ? "Enter a maximum step above ₹0." : total > 0 && Math.ceil(total / cap) > 25 ? "Use a larger maximum step—sessions are limited to 25 payment steps." : undefined,
    };
    setErrors(next);
    return !Object.values(next).some(Boolean);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    if (validate()) return;
    event.preventDefault();
    requestAnimationFrame(() => firstInvalid.current?.focus());
  }

  const plan = useMemo(() => {
    if (!steps || steps > 25) return [];
    return Array.from({ length: Math.min(steps, 5) }, (_, index) => index === steps - 1 ? finalStep : cap);
  }, [cap, finalStep, steps]);

  return <motion.form className="session-form card" action="/master" method="get" noValidate onSubmit={submit} initial={{ opacity: 0, y: reduce ? 0 : 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .38, ease: "easeOut" }}>
    <div className="form-heading">
      <div><p className="eyebrow">Merchant setup</p><h1>Set up the bill.</h1><p className="muted">One QR, a clear plan, and no mystery charges hiding in the wallpaper.</p></div>
      <div className="signal-mark" aria-hidden="true"><QrCode size={23}/></div>
    </div>
    <div className="form-step"><span>01</span><p>Merchant details</p><i /></div>
    <div className="fields">
      <label htmlFor="merchant-upi">Merchant UPI ID<input ref={(node) => { if (errors.pa) firstInvalid.current = node; }} id="merchant-upi" name="pa" required autoComplete="off" value={values.pa} onChange={(event) => update("pa", event.target.value)} aria-invalid={Boolean(errors.pa)} aria-describedby={errors.pa ? "merchant-upi-error" : undefined} placeholder="e.g. sharma@upi" />{errors.pa && <span className="field-error" id="merchant-upi-error">{errors.pa}</span>}</label>
      <label htmlFor="merchant-name">Merchant name<input id="merchant-name" name="pn" required value={values.pn} onChange={(event) => update("pn", event.target.value)} aria-invalid={Boolean(errors.pn)} aria-describedby={errors.pn ? "merchant-name-error" : undefined} placeholder="e.g. Sharma Stores" />{errors.pn && <span className="field-error" id="merchant-name-error">{errors.pn}</span>}</label>
    </div>
    <div className="form-step"><span>02</span><p>Split the bill</p><i /></div>
    <div className="fields">
      <label htmlFor="bill-amount">Bill amount (₹)<input id="bill-amount" name="amount" required inputMode="decimal" value={values.amount} onChange={(event) => update("amount", event.target.value)} aria-invalid={Boolean(errors.amount)} aria-describedby={errors.amount ? "bill-amount-error" : undefined} placeholder="e.g. 8750.00" />{errors.amount && <span className="field-error" id="bill-amount-error">{errors.amount}</span>}</label>
      <label htmlFor="payment-cap">Maximum payment step (₹)<input id="payment-cap" name="max" required inputMode="decimal" value={values.max} onChange={(event) => update("max", event.target.value)} aria-invalid={Boolean(errors.max)} aria-describedby={errors.max ? "payment-cap-error" : undefined} placeholder="2000" />{errors.max && <span className="field-error" id="payment-cap-error">{errors.max}</span>}</label>
    </div>
    <label htmlFor="merchant-category">Merchant classification<select id="merchant-category" name="category" value={values.category} onChange={(event) => update("category", event.target.value)}><option value="standard">Standard P2M</option><option value="p2pm">P2PM / small merchant</option><option value="special">Special sector / capital markets</option><option value="unknown">Unknown</option></select></label>
    <section className="plan-preview" aria-live="polite">
      <div className="plan-preview-head"><div><Sparkles size={16}/><span>Payment plan</span></div><strong>{steps ? `${steps} ${steps === 1 ? "step" : "steps"}` : "Waiting for amount"}</strong></div>
      {steps > 25 ? <p className="field-error">Use a larger maximum step—sessions are limited to 25 payment steps.</p> : steps ? <div className="plan-chips">{plan.map((amount, index) => <span key={index}>₹{amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>)}{steps > 5 && <span>+{steps - 5} more</span>}</div> : <p>Enter an amount and maximum step to see the split before you create the QR.</p>}
    </section>
    <aside className="form-safety"><CheckCircle2 size={17}/><span>MDR-ama creates instructions only. Your customer still approves every UPI payment in their own app.</span></aside>
    <button className="button create-button" type="submit">Create and show master QR <ArrowRight size={20}/></button>
  </motion.form>;
}

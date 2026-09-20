"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Footer } from "@/components/Footer";
import { SecurityBanner } from "@/components/SecurityBanner";
import { formatPaise } from "@/lib/money";
import { decodeSession, PaymentSessionV1 } from "@/lib/session";

export default function MasterQrPage() {
  const { payload } = useParams<{ payload: string }>();
  const [session, setSession] = useState<PaymentSessionV1>(); const [qr, setQr] = useState(""); const [error, setError] = useState(""); const [copied, setCopied] = useState(false);
  useEffect(() => { try { const decoded = decodeSession(payload); setSession(decoded); const sessionUrl = `${window.location.origin}/s/${payload}`; QRCode.toDataURL(sessionUrl, { width: 360, margin: 2, errorCorrectionLevel: "M" }).then(setQr); } catch (e) { setError(e instanceof Error ? e.message : "This payment session could not be safely decoded."); } }, [payload]);
  if (error) return <main className="shell compact"><section className="card error"><h1>Couldn&apos;t create this QR</h1><p>{error}</p><a className="button" href="/create">Start again</a></section></main>;
  if (!session) return <main className="shell compact">Creating your QR…</main>;
  const s = session; const shareUrl = `${typeof window === "undefined" ? "" : window.location.origin}/s/${payload}`;
  async function share() { if (navigator.share) await navigator.share({ title: `Pay ${s.merchant.pn}`, text: `Payment session for ${formatPaise(s.invoice.totalPaise)}`, url: shareUrl }); else { await navigator.clipboard.writeText(shareUrl); setCopied(true); } }
  return <main className="shell compact"><header><a className="brand" href="/">mdr-ama<span>™</span></a><p>master payment QR</p></header><SecurityBanner /><section className="card master"><p className="eyebrow">Ready to collect</p><h1>{formatPaise(s.invoice.totalPaise)} bill</h1><p>{s.chunksPaise.length} separate payment steps for <strong>{s.merchant.pn}</strong>.</p>{qr && <img className="master-qr" src={qr} alt={`Master QR for a ${formatPaise(s.invoice.totalPaise)} payment session`} />}<p className="muted center">Scan with the customer&apos;s phone. This opens a payment session; it is not itself a UPI payment QR.</p><div className="actions"><button className="button" onClick={share}>{copied ? "Link copied" : "Share link"} <span>↗</span></button><a className="secondary" href={`/s/${payload}`}>Start on this device</a></div><p className="fineprint">This session expires in 24 hours. MDR-ama does not verify settlement.</p></section><Footer /></main>;
}

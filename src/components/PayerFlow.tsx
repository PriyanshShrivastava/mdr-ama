"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Footer } from "@/components/Footer";
import { SecurityBanner } from "@/components/SecurityBanner";
import { formatPaise } from "@/lib/money";
import { decodeSession, PaymentSessionV1 } from "@/lib/session";
import { buildUpiUri, createAttemptReference } from "@/lib/upi";
import Link from "next/link";

type Progress = { index:number; completed:boolean[]; refs:string[] };

export function PayerFlow({ payload }:{ payload:string }) {
  const [session,setSession]=useState<PaymentSessionV1>(); const [error,setError]=useState(""); const [progress,setProgress]=useState<Progress>(); const [qr,setQr]=useState("");
  useEffect(()=>{try{const s=decodeSession(payload);setSession(s);const key=`mdr-ama:${s.sessionId}`;const old=localStorage.getItem(key);setProgress(old?JSON.parse(old):{index:0,completed:s.chunksPaise.map(()=>false),refs:s.chunksPaise.map(()=>"")});}catch(e){setError(e instanceof Error?e.message:"This payment session could not be safely decoded. Ask the merchant to create a new one.");}},[payload]);
  function save(next:Progress){if(session){localStorage.setItem(`mdr-ama:${session.sessionId}`,JSON.stringify(next));setProgress(next);}}
  const step=progress?.index??0; const done=progress?.completed.every(Boolean); const uri=session&&progress?buildUpiUri(session.merchant,session.chunksPaise[step],step,session.chunksPaise.length,progress.refs[step]||createAttemptReference()):"";
  useEffect(()=>{if(uri) QRCode.toDataURL(uri,{margin:1,width:240}).then(setQr);},[uri]);
  if(error)return <main className="shell compact"><section className="card error"><h1>Session unavailable</h1><p>{error}</p><Link className="button" href="/">Return home</Link></section><Footer/></main>;
  if(!session||!progress)return <main className="shell compact"><p className="page-loading">Loading your payment session…</p></main>;
  if(done)return <main className="shell compact"><section className="card"><p className="eyebrow">Session complete</p><h1>All payment steps marked completed</h1><p className="total">{formatPaise(session.invoice.totalPaise)} total</p><p>{session.chunksPaise.length} payment attempts marked completed by payer.</p><p className="warning"><strong>Important:</strong> MDR-ama has not independently verified settlement. The merchant must confirm the full amount in the bank, UPI app or soundbox.</p><Link className="button" href="/">Done</Link></section><Footer/></main>;
  const activeSession=session; const activeProgress=progress; const current=activeSession.chunksPaise[step]; function launch(){const refs=[...activeProgress.refs];if(!refs[step])refs[step]=createAttemptReference();save({...activeProgress,refs});window.location.href=buildUpiUri(activeSession.merchant,current,step,activeSession.chunksPaise.length,refs[step]);} function complete(){const completed=[...activeProgress.completed];completed[step]=true;save({...activeProgress,completed});} function retry(){const refs=[...activeProgress.refs];refs[step]=createAttemptReference();save({...activeProgress,refs});}
  return <main className="shell compact"><header><Link className="brand" href="/">mdr-ama™</Link><p>Payment {step+1} of {activeSession.chunksPaise.length}</p></header><SecurityBanner/><section className="card"><p className="eyebrow">Separate payment {step+1} of {activeSession.chunksPaise.length}</p><h1>{formatPaise(current)}</h1><p className="muted">Remaining after this: {formatPaise(activeSession.invoice.totalPaise-activeSession.chunksPaise.slice(0,step+1).reduce((a,b)=>a+b,0))}</p><hr/><h2>{activeSession.merchant.pn}</h2><p>{activeSession.merchant.pa}</p><button className="button" onClick={launch}>Pay {formatPaise(current)} with UPI <span>→</span></button><p className="warning">Verify the payee name inside your UPI app before entering your PIN.</p><details><summary>Did the UPI app not open?</summary><p>No compatible UPI app opened. Verify/copy the payee and amount or use another device to scan the current payment QR.</p><button className="secondary" onClick={()=>navigator.clipboard.writeText(activeSession.merchant.pa)}>Copy UPI ID</button>{qr&&<img className="qr" src={qr} alt={`UPI QR for ${formatPaise(current)}`}/>}</details><hr/><p>Welcome back. Did you complete the {formatPaise(current)} payment?</p><button className="button" onClick={complete}>Yes, I completed it</button><button className="secondary" onClick={retry}>Retry with a new reference</button><p className="fineprint">Selecting completion stores only a local, payer-reported state. It is not a settlement confirmation.</p></section><Footer/></main>;
}

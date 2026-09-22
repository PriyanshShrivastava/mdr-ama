import { Footer } from "@/components/Footer";
import { PayerFlow } from "@/components/PayerFlow";
import { SecurityBanner } from "@/components/SecurityBanner";
import { formatPaise } from "@/lib/money";
import { decodeSession } from "@/lib/session";
import Link from "next/link";

type Props = { params: Promise<{payload:string}>; searchParams: Promise<{ack?:string; "payment-ack"?:string}> };

export default async function SessionPage({params,searchParams}:Props) {
  const {payload}=await params; const {ack,"payment-ack":paymentAck}=await searchParams;
  if(ack==="1"&&paymentAck==="understood") return <PayerFlow payload={payload}/>;
  const acknowledgementError=ack==="1";
  try {
    const session=decodeSession(payload);
    return <main className="shell compact"><header><Link className="brand" href="/">mdr-ama™</Link><p>Payment session</p></header><SecurityBanner/><form className="card acknowledgement-card" action={`/s/${payload}`} method="get" noValidate><input type="hidden" name="ack" value="1"/><p className="eyebrow">Payment session</p><h1>Pay {session.merchant.pn}</h1><p className="total">{formatPaise(session.invoice.totalPaise)}</p><p>{session.chunksPaise.length} separate UPI payments to <strong>{session.merchant.pa}</strong>.</p><label className="acknowledgement" htmlFor="payment-ack"><input id="payment-ack" type="checkbox" name="payment-ack" value="understood" required aria-invalid={acknowledgementError||undefined} aria-describedby={acknowledgementError?"payment-ack-error":undefined}/><span><strong>I understand.</strong> Each payment is separate and requires separate authorisation.</span></label>{acknowledgementError&&<p id="payment-ack-error" className="field-error" role="alert">Acknowledge the separate payments before continuing.</p>}<button className="button" type="submit">Continue to payment <span>→</span></button><p className="fineprint">You will review each amount and approve it only in your UPI app.</p></form><Footer/></main>;
  } catch (error) {
    return <main className="shell compact"><section className="card error"><h1>Session unavailable</h1><p>{error instanceof Error?error.message:"This payment session could not be safely decoded."}</p><Link className="button" href="/">Return home</Link></section><Footer/></main>;
  }
}

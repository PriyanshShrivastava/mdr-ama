import Link from "next/link";
import { Footer } from "@/components/Footer";
import { SecurityBanner } from "@/components/SecurityBanner";

export default function Home() {
  return <main className="shell"><header><Link className="brand" href="/">mdr-ama<span>™</span></Link><p>one bill, several deliberate UPI payments</p></header><section className="hero"><p className="eyebrow">UPI, with a little more drama</p><h1>One QR. <em>Many</em> deliberate payments.</h1><p className="lead">Create a guided partial-payment session. Every payment is separately reviewed and authorised inside the payer&apos;s UPI app.</p><Link className="button" href="/create">Create a payment session <span>→</span></Link></section><SecurityBanner /><section className="grid"><article><b>01</b><h2>Set the bill</h2><p>Confirm the merchant and split a bill using exact paise arithmetic.</p></article><article><b>02</b><h2>Share one QR</h2><p>The master QR launches a secure, 24-hour payment session — not a debit.</p></article><article><b>03</b><h2>Pay one step at a time</h2><p>Each UPI payment requires a fresh, intentional tap and authorisation.</p></article></section><p className="fineprint">MDR-ama does not process payments or verify settlement. It creates payment instructions only.</p><Footer /></main>;
}

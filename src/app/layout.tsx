import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "MDR-ama — Partial UPI payment sessions", description: "A guided partial UPI payment session builder." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }

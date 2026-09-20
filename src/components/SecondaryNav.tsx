"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Plus } from "lucide-react";
export function SecondaryNav({label="Back to home"}:{label?:string}){return <motion.header className="secondary-nav" initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} transition={{duration:.32}}><Link className="brand" href="/">mdr-ama<span>™</span></Link><nav><Link className="back-link" href="/"><ArrowLeft size={16}/>{label}</Link><Link className="nav-cta" href="/create"><Plus size={15}/>Create QR</Link></nav></motion.header>}

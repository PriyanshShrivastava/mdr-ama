"use client";
import { motion, useReducedMotion } from "framer-motion";
export function AnimatedPanel({children}:{children:React.ReactNode}){const reduce=useReducedMotion();return <motion.div initial={{opacity:0,y:reduce?0:18}} animate={{opacity:1,y:0}} transition={{duration:.42,ease:"easeOut"}}>{children}</motion.div>}

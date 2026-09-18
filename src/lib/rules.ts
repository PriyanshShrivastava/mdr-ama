import { Paise, formatPaise } from "./money";
export const RULESET_VERSION = "2026-09-15";
export const RULES_LAST_REVIEWED = "18 September 2026";
export const REVIEW_AFTER = "2026-11-15";
export function estimateStandardMdr(total: Paise) { if (new Date() > new Date(REVIEW_AFTER)) return "Needs revalidation before showing an estimate."; if (total <= 200000) return "Estimated MDR on a single applicable P2M payment: ₹0.00"; return `Estimated MDR on a single applicable P2M payment: ${formatPaise(Math.min(Math.round(total * 0.004), 30000))}`; }

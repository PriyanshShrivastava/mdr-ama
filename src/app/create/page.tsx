import { CreateSessionForm } from "@/components/CreateSessionForm";
import { Footer } from "@/components/Footer";
import { SecurityBanner } from "@/components/SecurityBanner";
import { SecondaryNav } from "@/components/SecondaryNav";
export default function CreatePage(){return <main className="shell compact"><SecondaryNav label="Home"/><SecurityBanner/><CreateSessionForm/><Footer/></main>}

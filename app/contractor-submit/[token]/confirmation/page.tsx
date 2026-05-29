import Link from "next/link";
import { ActionButton, PanelCard, StatusBadge } from "@/components/ui";
export default function ConfirmationPage() {
  return <main className="min-h-screen bg-gray-bg p-8"><div className="mx-auto max-w-3xl"><PanelCard title="Submission received" eyebrow="ContractorHub"><p className="text-text-muted">The token is now marked used, the Work Request status is updated to Under Review, and Property Management / Operations notifications are queued.</p><p className="mt-4"><StatusBadge tone="green">Under Review</StatusBadge></p><div className="mt-6"><Link href="/"><ActionButton>Return Home</ActionButton></Link></div></PanelCard></div></main>;
}

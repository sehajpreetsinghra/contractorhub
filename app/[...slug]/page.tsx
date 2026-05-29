import { ActionButton, PanelCard, StatusBadge } from "@/components/ui";

export default function PlaceholderPage({ params }: { params: { slug: string[] } }) {
  const route = `/${params.slug.join("/")}`;

  return (
    <main className="min-h-screen bg-gray-bg p-8">
      <div className="mx-auto max-w-4xl">
        <PanelCard title="Module placeholder" eyebrow="ContractorHub route">
          <p className="text-text-muted">
            The <span className="font-semibold text-navy">{route}</span> route is wired so dashboard navigation does not dead-end. This module can now be expanded into its production workflow.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <StatusBadge tone="gold">Route wired</StatusBadge>
            <ActionButton href="/dashboard">Back to dashboard</ActionButton>
            <ActionButton href="/" variant="secondary">Home</ActionButton>
          </div>
        </PanelCard>
      </div>
    </main>
  );
}

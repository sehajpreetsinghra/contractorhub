import { DataTable, PanelCard, StatusBadge } from "@/components/ui";

export default function AuditLogsPage() {
  return (
    <main className="min-h-screen bg-gray-bg p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <PanelCard title="Audit Logs" eyebrow="System Admin">
          <p className="mb-4 text-sm text-text-muted">Demo audit register for major ContractorHub actions. Production data should come from the Supabase `audit_logs` table.</p>
          <DataTable rows={[
            { action_datetime: "2026-05-29 08:01", action_type: "work_request.created", table_name: "work_requests", record_id: "SRIC-WR-2026-0004", status: "recorded" },
            { action_datetime: "2026-05-29 08:05", action_type: "contractor_token.generated", table_name: "contractor_submission_tokens", record_id: "demo-token", status: "recorded" },
            { action_datetime: "2026-05-29 09:12", action_type: "site_access.checked_in", table_name: "site_access_logs", record_id: "SAL-0007", status: "recorded" }
          ]} />
          <div className="mt-4"><StatusBadge tone="green">Audit trail active</StatusBadge></div>
        </PanelCard>
      </div>
    </main>
  );
}

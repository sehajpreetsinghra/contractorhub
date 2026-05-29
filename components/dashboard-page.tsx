import { AppShell, DataTable, KPICard, PanelCard, StatusBadge } from "@/components/ui";
import { dashboardConfigs, RoleKey, sampleRequests } from "@/lib/contractorhub-data";

export function RoleDashboardPage({ role }: { role: RoleKey }) {
  const config = dashboardConfigs.find((item) => item.role === role)!;
  return (
    <AppShell config={config}>
      <div className="space-y-8">
        <section className="rounded-3xl bg-gradient-to-br from-navy to-navy-dark p-8 text-white shadow-card">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">{config.label}</p>
          <h1 className="mt-3 text-3xl font-black">Operational dashboard</h1>
          <p className="mt-3 max-w-3xl text-slate-300">{config.mission}</p>
        </section>
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {config.kpis.map((kpi) => <KPICard key={kpi.label} {...kpi} />)}
        </section>
        <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
          <PanelCard title="Dashboard sections" eyebrow="Queue visibility">
            <div className="grid gap-3 sm:grid-cols-2">
              {config.sections.map((section) => (
                <div key={section} className="rounded-xl border border-border bg-slate-50 p-4">
                  <p className="font-semibold text-navy">{section}</p>
                  <p className="mt-1 text-sm text-text-muted">Role-scoped queue with audit-safe actions.</p>
                </div>
              ))}
            </div>
          </PanelCard>
          <PanelCard title="Permitted actions" eyebrow="RBAC">
            <div className="flex flex-wrap gap-2">
              {config.actions.map((action) => <StatusBadge key={action} tone="navy">{action}</StatusBadge>)}
            </div>
          </PanelCard>
        </div>
        <PanelCard title={role.includes("security") ? "Security expected today" : "Active work request register"} eyebrow="Audit table">
          <DataTable rows={sampleRequests.map((row) => ({
            request_number: row.request,
            authorization_number: row.authorization,
            work_title: row.title,
            location: row.location,
            contractor: row.contractor,
            status: row.status,
            authorized_time: row.window
          }))} />
        </PanelCard>
      </div>
    </AppShell>
  );
}

import Link from "next/link";
import { ActionButton, KPICard, PanelCard, RiskBadge, StatusBadge } from "@/components/ui";
import { approvalRules, dashboardConfigs, mvpTables, sampleRequests, universalKpis } from "@/lib/contractorhub-data";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-bg command-grid">
      <section className="bg-navy-dark text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-gold">SRIC Contractor Management Portal</p>
            <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">ContractorHub command centre</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              A secure, audit-focused portal for sponsored contractor work requests, tokenized contractor submissions, document compliance, approvals, work authorizations, and security desk check-in/check-out.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/dashboard"><ActionButton>Open Role Router</ActionButton></Link>
              <Link href="/contractor-submit/demo-token"><ActionButton variant="secondary">Preview Contractor Link</ActionButton></Link>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Audit rule</p>
            <p className="mt-3 text-2xl font-bold">Every contractor on-site must have an approved reason, sponsor, location, time window, accountable contact, and security check-in/check-out record.</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {universalKpis.slice(0, 4).map((kpi) => <div key={kpi} className="rounded-2xl bg-white/10 p-4 text-sm font-semibold text-slate-200">{kpi}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-6 py-10 lg:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          <KPICard label="Pending Review" value="20" tone="gold" />
          <KPICard label="Approved Today" value="11" tone="green" />
          <KPICard label="Currently On Site" value="9" tone="blue" />
          <KPICard label="Overdue Check-Outs" value="2" tone="red" />
        </div>

        <PanelCard title="Role-based dashboards" eyebrow="Access model">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {dashboardConfigs.map((config) => (
              <Link key={config.role} href={config.route} className="rounded-2xl border border-border p-5 transition hover:-translate-y-1 hover:border-gold hover:shadow-card">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-bold text-navy">{config.label}</h3>
                  <StatusBadge tone="navy">{config.route}</StatusBadge>
                </div>
                <p className="mt-3 text-sm leading-6 text-text-muted">{config.mission}</p>
              </Link>
            ))}
          </div>
        </PanelCard>

        <PanelCard title="Expected today: approved contractors only" eyebrow="Security desk">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-text-muted">
                <tr>{["Authorization", "Company", "Worker", "Location", "Authorized Time", "Escort", "Permit", "Key/Fob", "Risk", "Status"].map((h) => <th className="border-b border-border px-3 py-3" key={h}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {sampleRequests.map((row) => (
                  <tr key={row.authorization} className="border-b border-border last:border-0">
                    <td className="px-3 py-3 font-semibold text-navy">{row.authorization}</td>
                    <td className="px-3 py-3">{row.contractor}</td>
                    <td className="px-3 py-3">{row.worker}</td>
                    <td className="px-3 py-3">{row.location}</td>
                    <td className="px-3 py-3">{row.window}</td>
                    <td className="px-3 py-3">{row.escort}</td>
                    <td className="px-3 py-3">{row.permit}</td>
                    <td className="px-3 py-3">{row.keyFob}</td>
                    <td className="px-3 py-3"><RiskBadge risk={row.risk} /></td>
                    <td className="px-3 py-3"><StatusBadge tone={row.status === "on_site" ? "green" : "blue"}>{row.status}</StatusBadge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PanelCard>

        <div className="grid gap-6 lg:grid-cols-2">
          <PanelCard title="Automatic approval rules" eyebrow="Workflow controls">
            <ul className="space-y-3 text-sm text-text-muted">
              {approvalRules.map((rule) => <li key={rule} className="rounded-xl bg-slate-50 p-3">{rule}</li>)}
            </ul>
          </PanelCard>
          <PanelCard title="MVP database tables" eyebrow="Supabase / PostgreSQL">
            <div className="flex flex-wrap gap-2">
              {mvpTables.map((table) => <StatusBadge key={table} tone="navy">{table}</StatusBadge>)}
            </div>
          </PanelCard>
        </div>
      </section>
    </main>
  );
}

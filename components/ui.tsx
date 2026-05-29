import Link from "next/link";
import { DashboardConfig } from "@/lib/contractorhub-data";

const toneClasses = {
  blue: "bg-blue-50 text-blue-700 ring-blue-200",
  green: "bg-green-50 text-green-700 ring-green-200",
  gold: "bg-amber-50 text-amber-700 ring-amber-200",
  red: "bg-red-50 text-red-700 ring-red-200",
  orange: "bg-orange-50 text-orange-700 ring-orange-200",
  navy: "bg-slate-100 text-navy ring-slate-200"
};

export function StatusBadge({ children, tone = "navy" }: { children?: React.ReactNode; tone?: keyof typeof toneClasses }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${toneClasses[tone]}`}>{children}</span>;
}

export function RiskBadge({ risk }: { risk: string }) {
  const tone = risk === "high" ? "red" : risk === "medium" ? "gold" : "green";
  return <StatusBadge tone={tone}>{risk.toUpperCase()}</StatusBadge>;
}

export function KPICard({ label, value, tone }: { label: string; value: string; tone: keyof typeof toneClasses }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-text-muted">{label}</p>
        <span className={`h-2.5 w-2.5 rounded-full ${tone === "red" ? "bg-red-600" : tone === "green" ? "bg-green-600" : tone === "gold" ? "bg-gold" : tone === "orange" ? "bg-orange-600" : tone === "blue" ? "bg-blue-600" : "bg-navy"}`} />
      </div>
      <p className="mt-3 text-3xl font-bold text-text-main">{value}</p>
    </div>
  );
}

export function PanelCard({ title, children, eyebrow }: { title: string; children?: React.ReactNode; eyebrow?: string }) {
  return (
    <section className="rounded-2xl border border-border bg-white p-6 shadow-card">
      {eyebrow ? <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-gold">{eyebrow}</p> : null}
      <h2 className="text-lg font-bold text-navy">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

type ActionButtonProps = {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  href?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
};

export function ActionButton({ children, variant = "primary", href, type = "button", className = "" }: ActionButtonProps) {
  const klass = variant === "primary" ? "bg-navy text-white hover:bg-navy-dark" : variant === "danger" ? "bg-red-700 text-white hover:bg-red-800" : "border border-border bg-white text-navy hover:bg-slate-50";
  const classes = `inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition ${klass} ${className}`;

  if (href) {
    return <Link href={href} className={classes}>{children}</Link>;
  }

  return <button className={classes} type={type}>{children}</button>;
}

export function AppShell({ config, children }: { config: DashboardConfig; children?: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-bg command-grid">
      <aside className="fixed inset-y-0 left-0 hidden w-72 bg-navy-dark text-white lg:block">
        <div className="border-b border-white/10 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">SRIC</p>
          <h1 className="mt-2 text-xl font-bold">ContractorHub</h1>
          <p className="mt-1 text-sm text-slate-300">Contractor Management Portal</p>
        </div>
        <nav className="space-y-1 p-4">
          {config.nav.map((item) => (
            <Link key={item} className={`block rounded-xl px-4 py-3 text-sm font-medium ${item === "Dashboard" ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"}`} href={item === "Dashboard" ? config.route : `/${item.toLowerCase().replaceAll(" / ", "-").replaceAll(" ", "-")}`}>
              {item}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 m-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
          <p className="font-semibold text-white">Core rule</p>
          <p className="mt-2">Contractors cannot self-initiate access. Every visit needs a sponsor and authorization.</p>
        </div>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-border bg-white/90 px-6 py-4 backdrop-blur">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-text-muted">{config.route}</p>
              <h2 className="text-2xl font-bold text-navy">{config.label} Dashboard</h2>
            </div>
            <div className="flex gap-2">
              <ActionButton variant="secondary" href="/admin/audit-logs">Audit Log</ActionButton>
              <ActionButton href="/work-requests/new">New Work Request</ActionButton>
            </div>
          </div>
        </header>
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export function DataTable({ rows }: { rows: Array<Record<string, string>> }) {
  const headers = Object.keys(rows[0] ?? {});
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <table className="w-full min-w-[760px] border-collapse bg-white text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-text-muted">
          <tr>{headers.map((header) => <th key={header} className="px-4 py-3 font-bold">{header.replace(/_/g, " ")}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row, index) => (
            <tr key={index} className="hover:bg-slate-50/70">
              {headers.map((header) => <td key={header} className="px-4 py-3 text-text-main">{row[header]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

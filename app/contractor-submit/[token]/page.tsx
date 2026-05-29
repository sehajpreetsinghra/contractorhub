import Link from "next/link";
import { ActionButton, PanelCard, StatusBadge } from "@/components/ui";

export default function ContractorSubmitPage({ params }: { params: { token: string } }) {
  const documents = ["Certificate of Insurance", "WSIB Clearance Certificate", "Worker Certifications", "MOP / JHA if required", "SDS if hazardous materials are used", "Hot Work or Fire Bypass supporting documents"];
  const acknowledgements = [
    "I confirm the information provided is accurate.",
    "I understand SRIC Security may deny access if approval is incomplete.",
    "I understand all workers must check in and check out with Security.",
    "I understand badges, keys, and fobs must be returned before leaving site.",
    "I understand work is limited to the approved location, date, time, and scope."
  ];
  return (
    <main className="min-h-screen bg-gray-bg command-grid p-6 lg:p-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-3xl bg-navy-dark p-8 text-white shadow-card">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">Secure contractor direct link</p>
          <h1 className="mt-3 text-3xl font-black">SRIC Contractor Submission</h1>
          <div className="mt-5 grid gap-3 text-sm md:grid-cols-3">
            <div><span className="text-slate-400">Token</span><p className="font-semibold">{params.token}</p></div>
            <div><span className="text-slate-400">Work Request</span><p className="font-semibold">SRIC-WR-2026-0001</p></div>
            <div><span className="text-slate-400">Submission Status</span><p><StatusBadge tone="gold">Not submitted</StatusBadge></p></div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <PanelCard title="Contractor submission form" eyebrow="No login required">
            <form className="space-y-5">
              {[
                ["Legal Company Name", "Operating Name"],
                ["Main Contact Name", "Main Contact Email"],
                ["Main Contact Phone", "Trade Type"],
                ["On-Site Supervisor", "Supervisor Phone"]
              ].map((row) => <div className="grid gap-4 md:grid-cols-2" key={row.join(":")}>{row.map((label) => <label key={label} className="text-sm font-semibold text-text-main">{label}<input className="mt-2 w-full rounded-xl border border-border bg-white px-3 py-2 outline-none focus:border-gold" placeholder={label} /></label>)}</div>)}
              <label className="block text-sm font-semibold text-text-main">Detailed Scope of Work<textarea className="mt-2 min-h-28 w-full rounded-xl border border-border px-3 py-2 outline-none focus:border-gold" placeholder="Describe approved location, tasks, tools, hazards, and duration." /></label>
              <div className="grid gap-3 md:grid-cols-2">
                {["Hazardous Materials Used", "SDS Uploaded", "Hot Work Required", "Fire Bypass Required", "Shutdown Required", "Roof Access Required", "Ceiling Access Required", "MOP Uploaded", "JHA Uploaded"].map((label) => <label key={label} className="flex items-center gap-3 rounded-xl border border-border bg-slate-50 p-3 text-sm"><input type="checkbox" />{label}</label>)}
              </div>
              <PanelCard title="Worker list" eyebrow="Repeatable">
                <div className="grid gap-4 md:grid-cols-2">
                  {["Full Name", "Phone", "Email (optional)", "Role / Trade"].map((label) => <input key={label} className="rounded-xl border border-border px-3 py-2" placeholder={label} />)}
                </div>
                <div className="mt-3 grid gap-3 md:grid-cols-3">
                  {["Supervisor", "Orientation Completed", "Government ID Available"].map((label) => <label key={label} className="flex items-center gap-2 text-sm"><input type="checkbox" />{label}</label>)}
                </div>
              </PanelCard>
              <div className="flex flex-wrap gap-3"><Link href={`/contractor-submit/${params.token}/confirmation`}><ActionButton>Submit Contractor Package</ActionButton></Link><ActionButton variant="secondary">Save Draft</ActionButton></div>
            </form>
          </PanelCard>
          <div className="space-y-6">
            <PanelCard title="Required documents" eyebrow="Dynamic by work type"><ul className="space-y-2 text-sm text-text-muted">{documents.map((doc) => <li className="rounded-xl bg-slate-50 p-3" key={doc}>{doc}</li>)}</ul></PanelCard>
            <PanelCard title="Acknowledgement" eyebrow="Mandatory"><ul className="space-y-3 text-sm text-text-muted">{acknowledgements.map((item) => <li key={item} className="flex gap-3"><input type="checkbox" className="mt-1" /><span>{item}</span></li>)}</ul></PanelCard>
          </div>
        </div>
      </div>
    </main>
  );
}

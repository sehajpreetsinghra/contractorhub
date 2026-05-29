import { redirect } from "next/navigation";
import { dashboardConfigs } from "@/lib/contractorhub-data";

const demoRole = process.env.NEXT_PUBLIC_DEMO_ROLE ?? "property_management";

export default function DashboardRouter() {
  const dashboard = dashboardConfigs.find((config) => config.role === demoRole) ?? dashboardConfigs[1];
  redirect(dashboard.route);
}

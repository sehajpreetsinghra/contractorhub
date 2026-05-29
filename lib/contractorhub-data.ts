export type RoleKey =
  | "tenant"
  | "property_management"
  | "operations"
  | "security_officer"
  | "security_supervisor"
  | "fire_safety"
  | "admin";

export type DashboardConfig = {
  role: RoleKey;
  label: string;
  route: string;
  mission: string;
  kpis: Array<{ label: string; value: string; tone: "blue" | "green" | "gold" | "red" | "orange" | "navy" }>;
  sections: string[];
  actions: string[];
  nav: string[];
};

export const dashboardConfigs: DashboardConfig[] = [
  {
    role: "tenant",
    label: "Tenant Requestor",
    route: "/tenant/dashboard",
    mission: "Submit sponsored work requests, track status, and respond to information requests for your suite or floor.",
    kpis: [
      { label: "My Open Requests", value: "6", tone: "blue" },
      { label: "Pending Contractor Info", value: "2", tone: "gold" },
      { label: "Approved Work", value: "4", tone: "green" },
      { label: "More Info Required", value: "1", tone: "orange" }
    ],
    sections: ["Submit New Work Request", "My Active Requests", "Contractor Info Pending", "Approved / Scheduled Work", "More Info Required", "Completed Requests"],
    actions: ["View Request", "Edit Draft", "Respond to More Info Required", "Cancel Request", "Download Authorization PDF"],
    nav: ["Dashboard", "New Work Request", "My Requests", "Approved Work", "Help / Contact Security"]
  },
  {
    role: "property_management",
    label: "Property Management",
    route: "/pm/dashboard",
    mission: "Review all requests, assign risk, require approvals, issue final authorization, and close work with audit evidence.",
    kpis: [
      { label: "Pending PM Review", value: "12", tone: "gold" },
      { label: "High-Risk Work", value: "3", tone: "red" },
      { label: "Emergency Requests", value: "1", tone: "orange" },
      { label: "Open Issues", value: "5", tone: "navy" }
    ],
    sections: ["Pending PM Review", "Work Scheduled This Week", "High-Risk / Critical Work", "Contractor Info Pending", "Active Permits", "Expired / Missing Documents", "Contractor Issues", "Emergency Work"],
    actions: ["Review Request", "Approve", "Reject", "Request More Info", "Assign Operations Review", "Assign Security Review", "Require Permit", "Generate Authorization", "Close Request"],
    nav: ["Dashboard", "All Work Requests", "Pending Approvals", "Contractor Compliance", "Permits", "Issues", "Reports"]
  },
  {
    role: "operations",
    label: "Operations Team",
    route: "/operations/dashboard",
    mission: "Validate technical scope, shutdowns, fire bypasses, roof/mechanical/electrical access, MOPs, JHAs, and restoration.",
    kpis: [
      { label: "Technical Reviews", value: "8", tone: "blue" },
      { label: "Shutdowns Pending", value: "2", tone: "orange" },
      { label: "Active Fire Bypasses", value: "1", tone: "red" },
      { label: "MOP/JHA Pending", value: "4", tone: "gold" }
    ],
    sections: ["Technical Review Required", "Base Building Impact", "Shutdown Requests", "Fire Bypass Requests", "Hot Work Requests", "MOP/JHA Pending Review", "Roof / Mechanical / Electrical Access", "Restorations Pending"],
    actions: ["Approve Technical Scope", "Reject Technical Scope", "Request MOP", "Request JHA", "Approve Shutdown", "Approve Fire Bypass", "Add Technical Conditions", "Confirm Restoration"],
    nav: ["Dashboard", "Technical Reviews", "Shutdowns", "Fire Bypasses", "Hot Work", "MOP / JHA Review", "Restorations"]
  },
  {
    role: "security_officer",
    label: "Security Officer",
    route: "/security/dashboard",
    mission: "Operate the security desk, confirm approved contractors, verify ID, manage check-in/check-out, and log exceptions.",
    kpis: [
      { label: "Expected Today", value: "21", tone: "blue" },
      { label: "Currently On Site", value: "9", tone: "green" },
      { label: "Overdue Check-Outs", value: "2", tone: "red" },
      { label: "Keys/Fobs Outstanding", value: "5", tone: "orange" }
    ],
    sections: ["Expected Today", "Currently On Site", "Overdue Check-Outs", "Active Permits", "Keys/Fobs Outstanding", "Badges Outstanding", "Denied / Issue Logs", "After-Hours Work"],
    actions: ["Check In", "Check Out", "Verify ID", "Issue Badge", "Return Badge", "Issue Key/Fob", "Return Key/Fob", "Deny Entry", "Log Issue", "View Authorization"],
    nav: ["Dashboard", "Expected Today", "Currently On Site", "Check-In", "Check-Out", "Keys / Fobs", "Badges", "Active Permits", "Issues"]
  },
  {
    role: "security_supervisor",
    label: "Security Supervisor",
    route: "/security-supervisor/dashboard",
    mission: "Audit contractor access, manage security instructions, supervise access devices, and export daily security reports.",
    kpis: [
      { label: "All On Site", value: "9", tone: "green" },
      { label: "Denied Entries", value: "2", tone: "red" },
      { label: "No Shows", value: "4", tone: "orange" },
      { label: "Device Exceptions", value: "3", tone: "gold" }
    ],
    sections: ["Security Overview", "All Contractors On Site", "Access Device Audit", "Badge Audit", "No Shows", "Denied Entries", "Overdue Access Records", "Daily Security Summary"],
    actions: ["Edit Security Notes", "Export Daily Access Report", "Review Issue Logs", "Escalate to PM", "Mark Access Device Lost", "Deactivate Access Device", "View Audit History"],
    nav: ["Dashboard", "Security Desk", "Access Logs", "Key/Fob Audit", "Badge Audit", "Contractor Issues", "Daily Reports"]
  },
  {
    role: "fire_safety",
    label: "Fire Safety Vendor",
    route: "/fire-safety/dashboard",
    mission: "Update assigned fire bypass records, monitoring station OP IDs, Toronto Fire Service OP IDs, and restoration notes.",
    kpis: [
      { label: "Assigned Bypasses", value: "5", tone: "blue" },
      { label: "Active Bypasses", value: "1", tone: "red" },
      { label: "Pending Restorations", value: "2", tone: "orange" },
      { label: "Completed", value: "14", tone: "green" }
    ],
    sections: ["Assigned Fire Bypasses", "Active Bypasses", "Pending Restorations", "Completed Bypasses"],
    actions: ["Start Bypass", "Enter Monitoring Station OP ID", "Enter Toronto Fire Service OP ID", "Mark Restored", "Add Notes", "Upload Fire Service Documentation"],
    nav: ["Dashboard", "Assigned Bypasses", "Active Bypasses", "Restorations", "Completed"]
  },
  {
    role: "admin",
    label: "System Admin",
    route: "/admin/dashboard",
    mission: "Manage users, organizations, document types, statuses, audit logs, settings, and notification templates.",
    kpis: [
      { label: "Users", value: "84", tone: "navy" },
      { label: "Organizations", value: "37", tone: "blue" },
      { label: "Document Types", value: "18", tone: "gold" },
      { label: "Audit Events Today", value: "143", tone: "green" }
    ],
    sections: ["Users", "Organizations", "Contractor Companies", "Document Types", "Status Configuration", "Notification Templates", "Audit Logs", "System Settings"],
    actions: ["Create User", "Deactivate User", "Assign Role", "Create Organization", "Edit Document Type", "View Audit Logs", "Configure Number Formats"],
    nav: ["Dashboard", "Users", "Organizations", "Contractors", "Document Types", "System Settings", "Audit Logs", "Notifications"]
  }
];

export const universalKpis = ["Pending Review", "Approved Today", "Currently On Site", "Active Permits", "Overdue Check-Outs", "Outstanding Keys/Fobs", "Expired Documents", "Open Issues"];

export const sampleRequests = [
  {
    request: "SRIC-WR-2026-0001",
    authorization: "SRIC-WA-2026-0001",
    title: "Suite 2100 network cabling",
    location: "21F / Telecom Closet B",
    contractor: "Northline Electrical Ltd.",
    worker: "Avery Chen",
    window: "May 29, 2026 · 08:00–16:00",
    status: "scheduled",
    risk: "medium",
    escort: "No",
    permit: "N/A",
    keyFob: "Yes"
  },
  {
    request: "SRIC-WR-2026-0002",
    authorization: "SRIC-WA-2026-0002",
    title: "Fire panel device replacement",
    location: "B1 Fire Command Centre",
    contractor: "Sentinel Fire Protection",
    worker: "Morgan Patel",
    window: "May 29, 2026 · 18:00–22:00",
    status: "approved",
    risk: "high",
    escort: "Yes",
    permit: "Fire bypass",
    keyFob: "No"
  },
  {
    request: "SRIC-WR-2026-0003",
    authorization: "SRIC-WA-2026-0003",
    title: "AHU vibration inspection",
    location: "Mechanical Penthouse",
    contractor: "Cobalt Mechanical Services",
    worker: "Jordan Williams",
    window: "May 29, 2026 · 09:30–12:30",
    status: "on_site",
    risk: "high",
    escort: "Yes",
    permit: "Roof access",
    keyFob: "Yes"
  }
];

export const approvalRules = [
  "Tenant-contracted work requires Tenant + Property Management approval.",
  "Base building impact requires Property Management + Operations approval.",
  "Fire alarm / fire protection work requires Property Management + Operations + Fire Safety review.",
  "Hot work requires Property Management + Operations/Security review.",
  "Fire bypass requires Property Management + Operations + Fire Safety Vendor review.",
  "After-hours access requires Property Management + Security review.",
  "Emergency work can be overridden by PM or Operations only with a mandatory audit reason."
];

export const mvpTables = [
  "users", "organizations", "contractor_companies", "contractor_workers", "contractor_submission_tokens", "work_requests", "contractor_work_details", "work_request_workers", "uploaded_documents", "document_types", "approvals", "work_authorizations", "site_access_logs", "audit_logs", "notifications"
];

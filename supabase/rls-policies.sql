-- Baseline row-level-security policy scaffold for ContractorHub MVP.
alter table organizations enable row level security;
alter table users enable row level security;
alter table work_requests enable row level security;
alter table contractor_submission_tokens enable row level security;
alter table work_authorizations enable row level security;
alter table site_access_logs enable row level security;
alter table audit_logs enable row level security;

-- Policies should be connected to Supabase Auth claims in deployment.
-- Tenants: own organization and own submitted requests only.
-- PM/Admin: all work requests and compliance records.
-- Operations: technical/building-impact work queues.
-- Security: approved/scheduled work authorizations and access logs only.
-- Contractors: no authenticated access; token route performs scoped server-side lookup.

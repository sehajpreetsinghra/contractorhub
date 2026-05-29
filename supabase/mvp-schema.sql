-- SRIC Contractor Management Portal (ContractorHub) MVP schema
create extension if not exists "pgcrypto";

create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  organization_name text not null,
  organization_type text not null check (organization_type in ('tenant','contractor','vendor','property_management','operations','security')),
  primary_contact_name text,
  primary_contact_email text,
  primary_contact_phone text,
  suite_or_floor text,
  address text,
  status text default 'active',
  notes text,
  created_at timestamptz default now()
);

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text unique not null,
  phone text,
  role text not null check (role in ('tenant','security_officer','security_supervisor','property_management','operations','fire_safety','admin')),
  organization_id uuid references organizations(id),
  job_title text,
  department text,
  is_active boolean default true,
  created_at timestamptz default now(),
  last_login timestamptz
);

create table if not exists contractor_companies (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id),
  legal_company_name text not null,
  operating_name text,
  main_contact_name text,
  main_contact_email text,
  main_contact_phone text,
  business_address text,
  trade_type text,
  insurance_status text default 'pending_review',
  wsib_status text default 'pending_review',
  compliance_status text default 'pending_review',
  notes text,
  created_at timestamptz default now()
);

create table if not exists contractor_workers (
  id uuid primary key default gen_random_uuid(),
  contractor_company_id uuid references contractor_companies(id),
  full_name text not null,
  email text,
  phone text,
  role_trade text,
  id_verified boolean default false,
  orientation_completed boolean default false,
  orientation_expiry_date date,
  status text default 'active',
  notes text,
  created_at timestamptz default now()
);

create table if not exists work_requests (
  id uuid primary key default gen_random_uuid(),
  request_number text unique not null,
  request_type text check (request_type in ('tenant_work','building_work','emergency_work')),
  initiated_by_type text not null,
  initiated_by_user_id uuid references users(id),
  tenant_organization_id uuid references organizations(id),
  contractor_company_id uuid references contractor_companies(id),
  work_title text not null,
  work_description text,
  work_location text not null,
  requested_start_datetime timestamptz,
  requested_end_datetime timestamptz,
  after_hours_required boolean default false,
  weekend_work_required boolean default false,
  access_required boolean default true,
  escort_required boolean default false,
  loading_dock_required boolean default false,
  service_elevator_required boolean default false,
  key_fob_required boolean default false,
  permit_required boolean default false,
  risk_level text default 'low',
  current_status text not null default 'draft' check (current_status in ('draft','submitted','contractor_info_pending','under_review','more_info_required','approved','rejected','scheduled','in_progress','completed','closed','cancelled')),
  priority text default 'normal',
  submitted_at timestamptz,
  approved_at timestamptz,
  closed_at timestamptz,
  internal_notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists contractor_submission_tokens (
  id uuid primary key default gen_random_uuid(),
  token text unique not null,
  work_request_id uuid not null references work_requests(id) on delete cascade,
  contractor_company_id uuid references contractor_companies(id),
  expires_at timestamptz not null,
  used_at timestamptz,
  is_used boolean default false,
  created_by_user_id uuid references users(id),
  created_at timestamptz default now(),
  constraint token_expiry_future check (expires_at > created_at)
);

create table if not exists contractor_work_details (
  id uuid primary key default gen_random_uuid(),
  work_request_id uuid references work_requests(id) on delete cascade,
  contractor_company_id uuid references contractor_companies(id),
  contractor_supervisor_name text,
  contractor_supervisor_phone text,
  detailed_scope_of_work text,
  tools_equipment_used text,
  hazardous_materials_used boolean default false,
  sds_uploaded boolean default false,
  noise_dust_odour_impact text,
  hot_work_required boolean default false,
  fire_bypass_required boolean default false,
  shutdown_required boolean default false,
  roof_access_required boolean default false,
  ceiling_access_required boolean default false,
  mop_required boolean default false,
  mop_uploaded boolean default false,
  jha_required boolean default false,
  jha_uploaded boolean default false,
  number_of_workers int default 0,
  estimated_duration text,
  submitted_at timestamptz,
  contractor_acknowledgement boolean default false
);

create table if not exists work_request_workers (
  id uuid primary key default gen_random_uuid(),
  work_request_id uuid references work_requests(id) on delete cascade,
  worker_id uuid references contractor_workers(id),
  worker_name_snapshot text not null,
  worker_role text,
  approved_for_access boolean default false,
  orientation_verified boolean default false,
  id_check_required boolean default true,
  notes text
);

create table if not exists document_types (
  id uuid primary key default gen_random_uuid(),
  document_name text not null,
  applies_to text,
  required_for_trade_type text,
  required_for_risk_level text,
  expiry_required boolean default false,
  is_mandatory boolean default false,
  notes text
);

create table if not exists uploaded_documents (
  id uuid primary key default gen_random_uuid(),
  document_type_id uuid references document_types(id),
  contractor_company_id uuid references contractor_companies(id),
  worker_id uuid references contractor_workers(id),
  work_request_id uuid references work_requests(id),
  file_name text not null,
  file_url text not null,
  uploaded_by_user_id uuid references users(id),
  uploaded_at timestamptz default now(),
  issue_date date,
  expiry_date date,
  verification_status text default 'pending_review' check (verification_status in ('pending_review','approved','rejected','expired','missing')),
  verified_by_user_id uuid references users(id),
  verified_at timestamptz,
  rejection_reason text,
  notes text
);

create table if not exists approvals (
  id uuid primary key default gen_random_uuid(),
  work_request_id uuid references work_requests(id) on delete cascade,
  approval_stage text not null check (approval_stage in ('tenant_confirmation','pm_review','operations_review','security_review','fire_safety_review','final_approval')),
  approver_user_id uuid references users(id),
  approval_status text not null default 'pending' check (approval_status in ('pending','approved','rejected','more_info_required','skipped')),
  approval_decision_at timestamptz,
  comments text,
  conditions_of_approval text,
  created_at timestamptz default now()
);

create table if not exists work_authorizations (
  id uuid primary key default gen_random_uuid(),
  authorization_number text unique not null,
  work_request_id uuid references work_requests(id) on delete cascade,
  authorization_status text default 'active' check (authorization_status in ('active','expired','cancelled','completed')),
  authorized_start_datetime timestamptz,
  authorized_end_datetime timestamptz,
  authorized_work_location text,
  authorized_worker_list text,
  access_instructions text,
  escort_required boolean default false,
  ppe_required text,
  special_conditions text,
  security_notes text,
  qr_code_url text,
  pdf_permit_url text,
  created_at timestamptz default now(),
  created_by_user_id uuid references users(id)
);

create table if not exists site_access_logs (
  id uuid primary key default gen_random_uuid(),
  work_authorization_id uuid references work_authorizations(id),
  work_request_id uuid references work_requests(id),
  worker_id uuid references contractor_workers(id),
  contractor_company_id uuid references contractor_companies(id),
  check_in_datetime timestamptz,
  check_out_datetime timestamptz,
  checked_in_by_user_id uuid references users(id),
  checked_out_by_user_id uuid references users(id),
  id_verified boolean default false,
  badge_issued boolean default false,
  key_fob_issued boolean default false,
  escort_name text,
  work_area_confirmed text,
  access_status text default 'expected' check (access_status in ('expected','on_site','checked_out','denied_entry','removed','no_show')),
  denial_reason text,
  checkout_notes text,
  created_at timestamptz default now()
);

create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  related_record_type text,
  related_record_id uuid,
  notification_type text,
  recipient_email text,
  subject text,
  message_body text,
  sent_datetime timestamptz,
  delivery_status text default 'queued',
  error_message text
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  action_type text not null,
  table_name text,
  record_id uuid,
  previous_value jsonb,
  new_value jsonb,
  action_datetime timestamptz default now(),
  ip_address text,
  notes text
);

create index if not exists idx_work_requests_status on work_requests(current_status);
create index if not exists idx_work_requests_dates on work_requests(requested_start_datetime, requested_end_datetime);
create index if not exists idx_tokens_token on contractor_submission_tokens(token);
create index if not exists idx_site_access_status on site_access_logs(access_status);

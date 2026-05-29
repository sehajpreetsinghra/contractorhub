# SRIC Contractor Management Portal (ContractorHub)

ContractorHub is a corporate, secure, audit-focused contractor management portal for SRIC. The MVP demonstrates role-based dashboards, tokenized contractor submissions, approval queues, work authorization visibility, security desk check-in/check-out forms, audit-aware workflows, and a Supabase/PostgreSQL schema blueprint.

## Core business rules

- Contractors do **not** log in for the first version.
- Contractors receive a secure, tokenized direct link for exactly one Work Request.
- Contractor access must be sponsored by an authorized tenant, Property Management, Operations, or Security Supervisor.
- Every contractor on-site must trace back to a Work Request, Work Authorization, accountable sponsor, approved location, approved time window, and security check-in/check-out record.
- Security views should show only approved or scheduled contractors.
- All major actions should be recorded in `audit_logs`.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth / Supabase Storage ready
- PostgreSQL schema in `supabase/mvp-schema.sql`

## Key routes

- `/` — product command-centre overview
- `/dashboard` — role redirect placeholder using `NEXT_PUBLIC_DEMO_ROLE`
- `/tenant/dashboard`
- `/pm/dashboard`
- `/operations/dashboard`
- `/security/dashboard`
- `/security-supervisor/dashboard`
- `/fire-safety/dashboard`
- `/admin/dashboard`
- `/contractor-submit/:token`
- `/contractor-submit/:token/confirmation`
- `/work-requests/new`
- `/security/check-in/:authorizationId`
- `/security/check-out/:siteAccessLogId`
- `/login`, `/logout`, `/forgot-password`
- `/link-expired`, `/link-used`

## MVP database tables

The MVP schema starts with:

`users`, `organizations`, `contractor_companies`, `contractor_workers`, `contractor_submission_tokens`, `work_requests`, `contractor_work_details`, `work_request_workers`, `uploaded_documents`, `document_types`, `approvals`, `work_authorizations`, `site_access_logs`, `audit_logs`, and `notifications`.

## Local development

```bash
npm install
npm run dev
```

Run checks:

```bash
npm run typecheck
npm run build
```

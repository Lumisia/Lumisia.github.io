# Kiali and Jaeger Recovery Implementation Plan

> Execute directly in this session. The user requested working production endpoints and subsequently authorized grouped commits and pushes after recovery verification.

**Goal:** Restore public Kiali access, collect real FileInNOut backend traces in Jaeger, and correct portfolio demo links.

**Architecture:** Enable Kiali Operator-managed Ingress so reconciliation preserves the public route. Configure the existing Spring Boot 3.2.5 backend to export OTLP/HTTP to the existing internal Jaeger collector, retaining the running image and rolling update policy. Persist both settings in their Helm profiles.

**Spec:** User request in this chat, 2026-10-16: make Kiali and Jaeger work; explain the Callog demo URL.

## Constraints

- Preserve unrelated uncommitted work in both repositories.
- No credential output, RBAC expansion, or exposure of collector ports. Commit and push only the recovery changes under the user's subsequent authorization.
- Back up the affected production resources privately before modification.
- Verify current failures before repairing; verify actual public UI and actual backend traces after repairing.

## Review Focus

- Kiali remains anonymous view-only; the repair must not restore older broad Dashboard permissions.
- Collector remains internal; only Jaeger query UI is public.
- Backend retains its existing image, credentials and maxUnavailable=0 rollout.
- Sampling remains 10%; operational probes contain no personal information.
- Portfolio Jaeger link has no fixed start/end time; Callog uses its working bare hostname.

## Tasks

1. Run a reusable production smoke check. Expected initial failures: Kiali ingress HTTP 404 and backend service absent from Jaeger. Confirm Kiali internal HTTP 200.
2. Back up the backend Deployment and ConfigMap on the server. Restore the Kiali Ingress, persist the OTLP endpoint in the backend ConfigMap, and trigger a rolling update without rebuilding the image. On failure, restore the backup.
3. Verify Kiali public UI, view-only status, real backend traces and retained application availability. Persist the OTLP endpoint in `C:/Git/fullstack_project/cicd/helm/values-oci-k3s.yaml`; correct related links in `content/projects/fileinNOut.md` and `content/projects/callog.md`. Run focused configuration checks and Hugo verification/build.

All three tasks were executed. Kiali Operator initially removed the manually restored route during CR reconciliation because ingress was disabled. The durable repair enables `deployment.ingress` in the CR and source values; the generated Ingress is now owned by the Kiali resource.

## Evidence

- Initial direct server probe: internal Kiali 200, ingress 404; no Ingress in istio-system; Kiali available replicas 1.
- Initial Jaeger services: only jaeger-all-in-one; no tracing environment variables in the backend Deployment or ConfigMap.
- Backend update policy: RollingUpdate, maxSurge=1, maxUnavailable=0; node memory usage 38%.
- Callog bare hostname opens successfully; the portfolio previously used www.
- Production smoke: eight checks pass, including a fresh successful health request whose trace ID and backend process match in Jaeger.
- Fresh reviewer identified a false-positive risk in the probe. Three failing regression cases (HTTP 500, unrelated service, wrong trace ID) were added, then fixed; all four regression tests pass.
- OCI configuration suite: 13/13 pass. Existing observability suite: 8/9 pass; the preexisting Dashboard RBAC test expects old broad access and fails against existing namespace restriction. No RBAC changes were made.
- Before committing, both configuration suites pass 22/22 against the tracked baseline plus the two recovery settings files. The unrelated uncommitted changes stay in their original workspace.
- Hugo structure check and local site build pass. The user subsequently authorized grouped commits and pushes; GitHub Pages publication follows the existing workflow.

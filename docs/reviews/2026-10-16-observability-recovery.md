# Kiali / Jaeger recovery — 2026-10-16

The requested production recovery is applied. This record accompanies the source commits authorized in the user's follow-up request.

## Root causes and applied changes

- Kiali itself was healthy, but public ingress was missing. The operator's ingress setting was disabled, so reconciliation also deleted a manually restored ingress. Enabled operator-owned ingress with the existing nginx class and `/kiali` redirect. Confirmed the generated ingress has a Kiali owner reference and reconciliation succeeds.
- Kiali's Distributed Tracing link still used `jaeger.example.com`; updated its CR to the actual Jaeger hostname.
- With the user's additional approval, configured Kiali's existing Grafana integration with the actual internal service URL and public hostname instead of defaults in the wrong namespace.
- The Spring Boot 3.2.5 backend had tracing dependencies but no OTLP endpoint in its Deployment/ConfigMap. Added the internal collector HTTP endpoint to the ConfigMap and rolled the existing image with maxUnavailable=0. Sampling remains at the existing default.
- Jaeger portfolio URL contained fixed June 18 timestamps and selected Jaeger's own service. Updated the local portfolio source to a relative one-hour query for `backend_team`, and described application tracing accurately.
- Callog works at `https://magamcallog.kro.kr/`. The portfolio used the www hostname, which failed certificate validation in this browser. Updated the local source to the working bare hostname.

## Verification

- Kiali origin and public deep-link HTTP 200, anonymous view-only mode retained.
- After the additional Grafana change, Kiali reconciliation succeeded, the replacement pod became ready, and the operator-owned ingress remained present. Kiali's Grafana integration API returned HTTP 200; the Mesh view shows Grafana without its former connection warning.
- Backend health HTTP 200 and completed rolling update using the unchanged image.
- Fresh health request with a unique sampled traceparent: HTTP 200; Jaeger returned the same trace ID and spans belonging to `backend_team`.
- Live smoke: 8/8 checks pass after operator reconciliation.
- Probe regression tests: 4/4 pass. Three invalid-evidence scenarios failed before the probe was strengthened.
- OCI profile checks: 13/13 pass; Hugo structure check and local build pass (existing Hugo deprecation warnings remain).
- Existing observability checks: 8/9 pass. `Kubernetes Dashboard RBAC grants read-only view without secrets` fails at `cicd/observability/observabilityProfile.test.js:108` because it expects an old broad ClusterRole binding. The current user changes restrict access to fileinnout. This failure existed before this recovery; no privilege expansion was made to satisfy it.
- Commit-scope verification: reconstructed the tracked baseline with only the two recovery values files overlaid. OCI and observability suites pass 22/22. The unrelated, uncommitted Dashboard restriction remains in the original workspace and is excluded from this recovery commit.

## Scope and recovery

Deployment, ConfigMap and original Kiali CR backups are stored privately on the server under `/home/ubuntu/fileinnout-observability-recovery-20261016-072235` (directory 700, files 600). Secrets and collector ports were not exposed. No application image was rebuilt.

Persistent source changes are in `C:/Git/fullstack_project/cicd/helm/values-oci-k3s.yaml` and `cicd/observability/values-kiali-operator-k3s.yaml`. The portfolio link changes are in this repository. The user subsequently authorized committing and pushing these changes in separate groups. GitHub Pages publication follows the repository's existing workflow on main.

An incomplete email-verification request without its required token returned HTTP 500 during an early probe. The final smoke uses the successful health endpoint. Handling of that invalid-input response was not changed in this observability recovery.

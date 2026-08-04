/**
 * RTT/12 — Pipeline Client
 * ------------------------
 * Front-end wrapper for the RTT/12 Pipeline Validation API.
 *
 * Exposes:
 *   - validatePipeline(rtt1, rtt2, rtt3)
 *
 * The server-side implementation lives in:
 *   /api/pipeline.server.js
 *
 * The OpenAPI spec lives in:
 *   /api/pipeline.openapi.yaml
 */

export async function validatePipeline(rtt1, rtt2, rtt3) {
  const payload = { rtt1, rtt2, rtt3 };

  const response = await fetch("/api/pipeline/validate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`RTT/12 Pipeline Error: ${response.status}`);
  }

  return await response.json();
}


/**
 * RTT/12 — Aggregate Client
 * -------------------------
 * Front-end wrapper for the RTT/12 Aggregator API.
 *
 * Exposes:
 *   - aggregate(unifiedTopology, dashboardModel, pipelineMetadata)
 *
 * The server-side implementation lives in:
 *   /api/aggregate.server.js
 *
 * The OpenAPI spec lives in:
 *   /api/aggregate.openapi.yaml
 */

export async function aggregate(unifiedTopology, dashboardModel, pipelineMetadata) {
  const payload = {
    unifiedTopology,
    dashboardModel,
    pipelineMetadata
  };

  const response = await fetch("/api/aggregate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`RTT/12 Aggregate Error: ${response.status}`);
  }

  return await response.json();
}


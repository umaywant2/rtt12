/**
 * RTT/12 — Aggregator Worker
 * --------------------------
 * Wraps the RTT/12 aggregator server logic in a browser/agent-safe
 * message-based worker interface.
 *
 * Receives:
 *   - unifiedTopology
 *   - dashboardModel
 *   - pipelineMetadata
 *
 * Returns:
 *   { ok: true, result: aggregateModel }
 *   { ok: false, error: "U12-AGG-WORKER-XXX: ..." }
 */

import { RTT12Aggregator } from "./aggregator.js";

self.onmessage = async (event) => {
  const { unifiedTopology, dashboardModel, pipelineMetadata } = event.data || {};

  // Missing payload
  if (!event.data) {
    self.postMessage({
      ok: false,
      error: "U12-AGG-WORKER-001: Missing aggregate input"
    });
    return;
  }

  // Required field checks
  if (!unifiedTopology) {
    self.postMessage({
      ok: false,
      error: "U12-AGG-WORKER-002: Missing unifiedTopology"
    });
    return;
  }

  if (!dashboardModel) {
    self.postMessage({
      ok: false,
      error: "U12-AGG-WORKER-003: Missing dashboardModel"
    });
    return;
  }

  if (!pipelineMetadata) {
    self.postMessage({
      ok: false,
      error: "U12-AGG-WORKER-004: Missing pipelineMetadata"
    });
    return;
  }

  // Execute aggregation
  try {
    const aggregateModel = RTT12Aggregator.aggregate(
      unifiedTopology,
      dashboardModel,
      pipelineMetadata
    );

    self.postMessage({
      ok: true,
      result: aggregateModel
    });

  } catch (err) {
    self.postMessage({
      ok: false,
      error: `U12-AGG-WORKER-005: ${err.message}`
    });
  }
};


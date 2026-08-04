/**
 * RTT/12 — Aggregator Worker
 * --------------------------
 * Wraps the RTT/12 aggregator. Receives unifiedTopology, dashboardModel,
 * and pipelineMetadata, then returns a structured aggregate model.
 */

import { RTT12Aggregator } from "./aggregator.js";

self.onmessage = async (event) => {
  const { unifiedTopology, dashboardModel, pipelineMetadata } = event.data || {};

  if (!event.data) {
    self.postMessage({
      ok: false,
      error: "U12-AGG-WORKER-001: Missing aggregate input"
    });
    return;
  }

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
      error: `U12-AGG-WORKER-002: ${err.message}`
    });
  }
};


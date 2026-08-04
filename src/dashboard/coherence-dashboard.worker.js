/**
 * RTT/12 — Coherence Dashboard Worker
 * -----------------------------------
 * Wraps the RTT/12 dashboard renderer. Receives unifiedTopology from
 * RTT/12 synthesis and returns a structured dashboard model.
 */

import { RTT12CoherenceDashboard } from "./coherence-dashboard.js";

self.onmessage = async (event) => {
  const { unifiedTopology } = event.data || {};

  if (!event.data) {
    self.postMessage({
      ok: false,
      error: "U12-DASH-WORKER-001: Missing dashboard input"
    });
    return;
  }

  try {
    const dashboardModel = RTT12CoherenceDashboard.render(unifiedTopology);

    self.postMessage({
      ok: true,
      result: dashboardModel
    });
  } catch (err) {
    self.postMessage({
      ok: false,
      error: `U12-DASH-WORKER-002: ${err.message}`
    });
  }
};


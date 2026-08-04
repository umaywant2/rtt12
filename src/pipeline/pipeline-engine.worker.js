/**
 * RTT/12 — Pipeline Engine Worker
 * -------------------------------
 * Validates RTT/1 → RTT/2 → RTT/3 → RTT/12 pipeline lineage and prepares
 * unified operator payload for rtt12-synthesis.js.
 */

import { RTT12PipelineEngine } from "./pipeline-engine.js";

self.onmessage = async (event) => {
  const { rtt1, rtt2, rtt3 } = event.data || {};

  if (!event.data) {
    self.postMessage({
      ok: false,
      error: "U12-PIPE-WORKER-001: Missing pipeline input"
    });
    return;
  }

  try {
    // Validate pipeline lineage + prepare RTT/12 operator payload
    const prepared = RTT12PipelineEngine.prepare(rtt1, rtt2, rtt3);

    self.postMessage({
      ok: true,
      result: prepared
    });
  } catch (err) {
    self.postMessage({
      ok: false,
      error: `U12-PIPE-WORKER-002: ${err.message}`
    });
  }
};


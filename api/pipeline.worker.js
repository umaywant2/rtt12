/**
 * RTT/12 — Pipeline Validation Worker
 * -----------------------------------
 * Wraps the RTT/12 pipeline engine in a browser/agent-safe
 * message-based worker interface.
 *
 * Receives:
 *   - rtt1
 *   - rtt2
 *   - rtt3
 *
 * Returns:
 *   { ok: true, result: pipelineMetadata }
 *   { ok: false, error: "U12-PIPE-WORKER-XXX: ..." }
 */

import { RTT12Pipeline } from "./pipeline-engine.js";

self.onmessage = async (event) => {
  const { rtt1, rtt2, rtt3 } = event.data || {};

  // Missing payload entirely
  if (!event.data) {
    self.postMessage({
      ok: false,
      error: "U12-PIPE-WORKER-001: Missing pipeline input"
    });
    return;
  }

  // Required RTT/1 field
  if (!rtt1 || !rtt1.claritySurface) {
    self.postMessage({
      ok: false,
      error: "U12-PIPE-WORKER-002: Missing RTT/1 claritySurface"
    });
    return;
  }

  // Required RTT/2 fields
  if (!rtt2 || !rtt2.regimeView || !rtt2.driftView || !rtt2.coherenceView) {
    self.postMessage({
      ok: false,
      error: "U12-PIPE-WORKER-003: Missing RTT/2 required fields"
    });
    return;
  }

  // Required RTT/3 fields
  if (!rtt3 ||
      !rtt3.structuralTopology ||
      !rtt3.intersections ||
      !rtt3.surfaces ||
      !rtt3.gpuTopology ||
      !rtt3.gpuTopology.topology ||
      !rtt3.gpuTopology.topology.overlays) {
    self.postMessage({
      ok: false,
      error: "U12-PIPE-WORKER-004: Missing RTT/3 required fields"
    });
    return;
  }

  // Execute pipeline validation
  try {
    const pipelineMetadata = RTT12Pipeline.validate(rtt1, rtt2, rtt3);

    self.postMessage({
      ok: true,
      result: pipelineMetadata
    });

  } catch (err) {
    self.postMessage({
      ok: false,
      error: `U12-PIPE-WORKER-005: ${err.message}`
    });
  }
};


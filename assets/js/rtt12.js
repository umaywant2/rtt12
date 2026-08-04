/**
 * RTT/12 — Canonical Runtime Script
 * ---------------------------------
 * Provides front-end orchestration for:
 * - Pipeline validation
 * - Unified synthesis
 * - Dashboard rendering
 * - Aggregation
 *
 * This file is intentionally lightweight. All heavy lifting is done
 * by workers and engine modules.
 */

const RTT12 = (() => {

  /* -------------------------------------------------------------
     Worker Loader
     ------------------------------------------------------------- */

  function loadWorker(path) {
    return new Worker(path, { type: "module" });
  }

  const workers = {
    pipeline: loadWorker("/rtt12/assets/js/workers/pipeline-engine.worker.js"),
    synthesis: loadWorker("/rtt12/assets/js/workers/unify.worker.js"),
    dashboard: loadWorker("/rtt12/assets/js/workers/coherence-dashboard.worker.js"),
    aggregate: loadWorker("/rtt12/assets/js/workers/aggregator.worker.js")
  };

  /* -------------------------------------------------------------
     Pipeline Validation
     ------------------------------------------------------------- */

  function validatePipeline(rtt1, rtt2, rtt3) {
    return new Promise((resolve) => {
      workers.pipeline.onmessage = (event) => resolve(event.data);
      workers.pipeline.postMessage({ rtt1, rtt2, rtt3 });
    });
  }

  /* -------------------------------------------------------------
     Unified Synthesis
     ------------------------------------------------------------- */

  function synthesize(validatedPipeline) {
    return new Promise((resolve) => {
      workers.synthesis.onmessage = (event) => resolve(event.data);
      workers.synthesis.postMessage({ validatedPipeline });
    });
  }

  /* -------------------------------------------------------------
     Dashboard Rendering
     ------------------------------------------------------------- */

  function renderDashboard(unifiedTopology) {
    return new Promise((resolve) => {
      workers.dashboard.onmessage = (event) => resolve(event.data);
      workers.dashboard.postMessage({ unifiedTopology });
    });
  }

  /* -------------------------------------------------------------
     Aggregation
     ------------------------------------------------------------- */

  function aggregate(unifiedTopology, dashboardModel, pipelineMetadata) {
    return new Promise((resolve) => {
      workers.aggregate.onmessage = (event) => resolve(event.data);
      workers.aggregate.postMessage({
        unifiedTopology,
        dashboardModel,
        pipelineMetadata
      });
    });
  }

  /* -------------------------------------------------------------
     Public API
     ------------------------------------------------------------- */

  return {
    validatePipeline,
    synthesize,
    renderDashboard,
    aggregate
  };

})();

/* -------------------------------------------------------------
   Export to global scope
   ------------------------------------------------------------- */

window.RTT12 = RTT12;


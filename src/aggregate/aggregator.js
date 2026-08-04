/**
 * RTT/12 — Aggregator
 * -------------------
 * Aggregates unifiedTopology, dashboard model, pipeline metadata,
 * GPU-aligned structures, regime surfaces, and coherence–drift overlays
 * into a single coherent aggregate model.
 */

import { RTT12AggregatorGraph } from "./aggregator.graph.js";

export const RTT12Aggregator = {
  engine: "RTT/12",
  version: "2026.1",
  role: "Aggregate Model",

  /**
   * Aggregate RTT/12 structures into a single model.
   * @param {Object} unifiedTopology - RTT/12 synthesis output
   * @param {Object} dashboardModel - RTT/12 dashboard output
   * @param {Object} pipelineMetadata - RTT/12 pipeline metadata
   * @returns {Object} Aggregate model
   */
  aggregate(unifiedTopology, dashboardModel, pipelineMetadata) {
    if (!unifiedTopology) {
      throw new Error("U12-AGG-001: Missing unifiedTopology");
    }
    if (!dashboardModel) {
      throw new Error("U12-AGG-002: Missing dashboardModel");
    }
    if (!pipelineMetadata) {
      throw new Error("U12-AGG-003: Missing pipelineMetadata");
    }

    const required = [
      "clusters",
      "regimeSurfaces",
      "coherenceDrift",
      "gpuAligned",
      "metadata"
    ];

    for (const field of required) {
      if (!(field in unifiedTopology)) {
        throw new Error(`U12-AGG-004: Missing unifiedTopology field '${field}'`);
      }
    }

    return {
      engine: this.engine,
      version: this.version,
      graph: RTT12AggregatorGraph,
      aggregate: {
        unifiedTopology,
        dashboardModel,
        pipelineMetadata,
        gpuAligned: unifiedTopology.gpuAligned,
        regimeSurfaces: unifiedTopology.regimeSurfaces,
        coherenceDrift: unifiedTopology.coherenceDrift,
        metadata: {
          ...unifiedTopology.metadata,
          pipeline: pipelineMetadata.pipeline,
          aggregated: true
        }
      }
    };
  },

  /**
   * Identity block for diagnostics.
   */
  identity() {
    return {
      engine: this.engine,
      version: this.version,
      role: this.role
    };
  }
};


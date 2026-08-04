/**
 * RTT/12 — Aggregator Graph
 * -------------------------
 * Declarative graph describing how RTT/12 aggregates unifiedTopology,
 * dashboard models, pipeline metadata, and GPU-aligned structures into a
 * single coherent aggregate model.
 */

export const RTT12AggregatorGraph = {
  engine: "RTT/12",
  version: "2026.1",
  role: "Aggregate Model",

  nodes: [
    {
      id: "unifiedTopology",
      title: "Unified Topology",
      description: "Primary RTT/12 synthesis output.",
      required: true
    },
    {
      id: "dashboardModel",
      title: "Dashboard Model",
      description: "Coherence dashboard representation of unifiedTopology.",
      required: true
    },
    {
      id: "pipelineMetadata",
      title: "Pipeline Metadata",
      description: "Lineage metadata from RTT/1 → RTT/2 → RTT/3 → RTT/12.",
      required: true
    },
    {
      id: "gpuAligned",
      title: "GPU-Aligned Structures",
      description: "GPU topology aligned with unified RTT/12 synthesis.",
      required: true
    },
    {
      id: "regimeSurfaces",
      title: "Regime Surfaces",
      description: "Surfaces aligned to regime geometry.",
      required: true
    },
    {
      id: "coherenceDrift",
      title: "Coherence–Drift Overlay",
      description: "Drift vectors mapped onto coherence surfaces.",
      required: true
    }
  ],

  edges: [
    { from: "unifiedTopology", to: "dashboardModel", type: "topology→dashboard" },
    { from: "unifiedTopology", to: "pipelineMetadata", type: "topology→metadata" },
    { from: "unifiedTopology", to: "gpuAligned", type: "topology→gpu" },
    { from: "unifiedTopology", to: "regimeSurfaces", type: "topology→regime" },
    { from: "regimeSurfaces", to: "coherenceDrift", type: "regime→drift" },
    { from: "coherenceDrift", to: "dashboardModel", type: "drift→dashboard" }
  ],

  metadata: {
    aggregate: "rtt12",
    stable: true,
    pipeline: "rtt1→rtt2→rtt3→rtt12"
  }
};


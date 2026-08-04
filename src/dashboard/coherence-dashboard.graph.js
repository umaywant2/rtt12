/**
 * RTT/12 — Coherence Dashboard Graph
 * ----------------------------------
 * Declarative graph describing how unifiedTopology fields map into the
 * RTT/12 dashboard UI. This graph is consumed by dashboard renderers and
 * diagnostic overlays.
 */

export const RTT12CoherenceDashboardGraph = {
  engine: "RTT/12",
  version: "2026.1",
  role: "Dashboard Topology",

  nodes: [
    {
      id: "clusters",
      title: "Topology Clusters",
      description: "Unified RTT/12 cluster groups derived from RTT/3 structural topology.",
      required: true
    },
    {
      id: "regimeSurfaces",
      title: "Regime Surfaces",
      description: "Surfaces aligned to regime geometry and coherence fields.",
      required: true
    },
    {
      id: "coherenceDrift",
      title: "Coherence–Drift Overlay",
      description: "Overlay showing drift vectors mapped onto coherence surfaces.",
      required: true
    },
    {
      id: "gpuAligned",
      title: "GPU-Aligned Topology",
      description: "GPU topology aligned with unified RTT/12 synthesis.",
      required: true
    },
    {
      id: "metadata",
      title: "Metadata",
      description: "Pipeline lineage, timestamps, engine identity, and synthesis metadata.",
      required: true
    }
  ],

  edges: [
    { from: "clusters", to: "regimeSurfaces", type: "cluster→surface" },
    { from: "regimeSurfaces", to: "coherenceDrift", type: "surface→drift" },
    { from: "coherenceDrift", to: "gpuAligned", type: "drift→gpu" },
    { from: "gpuAligned", to: "metadata", type: "gpu→meta" }
  ],

  metadata: {
    dashboard: "coherence",
    stable: true,
    pipeline: "rtt1→rtt2→rtt3→rtt12"
  }
};


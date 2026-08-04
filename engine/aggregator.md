# RTT/12 — Aggregator Engine
The RTT/12 Aggregator is the final synthesis stage in the RTT pipeline.  
It merges the outputs of RTT/12 Synthesis, RTT/12 Dashboard, and RTT/12 Pipeline Metadata into a single coherent aggregate model.

---

## Purpose
The aggregator provides a unified, stable, canonical structure that downstream systems can consume:

- UI dashboards  
- diagnostics  
- regime‑surface overlays  
- coherence‑drift analysis  
- GPU‑aligned topology views  
- metadata lineage displays  

It ensures that all RTT/12 components converge into one deterministic model.

---

## Inputs
The aggregator requires three validated RTT/12 structures:

### 1. `unifiedTopology`
Produced by `rtt12-synthesis.js`, containing:
- clusters  
- regimeSurfaces  
- coherenceDrift  
- gpuAligned  
- metadata  

### 2. `dashboardModel`
Produced by `coherence-dashboard.js`, containing:
- dashboard clusters  
- regime surfaces  
- drift overlays  
- GPU-aligned views  
- dashboard metadata  

### 3. `pipelineMetadata`
Produced by `pipeline-engine.js`, containing:
- pipeline lineage  
- validation flags  
- RTT/1 → RTT/2 → RTT/3 → RTT/12 chain  

---

## Aggregation Model
The aggregator merges all structures into:

```json
{
  "engine": "RTT/12",
  "version": "2026.1",
  "aggregate": {
    "unifiedTopology": {},
    "dashboardModel": {},
    "pipelineMetadata": {},
    "gpuAligned": [],
    "regimeSurfaces": [],
    "coherenceDrift": [],
    "metadata": {
      "engine": "RTT/12",
      "version": "2026.1",
      "pipeline": "rtt1→rtt2→rtt3→rtt12",
      "aggregated": true
    }
  }
}
```

---

## Graph Definition
The aggregator graph is defined in:

```
src/aggregate/aggregator.graph.js
```

It specifies:

- nodes  
- edges  
- required fields  
- metadata  

This graph is consumed by:

- `aggregator.js`  
- `aggregator.worker.js`  
- dashboard and pipeline diagnostics  

---

## Runtime Engine
The runtime implementation lives in:

```
src/aggregate/aggregator.js
```

It performs:

1. Input validation  
2. Required field enforcement  
3. Canonical merge  
4. Metadata lineage stitching  
5. Aggregate model construction  

Errors follow the RTT/12 code pattern:

- `U12-AGG-001` — missing unifiedTopology  
- `U12-AGG-002` — missing dashboardModel  
- `U12-AGG-003` — missing pipelineMetadata  
- `U12-AGG-004` — missing unifiedTopology field  

---

## Worker
The worker wrapper lives in:

```
src/aggregate/aggregator.worker.js
```

It provides message‑based aggregation for browser and agent environments.

---

## OpenAPI Specification
The API definition lives in:

```
src/aggregate/aggregator.openapi.yaml
```

It exposes:

- `/aggregator/aggregate`  
- request/response schemas  
- error envelopes  
- aggregate model structure  

---

## Summary
The RTT/12 Aggregator is the **final convergence point** of the entire RTT pipeline.  
It produces the canonical, stable, unified model that all downstream systems rely on.

RTT/12 is complete only when the aggregator has run.

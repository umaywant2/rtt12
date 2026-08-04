# **RTT/12 — Aggregation Protocol**  
*(Source: your active tab —   [github.com](https://github.com/umaywant2/rtt12/edit/main/docs/aggregation-protocol.md))*

The RTT/12 Aggregation Protocol defines how unifiedTopology, dashboardModel, and pipelineMetadata converge into a single coherent aggregate model.  
It is the **formal contract** governing RTT/12’s final synthesis stage.

---

## **1. Purpose**
The Aggregation Protocol ensures:

- deterministic merging of RTT/12 structures  
- strict validation of required fields  
- stable metadata lineage  
- compatibility with dashboard, diagnostics, and UI layers  
- predictable downstream behavior  

RTT/12 aggregation is the final step before the unified model becomes consumable by external systems.

---

## **2. Inputs**
Aggregation requires **three validated RTT/12 structures**:

### **1. unifiedTopology**  
Produced by `rtt12-synthesis.js`, containing:

- clusters  
- regimeSurfaces  
- coherenceDrift  
- gpuAligned  
- metadata  

### **2. dashboardModel**  
Produced by `coherence-dashboard.js`, containing:

- dashboard clusters  
- regime surfaces  
- drift overlays  
- GPU-aligned views  
- dashboard metadata  

### **3. pipelineMetadata**  
Produced by `pipeline-engine.js`, containing:

- RTT/1 → RTT/2 → RTT/3 → RTT/12 lineage  
- validation flags  
- pipeline identity  

---

## **3. Required Fields**
RTT/12 aggregation enforces the following unifiedTopology fields:

- `clusters`  
- `regimeSurfaces`  
- `coherenceDrift`  
- `gpuAligned`  
- `metadata`  

Missing any of these triggers deterministic RTT/12 errors:

- `U12-AGG-001` — missing unifiedTopology  
- `U12-AGG-002` — missing dashboardModel  
- `U12-AGG-003` — missing pipelineMetadata  
- `U12-AGG-004` — missing unifiedTopology field  

---

## **4. Aggregation Model**
The aggregator produces a canonical structure:

```json
{
  "engine": "RTT/12",
  "version": "2026.1",
  "graph": {},
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

This structure is consumed by:

- coherence dashboard  
- diagnostics  
- UI layers  
- regime‑drift overlays  
- external agents  

---

## **5. Graph Definition**
The aggregation graph lives in:

```
src/aggregate/aggregator.graph.js
```

It defines:

- nodes  
- edges  
- required fields  
- metadata  

This graph is consumed by:

- `aggregator.js`  
- `aggregator.worker.js`  
- RTT/12 diagnostics  
- pipeline validation  

---

## **6. Runtime Protocol**
The runtime aggregator (`aggregator.js`) performs:

1. **Input validation**  
2. **Required field enforcement**  
3. **Canonical merge**  
4. **Metadata lineage stitching**  
5. **Aggregate model construction**  

All merges are deterministic and stable.

---

## **7. Worker Protocol**
The worker wrapper (`aggregator.worker.js`) provides:

- message‑based aggregation  
- browser‑safe execution  
- agent‑safe execution  
- structured error envelopes  

Workers always return:

```json
{ "ok": true, "result": { ... } }
```

or

```json
{ "ok": false, "error": "U12-AGG-WORKER-002: ..." }
```

---

## **8. OpenAPI Protocol**
The API definition lives in:

```
src/aggregate/aggregator.openapi.yaml
```

It exposes:

- `/aggregator/aggregate`  
- request/response schemas  
- error envelopes  
- aggregate model structure  

This allows RTT/12 aggregation to run in:

- servers  
- agents  
- pipelines  
- distributed systems  

---

## **9. Summary**
The RTT/12 Aggregation Protocol is the **final convergence point** of the entire RTT pipeline.  
It ensures that unifiedTopology, dashboardModel, and pipelineMetadata merge into a single coherent structure that downstream systems can rely on.

RTT/12 is only complete when aggregation has run.

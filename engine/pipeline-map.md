# **RTT/12 — Pipeline Map**  
*(Source: your active tab —   [github.com](https://github.com/umaywant2/rtt12/edit/main/engine/pipeline-map.md))*

The RTT/12 Pipeline Map describes the full lineage of the RTT system from initial substrate capture (RTT/1) through GPU stack construction (RTT/2), topology construction (RTT/3), and unified synthesis (RTT/12).  
It is the **canonical overview** of how RTT/12 receives, validates, and integrates upstream structures.

---

## **1. Purpose**
The Pipeline Map provides:

- A clear, deterministic description of the RTT pipeline  
- The required fields at each stage  
- The flow of topology, surfaces, intersections, and GPU alignment  
- The structural expectations of RTT/12  
- A reference for diagnostics, dashboards, and aggregate engines  

RTT/12 depends on this map to ensure the entire pipeline is coherent.

---

## **2. Pipeline Lineage**
RTT/12 recognizes a strict four‑stage lineage:

### **RTT/1 — Substrate Capture**
Produces the foundational substrate:

- claritySurface  
- loadBearing  
- contradictionScan  
- structuralCritique  

### **RTT/2 — GPU Stack Construction**
Builds the GPU regime stack:

- regimeView  
- driftView  
- coherenceView  

### **RTT/3 — Topology Construction**
Constructs the structural topology:

- structuralTopology  
- intersections  
- surfaces  
- gpuTopology (with overlays)  

### **RTT/12 — Unified Synthesis**
Consumes all upstream structures and produces:

- unifiedTopology  
- clusters  
- regimeSurfaces  
- coherenceDrift  
- gpuAligned  
- metadata  

---

## **3. Pipeline Flow**
The canonical flow is:

```
RTT/1 → RTT/2 → RTT/3 → RTT/12
```

Each stage must be validated before the next stage can run.

RTT/12 enforces:

- RTT/1 claritySurface  
- RTT/2 regimeView  
- RTT/3 gpuTopology.topology.overlays  

Missing any of these results in deterministic RTT/12 error codes.

---

## **4. Required Fields**
RTT/12 requires the following upstream fields:

### From RTT/1
- claritySurface

### From RTT/2
- gpuStack.regimeView  
- gpuStack.driftView  
- gpuStack.coherenceView  

### From RTT/3
- structuralTopology  
- intersections  
- surfaces  
- gpuTopology.topology.overlays  

---

## **5. RTT/12 Output Map**
RTT/12 produces a unified model:

```json
{
  "unifiedTopology": {
    "clusters": [],
    "regimeSurfaces": [],
    "coherenceDrift": [],
    "gpuAligned": [],
    "metadata": {
      "engine": "RTT/12",
      "version": "2026.1",
      "pipeline": "rtt1→rtt2→rtt3→rtt12"
    }
  }
}
```

This structure is consumed by:

- coherence dashboard  
- aggregator  
- diagnostics  
- UI layers  
- regime‑drift overlays  

---

## **6. Graph Reference**
The pipeline graph is defined in:

```
src/pipeline/pipeline-engine.graph.js
```

It contains:

- stages  
- edges  
- required fields  
- metadata  

This graph is used by:

- pipeline-engine.js  
- pipeline-engine.worker.js  
- RTT/12 synthesis  
- RTT/12 diagnostics  

---

## **7. Summary**
The RTT/12 Pipeline Map is the **structural backbone** of the RTT system.  
It ensures that all upstream engines deliver the required fields and that RTT/12 can unify them into a coherent topology.

RTT/12 cannot run without a valid pipeline map.

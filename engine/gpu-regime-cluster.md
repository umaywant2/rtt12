# gpu-regime-cluster — RTT/12 Operator
**RTT:** 12  
**Coherence:** Declared  
**Drift:** Declared  
**Paradox:** Structural  

## 1. Overview
The GPU Regime Cluster operator consumes RTT/3 gpu-topology output and produces
a RTT/12 regime cluster representation for GPU. It treats GPU as a multi-regime
entity with surfaces and drift envelopes.

## 2. Input
```json
{
  "topology": {
    "surfaces": [ ... ],
    "intersections": [ ... ],
    "overlays": [ ... ]
  }
}
```

## 3. Processing
- topology surfaces → regime clusters
- topology overlays → drift envelope

## 4. Output
```json
{
  "engine": "RTT/12",
  "operator": "gpu-regime-cluster",
  "version": "2026.1",
  "cluster": {
    "clusters": [ ... ],
    "driftEnvelope": [ ... ]
  }
}
```

## 5. Errors
GR12-001: Invalid gpu-topology input

## 6. Version
2026.1

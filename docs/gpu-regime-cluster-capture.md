# RTT/12 — GPU Regime Cluster Capture

## Example Input (RTT/3 gpu-topology output)
```json
{
  "topology": {
    "surfaces": [
      { "label": "ROCm Queue 0 Surface", "regimes": ["S", "E"] }
    ],
    "overlays": [
      { "label": "compose-frame", "magnitude": 0.2 }
    ]
  }
}
```

## Example Output
```json
{
  "engine": "RTT/12",
  "operator": "gpu-regime-cluster",
  "version": "2026.1",
  "cluster": {
    "clusters": [
      { "label": "ROCm Queue 0 Surface", "regimes": ["S", "E"] }
    ],
    "driftEnvelope": [
      { "label": "compose-frame", "magnitude": 0.2 }
    ]
  }
}
```

## Interpretation
RTT/12 exposes GPU as a regime cluster with surfaces and a drift envelope.

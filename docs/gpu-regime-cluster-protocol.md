# RTT/12 — GPU Regime Cluster Protocol

## 1. Purpose
Defines how RTT/12 ingests RTT/3 gpu-topology output and produces GPU regime
clusters and drift envelopes.

## 2. Input Specification
Required:
- topology.surfaces[]
- topology.overlays[]

## 3. Processing Rules
- deterministic mapping
- one cluster per topology surface
- drift envelope from topology overlays

## 4. Output Specification
- clusters[]
- driftEnvelope[]

## 5. Error Codes
GR12-001: Invalid gpu-topology input

## 6. Version
2026.1


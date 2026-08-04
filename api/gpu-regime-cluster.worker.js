importScripts("/src/gpu/gpu-regime-cluster.js");

self.onmessage = (event) => {
  try {
    const result = GpuRegimeCluster.build(event.data.gpuTopologyOutput);

    self.postMessage({
      ok: true,
      result
    });
  } catch (error) {
    self.postMessage({
      ok: false,
      error: error.message || "GR12-001: Invalid gpu-topology input"
    });
  }
};


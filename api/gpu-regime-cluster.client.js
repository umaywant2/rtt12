export async function gpuRegimeCluster(gpuTopologyOutput) {
  const response = await fetch("/api/gpu-regime-cluster", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(gpuTopologyOutput)
  });

  return response.json();
}


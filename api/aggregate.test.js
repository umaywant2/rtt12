/**
 * RTT/12 — Aggregate Engine Tests
 * --------------------------------
 * Tests the aggregator's ability to merge:
 *   - unifiedTopology
 *   - dashboardModel
 *   - pipelineMetadata
 *
 * All tests use minimal mock objects that satisfy RTT/12
 * required-field constraints.
 */

import { aggregate } from "./aggregate.server.js";

const mockUnifiedTopology = {
  clusters: [],
  regimeSurfaces: [],
  coherenceDrift: [],
  gpuAligned: [],
  metadata: { engine: "RTT/12", version: "2026.1" }
};

const mockDashboardModel = {
  clusters: [],
  regimeSurfaces: [],
  coherenceDrift: [],
  gpuAligned: [],
  metadata: { engine: "RTT/12", version: "2026.1" },
  isEmpty: false
};

const mockPipelineMetadata = {
  engine: "RTT/12",
  version: "2026.1",
  pipeline: "rtt1→rtt2→rtt3→rtt12",
  validated: true
};

describe("RTT/12 Aggregator", () => {

  test("merges all three RTT/12 structures", async () => {
    const result = await aggregate(
      mockUnifiedTopology,
      mockDashboardModel,
      mockPipelineMetadata
    );

    expect(result.ok).toBe(true);
    expect(result.result.unifiedTopology).toBeDefined();
    expect(result.result.dashboardModel).toBeDefined();
    expect(result.result.pipelineMetadata).toBeDefined();
  });

  test("fails when unifiedTopology is missing", async () => {
    const result = await aggregate(
      null,
      mockDashboardModel,
      mockPipelineMetadata
    );

    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/U12-AGG-001/);
  });

  test("fails when dashboardModel is missing", async () => {
    const result = await aggregate(
      mockUnifiedTopology,
      null,
      mockPipelineMetadata
    );

    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/U12-AGG-002/);
  });

  test("fails when pipelineMetadata is missing", async () => {
    const result = await aggregate(
      mockUnifiedTopology,
      mockDashboardModel,
      null
    );

    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/U12-AGG-003/);
  });

});


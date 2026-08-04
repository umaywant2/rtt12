/**
 * RTT/12 — Pipeline Engine Tests
 * ------------------------------
 * Tests RTT/12 pipeline validation across RTT/1, RTT/2, RTT/3 inputs.
 *
 * Required fields:
 *   RTT/1: claritySurface
 *   RTT/2: regimeView, driftView, coherenceView
 *   RTT/3: structuralTopology, intersections, surfaces, gpuTopology.topology.overlays
 */

import { validatePipeline } from "./pipeline.server.js";

const mockRTT1 = {
  claritySurface: {}
};

const mockRTT2 = {
  regimeView: {},
  driftView: {},
  coherenceView: {}
};

const mockRTT3 = {
  structuralTopology: {},
  intersections: [],
  surfaces: [],
  gpuTopology: {
    topology: {
      overlays: []
    }
  }
};

describe("RTT/12 Pipeline Validation", () => {

  test("validates full RTT/1 → RTT/2 → RTT/3 lineage", async () => {
    const result = await validatePipeline(mockRTT1, mockRTT2, mockRTT3);

    expect(result.ok).toBe(true);
    expect(result.result.engine).toBe("RTT/12");
    expect(result.result.validated).toBe(true);
  });

  test("fails when RTT/1 claritySurface is missing", async () => {
    const badRTT1 = {};

    const result = await validatePipeline(badRTT1, mockRTT2, mockRTT3);

    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/U12-PIPE-001/);
  });

  test("fails when RTT/2 regimeView is missing", async () => {
    const badRTT2 = {
      driftView: {},
      coherenceView: {}
    };

    const result = await validatePipeline(mockRTT1, badRTT2, mockRTT3);

    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/U12-PIPE-002/);
  });

  test("fails when RTT/3 gpuTopology is missing", async () => {
    const badRTT3 = {
      structuralTopology: {},
      intersections: [],
      surfaces: []
      // gpuTopology missing
    };

    const result = await validatePipeline(mockRTT1, mockRTT2, badRTT3);

    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/U12-PIPE-003/);
  });

  test("fails when RTT/3 overlays are missing", async () => {
    const badRTT3 = {
      structuralTopology: {},
      intersections: [],
      surfaces: [],
      gpuTopology: {
        topology: {
          // overlays missing
        }
      }
    };

    const result = await validatePipeline(mockRTT1, mockRTT2, badRTT3);

    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/U12-PIPE-004/);
  });

});


import { euroToMeters } from "./euro-to-meters.function";
import { sizes } from "./sizes";

describe("euroToMeters", () => {
  describe("basic conversions", () => {
    it("should convert 1 euro to meters using a 1 euro coin", () => {
      const result = euroToMeters(1, sizes);
      expect(result.meters).toBe(0.02325);
      expect(result.breakdown).toBe("1×€1 coin");
    });

    it("should convert 5 euros to meters using a 5 euro note", () => {
      const result = euroToMeters(5, sizes);
      expect(result.meters).toBe(0.12);
      expect(result.breakdown).toBe("1×€5 note");
    });

    it("should convert 100 euros to meters using a 100 euro note", () => {
      const result = euroToMeters(100, sizes);
      expect(result.meters).toBe(0.147);
      expect(result.breakdown).toBe("1×€100 note");
    });

    it("should convert 200 euros to meters using a 200 euro note", () => {
      const result = euroToMeters(200, sizes);
      expect(result.meters).toBe(0.153);
      expect(result.breakdown).toBe("1×€200 note");
    });
  });

  describe("complex breakdown", () => {
    it("should convert 106 euros using optimal denomination breakdown", () => {
      const result = euroToMeters(106, sizes);
      expect(result.meters).toBe(0.29025);
      expect(result.breakdown).toBe("1×€100 note + 1×€5 note + 1×€1 coin");
    });

    it("should convert 37.50 euros using multiple denominations", () => {
      const result = euroToMeters(37.5, sizes);
      expect(result.meters).toBe(0.43);
      expect(result.breakdown).toBe("1×€20 note + 1×€10 note + 1×€5 note + 1×€2 coin + 1×€0.5 coin");
    });

    it("should handle multiple coins of the same denomination", () => {
      const result = euroToMeters(3, sizes);
      expect(result.meters).toBe(0.049);
      expect(result.breakdown).toBe("1×€2 coin + 1×€1 coin");
    });

    it("should handle cents correctly", () => {
      const result = euroToMeters(0.38, sizes);
      expect(result.meters).toBe(0.09825);
      expect(result.breakdown).toBe("1×€0.2 coin + 1×€0.1 coin + 1×€0.05 coin + 1×€0.02 coin + 1×€0.01 coin");
    });
  });

  describe("large amounts", () => {
    it("should handle 1000 euros", () => {
      const result = euroToMeters(1000, sizes);
      expect(result.meters).toBe(0.32);
      expect(result.breakdown).toBe("2×€500 note");
    });

    it("should handle 250 euros", () => {
      const result = euroToMeters(250, sizes);
      expect(result.meters).toBe(0.293);
      expect(result.breakdown).toBe("1×€200 note + 1×€50 note");
    });
  });

  describe("edge cases", () => {
    it("should handle zero euros", () => {
      const result = euroToMeters(0, sizes);
      expect(result.meters).toBe(0);
      expect(result.breakdown).toBe("");
    });

    it("should handle very small amounts", () => {
      const result = euroToMeters(0.01, sizes);
      expect(result.meters).toBe(0.01625);
      expect(result.breakdown).toBe("1×€0.01 coin");
    });

    it("should handle amounts requiring rounding", () => {
      const result = euroToMeters(0.03, sizes);
      expect(result.meters).toBe(0.035);
      expect(result.breakdown).toBe("1×€0.02 coin + 1×€0.01 coin");
    });
  });

  describe("greedy algorithm behavior", () => {
    it("should use greedy algorithm to minimize number of denominations", () => {
      const result = euroToMeters(6, sizes);
      expect(result.breakdown).toBe("1×€5 note + 1×€1 coin");
    });

    it("should prioritize larger denominations", () => {
      const result = euroToMeters(600, sizes);
      expect(result.breakdown).toBe("1×€500 note + 1×€100 note");
    });
  });

  describe("precision and rounding", () => {
    it("should handle floating point precision correctly", () => {
      const result = euroToMeters(0.17, sizes);
      expect(result.meters).toBe(0.05975);
      expect(result.breakdown).toBe("1×€0.1 coin + 1×€0.05 coin + 1×€0.02 coin");
    });

    it("should round remaining amount to avoid floating point errors", () => {
      const result = euroToMeters(0.33, sizes);
      expect(result.breakdown).toBe("1×€0.2 coin + 1×€0.1 coin + 1×€0.02 coin + 1×€0.01 coin");
    });
  });
});

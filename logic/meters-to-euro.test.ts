import { metersToEuros } from "./meters-to-euro.function";
import { sizes } from "./sizes";

describe("metersToEuros", () => {
  describe("basic conversions", () => {
    it("should convert 0.12 meters to 5 euros (one 5 euro note)", () => {
      const result = metersToEuros(0.12, sizes);
      expect(result.euros).toBe(5);
      expect(result.breakdown).toBe("1×€5 note");
    });

    it("should convert 0.147 meters to 100 euros (one 100 euro note)", () => {
      const result = metersToEuros(0.147, sizes);
      expect(result.euros).toBe(100);
      expect(result.breakdown).toBe("1×€100 note");
    });

    it("should convert small distances to cents", () => {
      const result = metersToEuros(0.01625, sizes);
      expect(result.euros).toBe(0.01);
      expect(result.breakdown).toBe("1×€0.01 coin");
    });
  });

  describe("complex breakdowns", () => {
    it("should convert 0.29025 meters by filling with currency", () => {
      const result = metersToEuros(0.29025, sizes);
      // This fills 290.25mm greedily: 1x500 (160mm) + 1x100 (147mm) = 307mm is too much
      // Actually fills: 1x100 (147mm) + 1x50 (140mm) = 287mm, leaving 3.25mm unused
      expect(result.euros).toBeGreaterThan(100);
      expect(result.breakdown).toContain("note");
    });

    it("should convert 0.049 meters to currency", () => {
      const result = metersToEuros(0.049, sizes);
      // 49mm can fit: 1x2 (25.75mm) + 1x1 (23.25mm) = 49mm exactly
      expect(result.euros).toBe(3);
      expect(result.breakdown).toBe("1×€2 coin + 1×€1 coin");
    });
  });

  describe("large distances", () => {
    it("should handle 1 meter distance", () => {
      const result = metersToEuros(1, sizes);
      expect(result.euros).toBeGreaterThan(0);
      expect(result.breakdown).toContain("€500");
    });

    it("should handle 0.32 meters (2x 500 euro notes)", () => {
      const result = metersToEuros(0.32, sizes);
      expect(result.euros).toBe(1000);
      expect(result.breakdown).toBe("2×€500 note");
    });
  });

  describe("edge cases", () => {
    it("should handle zero meters", () => {
      const result = metersToEuros(0, sizes);
      expect(result.euros).toBe(0);
      expect(result.breakdown).toBe("");
    });

    it("should handle very small distances that fit nothing", () => {
      const result = metersToEuros(0.001, sizes);
      expect(result.euros).toBe(0);
      expect(result.breakdown).toBe("");
    });

    it("should handle distances slightly over a denomination", () => {
      const result = metersToEuros(0.125, sizes);
      // 125mm can fit 1x5 (120mm), leaving 5mm unused
      expect(result.euros).toBe(5);
      expect(result.breakdown).toBe("1×€5 note");
    });
  });

  describe("greedy algorithm behavior", () => {
    it("should use largest denominations first", () => {
      const result = metersToEuros(0.3, sizes);
      // 300mm: 1x500 (160mm) + 1x50 (140mm) would be 300mm but greedily fits 2x50 (280mm)
      expect(result.euros).toBeGreaterThan(50);
      expect(result.breakdown).toContain("€");
    });

    it("should fill as much space as possible", () => {
      const result = metersToEuros(0.2, sizes);
      // 200mm: 1x500 (160mm) leaves 40mm, can add 1x2 (25.75mm) = 185.75mm
      expect(result.euros).toBeGreaterThan(500);
      expect(result.breakdown).toContain("€500");
    });
  });

  describe("precision handling", () => {
    it("should round euros to 2 decimal places", () => {
      const result = metersToEuros(0.03, sizes);
      expect(Number.isInteger(result.euros * 100)).toBe(true);
    });

    it("should handle floating point distances correctly", () => {
      const result = metersToEuros(0.15999, sizes);
      expect(result.euros).toBeGreaterThan(0);
      expect(result.breakdown).not.toBe("");
    });
  });
});

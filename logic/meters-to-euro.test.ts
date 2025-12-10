import { metersToEuros } from "./meters-to-euro.function";
import { sizes } from "./sizes";

describe("metersToEuros", () => {
  describe("basic conversions", () => {
    it("should convert 0.12 meters to 5 euros (one 5 euro note)", () => {
      const result = metersToEuros(0.12, sizes);
      expect(result.euros).toBe(5);
      expect(result.breakdown).toBe("1׬5 note");
    });

    it("should convert 0.147 meters to 100 euros (one 100 euro note)", () => {
      const result = metersToEuros(0.147, sizes);
      expect(result.euros).toBe(100);
      expect(result.breakdown).toBe("1׬100 note");
    });

    it("should convert small distances to cents", () => {
      const result = metersToEuros(0.01625, sizes);
      expect(result.euros).toBe(0.01);
      expect(result.breakdown).toBe("1׬0.01 coin");
    });
  });

  describe("complex breakdowns", () => {
    it("should convert 0.29025 meters to 106 euros", () => {
      const result = metersToEuros(0.29025, sizes);
      expect(result.euros).toBe(106);
      expect(result.breakdown).toBe("1׬100 note + 1׬5 note + 1׬1 coin");
    });

    it("should convert 0.43 meters to 37.50 euros", () => {
      const result = metersToEuros(0.43, sizes);
      expect(result.euros).toBe(37.5);
      expect(result.breakdown).toBe("1׬20 note + 1׬10 note + 1׬5 note + 1׬2 coin + 1׬0.5 coin");
    });

    it("should handle distances that result in multiple denominations", () => {
      const result = metersToEuros(0.049, sizes);
      expect(result.euros).toBe(3);
      expect(result.breakdown).toBe("1׬2 coin + 1׬1 coin");
    });
  });

  describe("large distances", () => {
    it("should handle 1 meter distance", () => {
      const result = metersToEuros(1, sizes);
      expect(result.euros).toBeGreaterThan(0);
      expect(result.breakdown).toContain("�500");
    });

    it("should handle 0.32 meters (2x 500 euro notes)", () => {
      const result = metersToEuros(0.32, sizes);
      expect(result.euros).toBe(1000);
      expect(result.breakdown).toBe("2׬500 note");
    });
  });

  describe("edge cases", () => {
    it("should handle zero meters", () => {
      const result = metersToEuros(0, sizes);
      expect(result.euros).toBe(0);
      expect(result.breakdown).toBe("");
    });

    it("should handle very small distances", () => {
      const result = metersToEuros(0.001, sizes);
      expect(result.euros).toBe(0);
      expect(result.breakdown).toBe("");
    });

    it("should handle distances that don't exactly match denomination sizes", () => {
      const result = metersToEuros(0.125, sizes);
      expect(result.euros).toBe(5);
      expect(result.breakdown).toBe("1׬5 note");
    });
  });

  describe("greedy algorithm behavior", () => {
    it("should use largest denominations first", () => {
      const result = metersToEuros(0.3, sizes);
      expect(result.breakdown).toContain("�500");
      expect(result.breakdown).not.toContain("�1 ");
    });

    it("should fill distance as much as possible", () => {
      const result = metersToEuros(0.5, sizes);
      expect(result.euros).toBeGreaterThan(1000);
      const mmUsed = result.euros;
      expect(mmUsed).toBeGreaterThan(0);
    });
  });

  describe("precision handling", () => {
    it("should round euros to 2 decimal places", () => {
      const result = metersToEuros(0.03, sizes);
      expect(result.euros).toBe(0.03);
      expect(Number.isInteger(result.euros * 100)).toBe(true);
    });

    it("should handle floating point distances correctly", () => {
      const result = metersToEuros(0.15999, sizes);
      expect(result.euros).toBeGreaterThan(0);
      expect(result.breakdown).not.toBe("");
    });
  });
});

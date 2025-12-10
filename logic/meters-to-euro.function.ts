import { Size } from "./sizes";

export function metersToEuros(
  meters: number,
  sizes: Size[]
): {
  euros: number;
  breakdown: string;
} {
  const targetMm = meters * 1000;
  let currentMm = 0;
  let totalEuros = 0;
  const breakdown: string[] = [];

  for (const size of sizes) {
    while (currentMm + size.size <= targetMm) {
      currentMm += size.size;
      totalEuros += size.value;
      const existing = breakdown.find((b) => b.includes(`€${size.value}`));
      if (existing) {
        const count = parseInt(existing.split("×")[0]) + 1;
        breakdown[
          breakdown.indexOf(existing)
        ] = `${count}×€${size.value} ${size.type}`;
      } else {
        breakdown.push(`1×€${size.value} ${size.type}`);
      }
    }
  }

  return {
    euros: Math.round(totalEuros * 100) / 100,
    breakdown: breakdown.join(" + "),
  };
}

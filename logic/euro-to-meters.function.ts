import { Size } from "./sizes";

export function euroToMeters(
  euros: number,
  sizes: Size[]
): {
  meters: number;
  breakdown: string;
} {
  let remaining = euros;
  let totalMm = 0;
  const breakdown: string[] = [];

  for (const size of sizes) {
    if (remaining >= size.value) {
      const count = Math.floor(remaining / size.value);
      remaining = Math.round((remaining - count * size.value) * 100) / 100;
      totalMm += count * size.size;
      breakdown.push(`${count}×€${size.value} ${size.type}`);
    }
  }

  return {
    meters: totalMm / 1000,
    breakdown: breakdown.join(" + "),
  };
}

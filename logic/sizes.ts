export interface Size {
  value: number;
  size: number;
  type: "coin" | "note";
}

export const sizes: Size[] = [
  { value: 500, size: 160, type: "note" },
  { value: 200, size: 153, type: "note" },
  { value: 100, size: 147, type: "note" },
  { value: 50, size: 140, type: "note" },
  { value: 20, size: 133, type: "note" },
  { value: 10, size: 127, type: "note" },

  { value: 5, size: 120, type: "note" },
  { value: 2, size: 25.75, type: "coin" },
  { value: 1, size: 23.25, type: "coin" },
  { value: 0.5, size: 24.25, type: "coin" },
  { value: 0.2, size: 22.25, type: "coin" },
  { value: 0.1, size: 19.75, type: "coin" },
  { value: 0.05, size: 21.25, type: "coin" },
  { value: 0.02, size: 18.75, type: "coin" },
  { value: 0.01, size: 16.25, type: "coin" },
];

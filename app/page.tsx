"use client";

import { Button } from "@/components/button.component";
import { Input } from "@/components/input.component";
import { Win98Window } from "@/components/win98-window.component";
import { euroToMeters } from "@/logic/euro-to-meters.function";
import { metersToEuros } from "@/logic/meters-to-euro.function";
import { sizes } from "@/logic/sizes";
import { useState } from "react";

export default function Home() {
  const [euroValue, setEuroValue] = useState("");
  const [meterValue, setMeterValue] = useState("");
  const [breakdown, setBreakdown] = useState("");

  const handleEuroChange = (value: string) => {
    setEuroValue(value);
    const euros = parseFloat(value);
    if (!isNaN(euros) && euros > 0) {
      const result = euroToMeters(euros, sizes);
      setMeterValue(result.meters.toFixed(2));
      setBreakdown(result.breakdown);
    } else {
      setMeterValue("");
      setBreakdown("");
    }
  };

  const handleMeterChange = (value: string) => {
    setMeterValue(value);
    const meters = parseFloat(value);
    if (!isNaN(meters) && meters > 0) {
      const result = metersToEuros(meters, sizes);
      setEuroValue(result.euros.toFixed(2));
      setBreakdown(result.breakdown);
    } else {
      setEuroValue("");
      setBreakdown("");
    }
  };

  const handleClear = () => {
    setEuroValue("");
    setMeterValue("");
    setBreakdown("");
  };

  return (
    <div className="min-h-screen bg-[#008080] flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <Win98Window title="€ to meters">
          <div className="text-center mb-8">
            <h2
              className="text-4xl font-bold text-black mb-2"
              style={{ fontFamily: "MS Sans Serif, Arial, sans-serif" }}
            >
              € to meters
            </h2>
            <p className="text-black text-sm">Currency to Distance Converter</p>
          </div>

          <div className="space-y-4">
            <Input
              label="Amount in Euros (€):"
              placeholder="0.00"
              value={euroValue}
              onChange={handleEuroChange}
            />

            <Input
              label="Distance in Meters:"
              placeholder="0.00"
              value={meterValue}
              onChange={handleMeterChange}
            />

            {breakdown && (
              <div
                className="bg-white border-2 p-3 text-black text-sm"
                style={{
                  borderTopColor: "#808080",
                  borderLeftColor: "#808080",
                  borderBottomColor: "#ffffff",
                  borderRightColor: "#ffffff",
                  fontFamily: "MS Sans Serif, Arial, sans-serif",
                }}
              >
                <strong>Breakdown:</strong> {breakdown}
              </div>
            )}

            <div className="flex gap-2 justify-center mt-6">
              <Button onClick={handleClear}>Clear</Button>
            </div>
          </div>
        </Win98Window>
      </div>
    </div>
  );
}

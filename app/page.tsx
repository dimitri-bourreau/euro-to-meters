import { Button } from "@/components/button.component";
import { Input } from "@/components/input.component";
import { Win98Window } from "@/components/win98-window.component";

export default function Home() {
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
            <Input label="Amount in Euros (€):" placeholder="0.00" />

            <Input label="Distance in Meters:" placeholder="0.00 m" readOnly />

            <div className="flex gap-2 justify-center mt-6">
              <Button>Convert</Button>
              <Button>Clear</Button>
            </div>
          </div>
        </Win98Window>
      </div>
    </div>
  );
}

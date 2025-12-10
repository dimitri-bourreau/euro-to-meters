export const Input = ({
  label,
  placeholder = "",
  readOnly = false,
  value,
  onChange,
}: {
  label: string;
  placeholder?: string;
  readOnly?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}) => (
  <div>
    <label className="block text-black mb-1 font-bold text-sm">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      readOnly={readOnly}
      className="w-full bg-white border-2 px-2 py-1 text-black"
      style={{
        borderTopColor: "#808080",
        borderLeftColor: "#808080",
        borderBottomColor: "#ffffff",
        borderRightColor: "#ffffff",
        fontFamily: "MS Sans Serif, Arial, sans-serif",
      }}
      placeholder={placeholder}
    />
  </div>
);

export const Input = ({
  label,
  placeholder = "",
  readOnly = false,
}: {
  label: string;
  placeholder?: string;
  readOnly?: boolean;
}) => (
  <div>
    <label className="block text-black mb-1 font-bold text-sm">{label}</label>
    <input
      type="text"
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

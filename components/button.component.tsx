export const Button = ({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => (
  <button
    onClick={onClick}
    className={`bg-[#c0c0c0] border-2 px-6 py-2 text-black font-bold ${className} cursor-pointer`}
    style={{
      borderTopColor: "#ffffff",
      borderLeftColor: "#ffffff",
      borderBottomColor: "#000000",
      borderRightColor: "#000000",
      boxShadow: "inset 1px 1px 0 #dfdfdf, inset -1px -1px 0 #808080",
      fontFamily: "MS Sans Serif, Arial, sans-serif",
    }}
  >
    {children}
  </button>
);

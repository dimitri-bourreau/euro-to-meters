import { TitleBar } from "./title-bar.component";

export const Win98Window = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div
    className="bg-[#c0c0c0] border-2 p-1"
    style={{
      borderTopColor: "#ffffff",
      borderLeftColor: "#ffffff",
      borderBottomColor: "#808080",
      borderRightColor: "#808080",
      boxShadow: "inset 1px 1px 0 #dfdfdf, inset -1px -1px 0 #000000",
    }}
  >
    <TitleBar title={title} />
    <div className="bg-[#c0c0c0] p-8">{children}</div>
  </div>
);

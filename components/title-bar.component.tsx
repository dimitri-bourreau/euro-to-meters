export const TitleBar = ({ title }: { title: string }) => (
  <div className="bg-[#000080] text-white px-2 py-1 flex items-center justify-between mb-1">
    <h1 className="font-bold text-lg">{title}</h1>
  </div>
);

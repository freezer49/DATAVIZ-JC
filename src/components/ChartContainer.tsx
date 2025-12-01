interface Props {
  children: React.ReactNode;
}

export default function ChartContainer({ children }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 sm:p-6 md:p-8 hover:shadow-lg transition-shadow hover:border-[#220100] flex flex-col">
      {children}
    </div>
  );
}

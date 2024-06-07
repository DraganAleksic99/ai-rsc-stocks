export default function StocksSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row text-sm gap-2">
      <div className="bg-zinc-900 text-left p-2 rounded-lg flex-auto cursor-pointer hover:bg-zinc-800 h-[60px] sm:w-[208px] w-full animate-pulse"></div>
      <div className="bg-zinc-900 text-left p-2 rounded-lg flex-auto cursor-pointer hover:bg-zinc-800 h-[60px] sm:w-[208px] w-full animate-pulse"></div>
      <div className="bg-zinc-900 text-left p-2 rounded-lg flex-auto cursor-pointer hover:bg-zinc-800 h-[60px] sm:w-[208px] w-full animate-pulse"></div>
    </div>
  );
}

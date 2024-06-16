"use client";

import { useState } from "react";
import { formatNumber } from "@/lib/utils";

export default function StockPurchase({
  symbol,
  price,
  numberOfShares = 10,
}: {
  symbol: string;
  price: number;
  numberOfShares?: number;
}) {
  return (
    <div className="p-4 text-green-400 border rounded-xl bg-zinc-950">
      <div className="inline-block float-right px-2 py-1 text-xs rounded-full bg-white/10">
        +1.23% ↑
      </div>
      <div className="text-lg text-zinc-300">{symbol}</div>
      <div className="text-3xl font-bold">${price}</div>

      <div className="relative pb-6 mt-6">
        <p>Shares to purchase</p>
        <input
          id="labels-range-input"
          type="range"
          value={numberOfShares}
          min="10"
          max="1000"
          className="w-full h-1 rounded-lg appearance-none cursor-pointer bg-zinc-600 accent-green-500 dark:bg-zinc-700 mt-6"
        />
        <span className="absolute text-xs bottom-1 start-0 text-zinc-400">
          10
        </span>
        <span className="absolute text-xs -translate-x-1/2 bottom-1 start-1/3 text-zinc-400 rtl:translate-x-1/2">
          100
        </span>
        <span className="absolute text-xs -translate-x-1/2 bottom-1 start-2/3 text-zinc-400 rtl:translate-x-1/2">
          500
        </span>
        <span className="absolute text-xs bottom-1 end-0 text-zinc-400">
          1000
        </span>
      </div>

      <div className="mt-6">
        <p>Total cost</p>
        <div className="flex flex-wrap items-center text-xl font-bold sm:items-end sm:gap-2 sm:text-3xl mt-2">
          <div className="flex flex-col basis-1/3 sm:basis-auto sm:flex-row sm:items-center sm:gap-2 tabular-nums">
            {numberOfShares}
            <span className="mb-1 text-sm font-normal text-zinc-600 dark:text-zinc-400 sm:mb-0">
              shares
            </span>
          </div>
          <div className="text-center basis-1/3 sm:basis-auto">×</div>
          <span className="flex flex-col basis-1/3 sm:basis-auto sm:flex-row sm:items-center sm:gap-2 tabular-nums">
            ${price}
            <span className="mb-1 ml-1 text-sm font-normal text-zinc-600 dark:text-zinc-400 sm:mb-0">
              per share
            </span>
          </span>
          <div className="pt-2 mt-2 text-center border-t basis-full sm:text-left sm:basis-auto border-t-zinc-700 sm:border-0 sm:mt-0 sm:pt-0">
            = <span>{formatNumber(numberOfShares * price)}</span>
          </div>
        </div>
      </div>

      <button className="w-full px-4 py-2 mt-6 bg-green-500 rounded-lg dark:bg-green-500 text-zinc-900">
        Purchase
      </button>
    </div>
  );
}

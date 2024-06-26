"use client";

import { type TStock } from "./stock";
import { useUIState, useActions } from "ai/rsc";
import { AI } from "@/app/action";

export default function Stocks({ stocks }: { stocks: TStock[] }) {
  const [, setMessages] = useUIState<typeof AI>();
  const { continueConversation } = useActions();

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-evenly text-sm">
      {stocks.map(stock => (
        <button
          key={stock.symbol}
          className="flex-auto flex flex-row gap-2 p-2 text-left rounded-lg cursor-pointer bg-zinc-900 hover:bg-zinc-800"
          onClick={async () => {
            const response = await continueConversation(
              `Preview the stock price of ${stock.symbol}. The price is ${stock.price} and delta is ${stock.delta}`
            );
            setMessages(currentMessages => [...currentMessages, response]);
          }}
        >
          <div
            className={`text-xl ${
              stock.delta > 0 ? "text-green-600" : "text-red-600"
            } p-2 w-11 bg-white/10 flex flex-row justify-center rounded-md`}
          >
            {stock.delta > 0 ? "↑" : "↓"}
          </div>
          <div className="flex flex-col">
            <div className="uppercase text-zinc-300 bold">{stock.symbol}</div>
            <div className="text-base text-zinc-500">${stock.price}</div>
          </div>
          <div className="flex flex-col ml-auto">
            <div
              className={`${
                stock.delta > 0 ? "text-green-600" : "text-red-600"
              } bold uppercase text-right`}
            >
              {` ${((stock.delta / stock.price) * 100).toFixed(2)}%`}
            </div>
            <div
              className={`${
                stock.delta > 0 ? "text-green-700" : "text-red-700"
              } text-base text-right`}
            >
              {stock.delta}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

import "server-only";

import { createAI, getMutableAIState, streamUI } from "ai/rsc";
import { openai } from "@ai-sdk/openai";
import { nanoid } from "nanoid";
import { z } from "zod";
import BotMessage from "@/components/bot-message";
import BotCard from "@/components/bot-card";
import StocksSkeleton from "@/components/stocks-skeleton";
import Stocks from "@/components/stocks";

export interface ServerMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ClientMessage {
  id: string;
  role: "user" | "assistant";
  display: React.ReactNode;
}

export async function continueConversation(
  input: string
): Promise<ClientMessage> {
  "use server";

  const history = getMutableAIState();

  const loadingSpinner = (
    <BotMessage>
      <svg
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 animate-spin stroke-zinc-400"
      >
        <path d="M12 3v3m6.366-.366-2.12 2.12M21 12h-3m.366 6.366-2.12-2.12M12 21v-3m-6.366.366 2.12-2.12M3 12h3m-.366-6.366 2.12 2.12"></path>
      </svg>
    </BotMessage>
  );

  const result = await streamUI({
    model: openai("gpt-3.5-turbo"),
    initial: loadingSpinner,
    system: `
        You are a stock trading conversation bot and you can help users buy stocks, step by step.
        You and the user can discuss stock prices and the user can adjust the amount of stocks they want to buy, or place an order, in the UI.
        
        Messages inside [] means that it's a UI element or a user event. For example:
        - "[Price of AAPL = 100]" means that an interface of the stock price of AAPL is shown to the user.
        - "[User has changed the amount of AAPL to 10]" means that the user has changed the amount of AAPL to 10 in the UI.

        If you want to show trending stocks, call \`list_stocks\`.
        If the user wants to sell stock, or complete another impossible task, respond that you are a demo and cannot do that.
        
        Besides that, you can also chat with users and do some calculations if needed.`,
    temperature: 0.2,
    messages: [...history.get(), { role: "user", content: input }],
    text: ({ content, done }) => {
      if (done) {
        history.done((messages: ServerMessage[]) => [
          ...messages,
          {
            role: "assistant",
            content,
          },
        ]);
      }
      return <BotMessage>{content}</BotMessage>;
    },
    tools: {
      list_stocks: {
        description: "List three stocks from the fortune 500 companies",
        parameters: z.object({
          stocks: z.array(
            z.object({
              symbol: z.string().describe("The symbol of the stock"),
              price: z.number().describe("The price of the stock"),
              delta: z.number().describe("The change in price of the stock"),
            })
          ),
        }),
        generate: async function* ({ stocks }) {
          const loadingUi = (
            <BotCard>
              <StocksSkeleton />
            </BotCard>
          );

          yield loadingUi;

          await new Promise(resolve => setTimeout(resolve, 1000));

          return (
            <BotCard>
              <Stocks stocks={stocks} />
            </BotCard>
          );
        },
      },
    },
  });

  return {
    id: nanoid(),
    role: "assistant",
    display: result.value,
  };
}

const initialAIState: {
  role: "user" | "assistant" | "system";
  content: string;
  id?: string;
}[] = [];

const initialUIState: {
  id: string;
  role: "user";
  display: React.ReactNode;
}[] = [];

export const AI = createAI<Array<ServerMessage>, Array<ClientMessage>>({
  actions: {
    continueConversation,
  },
  initialAIState,
  initialUIState,
});

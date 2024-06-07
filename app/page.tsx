"use client";

import { useState, useEffect, useRef } from "react";
import { useActions, useUIState } from "ai/rsc";
import Textarea from "react-textarea-autosize";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import UserMessage from "@/components/user-message";
import EmptyScreen from "@/components/empty-screen";
import { ClientMessage } from "./action";
import { nanoid } from "nanoid";

export const dynamic = "force-dynamic";
export const maxDuration = "30";

export default function Home() {
  const [conversation, setConversation] = useUIState();
  const { continueConversation } = useActions();
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "f") {
        if (
          e.target &&
          ["INPUT", "TEXTAREA"].includes((e.target as any).nodeName)
        ) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        if (inputRef?.current) {
          inputRef.current.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputRef]);

  const handleSubmit = async (input: string) => {
    setInput(input);

    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      {
        id: nanoid(),
        role: "user",
        display: input,
      },
    ]);

    const message = await continueConversation(input);
    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      message,
    ]);

    setInput("");
  };

  return (
    <main className="flex flex-col items-center justify-center max-w-screen-xl mx-auto">
      <div className="lg:mx-auto w-full lg:max-w-3xl lg:basis-3/4 pb-5">
        <div className="pb-[200px] pt-4 px-4 flex flex-col space-y-4">
          {conversation?.length ? (
            <>
              {conversation.map((message: ClientMessage) => {
                if (message.role === "user") {
                  return (
                    <UserMessage key={message.id}>
                      {message.display}
                    </UserMessage>
                  );
                }

                return <div key={message.id}>{message.display}</div>;
              })}
            </>
          ) : (
            <EmptyScreen submitMessage={handleSubmit} />
          )}
        </div>
        <div className="px-4">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSubmit(input);
            }}
          >
            <div className="relative flex flex-col w-full overflow-hidden max-h-60 grow bg-background rounded-md border px-12">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute w-8 h-8 p-0 rounded-full top-4 bg-background left-4"
                    onClick={e => {
                      e.preventDefault();
                      window.location.reload();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 256"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path d="M224 128a8 8 0 0 1-8 8h-80v80a8 8 0 0 1-16 0v-80H40a8 8 0 0 1 0-16h80V40a8 8 0 0 1 16 0v80h80a8 8 0 0 1 8 8Z" />
                    </svg>
                    <span className="sr-only">New Chat</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>New Chat</TooltipContent>
              </Tooltip>
              <Textarea
                ref={inputRef}
                tabIndex={0}
                placeholder="Send a message."
                className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
                autoFocus
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                name="message"
                rows={1}
                value={input}
                onChange={e => setInput(e.target.value)}
              />
              <div className="absolute top-4 right-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="submit"
                      size="icon"
                      disabled={input === ""}
                      className="w-8 h-8"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 256"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <path d="M200 32v144a8 8 0 0 1-8 8H67.31l34.35 34.34a8 8 0 0 1-11.32 11.32l-48-48a8 8 0 0 1 0-11.32l48-48a8 8 0 0 1 11.32 11.32L67.31 168H184V32a8 8 0 0 1 16 0Z" />
                      </svg>
                      <span className="sr-only">Send message</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Send message</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </form>
          <p className="text-xs text-center leading-normal text-muted-foreground pt-2">
            Focus input on
            <span className="italic">"f"</span>
          </p>
        </div>
      </div>
    </main>
  );
}

import { Button } from "@/components/ui/button";

const exampleMessages = [
  {
    message: "What are the trending stocks?",
  },
  {
    message: "What's the stock price of AAPL?",
  },
  {
    message: "I'd like to buy 10 shares of MSFT",
  },
];

export default function EmptyScreen({
  submitMessage,
}: {
  submitMessage: (message: string) => void;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4">
      <div className="rounded-lg border bg-background p-8 mb-4">
        <h1 className="mb-2 text-lg font-semibold">Welcome!</h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          This is a demo of an interactive financial assistant. It can show you
          stocks, tell you their prices, and even help you buy shares.
        </p>
        <p className="leading-normal text-muted-foreground">Try an example:</p>
        <div className="mt-4 flex flex-col items-start space-y-2 mb-4">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={async e => {
                submitMessage(message.message);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="m221.66 133.66-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32Z" />
              </svg>
              {message.message}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

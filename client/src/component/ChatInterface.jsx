import { useContext } from "react";
import { ChatContext } from "../context/ChatContextProvider";

function ChatInterface() {
  const { setText, response, isLoading } = useContext(ChatContext);

  const buttonList = [
    { prompt: "summerize pdf", content: "summerize pdf" },
    { prompt: "Ask about resume", content: "Ask about resume" },
    {
      prompt: "Analyze interview transcript",
      content: "Analyze interview transcript",
    },
    {
      prompt: "Evaluate resume vs job description",
      content: "Evaluate resume vs job description",
    },
  ];
  return (
    <>
      <div className="py-5 pb-32 text-neutral-900 max-w-[60vw] mx-auto ">
        {response.length === 0 && (
          <div className="flex flex-col md:flex-row gap-2 justify-center w-full ">
            {buttonList.map((item, index) => (
              <button
                key={index}
                className="text-left font-medium text-neutral-900 py-2 px-3 bg-zinc-100 rounded-full hover:bg-amber-300 transition-colors cursor-pointer"
                onClick={() => setText(item.prompt)}
              >
                {item.content}
              </button>
            ))}
          </div>
        )}
        <div className="my-8">
          {response.map((item, index) => {
            const matchScore = item.match || 0;
            let badgeColor = "bg-red-50 text-red-700 border-red-200";
            let barColor = "bg-red-500";
            if (matchScore >= 75) {
              badgeColor = "bg-green-50 text-green-700 border-green-200";
              barColor = "bg-green-500";
            } else if (matchScore >= 50) {
              badgeColor = "bg-amber-50 text-amber-700 border-amber-200";
              barColor = "bg-amber-500";
            }

            return (
              <div
                key={index}
                className="mb-6 bg-white border border-neutral-200 rounded-xl p-6 shadow-sm transition-all hover:shadow-md max-w-[60vw] mx-auto mt-4"
              >
                {/* Header with Match Percentage */}
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-neutral-100">
                  <h3 className="font-semibold text-neutral-800 text-lg">
                    Analysis Result
                  </h3>
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full border ${badgeColor}`}
                  >
                    {matchScore}% Match
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-neutral-100 rounded-full h-2.5 mb-5 overflow-hidden">
                  <div
                    className={`${barColor} h-2.5 rounded-full transition-all duration-500`}
                    style={{ width: `${matchScore}%` }}
                  ></div>
                </div>

                {/* Reasoning Section */}
                <div className="mb-4">
                  <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-bold mb-1">
                    Reasoning
                  </h4>
                  <p className="text-neutral-700 text-sm leading-relaxed">
                    {item.reasoning}
                  </p>
                </div>

                {/* Suggestions Section */}
                {item.suggestion && (
                  <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-100">
                    <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-bold mb-2">
                      Suggestions
                    </h4>
                    <p className="text-neutral-600 text-sm leading-relaxed whitespace-pre-line">
                      {item.suggestion}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          {/* Skeleton Loader during Querying */}
          {isLoading && (
            <div className="mb-6 bg-white border border-neutral-200 rounded-xl p-6 shadow-sm animate-pulse max-w-[60vw] mx-auto mt-4">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-neutral-100">
                <div className="h-5 bg-neutral-200 rounded w-1/4"></div>
                <div className="h-6 bg-neutral-200 rounded-full w-16"></div>
              </div>
              <div className="w-full bg-neutral-100 rounded-full h-2.5 mb-5">
                <div className="bg-neutral-200 h-2.5 rounded-full w-2/3"></div>
              </div>
              <div className="mb-4 space-y-2">
                <div className="h-3 bg-neutral-200 rounded w-12"></div>
                <div className="h-4 bg-neutral-200 rounded w-full"></div>
                <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
              </div>
              <div className="bg-neutral-50 rounded-lg p-4 space-y-2">
                <div className="h-3 bg-neutral-200 rounded w-16"></div>
                <div className="h-4 bg-neutral-200 rounded w-4/5"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ChatInterface;

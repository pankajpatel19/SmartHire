import { useContext } from "react";
import { ChatContext } from "../context/ChatContextProvider";

function ChatInterface() {
  const { setText } = useContext(ChatContext);

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
      <div className="py-5 text-neutral-900 max-w-[60vw] mx-auto ">
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
      </div>
    </>
  );
}

export default ChatInterface;

import { useContext } from "react";
import { ChatContext } from "../context/ChatContextProvider";

function ChatInput() {
  const { text, setText } = useContext(ChatContext);
  return (
    <>
      <div className="flex fixed bottom-0 w-screen justify-center items-center p-5">
        <input
          className="w-[60vw] border border-gray-400 bg-neutral-100 p-3 rounded-l-lg"
          type="text"
          name="prompt"
          id="prompt"
          placeholder="Prompt"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="p-3 bg-amber-300">Send</button>
      </div>
    </>
  );
}

export default ChatInput;

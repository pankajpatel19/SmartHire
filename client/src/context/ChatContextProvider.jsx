import { createContext, useState } from "react";

export const ChatContext = createContext(null);
function ChatContextProvider({ children }) {
  const [text, setText] = useState("");
  const contextValue = { text, setText };
  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
}

export default ChatContextProvider;

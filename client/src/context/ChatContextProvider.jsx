import { createContext, useState } from "react";

export const ChatContext = createContext(null);
function ChatContextProvider({ children }) {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const contextValue = {
    text,
    setText,
    isLoading,
    setIsLoading,
    response,
    setResponse,
  };
  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
}

export default ChatContextProvider;

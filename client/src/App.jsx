import ChatInput from "./component/ChatInput";
import ChatInterface from "./component/ChatInterface";
import Header from "./component/Header";
import ChatContextProvider from "./context/ChatContextProvider";

function App() {
  return (
    <>
      <ChatContextProvider>
        <Header />
        <ChatInterface />
        <ChatInput />
      </ChatContextProvider>
    </>
  );
}

export default App;

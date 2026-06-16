import { ToastContainer } from "react-toastify";
import ChatInput from "./component/ChatInput";
import ChatInterface from "./component/ChatInterface";
import Header from "./component/Header";
import ChatContextProvider from "./context/ChatContextProvider";

function App() {
  return (
    <>
      <ChatContextProvider>
        <Header />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          theme="dark"
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <ChatInterface />
        <ChatInput />
      </ChatContextProvider>
    </>
  );
}

export default App;

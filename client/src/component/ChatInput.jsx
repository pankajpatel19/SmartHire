import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContextProvider";
import axios from "axios";
import { toast } from "react-toastify";
function ChatInput() {
  const { text, setText, setResponse } = useContext(ChatContext);

  const [resume, setResume] = useState(null);

  const uploadfile = async (resume) => {
    const formData = new FormData();
    formData.append("resume", resume);

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/resume/upload-resume`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    toast.success(res.data.message);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/chat/query`,
        {
          query: text,
        },
      );
      setResponse((prev) => [...prev, res.data.data]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex fixed bottom-0 w-screen justify-center items-center p-5 gap-2">
        <div className="w-[60vw] border border-gray-400 rounded-xl flex items-center overflow-hidden bg-neutral-100">
          <input
            className="w-full h-10 p-3 rounded-l-lg focus:outline-none bg-transparent"
            type="text"
            name="prompt"
            id="prompt"
            placeholder="Prompt"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          {resume && (
            <button
              onClick={() => uploadfile(resume)}
              className="p-3 bg-neutral-200 disabled:bg-neutral-200 disabled:cursor-not-allowed transition-colors"
            >
              Upload
            </button>
          )}
          <input
            type="file"
            name="resume"
            id="resume"
            className={`${resume ? "hidden" : ""} `}
            onChange={(e) => setResume(e.target.files[0])}
          />
          {text && (
            <button
              className="p-3 bg-neutral-200 disabled:bg-neutral-200 disabled:cursor-not-allowed transition-colors"
              onClick={() => setText("")}
              disabled={text.trim() === ""}
            >
              X
            </button>
          )}
        </div>
        <button
          className="p-3 bg-amber-300 rounded-full disabled:bg-neutral-200 disabled:cursor-not-allowed transition-colors"
          onClick={handleSubmit}
          disabled={text.trim() === "" || !resume}
        >
          Send
        </button>
      </div>
    </>
  );
}

export default ChatInput;

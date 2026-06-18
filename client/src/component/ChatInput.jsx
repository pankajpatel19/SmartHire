import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContextProvider";
import axios from "axios";
import { toast } from "react-toastify";
function ChatInput() {
  const { text, setText, setResponse, isLoading, setIsLoading } = useContext(ChatContext);

  const [resume, setResume] = useState(null);

  const uploadfile = async (resumeFile) => {
    const formData = new FormData();
    formData.append("resume", resumeFile);

    await axios.post(
      `${import.meta.env.VITE_API_URL}/resume/upload-resume`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
  };

  const handleSubmit = async (selectedResume) => {
    if (!text.trim()) return;
    setIsLoading(true);
    try {
      if (selectedResume) {
        await uploadfile(selectedResume);
      }
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/chat/query`,
        {
          query: text,
        },
      );
      setResponse((prev) => [...prev, res.data.data]);
      setResume(null); // Clear selected file after successful processing
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to process request");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="flex fixed bottom-0 w-screen justify-center items-center p-5 gap-2">
        <div className="w-[60vw] border border-gray-400 rounded-xl flex items-center overflow-hidden bg-neutral-100">
          <input
            className="w-full h-10 p-3 rounded-l-lg focus:outline-none bg-transparent disabled:opacity-50"
            type="text"
            name="prompt"
            id="prompt"
            placeholder={isLoading ? "Processing..." : "Prompt"}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSubmit(resume)}
            disabled={isLoading}
          />
          <input
            type="file"
            name="resume"
            id="resume"
            className={`${resume ? "hidden" : ""} disabled:opacity-50`}
            onChange={(e) => setResume(e.target.files[0])}
            disabled={isLoading}
          />
          {resume && (
            <span className="p-3 bg-neutral-200 disabled:bg-neutral-200 disabled:cursor-not-allowed transition-colors text-sm truncate max-w-[200px]">
              {resume.name}
            </span>
          )}
          {text && (
            <button
              className="p-3 bg-neutral-200 disabled:bg-neutral-200 disabled:cursor-not-allowed transition-colors"
              onClick={() => setText("")}
              disabled={text.trim() === "" || isLoading}
            >
              X
            </button>
          )}
        </div>
        <button
          className="p-3 bg-amber-300 rounded-full disabled:bg-neutral-200 disabled:cursor-not-allowed transition-colors w-12 h-12 flex items-center justify-center font-bold"
          onClick={() => handleSubmit(resume)}
          disabled={text.trim() === "" || !resume || isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-neutral-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            "→"
          )}
        </button>
      </div>
    </>
  );
}

export default ChatInput;

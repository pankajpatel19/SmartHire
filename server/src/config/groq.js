import { ChatGroq } from "@langchain/groq";
import { GROQ_API_KEY } from "../utils/env.js";

export const groq = new ChatGroq({
  apiKey: GROQ_API_KEY,
  model: "llama-3.3-70b-versatile",
});

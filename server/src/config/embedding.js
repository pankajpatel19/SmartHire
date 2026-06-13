import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { HUGGINGFACE_API_KEY } from "../utils/env.js";

export const embedder = new HuggingFaceInferenceEmbeddings({
  apiKey: HUGGINGFACE_API_KEY,
  model: "sentence-transformers/all-MiniLM-L6-v2",
});

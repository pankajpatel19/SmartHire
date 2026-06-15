import { PineconeStore } from "@langchain/pinecone";
import { embedder } from "../config/embedding.js";
import { pineconeIndex } from "../service/storeEmbeddings.js";
import { groq } from "../config/groq.js";

export const getChatResponse = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ message: "Please provide a query" });
    }
    //connect the vector database
    const vectorStore = await PineconeStore.fromExistingIndex(embedder, {
      pineconeIndex,
    });

    //search with similerity
    const result = await vectorStore.similaritySearch(query, 10);
    const context = result.map((doc) => doc.pageContent);

    const prompt = `You are an expert AI assistant specialized in analyzing candidate profiles, resumes, and extracted context to provide accurate job-related insights and answer profile-specific questions.

    Context/Data:
    ${context.join("\n")}

    Instructions:
    1. Answer the user's question accurately based on the provided Context/Data.
    2. If the user asks about personal details (like name, email, skills, or projects), extract them smartly from the provided context.
    3. Maintain a professional yet helpful tone.
    4. Only say "I don't have enough information to answer that." if the context absolutely does not contain any relevant clues, keywords, or data to answer the question.

    Question: ${query}

    Answer: 
                    `;

    const response = await groq.invoke(prompt);

    return res.status(200).json({ message: "query", data: response.content });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

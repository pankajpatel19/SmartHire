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

    const prompt = `You are an AI assistant specialized in analyzing resumes and providing job-related insights. Use the following context to answer the user's question accurately. If the answer is not in the context, say "I don't have enough information to answer that." 
                    Context: ${context.join("\n")}
                    Question: ${query}
                    Answer: `;

    const response = await groq.invoke(prompt);
    return res.status(200).json({ message: "query", data: response.content });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

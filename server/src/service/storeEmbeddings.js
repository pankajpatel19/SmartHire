import { Pinecone } from "@pinecone-database/pinecone";
import { PINECONE_API_KEY, PINECONE_INDEX } from "../utils/env.js";
import { embedder } from "../config/embedding.js";
import { PineconeStore } from "@langchain/pinecone";

const pinecone = new Pinecone({
  apiKey: PINECONE_API_KEY,
});

export const pineconeIndex = pinecone.Index(PINECONE_INDEX);

export const storeEmbedd = async (embedd, ip) => {
  if (!embedd || !Array.isArray(embedd) || embedd.length === 0) {
    throw new Error("No documents provided for storing embeddings");
  }
  try {
    const namespace = (ip || "default").replace(/[^a-zA-Z0-9-_]/g, "_");
    await PineconeStore.fromDocuments(embedd, embedder, {
      pineconeIndex,
      namespace,
    });
    return "vector store in db";
  } catch (error) {
    console.log("Error storing embeddings : ", error);
    throw error;
  }
};

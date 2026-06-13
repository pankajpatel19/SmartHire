import { Pinecone } from "@pinecone-database/pinecone";
import { PINECONE_API_KEY, PINECONE_INDEX } from "../utils/env.js";
import { embedder } from "../config/embedding.js";
import { PineconeStore } from "@langchain/pinecone";

const pinecone = new Pinecone({
  apiKey: PINECONE_API_KEY,
});

export const pineconeIndex = pinecone.Index(PINECONE_INDEX);

export const storeEmbedd = async (embedd) => {
  try {
    await PineconeStore.fromDocuments(embedd, embedder, {
      pineconeIndex,
    });
    return "vector store in db";
  } catch (error) {
    console.log("Error storing embeddings : ", error);
  }
};

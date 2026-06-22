import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
export const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
export const PINECONE_INDEX = process.env.PINECONE_INDEX;
export const GROQ_API_KEY = process.env.GROQ_API_KEY;
export const MONGO_URI = process.env.MONGO_URI;
export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = process.env.REDIS_PORT;

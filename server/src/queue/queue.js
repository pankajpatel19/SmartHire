import { Queue, Worker } from "bullmq";
import redisClient from "../config/redis.js";

const connection = {
  host: redisClient,
  port: 6379,
  maxRetriesPerRequest: null,
};

export const parsingQueue = new Queue("resumeParsing", connection);

export const resumeParse = async (resume, ip) => {
  await parsingQueue.add("resume_parsing", { resume, ip });
};

export const storeEmbeddings = async (chunk, ip) => {
  await parsingQueue.add("storeEmbeddings", { chunk, ip });
};

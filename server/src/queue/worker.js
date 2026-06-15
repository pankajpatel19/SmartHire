import { Worker } from "bullmq";
import redisClient from "../config/redis.js";

const parseQueueWorker = new Worker("resumeParsing", async (job) => {});

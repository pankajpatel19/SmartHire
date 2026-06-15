import dotenv from "dotenv";
dotenv.config();

import { Worker } from "bullmq";
import redisClient from "../config/redis.js";
import { resumeParserChain } from "../service/resumeParserChain.js";
import { storeEmbedd } from "../service/storeEmbeddings.js";
import { storeEmbeddings } from "./queue.js";
import { connectDB } from "../config/db.js";

await connectDB();
const parseQueueWorker = new Worker(
  "resumeParsing",
  async (job) => {
    const { resume, ip, chunk } = job.data;
    console.log("processing job : ", job.name);

    switch (job.name) {
      case "resume_parsing":
        const data = await resumeParserChain(resume, ip);

        if (data.status === "error") {
          console.log("Error from parse data : ", data.message);
          return;
        }
        await storeEmbeddings(data);

        break;
      case "storeEmbeddings":
        const res = await storeEmbedd(chunk);
        console.log(res);

        break;
      default:
        break;
    }
  },
  {
    connection: {
      host: redisClient.options.host,
      port: redisClient.options.port,
    },
    autorun: true,
    threads: 1,
  },
);

parseQueueWorker.on("completed", (job) => {
  console.log("Job completed: ", job.id);
});

parseQueueWorker.on("failed", (job, error) => {
  console.error("Job failed: ", job.id, error);
});

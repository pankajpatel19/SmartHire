import Redis from "ioredis";
import { REDIS_HOST, REDIS_PORT } from "../utils/env.js";

const redisClient = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
});
redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.on("connect", () => console.log("Redis connected"));

export default redisClient;

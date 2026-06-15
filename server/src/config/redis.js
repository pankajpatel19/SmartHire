import Redis from "ioredis";

const redisClient = new Redis({
  host: "localhost",
  port: 6379,
});
redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.on("connect", () => console.log("Redis connected"));

export default redisClient;

import Redis from "ioredis";

const redisClient = new Redis({
  host: "localHost",
  port: 6379,
});

export default redisClient;

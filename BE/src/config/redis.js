import { createClient } from "redis";
import {env} from "./environment.js";

const redisClient = createClient({
  url: `redis://localhost:${env.REDIS_PORT}`
});

redisClient.on("error", (err) => console.error("❌ Redis Client Error", err));
redisClient.on("connect", () => console.log("✅ Connected to Redis"));

await redisClient.connect();

export default redisClient;
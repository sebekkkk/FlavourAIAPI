/**
 * Modules import
 */
import {createClient} from "redis";

/**
 * Export Async function that connect to redis server
 */

let client;

export const returnRedisClientAndConnect = async () => {
  if (!client) {
    client = createClient();

    client.on("error", (err) => {
      console.error("Redis client connection error:", err);
      process.exit(1);
    });

    await client.connect(); // ważne: connect() zwraca Promise
    console.log("✅ Redis connected!");
  }
  return client;
};
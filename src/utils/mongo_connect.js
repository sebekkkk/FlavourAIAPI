/**
 * Modules import
 */
import mongoose from "mongoose";
import config from "../config/config.js"

/**
 * Export Async function that connects to mongoDB on url that we provide in .env file
 */
export const mongo_connect = async () => {
    mongoose.connect(config.mongoUri)
        .then(() => console.log(`✅Succesfully Connected to mongodb collection name: ${config.mongoUri.split("/")[3]}`))
        .catch((err) => {
            console.error(err);
            process.exit(1);
        })
}
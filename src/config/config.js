/**
 * Modules import
 * -dotenv
 * -path
 * -fileUrlToPath
 */
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

//file path transformation
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//dotenv setup
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

//object "config" that provides quick access to .env body
const config = {
    port: process.env.port,
    mongoUri: process.env.Mongoose_URI,
    nodemailer_email_user:process.env.nodemailer_email_user,
    nodemailer_pass_user:process.env.nodemailer_pass_user,
    jwtToken:process.env.JwtToken,
    GoogleAiApiKey:process.env.GoogleAiApiKey
};

//exporting by default object "config"
export default config;
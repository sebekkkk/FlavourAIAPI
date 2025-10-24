/**
 * Importing Modules
 * --express.js
 * --helmet
 * --cors
 */
import express from "express";
import helmet from "helmet";
import cors from "cors"

/**
 * Custom modules import 
 * --config(.env fast acces)
 * --mongo_connect (mongoDb connecting custom module)
 * --createRedisClientAndConnect(connect to default redis port 6379 and give acces to redisclient that we initialize in that function)
 */

import config from "./config/config.js"
import { mongo_connect } from "./utils/mongo_connect.js";
import { returnRedisClientAndConnect } from "./utils/redis_connect.js";
import { logRequest } from "./middleware/logMiddleware.js";

/**
 * Services setup
 * --MongoDB
 * --Redis
 */
//MongoDB connect function
await mongo_connect();
//Redis connect function
const redisClient = await returnRedisClientAndConnect();
/** * Express app initial
 */
//app instance init
const app = express();

//json parsing to jsObject handling
app.use(express.json());

//setting gloval variable with reference to redis cient object 
app.locals.redis = redisClient;

//helmet setup
app.use(helmet());

//cors setup 
app.use(cors())

//log request initialize
app.use(logRequest)

/**
 * Auth routes setup
 */
import authRoutes from "./routes/authRoutes.js";
app.use('/apiv1/auth', authRoutes);

/**
 * Admin routes setup
 */
import adminRoutes from "./routes/adminRoutes.js";
app.use("/apiv1/admin", adminRoutes);

/**
 * Recipe routes setup
 */
import recipeRoutes from "./routes/recipeRoutes.js"
app.use("/apiv1/recipe", recipeRoutes)

/**
 * User routes setup
 */
import userRoutes from "./routes/userRoutes.js"
app.use("/apiv1/user", userRoutes)


//404 error handling middleware setup
app.use((req, res, next) => {
    res.status(404).json({error:"Path not found"});
})

//server listener
const HOST = '0.0.0.0'; // Nasłuchiwanie na wszystkich dostępnych interfejsach
const PORT = config.port;

app.listen(PORT, HOST, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}/ (dostępny z zewnątrz przez interfejsy: ${HOST})`);
});

"use strict";

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const route = require("./routes/routes.js");
const loggerLogs = require("./utils/loggerLogs.js");

const sanitizeMiddleware = require("./middleware/xssMiddleware.js");
const rateLimiter = require("./middleware/rateLimit.js");
const rateLimiter_block_account = require("./middleware/rateLimit_block_account.js");
const {
    CommonMessage
} = require("./utils/constants.js");
const {
    connect
} = require ("./configuration/dbConnection.js");
// const helper =require("./utils/helper.js");
// const checkForPlatform = require("./middleware/checkForPlatform.js");
const logHeaders = require("./middleware/logHeaders.js");
const admin = require("firebase-admin");
const firebaseJson = require("./utils/fireBase.json");

// const createRedisClient = require("./configuration/redis.js");
const app = express();

/* eslint-disable no-unused-vars */
function errorHandlerMiddleware(err, req, res, next) {
    loggerLogs.error("Error caught by error handling middleware:", err);
    res.status(500).send({
        error: CommonMessage.ERROR_MESSAGE_INTERNAL_SERVER_ERROR 
    });
}
async function connectTomongoDbConn() {
    try {
        await connect();
        console.log("Connected to the database");
    }
    catch (error) {
        console.error("Error connecting to the database:", error);
        throw error;
    }
}
async function setupMiddleware() {
    try {
        // console.log(bas icConfigurationObject.CORS_ORIGIN.split(","));
        // const allowedOrigins = basicConfigurationObject.CORS_ORIGIN.split(",");
        // const corsOptions = {
        //     credentials: true,
        //     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        //     origin: allowedOrigins
        // };
          
        // Enable CORS with an array of allowed origins
        // app.use(cors(corsOptions));
        app.use(cors());
        app.use(helmet());
        // app.use(checkForPlatform);
        app.use(express.static("public"));
        app.use(express.json({
            limit: "8mb" 
        }));
        app.use(express.urlencoded({
            extended: true,
            limit: "8mb"
        }));
        // Initialize Firebase Admin
        
        admin.initializeApp({
            credential: admin.credential.cert(firebaseJson)
        });
        app.use(logHeaders);
        // Use the XSS prevention middleware
        app.use(sanitizeMiddleware);
        //Rate Limiter
        app.use(rateLimiter);
        app.use(rateLimiter_block_account);

        app.use(morgan("combined"));
        await connectTomongoDbConn();
        // Error handling middleware
        app.use(errorHandlerMiddleware);
        // await createRedisClient();
    }
    catch (error) {
        console.error("Error setting up middleware:", error);
        process.exit(1);
    }
}

function setRoutes() {
    app.use("/api/v1/user", route);
    app.get("*", (req, res) => {
        res.status(404).send({
            error: CommonMessage.ERROR_MESSAGE_NOT_FOUND 
        });
    });
}

async function initializeApp() {
    await setupMiddleware();
    setRoutes();
}

initializeApp();

module.exports =  app;
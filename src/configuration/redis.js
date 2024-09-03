const Redis = require("ioredis");
const {
    basicConfigurationObject 
} = require("../utils/constants.js");

function createRedisClient() {
    const connectionObj = {
        host: basicConfigurationObject.REDIS_HOST,
        password: basicConfigurationObject.REDIS_PASSWORD,
        port: basicConfigurationObject.REDIS_PORT
    };

    const redis = new Redis(connectionObj);

    // Listen for the 'connect' event
    console.log("====================================");
    console.log("Redis Connection Waiting");
    console.log("====================================");
    redis.on("connect", function () {
        console.log("Connected to Redis server");
    });

    // Listen for errors
    redis.on("error", function (err) {
        console.error("Redis error:", err);
    });

    return redis;
}
const resdis = createRedisClient();

module.exports = resdis;
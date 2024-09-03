const client = require("../configuration/redis.js");

const getValueFromRedisInObj = (key) => {
    return new Promise((resolve, reject) => {
        client.get(key, (err, reply) => {
            if (err) {
                console.error("Redis get error:", err);
                reject(err);
            }
            else {
                console.log("Data Coming from redis");
                resolve(reply);
            }
        });
    });
};

const setValueInRedisInObj = (key, value) => {
    return new Promise((resolve, reject) => {
        client.set(key, value, (err, reply) => {
            if (err) {
                console.error("Redis set error:", err);
                reject(err);
            }
            else {
                console.log("data saved in redis", reply);
                resolve(reply);
            }
        });
    });
};
const clearRedisInObj = () => {
    console.log("clearRedisInObj working");

    return new Promise((resolve, reject) => {
        client.flushall((err, reply) => {
            if (err) {
                console.error("Redis set error:", err);
                reject(err);
            }
            else {
                console.log("data cleared from redis", reply);
                resolve(reply);
            }
        });
    });
};

module.exports = {
    clearRedisInObj,
    getValueFromRedisInObj,
    setValueInRedisInObj
};

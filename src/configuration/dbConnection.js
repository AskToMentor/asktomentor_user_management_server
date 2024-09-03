"use strict";

const mongoose = require("mongoose");

const {
    basicConfigurationObject 
} = require("../utils/constants.js");
let mongooseClient;

async function connect(uri = basicConfigurationObject.MONGODB_URI || "") {
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };

        const _db = await mongoose.connect(uri, options);

        mongooseClient = _db;

        console.log("Connected to MongoDB");

        return _db;
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
}

async function disconnect() {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
}

function getNewMongoSession() {
    return mongooseClient.startSession();
}

module.exports =  {
    connect,
    disconnect,
    getNewMongoSession 
};

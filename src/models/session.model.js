"use strict";

const mongoose = require("mongoose");
const userSessionSchema = new mongoose.Schema({
    created: {
        required: true,
        type: Number
    },
    email: {
        required: true, 
        type: String
    },
    enabled: {
        default: true,
        required: true,
        type: Boolean
    },
    encrypt: {
        required: true,
        type: String
    },
    exipryHr: {
        required: true, 
        type: String
    },
    expiryTime: {
        required: true, 
        type: Number
    },
    jwtId: {
        required: true, 
        type: String
    },
    originalUrl: {
        required: true, 
        type: String
    },
    platform: {
        required: true, 
        type: String
    },
    terminated_at: {
        type: Number
    },
    userId: {
        ref: "user",
        required: true, 
        type: String
    }
}, {
    timestamps: true 
});

const Session = mongoose.model("session", userSessionSchema);

module.exports = Session;

/* eslint-disable require-path-exists/exists */
"use strict";

const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
    {
        availability: {
            type: Array
        },
        categoryId: {
            required: true,
            type: String
        },
        coachingOfferingsId: {
            required: true,
            type: String
        },
        deleteTime: {
            type: Number
        },
        desc: {
            type: String
        },
        questonaries: {
            type: Array
        },
        serviceType: {
            type: Array
        },
        settingId: {
            required: true,
            type: String
        },
        status: {
            type: String
        },
        subCategoryId: {
            required: true,
            type: String 
        },
        userId: {
            type: String
        }
    },
    {
        timestamps: true 
    }
);

const Settings = mongoose.model("settings", settingSchema);

module.exports = Settings;
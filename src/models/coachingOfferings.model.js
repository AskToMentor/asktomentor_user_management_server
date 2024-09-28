/* eslint-disable require-path-exists/exists */
"use strict";

const mongoose = require("mongoose");

const coachingOfferingsSchema = new mongoose.Schema(
    {
        coachingOfferingsId: {
            required: true,
            type: String
        },
        deleteTime: {
            type: Number
        },
        name: {
            required: true,
            type: String
        },
        status: {
            type: String
        }
        // monthNumber: {
        //     required: true,
        //     type: Number
        // }, 

        // weekNumber: {
        //     required: true,
        //     type: Number
        // }
    },
    {
        timestamps: true 
    }
);

const coachingOfferings = mongoose.model("coaching_offerings", coachingOfferingsSchema);

module.exports = coachingOfferings;

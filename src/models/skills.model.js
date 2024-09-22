/* eslint-disable require-path-exists/exists */
"use strict";

const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
    {
        deleteTime: {
            type: Number
        },
        skillId: {
            required: true,
            type: String
        },
        skillName: {
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

const Skill = mongoose.model("skills", skillSchema);

module.exports = Skill;

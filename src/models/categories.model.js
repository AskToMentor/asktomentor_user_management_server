/* eslint-disable require-path-exists/exists */
"use strict";

const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema(
    {
        categoryId: {
            required: true,
            type: String
        },
        categoryName: {
            required: true,
            type: String
        },
        categoryType: {
            type: String

        },
        deleteTime: {
            type: Number
        },
        imageUrl: {
            type: String
        },
        parentId: {
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

const categories = mongoose.model("categories", categoriesSchema);

module.exports = categories;
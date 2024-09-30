"use strict";

const asyncHandler = require( "../utils/asyncHandler.js");
const categories  = require( "../models/categories.model.js");
const fieldValidator = require( "../utils/fieldValidator.js");
const ApiError = require( "../utils/apiError.js");
const {
    statusCodeObject, errorAndSuccessCodeConfiguration
} = require( "../utils/constants.js");
const en = require("../locales/en.json");
const ApiResponse = require( "../utils/apiSuccess.js");
const getMenuList = require("../utils/getMenuList.js");

const getCategories = asyncHandler (async (req, res) => {
    console.log("getCoachingOfferings working", req.query);
    
    try {
        const name = req.query.name;

        const filterObj = {};

        if (!fieldValidator(name))
            filterObj.categoryName = new RegExp(name, "i");
        
        const categorie = await categories.aggregate([{
            $match: filterObj
        },
        {
            $lookup: {
                as: "childernInfo",
                foreignField: "parentId",
                from: "categories",
                localField: "categoryId"
            }
        },
        {
            // This step filters out records where `parentId` is not null
            $match: {
                parentId: null
            }
        }]);
        // const categoryLists = getMenuList(categorie);

        return res.status(200).json(
            new ApiResponse(statusCodeObject.HTTP_STATUS_OK, errorAndSuccessCodeConfiguration.HTTP_STATUS_OK, categorie, en.common.detailsFetched )
        );
    }
    catch (error) {
        console.error("Error while Login User", error.message);
        // await session.abortTransaction();

        if (error instanceof ApiError) {
            console.log("Api Error instance");

            // Handle ApiError instances with dynamic status code and message
            return res.status(error.statusCode).json({
                error: error || en.common.somethingWentWrong
            });
        }
        else {
            // Handle other types of errors
            console.error("Error in loginUser:", error);

            return res.status(statusCodeObject.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
                error: en.common.somethingWentWrong
            });
        }
    }
});

module.exports = getCategories;
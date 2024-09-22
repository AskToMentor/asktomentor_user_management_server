"use strict";

const asyncHandler = require( "../utils/asyncHandler.js");
const Skill  = require( "../models/skills.model.js");
const fieldValidator = require( "../utils/fieldValidator.js");
const ApiError = require( "../utils/apiError.js");
const {
    statusCodeObject, errorAndSuccessCodeConfiguration
} = require( "../utils/constants.js");
const en = require("../locales/en.json");
const ApiResponse = require( "../utils/apiSuccess.js");

const getSkills = asyncHandler (async (req, res) => {
    console.log("getSkills working");
    
    try {
        const skill = req.query.skill;

        const filterObj = {};

        if (!fieldValidator(skill))
            filterObj.skillName = new RegExp(skill, "i");
        
        const skills = await Skill.find(filterObj);
     
        return res.status(200).json(
            new ApiResponse(statusCodeObject.HTTP_STATUS_OK, errorAndSuccessCodeConfiguration.HTTP_STATUS_OK, skills, en.common.detailsFetched )
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

module.exports = getSkills;
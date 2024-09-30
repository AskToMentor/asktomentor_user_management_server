"use strict";

const asyncHandler = require( "../utils/asyncHandler.js");
const Settings  = require( "../models/setting.model.js");
const fieldValidator = require( "../utils/fieldValidator.js");
const ApiError = require( "../utils/apiError.js");
const {
    CommonMessage,  statusCodeObject, errorAndSuccessCodeConfiguration
} = require( "../utils/constants.js");

const ApiResponse = require( "../utils/apiSuccess.js");
const {
    getNewMongoSession
} = require( "../configuration/dbConnection.js");

const crypto = require("crypto");
const helper = require("../utils/helper.js");

function generateUserId() {
    // Generate a random 8-digit number
    const userId = crypto.randomInt(10000000, 99999999);

    return userId;
}
const saveSettings = asyncHandler (async (req, res) => {
    console.log("saveSettings working", req.body);
    let session;
    
    try {
        session = await getNewMongoSession();
    
        session.startTransaction();
        const {
            coachingOfferingsId, categoryId, subCategoryId, desc, serviceType, questonaries
        } = req.body;

        if (fieldValidator(coachingOfferingsId) || fieldValidator(categoryId) || fieldValidator(subCategoryId) || fieldValidator(desc) || fieldValidator(serviceType) || fieldValidator(questonaries)) throw new ApiError(statusCodeObject.HTTP_STATUS_BAD_REQUEST, errorAndSuccessCodeConfiguration.HTTP_STATUS_BAD_REQUEST, CommonMessage.ERROR_FIELD_REQUIRED);

        const uniqueId = generateUserId();
        const detail = await Settings.findOne({
            categoryId,
            coachingOfferingsId,
            subCategoryId
        });

        console.log("user", detail);

        if (!fieldValidator(detail)) throw new ApiError(statusCodeObject.HTTP_STATUS_BAD_REQUEST, errorAndSuccessCodeConfiguration.HTTP_STATUS_BAD_REQUEST, "Detail Already Exist");

        let parseQuestionaries = JSON.parse(questonaries);
        const parseServiceType = JSON.parse(serviceType);

        console.log({
            parseQuestionaries,
            parseServiceType
        });
        parseQuestionaries = parseQuestionaries.map(question => question.questionariesId = helper.generateUserId());
        const userObj = {
            categoryId,
            coachingOfferingsId,
            desc,
            // questonaries: JSON.parse(JSON.parse(questonaries)),
            questonaries: parseQuestionaries,
            serviceType: parseServiceType,
            // serviceType: JSON.parse(JSON.parse(serviceType)),
            settingId: uniqueId,
            subCategoryId

        };

        await Settings.create(userObj);

        await session.commitTransaction();

        return res.status(201).json(
            new ApiResponse(statusCodeObject.HTTP_STATUS_OK, errorAndSuccessCodeConfiguration.HTTP_STATUS_OK, {}, "Detail Saved Successfully")
        );
    }
    catch (error) {
        console.error("Error while Login User", error.message);
        // await session.abortTransaction();
        await session.abortTransaction();

        if (error instanceof ApiError) {
            console.log("Api Error instance");

            // Handle ApiError instances with dynamic status code and message
            return res.status(error.statusCode).json({
                error: error || CommonMessage.SOMETHING_WENT_WRONG
            });
        }
        else {
            // Handle other types of errors
            console.error("Error in loginUser:", error);

            return res.status(statusCodeObject.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
                error: CommonMessage.SOMETHING_WENT_WRONG 
            });
        }
    }
    finally {
        // End the session
        await session.endSession();
    }
});

module.exports = saveSettings;
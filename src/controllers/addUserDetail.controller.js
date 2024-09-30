"use strict";

const asyncHandler = require( "../utils/asyncHandler.js");
const User  = require( "../models/user.model.js");
const fieldValidator = require( "../utils/fieldValidator.js");
const ApiError = require( "../utils/apiError.js");
const {
    statusCodeObject, errorAndSuccessCodeConfiguration
} = require( "../utils/constants.js");
const en = require("../locales/en.json");

const ApiResponse = require( "../utils/apiSuccess.js");
const {
    getNewMongoSession
} = require( "../configuration/dbConnection.js");

const addUserDetail = asyncHandler (async (req, res) => {
    console.log("addUserDetail working", req.body);
    let session;
    
    try {
        session = await getNewMongoSession();
    
        session.startTransaction();
        const {
            userId, selfIntroDesc, faceBookId, instagramId, twitterId, linkedinId, skills
        } = req.body;

        if (fieldValidator(userId)) throw new ApiError(statusCodeObject.HTTP_STATUS_BAD_REQUEST, errorAndSuccessCodeConfiguration.HTTP_STATUS_BAD_REQUEST, en.common.invalidInput);

        const user = await User.findOne({
            userId
        });

        console.log("user", user);

        if (fieldValidator(user)) throw new ApiError(statusCodeObject.HTTP_STATUS_BAD_REQUEST, errorAndSuccessCodeConfiguration.HTTP_STATUS_BAD_REQUEST, en.common.userNotFound);

        const userObj = {
            faceBookId,
            instagramId,
            linkedinId,
            selfIntroDesc,
            twitterId
        };

        if (!fieldValidator(instagramId))
            userObj.instagramId = instagramId;
    
        if (!fieldValidator(selfIntroDesc))
            userObj.selfIntroDesc = selfIntroDesc;
        
        if (!fieldValidator(twitterId))
            userObj.twitterId = twitterId;
            
        if (!fieldValidator(faceBookId))
            userObj.faceBookId = faceBookId;

        if (!fieldValidator(linkedinId))
            userObj.linkedinId = linkedinId;
                
        if (!fieldValidator(skills))
            userObj.skills = skills;

        console.log("userObj", userObj);

        await User.findOneAndUpdate({
            userId

        }, {
            $set: userObj
        }, {
            new: true,
            session: session,
            upsert: true
        });

        await session.commitTransaction();

        return res.status(201).json(
            new ApiResponse(statusCodeObject.HTTP_STATUS_OK, errorAndSuccessCodeConfiguration.HTTP_STATUS_OK, userId, en.common.dataSaved)
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
    finally {
        // End the session
        await session.endSession();
    }
});

module.exports = addUserDetail;
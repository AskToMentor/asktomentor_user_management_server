"use strict";

const asyncHandler = require( "../utils/asyncHandler.js");
const User  = require( "../models/user.model.js");
const fieldValidator = require( "../utils/fieldValidator.js");
const ApiError = require( "../utils/apiError.js");
const {
    CommonMessage,  statusCodeObject, errorAndSuccessCodeConfiguration
} = require( "../utils/constants.js");

const ApiResponse = require( "../utils/apiSuccess.js");
const {
    getNewMongoSession
} = require( "../configuration/dbConnection.js");

const updateBasicDetail = asyncHandler (async (req, res) => {
    console.log("updateBasicDetail working", req.body);
    let session;
    
    try {
        session = await getNewMongoSession();
    
        session.startTransaction();
        const userId = req.decoded;

        const {
            selfIntroDesc, faceBookId, instagramId, twitterId, linkedinId, skills, languages, firstName, lastName
        } = req.body;

        if (fieldValidator(userId)) throw new ApiError(statusCodeObject.HTTP_STATUS_BAD_REQUEST, errorAndSuccessCodeConfiguration.HTTP_STATUS_BAD_REQUEST, CommonMessage.ERROR_FIELD_REQUIRED);

        const detail = await User.findOne({
            userId
        });

        console.log("user", detail);

        if (fieldValidator(detail)) throw new ApiError(statusCodeObject.HTTP_STATUS_BAD_REQUEST, errorAndSuccessCodeConfiguration.HTTP_STATUS_BAD_REQUEST, "Detail Not Exist");

        const userObj = {
            faceBookId,
            instagramId,
            languages,
            linkedinId,
            selfIntroDesc,
            skills,
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

        if (!fieldValidator(languages))
            userObj.languages = languages;

        if (!fieldValidator(selfIntroDesc))
            userObj.selfIntroDesc = selfIntroDesc;

        if (!fieldValidator(firstName))
            userObj.firstName = firstName;

        if (!fieldValidator(lastName))
            userObj.selfIntroDesc = selfIntroDesc;

        await User.findOneAndUpdate({
            userId
        }, {
            $set: userObj
        }, {
            session
        });

        await session.commitTransaction();

        return res.status(201).json(
            new ApiResponse(statusCodeObject.HTTP_STATUS_OK, errorAndSuccessCodeConfiguration.HTTP_STATUS_OK, {}, "Detail Updated Successfully")
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

module.exports = updateBasicDetail;
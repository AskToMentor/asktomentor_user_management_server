"use strict";

const asyncHandler = require( "../utils/asyncHandler.js");
const User  = require( "../models/user.model.js");
const fieldValidator = require( "../utils/fieldValidator.js");
const ApiError = require( "../utils/apiError.js");
const {
    CommonMessage, registerMessage, statusCodeObject, errorAndSuccessCodeConfiguration
} = require( "../utils/constants.js");

const ApiResponse = require( "../utils/apiSuccess.js");
const {
    getNewMongoSession
} = require( "../configuration/dbConnection.js");
const uploadFile = require("../utils/uploadFile.js");

const uploadProfilePicture = asyncHandler (async (req, res) => {
    console.log("uploadProfilePicture working", req.body);
    let session;
   
    // const currentTime = new Date().getTime();
    
    try {
        session = await getNewMongoSession();
    
        session.startTransaction();
        const {
            userId
        } = req.body;
        const profile_image = req.file;

        if (fieldValidator(profile_image)) throw new ApiError(statusCodeObject.HTTP_STATUS_BAD_REQUEST, errorAndSuccessCodeConfiguration.HTTP_STATUS_BAD_REQUEST, CommonMessage.ERROR_FIELD_REQUIRED);

        const user = await User.findOne({
            userId
        });

        console.log(user, "user");

        if (fieldValidator(user)) throw new ApiError(statusCodeObject.HTTP_STATUS_BAD_REQUEST, errorAndSuccessCodeConfiguration.HTTP_STATUS_BAD_REQUEST, registerMessage.ERROR_USER_NOT_FOUND);

        const userImageObj =  await uploadFile(profile_image, userId, "profile_image");

        await User.findOneAndUpdate({
            userId
        }, {
            $set: {
                profileImageUrl: userImageObj.CustomUrl
            }
        }, {
            new: true,
            session: session
        });
      
        await session.commitTransaction();

        return res.status(200).json(
            new ApiResponse(statusCodeObject.HTTP_STATUS_OK, errorAndSuccessCodeConfiguration.HTTP_STATUS_OK, {}, CommonMessage.PROFILE_IMAGE_UPLOADED_SUCCESSFULLY)
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

module.exports = uploadProfilePicture;
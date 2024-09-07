"use strict";

const asyncHandler = require( "../utils/asyncHandler.js");
const User  = require( "../models/user.model.js");
const fieldValidator = require( "../utils/fieldValidator.js");
const ApiError = require( "../utils/apiError.js");
const {
    CommonMessage, registerMessage, statusCodeObject, errorAndSuccessCodeConfiguration, loginMessage
} = require( "../utils/constants.js");

const ApiResponse = require( "../utils/ApiSuccess.js");

const getCurrentUser = asyncHandler (async (req, res) => {
    console.log("getCurrentUser working");
    
    try {
        const userId = req.decoded.userId;

        const user = await User.findOne({
            userId
        }, {
            _id: 0,
            email: 1,
            firstName: 1,
            lastName: 1,
            userId: 1
        });

        console.log(user, "user");

        if (fieldValidator(user)) throw new ApiError(statusCodeObject.HTTP_STATUS_BAD_REQUEST, errorAndSuccessCodeConfiguration.HTTP_STATUS_BAD_REQUEST, registerMessage.ERROR_USER_NOT_FOUND);
 
        return res.status(200).json(
            new ApiResponse(statusCodeObject.HTTP_STATUS_OK, errorAndSuccessCodeConfiguration.HTTP_STATUS_OK, user, loginMessage.LOGIN_OTP_SENT_SUCCESSFULLY)
        );
    }
    catch (error) {
        console.error("Error while Login User", error.message);
        // await session.abortTransaction();

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
});

module.exports = getCurrentUser;
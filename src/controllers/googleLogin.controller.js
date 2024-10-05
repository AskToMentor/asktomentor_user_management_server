"use strict";

const asyncHandler = require( "../utils/asyncHandler.js");
const User  = require( "../models/user.model.js");
const fieldValidator = require( "../utils/fieldValidator.js");
const ApiError = require( "../utils/apiError.js");
const {
    CommonMessage, statusCodeObject, errorAndSuccessCodeConfiguration, loginMessage
} = require( "../utils/constants.js");

const ApiResponse = require( "../utils/apiSuccess.js");
const {
    getNewMongoSession
} = require( "../configuration/dbConnection.js");
const admin = require("firebase-admin");
const createJwtToken = require("../utils/createJwtToken.js");
const {
    generateUserId
} = require("../utils/helper.js");

const googleLogin = asyncHandler (async (req, res) => {
    console.log("login working", req.body);
    let session;
    
    try {
        session = await getNewMongoSession();
    
        session.startTransaction();

        const loginId = req.body.loginId;
        const role = req.body.role;
        const userAgent = req.headers["user-agent"];
        const platform = req.headers.platform;
        const origin = req.headers.origin;
        const ip = req.headers.ip;
        
        if (fieldValidator(loginId)) throw new ApiError(statusCodeObject.HTTP_STATUS_BAD_REQUEST, errorAndSuccessCodeConfiguration.HTTP_STATUS_BAD_REQUEST, CommonMessage.ERROR_FIELD_REQUIRED);
        
        const decodedToken = await admin.auth().verifyIdToken(loginId);

        console.log("decodedToken", decodedToken);
        
        let user = await User.findOne({
            googleId: decodedToken.user_id
        });
        
        if (fieldValidator(user)) {
            console.log( "inside user if block", user);
            user = await User.findOneAndUpdate({
                email: decodedToken.email,
                googleId: decodedToken.user_id,
                role
            }, {
                $set: {
                    email: decodedToken.email,
                    googleId: decodedToken.user_id,
                    role,
                    userId: generateUserId()
                }
            }, {
                new: true,
                session: session,
                upsert: true
            });
            console.log("user", user);
        }

        const dataObj = {
            email: fieldValidator(user.value) ? user.email : user.value.email,
            role,
            userId: fieldValidator(user.value) ? user.userId : user.value.userId
        };
        const token = await createJwtToken(dataObj, ip, origin, userAgent, platform);

        // console.log("token", token);

        await session.commitTransaction();

        return res.status(200).json(
            new ApiResponse(statusCodeObject.HTTP_STATUS_OK, errorAndSuccessCodeConfiguration.HTTP_STATUS_OK, {
                token
            }, loginMessage.USER_LOGGEDIN)
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

module.exports = googleLogin;
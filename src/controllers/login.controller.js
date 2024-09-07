"use strict";

const asyncHandler = require( "../utils/asyncHandler.js");
const User  = require( "../models/user.model.js");
const fieldValidator = require( "../utils/fieldValidator.js");
const ApiError = require( "../utils/apiError.js");
const {
    basicConfigurationObject, CommonMessage, registerMessage, statusCodeObject, errorAndSuccessCodeConfiguration, loginMessage
} = require( "../utils/constants.js");

const ApiResponse = require( "../utils/ApiSuccess.js");
const {
    getNewMongoSession
} = require( "../configuration/dbConnection.js");
const CryptoJS  = require( "crypto-js");
const createJwtToken = require("../utils/createJwtToken.js");

const login = asyncHandler (async (req, res) => {
    console.log("login working", req.body);
    let session;
   
    // const currentTime = new Date().getTime();
    
    try {
        session = await getNewMongoSession();
    
        session.startTransaction();
        const {
            password, role
        } = req.body;
        let loginId = req.body.loginId;
        const userAgent = req.headers["user-agent"];
        const platform = req.headers.platform;
        const origin = req.headers.origin;
        const ip = req.headers.ip;

        if (fieldValidator(loginId) || fieldValidator(password) || fieldValidator(role)) throw new ApiError(statusCodeObject.HTTP_STATUS_BAD_REQUEST, errorAndSuccessCodeConfiguration.HTTP_STATUS_BAD_REQUEST, CommonMessage.ERROR_FIELD_REQUIRED);

        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");

        if (!strongRegex.test(password)) throw new ApiError(statusCodeObject.HTTP_UNPROCESSABLE_ENTITY, errorAndSuccessCodeConfiguration.HTTP_UNPROCESSABLE_ENTITY, registerMessage.ERROR_PASSWORD_VALIDATION);

        // eslint-disable-next-line no-useless-escape
        const emailRegex =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;

        if (emailRegex.test(loginId)) {
            loginId = loginId.toLowerCase();
            const emailEnding = loginId.split("@")[1].split(".")[0];
     
            console.log("emailEnding", emailEnding);
     
            if (!emailEnding) throw new ApiError(statusCodeObject.HTTP_UNPROCESSABLE_ENTITY, errorAndSuccessCodeConfiguration.HTTP_UNPROCESSABLE_ENTITY, CommonMessage.INVALID_EMAIL);

            if ((basicConfigurationObject.LOGIN_EMAIL_RESTRICT_KEY === "true") && (basicConfigurationObject.RESTRICTED_EMAIL_DOMAINS.includes(emailEnding))) throw new ApiError(statusCodeObject.HTTP_UNPROCESSABLE_ENTITY, errorAndSuccessCodeConfiguration.HTTP_UNPROCESSABLE_ENTITY, CommonMessage.ERROR_EMAIL_RESTRICATION);
        }

        const user = await User.findOne({
            $or: [{
                email: loginId
            },
            {
                user_name: loginId
            }],
            role: parseInt(role)
        });

        console.log(user, "user");

        if (fieldValidator(user)) throw new ApiError(statusCodeObject.HTTP_STATUS_BAD_REQUEST, errorAndSuccessCodeConfiguration.HTTP_STATUS_BAD_REQUEST, registerMessage.ERROR_USER_NOT_FOUND);

        const passwordHashed = CryptoJS.HmacSHA256(password + user.salt, basicConfigurationObject.PASSWORD_SECRET_KEY).toString();

        console.log("passwordHashed", passwordHashed);

        if (passwordHashed !== user.password) throw new ApiError(statusCodeObject.HTTP_STATUS_BAD_REQUEST, errorAndSuccessCodeConfiguration.HTTP_STATUS_BAD_REQUEST, loginMessage.EITHER_PHONE_NUMBER_OR_PASSWORD_WRONG);

        const resp = await User.findOneAndUpdate({
            $or: [{
                email: loginId
            },
            {
                user_name: loginId
            }],
            role: role

        }, {
            $inc: {
                loginCount: 1
            },
            $set: {
                loginTime: new Date()
            }
        }, {
            new: true,
            session: session
        });
        const dataObj = {
            email: user.email,
            role: user.role,
            userId: user.userId
        };
        const token = await createJwtToken(dataObj, ip, origin, userAgent, platform);

        console.log("token", token);

        await session.commitTransaction();

        return res.status(200).json(
            new ApiResponse(statusCodeObject.HTTP_STATUS_OK, errorAndSuccessCodeConfiguration.HTTP_STATUS_OK, {
                token
            }, loginMessage.LOGIN_OTP_SENT_SUCCESSFULLY)
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

module.exports = login;
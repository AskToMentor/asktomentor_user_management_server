"use strict";

const asyncHandler = require( "../utils/asyncHandler.js");
const User  = require( "../models/user.model.js");
const fieldValidator = require( "../utils/fieldValidator.js");
const ApiError = require( "../utils/apiError.js");
const {
    basicConfigurationObject, CommonMessage, registerMessage, statusCodeObject, errorAndSuccessCodeConfiguration
} = require( "../utils/constants.js");

const ApiResponse = require( "../utils/ApiSuccess.js");
const {
    getNewMongoSession
} = require( "../configuration/dbConnection.js");

const crypto = require("crypto");

function generateUserId() {
    // Generate a random 8-digit number
    const userId = crypto.randomInt(10000000, 99999999);

    return userId;
}
const register = asyncHandler (async (req, res) => {
    console.log("register working", req.body);
    let session;
   
    // const currentTime = new Date().getTime();
    
    try {
        session = await getNewMongoSession();
    
        session.startTransaction();
        const {
            firstName, lastName, password, confirmPassword, role, timeZone
        } = req.body;
        let email = req.body.email;

        if (fieldValidator(firstName) || fieldValidator(lastName) || fieldValidator(email) || fieldValidator(password) || fieldValidator(confirmPassword) || fieldValidator(role) || fieldValidator(timeZone)) throw new ApiError(statusCodeObject.HTTP_STATUS_BAD_REQUEST, errorAndSuccessCodeConfiguration.HTTP_STATUS_BAD_REQUEST, CommonMessage.ERROR_FIELD_REQUIRED);

        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");

        if (password.toLowerCase() !== confirmPassword.toLowerCase()) throw new ApiError(statusCodeObject.HTTP_UNPROCESSABLE_ENTITY, errorAndSuccessCodeConfiguration.HTTP_UNPROCESSABLE_ENTITY, "Password And Confirm Passwrd not correct");

        if (!strongRegex.test(password)) throw new ApiError(statusCodeObject.HTTP_UNPROCESSABLE_ENTITY, errorAndSuccessCodeConfiguration.HTTP_UNPROCESSABLE_ENTITY, registerMessage.ERROR_PASSWORD_VALIDATION);

        // eslint-disable-next-line no-useless-escape
        const emailRegex =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;

        if (emailRegex.test(email)) {
            email = email.toLowerCase();
            const emailEnding = email.split("@")[1].split(".")[0];
     
            console.log("emailEnding", emailEnding);
     
            if (!emailEnding) throw new ApiError(statusCodeObject.HTTP_UNPROCESSABLE_ENTITY, errorAndSuccessCodeConfiguration.HTTP_UNPROCESSABLE_ENTITY, CommonMessage.INVALID_EMAIL);

            if ((basicConfigurationObject.LOGIN_EMAIL_RESTRICT_KEY === "true") && (basicConfigurationObject.RESTRICTED_EMAIL_DOMAINS.includes(emailEnding))) throw new ApiError(statusCodeObject.HTTP_UNPROCESSABLE_ENTITY, errorAndSuccessCodeConfiguration.HTTP_UNPROCESSABLE_ENTITY, CommonMessage.ERROR_EMAIL_RESTRICATION);
        }

        const userId = generateUserId();
        const user = await User.findOne({
            $or: [
                {
                    userId
                },
                {
                    email
                }
            ],
            role
        });

        console.log("user", user);

        if (!fieldValidator(user)) throw new ApiError(statusCodeObject.HTTP_STATUS_BAD_REQUEST, errorAndSuccessCodeConfiguration.HTTP_STATUS_BAD_REQUEST, "User Already Exist");

        const userObj = {
            email,
            firstName,
            lastName,
            password,
            registerTime: new Date(),
            role: parseInt(role),
            timeZone,
            userId
        };

        await User.create(userObj);
        // await User.findOneAndUpdate({
        //     email,
        //     role: role

        // }, {
        //     $set: userObj
        // }, {
        //     new: true,
        //     upsert: true
        //     // session: session
        // });

        await session.commitTransaction();

        return res.status(201).json(
            new ApiResponse(statusCodeObject.HTTP_STATUS_OK, errorAndSuccessCodeConfiguration.HTTP_STATUS_OK, {
                userId
            }, "User Registered Successfully")
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

module.exports = register;
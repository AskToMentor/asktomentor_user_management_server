"use strict";

const {
    basicConfigurationObject, CommonMessage, statusCodeObject, errorAndSuccessCodeConfiguration
} = require("../utils/constants.js");
const axios = require("axios");
const ApiError = require("../utils/apiError.js");
const fieldValidator = require("../utils/fieldValidator.js");

function authorisationMiddleware(role) {
    console.log("authorisationMiddleware working", role);

    return async function (req, res, next) {
        console.log("authorisationMiddleware", req.decoded);
        const user_id = req.decoded.user_id;
        const userRole = req.decoded.role;
        const originalUrl = req.originalUrl;
        const ip = req.header("ip");

        if (fieldValidator(user_id)) throw new ApiError(statusCodeObject.HTTP_STATUS_BAD_REQUEST, errorAndSuccessCodeConfiguration.HTTP_STATUS_BAD_REQUEST, CommonMessage.DETAIL_ALREADY_EXISTS);

        try {
            const options = {
                data: {
                    permission: role,
                    user_id,
                    userRole
                },
                headers: {
                    "Content-Type": "application/json",
                    ip: ip,
                    originalUrl: originalUrl,
                    server: "ADMIN_SERVER"
                },
                method: "POST",
                url: `${basicConfigurationObject.AUTH_SERVER_URL}/api/v1/admin/authorize`

            };

            const response = await axios(options);
            const authResponse = response.data;

            console.log("authResponse", authResponse);

            return next();
        }
        catch (error) {
            console.error("Error while authorization User", error.message);
    
            if (error instanceof ApiError) {
                console.log("Api Error instance");
    
                // Handle ApiError instances with dynamic status code and message
                return res.status(error.statusCode).json({
                    error: error || CommonMessage.SOMETHING_WENT_WRONG
                });
            }
            else {
                // Handle other types of errors
                console.error("Error in loginUser:", error.response.data);
    
                return res.status(error.response.data.error.statusCode).json({
                    error: error.response.data.error
                });
            }
        }
    };
}

module.exports = authorisationMiddleware;
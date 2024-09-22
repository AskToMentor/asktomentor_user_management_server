"use strict";

const fieldValidator = require("../utils/fieldValidator.js");
const {
    app_version
} = require( "../models/index.js");
const {
    statusCodeObject, errorAndSuccessCodeConfiguration, CommonMessage
} = require( "../utils/constants.js");
const ApiError = require( "../utils/apiError.js");

// function isVersionGreater(currentVersion, version) {
//     const currentParts = currentVersion.split(".").map(Number);
//     const versionParts = version.split(".").map(Number);

//     for (let i = 0; i < currentParts.length; i++) {
//         if (currentParts[i] > versionParts[i]) 
//             return true;
//         else if (currentParts[i] < versionParts[i]) 
//             return false;
//     }
    
//     return false;  // If they are equal
// }
// Helper function to compare versions
function compareVersions(version1, version2) {
    const v1 = version1.split(".").map(Number);
    const v2 = version2.split(".").map(Number);

    for (let i = 0; i < Math.max(v1.length, v2.length); i++) {
        const num1 = v1[i] || 0;  // handle cases like "2.1" vs "2.1.0"
        const num2 = v2[i] || 0;

        if (num1 < num2) return -1;  // version1 is older

        if (num1 > num2) return 1;   // version1 is newer
    }

    return 0;  // both versions are the same
}
function shouldUpdateApp(mobileVersion, dbVersion) {
    if (compareVersions(mobileVersion, dbVersion) < 0) {
        // mobile version is less than the database version
        return false;  // app needs to update
    }
    else {
        // mobile version is equal or greater
        return true;   // app is up-to-date
    }
}

const checkForForceUpdate = async(req, res, next) => {
    const platform = req.headers.platform;
    const version = req.headers.version;

    console.log({
        platform,
        version
    });

    try {
        if (fieldValidator(platform)) throw new ApiError(statusCodeObject.HTTP_UNPROCESSABLE_ENTITY, errorAndSuccessCodeConfiguration.HTTP_UNPROCESSABLE_ENTITY, "Platform is Missing");

        if (platform === "web")
            return next();

        const appVersion = await app_version.findOne({
            order: [ [ "createdAt",
                "DESC" ] ],
            where: {
                app_name: platform,
                message: "user_app" // assuming userId is defined and holds the user ID value
            } 
        });

        console.log("appVersion", appVersion);

        if (fieldValidator(appVersion)) throw new ApiError(statusCodeObject.HTTP_UNPROCESSABLE_ENTITY, errorAndSuccessCodeConfiguration.HTTP_UNPROCESSABLE_ENTITY, CommonMessage.DETAIL_NOT_FOUND);

        if ((platform === "android" || platform === "ios") && fieldValidator(version)) throw new ApiError(statusCodeObject.HTTP_UNPROCESSABLE_ENTITY, errorAndSuccessCodeConfiguration.HTTP_UNPROCESSABLE_ENTITY, "App Version is Missing");

        console.log("shouldUpdateApp(version, appVersion.app_version)", shouldUpdateApp(version, appVersion.app_version));

        if (appVersion.forceUpdate === "true" && !shouldUpdateApp(version, appVersion.app_version)) throw new ApiError(statusCodeObject.HTTP_UNPROCESSABLE_ENTITY, errorAndSuccessCodeConfiguration.HTTP_UNPROCESSABLE_ENTITY, "Please Your Update App For Better Experience");

        next();
    }
    catch (error) {
        console.log("error in force check to update", error);
        
        if (error instanceof ApiError) {
            console.log("Api Error instance");

            // Handle ApiError instances with dynamic status code and message
            return res.status(error.statusCode).json({
                error: error || CommonMessage.SOMETHING_WENT_WRONG
            });
        }
        else {
            // Handle other types of errors
            console.error("Error in registerUser:", error);

            return res.status(statusCodeObject.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
                error: CommonMessage.SOMETHING_WENT_WRONG 
            });
        }
    }
};

module.exports = checkForForceUpdate;
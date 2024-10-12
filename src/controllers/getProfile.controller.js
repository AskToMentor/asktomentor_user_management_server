"use strict";

const asyncHandler = require( "../utils/asyncHandler.js");
const User  = require( "../models/user.model.js");
const ApiError = require( "../utils/apiError.js");
const {
    CommonMessage, statusCodeObject, errorAndSuccessCodeConfiguration
} = require( "../utils/constants.js");

const ApiResponse = require( "../utils/apiSuccess.js");
const {
    getNewMongoSession
} = require( "../configuration/dbConnection.js");

const getProfile = asyncHandler (async (req, res) => {
    console.log("getProfile working", req.body);
    let session;
    
    try {
        session = await getNewMongoSession();
    
        session.startTransaction();
        const {
            userId
        } = req.body;

        const user = await User.aggregate([
            {
                $match: {
                    userId                
                }
            },
            {
                $lookup: {
                    as: "skillInfo",
                    foreignField: "skillId",
                    from: "skills",
                    localField: "skills"
                }
            },
            {
                $lookup: {
                    as: "settingsInfo",
                    foreignField: "userId",
                    from: "settings",
                    localField: "userId",
                    pipeline: [
                        {
                            $lookup: {
                                as: "categoriesInfo",
                                foreignField: "categoryId",
                                from: "categories",
                                localField: "categoryId"
                            }
                        },
                        {
                            $unwind: "$categoriesInfo"
                        },
                        {
                            $lookup: {
                                as: "subCategoriesInfo",
                                foreignField: "categoryId",
                                from: "categories",
                                localField: "subCategoryId"
                            }
                        },
                        {
                            $unwind: "$subCategoriesInfo"
                        },
                        {
                            $lookup: {
                                as: "coachingOfferingsInfo",
                                foreignField: "coachingOfferingsId",
                                from: "coaching_offerings",
                                localField: "coachingOfferingsId"
                            }
                        },
                        {
                            $unwind: "$coachingOfferingsInfo"
                        }
                    ]
                }
            },
            {
                $unwind: "$settingsInfo"
            }
        
        ]);
      
        await session.commitTransaction();

        return res.status(200).json(
            new ApiResponse(statusCodeObject.HTTP_STATUS_OK, errorAndSuccessCodeConfiguration.HTTP_STATUS_OK, user, CommonMessage.DETAIL_FETCHED_SUCCESSFULLY)
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

module.exports = getProfile;
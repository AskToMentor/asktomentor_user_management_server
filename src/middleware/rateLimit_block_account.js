"use strict";

const {
    CommonMessage, statusCodeObject, errorAndSuccessCodeConfiguration
} = require("../utils/constants.js");
const ApiError = require( "../utils/apiError.js");

const rateLimit = require("express-rate-limit");

const rateLimiter_block_account = rateLimit({
    handler: async function (req, res /*next*/) {
        res.setHeader("X-RateLimit-Limit", req.rateLimit.limit);
        res.setHeader("X-RateLimit-Current", req.rateLimit.current);
        res.setHeader("X-RateLimit-Remaining", req.rateLimit.remaining);
        res.setHeader("Retry-After", req.rateLimit.resetTime);

        try {
            console.log("req.headers.ip", req.headers.ip);
            // const session = await Session.findOne({
            //     order: [ [ "createdAt",
            //         "DESC" ] ],
            //     where: {
            //         ip: req.headers.ip
            //     }
            // });

            // console.log("session", session.user_id);

            // if (!session) throw new ApiError(statusCodeObject.HTTP_STATUS_TOO_MANY_REQUESTS, errorAndSuccessCodeConfiguration.HTTP_STATUS_TOO_MANY_REQUESTS, CommonMessage.ERROR_MESSAGE_TOO_MANY_REQUESTS);
       
            // const [ affectedRowsCount,
            //     affectedRows ] = await User.update(
            //     {
            //         account_blocked: true 
            //     },
            //     {
            //         where: {
            //             user_id: session.user_id 
            //         } 
            //     }
            // );

            // await Session.update(
            //     {
            //         enabled: false,
            //         terminated_at: new Date().getTime()
            //     },
            //     {
            //         where: {
            //             user_id: session.user_id 
            //         } 
            //     }
            // );
              
            // console.log("Number of affected rows:", affectedRowsCount);
            // console.log("Affected rows:", affectedRows);
            throw new ApiError(statusCodeObject.HTTP_STATUS_TOO_MANY_REQUESTS, errorAndSuccessCodeConfiguration.HTTP_STATUS_TOO_MANY_REQUESTS, CommonMessage.ERROR_MESSAGE_TOO_MANY_REQUESTS);
        }
        catch (error){
            console.error("Error", error);
        }
    },
    headers: true,
    keyGenerator: function (req) {
        return req.headers.ip;
    },
    max: 400,
    message: {
        message: CommonMessage.ERROR_MESSAGE_TOO_MANY_REQUESTS
    },
    windowMs: 30 * 1000
});

module.exports = rateLimiter_block_account;


"use strict";

const {
    basicConfigurationObject
} = require("../utils/constants.js");

const axios = require("axios");

const createJwtToken = async(data, ip, origin, userAgent, platform) => {
    console.log("createJwtToken", {
        data,
        ip,
        platform,
        userAgent
    });
    try {
        const paylod = {
            data: data,
            headers: {
                "Content-Type": "application/json",
                ip: ip,
                origin: origin,
                platform: platform,
                server: "ADMIN_SERVER",
                userAgent: userAgent
            },
            method: "POST",
            // url: `${(basicConfigurationObject.NODE_ENV.toLowerCase()!=='development')?basicConfigurationObject.AUTH_SERVER_URL}/api/v1/user/createToken`
            url: (basicConfigurationObject.NODE_ENV.toLowerCase() !== "development") ? `${basicConfigurationObject.AUTH_SERVER_URL}/api/v1/user/createToken` : "http://localhost:6000/api/v1/user/createToken"
        };

        const response = await axios(paylod);

        console.log("payload", paylod, basicConfigurationObject.NODE_ENV, response.data);

        const newresponse = ((typeof response.data.data) === "string" ) ? JSON.parse(response.data.data) : response.data.data;

        return newresponse.token;
    }
    catch (error) {
        console.error("Creating Errror", error); 
        throw error;
    }
};

module.exports = createJwtToken;
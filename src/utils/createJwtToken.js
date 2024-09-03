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
            url: `${basicConfigurationObject.AUTH_SERVER_URL}/api/v1/admin/createToken`
        };

        console.log("payload", paylod);
        let response = await axios(paylod);

        response = ((typeof response) === "string" ) ? JSON.parse(response.data) : response.data;

        return response.data.token;
    }
    catch (error) {
        console.error("Creating Errror", error); 
        throw error;
    }
};

module.exports = createJwtToken;
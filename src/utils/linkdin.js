const axios = require("axios");
const {
    basicConfigurationObject
} = require("../utils/constants.js");
const linkdin = async(linkedinId) => {
    console.log("linkdin working", linkedinId, basicConfigurationObject.LINKEDIN_RAPID_API_KEY);
    try {
        const options = {
            headers: {
                "X-RapidAPI-Host": "linkedin-profile-data-api.p.rapidapi.com",
                "X-RapidAPI-Key": basicConfigurationObject.LINKEDIN_RAPID_API_KEY
            },
            method: "GET",
            params: {
                username: linkedinId
            },
            url: "https://linkedin-profile-data-api.p.rapidapi.com/data-connection-count"
        };

        const linkedinResp = await axios(options);

        return linkedinResp.data.data;
    }
    catch (error) {
        console.error("Error while getting pnr status", error);

        return error;
    }
};

module.exports = linkdin;
const AWS = require("aws-sdk");
const  {
    basicConfigurationObject 
} = require("../utils/constants.js");
const sqsConfiguration = () => {
    // Update the AWS configuration
    AWS.config.update({
        // Specify the AWS region you're working in
        accessKeyId: basicConfigurationObject.AWS_S3_ACCESS_KEY_ID, 
        region: basicConfigurationObject.AWS_S3_REGION, // Your AWS access key ID
        secretAccessKey: basicConfigurationObject.AWS_S3_SECRET_ACCESS_KEY// Your AWS secret access key
    });
    const sqsInstance = new AWS.SQS({
        apiVersion: "2012-11-05" 
    });

    return sqsInstance;
};

module.exports = sqsConfiguration;

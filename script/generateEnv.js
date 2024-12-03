// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html

const secret_name = "";
const fs = require("fs");
const path = require("path");
const {
    SecretsManagerClient,
    GetSecretValueCommand
} = require("@aws-sdk/client-secrets-manager");

const client = new SecretsManagerClient({
    credentials: {
        accessKeyId: "",       // Replace with your actual AWS Access Key ID
        secretAccessKey: "" // Replace with your actual AWS Secret Access Key
    
    },
    region: ""
});

const generateEnv = async () => {
    try {
        const response = await client.send(
            new GetSecretValueCommand({
                SecretId: secret_name,
                VersionStage: "AWSCURRENT" // VersionStage defaults to AWSCURRENT if unspecified
            })
        );

        // Assuming the secret string is in JSON format
        console.log("response.SecretString", response.SecretString);
        
        const secretData = JSON.parse(response.SecretString);

        console.log("secretData", secretData);
        
        let envContent = "";

        for (const [ key,
            value ] of Object.entries(secretData)) 
            envContent += `${key}=${value}\n`;

        // Write the .env file
        const envPath = path.join(".env");

        fs.writeFileSync(envPath, envContent);

        console.log("response", response.SecretString);
    }
    catch (error) {
        // For a list of exceptions thrown, see
        // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        console.error("Error retrieving secret:", error);
        throw error;
    }
};

// Your code goes here
generateEnv(); // Call the function to test

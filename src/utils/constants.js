"use strict";

const dotenv = require("dotenv");

dotenv.config();

const errorAndSuccessCodeConfiguration = {
    HTTP_STATUS_BAD_REQUEST: 1001,
    HTTP_STATUS_CONFLICT: 1002,
    HTTP_STATUS_CREATED: 1003,
    HTTP_STATUS_FORBIDDEN: 1004,
    HTTP_STATUS_GONE: 1009,
    HTTP_STATUS_INTERNAL_SERVER_ERROR: 1005,
    HTTP_STATUS_NO_CONTENT: 1008,
    HTTP_STATUS_NOT_FOUND: 1006,
    HTTP_STATUS_OK: 1007,
    HTTP_STATUS_TOO_MANY_REQUESTS: 1009,
    HTTP_STATUS_UNAUTHORIZED: 1010,
    HTTP_UNPROCESSABLE_ENTITY: 1011
};

const basicConfigurationObject  = {
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    ASSESTS_URL: process.env.ASSESTS_URL,
    AUTH_SERVER_URL: process.env.AUTH_SERVER_URL,
    AWS_S3_ACCESS_KEY_ID: process.env.AWS_S3_ACCESS_KEY_ID,
    AWS_S3_REGION: process.env.AWS_S3_REGION,
    AWS_S3_SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY,
    BUCKET_NAME_AWS: process.env.BUCKET_NAME_AWS,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    DB_NAME: process.env.DB_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_PORT_NUMBER: process.env.DB_PORT_NUMBER,
    DB_USER_NAME: process.env.DB_USER_NAME,
    ENVIROMENT: process.env.ENVIROMENT,
    FIX_OTP_EMAILS: process.env.FIX_OTP_EMAILS,
    JSON_STRINGIFY: process.env.JSON_STRINGIFY,
    JWT_ISSSUER: process.env.JWT_ISSSUER,
    LOGIN_EMAIL_RESTRICT_KEY: process.env.LOGIN_EMAIL_RESTRICT_KEY,
    MONGODB_URI: process.env.MONGODB_URI,
    MYSQL_URI: process.env.MYSQL_URI,
    NODE_ENV: process.env.NODE_ENV,
    PASSWORD_SECRET_KEY: process.env.PASSWORD_SECRET_KEY,
    PORT_NUMBER: process.env.PORT,
    RABBIT_MQ_URL: process.env.RABBIT_MQ_URL,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    REDIS_PORT: process.env.REDIS_PORT,
    REFERENCE_START_DATE: process.env.REFERENCE_START_DATE,
    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    RESTRICTED_EMAIL_DOMAINS: process.env.RESTRICTED_EMAIL_DOMAINS,
    SQS_QUEUE_URL: process.env.SQS_QUEUE_URL,
    SQS_SOCKET_QUEUE_URL: process.env.SQS_SOCKET_QUEUE_URL,
    TWO_FACTOR_API_SMS_SERVICE: process.env.TWO_FACTOR_API_SMS_SERVICE
};

const statusCodeObject = {
    HTTP_STATUS_BAD_REQUEST: 400,
    HTTP_STATUS_CONFLICT: 409,
    HTTP_STATUS_CREATED: 201,
    HTTP_STATUS_FORBIDDEN: 403,
    HTTP_STATUS_GONE: 410,
    HTTP_STATUS_INTERNAL_SERVER_ERROR: 500,
    HTTP_STATUS_NO_CONTENT: 204,
    HTTP_STATUS_NOT_FOUND: 404,
    HTTP_STATUS_OK: 200,
    HTTP_STATUS_TOO_MANY_REQUESTS: 429,
    HTTP_STATUS_UNAUTHORIZED: 401,
    HTTP_UNPROCESSABLE_ENTITY: 422
};

const CommonMessage = {
    ALT_NUMBER_AND_NUMBER_SAME: "Alternate phone and phone number is same",
    DATA_DELETED: "Detail Delete Successfully",
    DETAIL_ALREADY_EXISTS: "Detail Already Exists",
    DETAIL_DELETED_SUCCESSFULLY: "Detail Deleted Successfully",
    DETAIL_FETCHED_SUCCESSFULLY: "Detail Fetched Successfully",
    DETAIL_NOT_FOUND: " Detail Not Found",
    DETAIL_SAVED_SUCCESSFULLY: "Detail Saved Successfully",
    DETAIL_UPDATED_SUCCESSFULLY: "Detail Updated Successfully",
    EMAIL_REQUIRED: "Email is Required",
    ERROR_EMAIL_RESTRICATION: "Please Use Different Email this email is blocked",
    ERROR_FIELD_REQUIRED: "Field required",
    ERROR_MESSAGE_BAD_REQUEST: "Bad Request",
    ERROR_MESSAGE_FORBIDDEN: "Forbidden",
    ERROR_MESSAGE_INTERNAL_SERVER_ERROR: "Internal Server Error",
    ERROR_MESSAGE_NOT_FOUND: "Not Found",
    ERROR_MESSAGE_TOO_MANY_REQUESTS: "Too Many Requests",
    ERROR_MESSAGE_UNAUTHORIZED: "Unauthorized",
    INVALID_ACCOUNT_NUMBER: "Invalid Account Number",
    INVALID_EMAIL: "Invalid Email",
    INVALID_FSSAI_NUMBER: "Invalid Fssai Number",
    INVALID_GST_NUMBER: "Invalid GST Number",
    INVALID_IFSC: "Invalid IFSC Number",
    INVALID_PNR: "Invalid Pnr",
    LOGIN_COUNT_EXCEEDED: "You have reached max login",
    LOGIN_KEY_MISSING: "Login Key is Missing",
    MESSAGE_ERROR: "Error",
    MESSAGE_SUCCESS: "Success",
    PASSWORD_REQUIRED: "Password is Required",
    PLEASE_ENTER_VALID_PHONE_NUMBER: "Please Enter Valid Phone Number",
    SIGNED_URL_GENERATED_SUCCESSFULLY: "Signed Url Generated Successfully",
    SOMETHING_WENT_WRONG: "Something went Wrong",
    USERNAME_REQUIRED: "User name is required",
    USERNAME_VALIDATION_ERROR: "User name must be alphanumeric."
};

const registerMessage = {
    ERROR_INVALID_EMAIL_VALIDATION: "Invalid email address",
    ERROR_PASSWORD_VALIDATION: "At least 1 uppercase, 1 lowercase, 1 number, 1 special character and minimum 8 characters required.",
    ERROR_USER_ALREADY_EXIST: "User Already Exist",
    SUCCESSFULLY_SAVED: "User Registered Successfully"
};

const loginMessage = {
    ACCOUNT_BLOCKED: "Your Account is Blocked Please Contact Our Support",
    ACCOUNT_VERIFICATION_PENDING: "Your Account Is Not Verified",
    EITHER_PHONE_NUMBER_OR_PASSWORD_WRONG: "Either Email/Username or Password Wrong",
    ERROR_PASSWORD_VALIDATION: "At least 1 uppercase, 1 lowercase, 1 number, 1 special character and minimum 8 characters required.",
    ERROR_USER_NOT_FOUND: "User Not Found",
    LOGIN_OTP_SENT_SUCCESSFULLY: "login OTP sent successfully",
    PASSWORD_AND_CURRENT_PASSWORD_WRONG: "Password And Current password is wrong",
    SUCCESSFULLY_LOGINED: "User Logined Successfully"
};

module.exports = {
    basicConfigurationObject,
    CommonMessage,
    errorAndSuccessCodeConfiguration,
    loginMessage,
    registerMessage,
    statusCodeObject
};
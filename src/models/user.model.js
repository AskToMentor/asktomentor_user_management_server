/* eslint-disable require-path-exists/exists */
"use strict";

const mongoose = require("mongoose");
const RolesEnum = require("../utils/roles.js");
const {
    basicConfigurationObject, CommonMessage
} = require( "../utils/constants.js");
const CryptoJS = require("crypto-js");

const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId();
const userSchema = new mongoose.Schema(
    {
        accountApprovedTime: {
            type: Date
        },
        accountApprovedTimeInSecond: {
            type: Number
        },
        accountBlocked: {
            default: false,
            type: Boolean 
        },
        accountBlockedMessage: {
            type: String
        },
        accountBlockedTime: {
            type: Date
        },
        accountBlockedTimeInSecond: {
            type: Number
        },
        address: {
            type: String
        },
        city: {
            type: String 
        },
        countryCode: {
            type: String
        },
        countryName: {
            type: String
        },
        // dayNumber: {
        //     required: true,
        //     type: Number 
        // },
        deleteTime: {
            type: Number
        },
        deletionReason: {
            type: String
        },
        dialCode: {
            type: String
        },
        email: {
            required: true,
            type: String
        },
        emailVerificationCode: {
            type: String
        },
        emailVerificationTime: {
            type: Date
        },
        emailVerificationTimeInSecond: {
            type: Number
        },
        emailVerified: {
            default: "Pending",
            type: String
        },
        faceBookId: {
            type: String
        },
        firstName: {
            required: false,
            type: String
        },
        instagramId: {
            type: String
        },
        isDocumentUploaded: {
            default: false,
            required: true,
            type: Boolean 
        },
        lastName: {
            required: false,
            type: String
        },
        linkdein_full_name: {
            type: String
        },
        
        linkedinId: {
            type: String

        },

        loginCount: {
            type: Number
        },

        password: {
            required: true,
            type: String
        },

        phoneNumber: {
            type: String
        },

        pincode: {
            type: Number
        },

        profileImageUrl: {
            type: String
        },

        profileViedoUrl: {
            type: String
        },
        
        role: {
            default: RolesEnum.USER,
            type: Number
        },
        
        salt: {
            type: String
        },
        
        selfIntroDesc: {
            type: String
        },

        skills: {
            type: Array
        },

        stateCode: {
            required: false,
            type: String
        },

        twitterId: {
            type: String
        },
        
        userId: {
            required: true,
            type: String,
            unique: true
        },
        // monthNumber: {
        //     required: true,
        //     type: Number
        // }, 
        userName: {
            type: String
        },
        verified: {
            default: "Pending",
            type: String
        }
        // weekNumber: {
        //     required: true,
        //     type: Number
        // }
    },
    {
        timestamps: true 
    }
);

async function passworEncryption(password, salt){
    const loginKey = basicConfigurationObject.PASSWORD_SECRET_KEY;

    if (!loginKey) return CommonMessage.LOGIN_KEY_MISSING;

    const passwordHashed = await CryptoJS.HmacSHA256(password + salt, loginKey).toString();

    return passwordHashed;
}

userSchema.pre("save", async function(next){
    if (!this.isModified("password")) return next();
    
    this.salt = uid.stamp(32);

    this.password = await passworEncryption(this.password, this.salt);
});
const User = mongoose.model("user", userSchema);

module.exports = User;

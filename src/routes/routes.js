"use strict";

const  {
    Router
} = require( "express");

const router = Router();
const  authenticateJwtMiddleware = require( "../middleware/authenticateJwtMiddleware.js");
const upload = require("../utils/multer.js");

const register = require("../controllers/register.controller");
const login = require("../controllers/login.controller");
const getCurrentUser = require("../controllers/getCurrentUser.controller");
const getSkills = require("../controllers/getSkills.contoller.js");
const addUserDetail = require("../controllers/addUserDetail.controller.js");
const uploadProfilePicture = require("../controllers/uploadProfilePicture.controller.js");
const getCoachingOfferings = require("../controllers/getCoachingOfferings.controller.js");
const getCategories = require("../controllers/getCateogries.controller.js");
const saveSettings =  require("../controllers/saveSettings.controller.js");
const googleLogin = require("../controllers/googleLogin.controller.js");
const saveQuestionaries = require("../controllers/saveQuestionaries.controller.js");
const importLinkedinProfile = require("../controllers/importLinkedinProfile.js");
const getProfile = require("../controllers/getProfile.controller.js");
const getUserDetail = require("../controllers/getUserDetail.controller.js");
const updateBasicDetail = require("../controllers/updateBasicDetail.controller.js");

router.route("/").get((req, res) => {
    res.status(200).json({
        message: "Health check passed",
        status: "OK" 
    });
});

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/getCurrentUser").get(authenticateJwtMiddleware, getCurrentUser);
router.route("/getSkills").get(getSkills);
router.route("/getCoachingOfferings").get(getCoachingOfferings);
router.route("/getCategories").get(getCategories);
router.route("/addUserDetail").post(addUserDetail);
router.route("/saveSettings").post(saveSettings);
router.route("/saveQuestionaries").post(saveQuestionaries);
router.route("/googleLogin").post(googleLogin);
router.route("/importLinkedinProfile").post(importLinkedinProfile);
router.route("/uploadProfilePicture").post(upload.single("profile_image"), uploadProfilePicture);
router.route("/getProfile").get(getProfile);
router.route("/updateBasicDetail").post(authenticateJwtMiddleware, updateBasicDetail);
router.route("/getUserDetail").get(authenticateJwtMiddleware, getUserDetail);

module.exports = router;
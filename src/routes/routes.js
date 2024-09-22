"use strict";

const  {
    Router
} = require( "express");

const router = Router();
const  authenticateJwtMiddleware = require( "../middleware/authenticateJwtMiddleware.js");

const register = require("../controllers/register.controller");
const login = require("../controllers/login.controller");
const getCurrentUser = require("../controllers/getCurrentUser.controller");
const getSkills = require("../controllers/getSkills.contoller.js");
const addUserDetail = require("../controllers/addUserDetail.controller.js");

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
router.route("/addUserDetail").get(addUserDetail);
module.exports = router;
"use strict";

const  {
    Router
} = require( "express");

const router = Router();
const register = require("../controllers/register.controller");
const login = require("../controllers/login.controller");

router.route("/").get((req, res) => {
    res.status(200).json({
        message: "Health check passed",
        status: "OK" 
    });
});

router.route("/register").post(register);
router.route("/login").post(login);
module.exports = router;
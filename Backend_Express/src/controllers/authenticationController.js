const express = require("express");
const authentication_router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { userDataValidateForLogin, userDataValidateForCreate, userDataValidateForUpdate, userValidateForPasswordUpdate } = require('../middlewares/userobjMiddleware');
const { validationResult } = require('express-validator');
const userModel = require('..//models/users_model');
const user_actions = require("../services/user_actions");
require('dotenv').config();
const authenticateToken = require('../middlewares/tokenValidatorMiddleware');
const logger = require('../utils/logger');


authentication_router.post("/userRegister", userDataValidateForCreate, async (req, res) => {
    // Extracts the validation errors of an express request
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            const formattedErrors = [];
            errors.array().map(err => formattedErrors.push({ [err.path]: err.msg }));
            //code for log message as the formatted errors is an array of objects, it will display as undefined in the log file.
            let logMessage = ``;
            for (let item of formattedErrors) {
                for (let key in item) {
                    logMessage += ` [${key}]: ${item[key]} `;
                    //console.log(`${key}: ${item[key]}`);
                }
                logMessage += `,`;
            }
            logMessage = logMessage.slice(0, -1);
            //msg = req.url + " - " + req.method;
            logger.error({ label: `${req.url} - ${req.method}`, message: logMessage });

            return res.status(422).json({
                success: false,
                msg: logMessage
            });
        }


        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        let userObj = {
            password: hashedPassword,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone_number: req.body.phone_number
        }

        let result = await user_actions.createUser(userObj);
        if (result.status == false) {
            logger.error({ label: `${req.url} - ${req.method}`, message: result.msg });
            return res.status(result.code).json(result);
        }
        logger.log({ level: 'info', label: `${req.url} - ${req.method}`, message: 'action successfully executed.' });
        return res.status(200).send(result);
    } catch (error) {
        logger.error({ label: `${req.url} - ${req.method}`, message: error.message });
        return res.status(500).json({ success: false, msg: error.message });
    }

});

authentication_router.post("/userLogin", userDataValidateForLogin, async function (req, res) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            const formattedErrors = [];
            errors.array().map(err => formattedErrors.push({ [err.path]: err.msg }));
            //code for log message as the formatted errors is an array of objects, it will display as undefined in the log file.
            let logMessage = ``;
            for (let item of formattedErrors) {
                for (let key in item) {
                    logMessage += ` [${key}]: ${item[key]} `;
                    //console.log(`${key}: ${item[key]}`);
                }
                logMessage += `,`;
            }
            logMessage = logMessage.slice(0, -1);
            //msg = req.url + " - " + req.method;
            logger.error({ label: `${req.url} - ${req.method}`, message: logMessage });
            return res.status(422).json({
                success: false,
                msg: logMessage
            });
        }

        let result = await userModel.findAll({ where: { email: req.body.email } });

        // verify credentials, generate the token and send the token to client
        if (result.length != 0) {
            const userObj = {};
            for (let item of result) {
                userObj.user_id = item.user_id;
                userObj.email = item.email;
                userObj.password = item.password;
            }
            const isPasswordValid = await bcrypt.compare(req.body.password, userObj.password);
            if (!isPasswordValid) {
                logger.error({ label: `${req.url} - ${req.method}`, message: 'Invalid password' });
                return res.status(401).json({ success: false, message: 'Invalid password' });
            }

            // Generate JWT token
            const JWTToken = jwt.sign({ userId: userObj.user_id, role: "User" }, process.env.JWT_SECRETKEY, { expiresIn: '1h' });
            logger.log({ level: 'info', label: `${req.url} - ${req.method}`, message: 'action successfully executed.' });
            return res.status(200).json({ success: true, token: JWTToken, user_id: userObj.user_id });
        }
        else {
            logger.error({ label: `${req.url} - ${req.method}`, message: "Invalid User email" });
            return res.status(401).json({ success: false, message: "Invalid User email" });
        }
    } catch (error) {
        logger.error({ label: `${req.url} - ${req.method}`, message: error.message });
        res.status(500).json({ success: false, message: error.message });
    }
});

authentication_router.put("/userUpdate/:userId", authenticateToken, userDataValidateForUpdate, async (req, res) => {
    try {
        console.log(req.body);
        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            const formattedErrors = [];
            errors.array().map(err => formattedErrors.push({ [err.path]: err.msg }));
            //code for log message as the formatted errors is an array of objects, it will display as undefined in the log file.
            let logMessage = ``;
            for (let item of formattedErrors) {
                for (let key in item) {
                    logMessage += ` [${key}]: ${item[key]} `;
                    //console.log(`${key}: ${item[key]}`);
                }
                logMessage += `,`;
            }
            logMessage = logMessage.slice(0, -1);
            //msg = req.url + " - " + req.method;
            logger.error({ label: `${req.url} - ${req.method}`, message: logMessage });
            return res.status(422).json({
                success: false,
                msg: logMessage
            });
        }
        // const hashedPassword = await bcrypt.hash(req.body.password, 10);

        let userObj = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone_number: req.body.phone_number
        }

        let result = await user_actions.updateUser(userObj,req.params.userId);
        if (result.status == false) {
            logger.error({ label: `${req.url} - ${req.method}`, message: result.msg });
            return res.status(500).json(result);
        }
        logger.log({ level: 'info', label: `${req.url} - ${req.method}`, message: 'action successfully executed.' });
        res.status(200).json(result);
    } catch (error) {
        logger.error({ label: `${req.url} - ${req.method}`, message: error.message });
        return res.status(500).json({ status: false, msg: "internal server error" });
    }


});

authentication_router.put("/userPasswordUpdate", userValidateForPasswordUpdate, async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            const formattedErrors = [];
            errors.array().map(err => formattedErrors.push({ [err.path]: err.msg }));
            //code for log message as the formatted errors is an array of objects, it will display as undefined in the log file.
            let logMessage = ``;
            for (let item of formattedErrors) {
                for (let key in item) {
                    logMessage += ` [${key}]: ${item[key]} `;
                    //console.log(`${key}: ${item[key]}`);
                }
                logMessage += `,`;
            }
            logMessage = logMessage.slice(0, -1);
            //msg = req.url + " - " + req.method;
            logger.error({ label: `${req.url} - ${req.method}`, message: logMessage });
            return res.status(422).json({
                success: false,
                msg: logMessage
            });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        let userObj = {
            password:hashedPassword,
            email: req.body.email,
        }

        let result = await user_actions.updateUserPassword(userObj,req.body.email);
        if (result.status == false) {
            logger.error({ label: `${req.url} - ${req.method}`, message: result.msg });
            return res.status(500).json(result);
        }
        logger.log({ level: 'info', label: `${req.url} - ${req.method}`, message: 'action successfully executed.' });
        res.status(200).json(result);
    } catch (error) {
        logger.error({ label: `${req.url} - ${req.method}`, message: error.message });
        return res.status(500).json({ status: false, msg: "internal server error" });
    }


});



module.exports = authentication_router;
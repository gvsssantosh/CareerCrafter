const express = require("express");
const auth_router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { adminDataValidateForLogin, adminDataValidateForCreate , adminValidateForPasswordUpdate} = require('../middlewares/admin.middleware');
const { validationResult } = require('express-validator');
const adminModel = require('..//models/admin_model');
const adminservices = require("../services/admin_services");
require('dotenv').config();
const authenticateToken = require('../middlewares/tokenvalidation');
const logger = require('../utils/logger');
const Admins_model = require("..//models/admin_model");

auth_router.post("/adminRegister", adminDataValidateForCreate, async (req, res) => {
    // Extracts the validation errors of an express request
    try {
        
        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            const formattedErrors = [];
            errors.array().map(err => formattedErrors.push({ [err.path]: err.msg }));
            logger.error({ label: 'Controller', message: formattedErrors });
            return res.status(422).json({
                success: false,
                errors: formattedErrors
            });
        }


        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        let adminObj = {
            password: hashedPassword,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone_number: req.body.phone_number
        }

        let result = await adminservices.createadmin(adminObj);
        if (result.status == false) {
            return res.status(result.code).json(result);
        }
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }

});
auth_router.post("/adminLogin", adminDataValidateForLogin, async function (req, res) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            const formattedErrors = [];
            errors.array().map(err => formattedErrors.push({ [err.path]: err.msg }));
            return res.status(422).json({
                success: false,
                errors: formattedErrors
            });
        }

        let result = await adminModel.findAll({ where: { email: req.body.email } });

        // verify credentials, generate the token and send the token to client
        if (result.length != 0) {
            const adminObj = {};
            for (let item of result) {
                adminObj.admin_id = item.admin_id;
                adminObj.email = item.email;
                adminObj.password = item.password;
            }
            const isPasswordValid = await bcrypt.compare(req.body.password, adminObj.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            // Generate JWT token
            const JWTToken = jwt.sign({ adminId: adminObj.admin_id }, process.env.JWT_SECRETKEY, { expiresIn: '1h' });
            return res.status(200).json({ success: true, token: JWTToken ,adminId: adminObj.admin_id });
        }
        else {
            return res.status(401).json({ success: false, message: "Invalid User email" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

auth_router.put("/adminPasswordUpdate", adminValidateForPasswordUpdate, async (req, res) => {
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

        let adminObj = {
            password:hashedPassword,
            email: req.body.email,
        }

        let result = await adminservices.updateAdminPassword(adminObj,req.body.email);
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

module.exports = auth_router;
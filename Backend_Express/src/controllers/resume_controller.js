const express = require("express");
const resume_router = express.Router();
const timestamp = require('../utils/timestamp');
const { resumeDataValidateForCreate, resumeDataValidateForUpdate, resumeDataFileValidateForUpdate, resumeDataValidateForGet } = require('../middlewares/resObjMiddleware');
const multer = require('multer');
const { validationResult } = require('express-validator');
const user_actions = require("../services/user_actions");
const authenticateToken = require('../middlewares/tokenValidatorMiddleware');
const logger = require('../utils/logger');
const path = require('path');
const fs = require('fs');
let filename;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //change according to your route
        //D:\ht\career_crafter_frontend\cc-frontend\public\pdf..file explorer path

        return cb(null, "D:/ht/career_crafter_frontend/cc-frontend/public/pdf")
    },
    filename: function (req, file, cb) {
        filename = `${Date.now()}_${file.originalname}`;
        console.log(filename);
        return cb(null, filename);
    }
})

const upload = multer({ storage })

resume_router.post("/resumeInsert", authenticateToken, upload.single('resume_file_link'), resumeDataValidateForCreate, async (req, res) => {
    try {
        console.log(req.body);

        console.log(req.body.resume_file_link);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {


            const formattedErrors = [];
            errors.array().map(err => formattedErrors.push({ [err.path]: err.msg }));
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

        let resumeObj = {
            user_id: parseInt(req.body.user_id),
            description: req.body.description,
            projects: req.body.projects,
            Skills: req.body.Skills,
            Certifications: req.body.Certifications,
            internships: req.body.internships,
            work_experience: req.body.work_experience,
            resume_file_link: filename
        };
        console.log(resumeObj);

        let resObj = await user_actions.InsertIntoResume(resumeObj);
        //if resObjArr.status is false then an error has occurred
        if (resObj.status == false) {
            logger.error({ label: `${req.url} - ${req.method}`, message: resObj.msg });
            return res.status(500).json(resObj);
        }
        //else go through the array of object(resObj.obj) and fetch the results
        let resultObj = {};
        for (let item of resObj.obj) {
            resultObj.user_id = item.user_id;
            resultObj.resume_id = item.resume_id;
        }
        logger.log({ level: 'info', label: `${req.url} - ${req.method}`, message: 'action successfully executed.' });
        res.status(200).json(`user_id:${resultObj.user_id}, resume_id:${resultObj.resume_id}`);
    } catch (error) {
        logger.error({ label: `${req.url} - ${req.method}`, message: error.message });
        return res.status(500).json({ success: false, error: error.message });
    }
});

resume_router.get("/getResumeByUserId/:userId", authenticateToken, resumeDataValidateForGet, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            const formattedErrors = [];
            errors.array().map(err => formattedErrors.push({ [err.path]: err.msg }));
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
                code: 422,
                msg: logMessage
            });
        }
        let resultObj = await user_actions.getResumeByID(req.params.userId);
        if (resultObj.status == false) {
            logger.error({ label: `${req.url} - ${req.method}`, message: resultObj.msg });
            return res.status(500).json(resultObj);
        }
        if (resultObj.obj.length == 0) {
            return res.status(404).json({ success: false, msg: "no resume for this user" });
        }
        logger.log({ level: 'info', label: `${req.url} - ${req.method}`, message: 'action successfully executed.' });
        res.status(200).json(resultObj);
    } catch (error) {
        logger.error({ label: `${req.url} - ${req.method}`, message: error.message });
        return res.status(500).json({ success: false, code: 500, msg: error.message });
    }
});

resume_router.put("/updateResume", authenticateToken, resumeDataValidateForUpdate, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            const formattedErrors = [];
            errors.array().map(err => formattedErrors.push({ [err.path]: err.msg }));
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

        let resumeObj = {
            user_id: parseInt(req.body.user_id),
            //user_id: req.params.user_id,
            description: req.body.description,
            projects: req.body.projects,
            Skills: req.body.Skills,
            Certifications: req.body.Certifications,
            internships: req.body.internships,
            work_experience: req.body.work_experience,
            last_updated: timestamp.getCurrentTimestamp()
        };
        let result = await user_actions.updateResume(resumeObj);

        if (result.status == false) {
            logger.error({ label: `${req.url} - ${req.method}`, message: result.msg });
            return res.status(500).json(result);
        }
        logger.log({ level: 'info', label: `${req.url} - ${req.method}`, message: 'action successfully executed.' });
        //console.log(resumeObj.user_id);
        res.status(200).json(result);
    } catch (error) {
        logger.error({ label: `${req.url} - ${req.method}`, message: error.message });
        return res.status(500).json({ success: false, error: error.message });
    }
});

resume_router.post('/upload', upload.single('pdf'), (req, res) => {
    console.log(req.body)
    console.log(req.file)
})

resume_router.put("/updateResumeFile", authenticateToken, upload.single('pdf'), async (req, res) => {
    try {
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            const formattedErrors = [];
            errors.array().map(err => formattedErrors.push({ [err.path]: err.msg }));
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
        console.log(req.body);
        console.log(req.pdf);
        //return res.status(200).json("success");
        console.log(filename);
        let resumeObj = {
            user_id: parseInt(req.body.user_id),
            //user_id: req.params.user_id,
            last_updated: timestamp.getCurrentTimestamp(),
            resume_file_link: filename
        };
        let result = await user_actions.updateResumeFile(resumeObj);

        if (result.status == false) {
            logger.error({ label: `${req.url} - ${req.method}`, message: result.msg });
            return res.status(500).json(result);
        }
        logger.log({ level: 'info', label: `${req.url} - ${req.method}`, message: 'action successfully executed.' });
        //console.log(resumeObj.user_id);
        res.status(200).json(result);
    } catch (error) {
        logger.error({ label: `${req.url} - ${req.method}`, message: error.message });
        return res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = resume_router;
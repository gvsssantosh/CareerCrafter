const express = require("express");
const user_router = express.Router();

const { validationResult } = require('express-validator');
const user_actions = require("../services/user_actions");
const authenticateToken = require('../middlewares/tokenValidatorMiddleware');
const logger = require('../utils/logger');


user_router.get("/jobId/:id", authenticateToken, async (req, res) => {
    try {
        let jobid = req.params.id;
        let jobObj = await user_actions.searchJobById(jobid);
        if (jobObj.status == false) {
            throw new Error(jobObj.msg);
        }
        //console.log(jobid);
        if (jobObj.obj == null) {
            return res.status(200).json({ success: false, error: "no job with the given id" });
        }
        //console.log(jobObj);
        logger.log({ level: 'info', label: `${req.url} - ${req.method}`, message: 'action successfully executed.' });
        return res.status(200).json(jobObj);
    } catch (error) {
        logger.error({ label: `${req.url} - ${req.method}`, message: error.message });
        return res.status(500).json({ success: false, error: error.message });
    }

});

user_router.get("/jobInd_loc", authenticateToken, async (req, res) => {
    try {
        // let searchObj = {
        //     job_industry: req.body.industry,
        //     location: req.body.location
        // };
        let searchObj=req.query;
        // console.log(req.query);
        // console.log("-----------");
        // console.log(searchObj);
        let jobObj = await user_actions.searchJobByIndLoc(searchObj);
        if (jobObj.status == false) {
            throw new Error(jobObj.msg);
        }
        if (jobObj.obj == null) {
            return res.status(200).json({ success: false, error: "no job with the given id" });
        }
        //console.log(jobObj);
        logger.log({ level: 'info', label: `${req.url} - ${req.method}`, message: 'action successfully executed.' });
        return res.status(200).json(jobObj);
    } catch (error) {
        logger.error({ label: `${req.url} - ${req.method}`, message: error.message });
        return res.status(500).json({ success: false, error: error.message });
    }

});

user_router.get("/jobInd_loc_title", authenticateToken, async (req, res) => {
    try {
        // let searchObj = {
        //     job_title: req.body.title,
        //     job_industry: req.body.industry,
        //     location: req.body.location,
            
        // };
        let searchObj=req.query;
        let jobObj = await user_actions.searchJobByTitleIndLoc(searchObj);
        if (jobObj.status == false) {
            throw new Error(jobObj.msg);
        }
        //console.log(jobid);
        if (jobObj.obj == null) {
            return res.status(200).json({ success: false, error: "no job with the given title, loc, ind" });
        }
        //console.log(jobObj);
        logger.log({ level: 'info', label: `${req.url} - ${req.method}`, message: 'action successfully executed.' });
        return res.status(200).json(jobObj);
    } catch (error) {
        logger.error({ label: `${req.url} - ${req.method}`, message: error.message });
        return res.status(500).json({ success: false, error: error.message });
    }

});

user_router.get("/jobLoc/:jobloc", authenticateToken, async (req, res) => {
    try {
        let jobloc = req.params.jobloc;
        let jobArrObj = await user_actions.searchJobByLocation(jobloc);
        if (jobArrObj.status == false) {
            throw new Error(jobArrObj.msg);
        }
        if (jobArrObj.obj.length == 0) {
            return res.status(200).json({ success: false, error: "no jobs with the given location" });

        }
        logger.log({ level: 'info', label: `${req.url} - ${req.method}`, message: 'action successfully executed.' });
        return res.status(200).json(jobArrObj);
    } catch (error) {
        logger.error({ label: `${req.url} - ${req.method}`, message: error.message });
        return res.status(500).json({ success: false, error: error.message });
    }

});

user_router.get("/jobInd/:jobInd", authenticateToken, async (req, res) => {
    try {
        let jobIndustry = req.params.jobInd;
        let jobArrObj = await user_actions.searchJobByIndustry(jobIndustry);
        console.log(jobIndustry);
        if (jobArrObj.status == false) {
            throw new Error(jobArrObj.msg);
        }
        if (jobArrObj.obj.length == 0) {
            logger.log({ level: 'info', label: `${req.url} - ${req.method}`, message: 'no jobs with the specified industry.' });
            return res.status(200).json({ success: false, error: "no jobs with the specified industry" });
        }
        logger.log({ level: 'info', label: `${req.url} - ${req.method}`, message: 'action successfully executed.' });
        //console.log(jobObj);
        return res.status(200).json(jobArrObj);
    } catch (error) {
        logger.error({ label: `${req.url} - ${req.method}`, message: error.message });
        return res.status(500).json({ success: false, error: error.message });
    }
});

user_router.post("/jobApply", authenticateToken, async (req, res) => {
    try {
        let applyJobObj = {
            job_id: parseInt(req.body.job_id),
            user_id: parseInt(req.body.user_id)
        }
        let status = await user_actions.applyToJob(applyJobObj);
        if (status.success == false) {
            //if possible can add a field status_code in the status object to change the status code
            // ---- for each error

            return res.status(status.code).json(status);
        }
        logger.log({ level: 'info', label: `${req.url} - ${req.method}`, message: 'action successfully executed.' });
        return res.status(200).json(status);
    } catch (error) {
        logger.error({ label: `${req.url} - ${req.method}`, message: error.message });
        return res.status(500).json({ success: false, msg: error.message });
    }

});

user_router.get("/getAllApllicationsByUser/:userId", authenticateToken, async (req, res) => {
    try {
        let resultObj = await user_actions.viewApplicationsByUserId(req.params.userId);
        if (resultObj.status == false) {
            return res.status(resultObj.code).json(resultObj);
        }
        logger.log({ level: 'info', label: `${req.url} - ${req.method}`, message: 'action successfully executed.' });
        return res.status(200).json(resultObj);
    } catch (error) {
        logger.error({ label: `${req.url} - ${req.method}`, message: error.message });
        return res.status(500).json({ success: false,code:500, msg: error.message });
    }

});

user_router.delete("/delJobApplication", authenticateToken, async (req, res) => {
    try {
        // let deleteObj = {
        //     user_id: parseInt(req.body.user_id),
        //     job_id: parseInt(req.body.job_id)
        // }
        let deleteObj=req.query;
        let result = await user_actions.deleteApplication(deleteObj);
        //console.log(deleteObj);
        if (result.status == true) {
            logger.log({ level: 'info', label: `${req.url} - ${req.method}`, message: 'action successfully executed.' });
            return res.status(200).json(result);
        }
        else { return res.status(result.code).json(result); }
    } catch (error) {
        logger.error({ label: `${req.url} - ${req.method}`, message: error.message });
        return res.status(500).json({ success: false, msg: error.message });
    }
});

user_router.get("/userdetails/:userId",authenticateToken,async(req,res)=>{
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


        let result = await user_actions.userDetailsByUserId(req.params.userId);
        if (result.success == false) {
            logger.error({ label: `${req.url} - ${req.method}`, message: result.msg });
            return res.status(500).json(result);
        }
        logger.log({ level: 'info', label: `${req.url} - ${req.method}`, message: 'action successfully executed.' });
        res.status(200).json(result);
    } catch (error) {
        logger.error({ label: `${req.url} - ${req.method}`, message: error.message });
        return res.status(500).json({ success: false, msg: "internal server error" });
    }


})

module.exports = user_router;
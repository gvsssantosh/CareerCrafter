const express = require("express");
const router = express.Router();
const { 
    jobDataValidateForCreate, 
    jobDataValidateForUpdate, 
    jobDataValidateForDelete, 
    resumeDataValidateForGet,
    jobDataValidateForGetByEmployeeId,
    updateApplicationStatusValidation,
    viewApplicationByApplicationId, 
    jobDataValidateForGetByJobId,adminDataValidateForUpdate
} = require('../middlewares/employe.middleware');
const { validationResult } = require('express-validator');
const authenticateToken = require('../middlewares/tokenvalidation');
const employeservices = require('../services/employer.service');
const logger = require('../utils/logger'); // Importing the logger module

// Routes for job listings

router.get("/jobs", authenticateToken, async (req, res) => {
    try {
        const jobArray = await employeservices.getJobListingDetails();
        res.status(200).json(jobArray);
        logger.info("GET /jobs request successful");
    } catch (error) {
        console.error("Error in GET /jobs:", error);
        logger.error("Error in GET /jobs: " + error.message);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});

router.get("/job/:jobId", authenticateToken, jobDataValidateForGetByJobId, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map(err => ({ [err.param]: err.msg }));
            console.error("Validation errors:", formattedErrors);
            logger.warn("Validation errors in GET /jobs/employee/:employeeId: " + JSON.stringify(formattedErrors));
            return res.status(400).json({ success: false, errors: formattedErrors });
        }
    
        const jobId = req.params.jobId;
        const job = await employeservices.getJobByJobId(jobId);
        res.json({ status: true, data: job.data });
        logger.info("GET /job/:jobId request successful");

    } catch (error) {
        console.error("Error in GET /job/:jobId:", error);
        logger.error("Error in GET /job/:jobId: " + error.message);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});


// Get job listings by employee ID
router.get("/jobs/employee/:employeeId", authenticateToken, jobDataValidateForGetByEmployeeId, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map(err => ({ [err.param]: err.msg }));
            console.error("Validation errors:", formattedErrors);
            logger.warn("Validation errors in GET /jobs/employee/:employeeId: " + JSON.stringify(formattedErrors));
            return res.status(400).json({ success: false, errors: formattedErrors });
        }

        const employeeId = req.params.employeeId;
        const jobs = await employeservices.getJobByEmployeeId(employeeId);
        res.status(200).json(jobs);
        logger.info("GET /jobs/employee/:employeeId request successful");
    } catch (error) {
        console.error("Error in GET /jobs/employee/:employeeId:", error);
        logger.error("Error in GET /jobs/employee/:employeeId: " + error.message);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});

// Create a new job listing
router.post("/createjobbyemp", authenticateToken, jobDataValidateForCreate, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map(err => ({ [err.param]: err.msg }));
            console.error("Validation errors:", formattedErrors);
            logger.warn("Validation errors in POST /createjobbyemp: " + JSON.stringify(formattedErrors));
            return res.status(400).json({ success: false, errors: formattedErrors });
        }
        
        const jobobj = req.body;
        const result = await employeservices.postJobListing(jobobj);
        res.status(201).json(result); // Use 201 status for resource creation
        logger.info("POST /createjobbyemp request successful");
    } catch (error) {
        console.error("Error in POST /createjobbyemp:", error);
        logger.error("Error in POST /createjobbyemp: " + error.message);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
});

// Update a job listing by ID
router.put("/updatejobbyemp/:id", authenticateToken, jobDataValidateForUpdate, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map(err => ({ [err.param]: err.msg }));
            console.error("Validation errors:", formattedErrors);
            logger.warn("Validation errors in PUT /updatejobbyemp/:id: " + JSON.stringify(formattedErrors));
            return res.status(400).json({ success: false, errors: formattedErrors });
        }

        const empobj = {
            job_id: parseInt(req.params.id),
            job_title: req.body.job_title,
            job_industry: req.body.job_industry,
            description: req.body.description,
            qualifications: req.body.qualifications,
            application_instructions: req.body.application_instructions,
            created_by: req.body.created_by,
            location: req.body.location,
            min_salary: req.body.min_salary,
            max_salary: req.body.max_salary,
            company_name: req.body.company_name,
            job_status: req.body.job_status
        };

        const updatedresult = await employeservices.updateJobListing(empobj);

        if (!updatedresult.status) {
            console.error("Error in PUT /updatejobbyemp/:id:", updatedresult.message);
            logger.error("Error in PUT /updatejobbyemp/:id: " + updatedresult.message);
            return res.status(500).json(updatedresult);
        }

        res.status(200).json(updatedresult);
        logger.info("PUT /updatejobbyemp/:id request successful");
    } catch (error) {
        console.error("Error in PUT /updatejobbyemp/:id:", error);
        logger.error("Error in PUT /updatejobbyemp/:id: " + error.message);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
});

// Delete a job listing by ID
router.delete("/deletejobbyemp/:id", authenticateToken, jobDataValidateForDelete, async (req, res) => {
    try {
        const jobId = req.params.id;
        const deletedresult = await employeservices.deleteJobListing(jobId);
        if (deletedresult.status) {
            res.status(200).json(deletedresult);
            logger.info("DELETE /deletejobbyemp/:id request successful");
        } else {
            res.status(422).json(deletedresult);
            logger.error("Error in DELETE /deletejobbyemp/:id: " + deletedresult.message);
        }
    } catch (error) {
        console.error("Error in DELETE /deletejobbyemp/:id:", error);
        logger.error("Error in DELETE /deletejobbyemp/:id: " + error.message);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
});

// Routes for job applications

// Get all applications
router.get("/applications", authenticateToken, async (req, res) => {
    try {
        const emparray = await employeservices.viewApplications();
        console.log("[GET ALL] No. of applications : " + emparray.length);
        res.status(200).json(emparray);
        logger.info("GET /applications request successful");
    } catch (error) {
        console.error("Error in GET /applications:", error);
        logger.error("Error in GET /applications: " + error.message);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});


// Get resume by user ID
router.get("/getResumeByUserId/:userId", authenticateToken, resumeDataValidateForGet, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map(err => ({ [err.param]: err.msg }));
            const logMessage = formattedErrors.map(item => `${Object.keys(item)[0]}: ${Object.values(item)[0]}`).join(', ');
            logger.error({ label: `${req.url} - ${req.method}`, message: logMessage });
            return res.status(422).json({
                success: false,
                errors: formattedErrors
            });
        }
        const resultObj = await employeservices.getResumeByID(req.params.userId);
        if (!resultObj.status) {
            logger.error({ label: `${req.url} - ${req.method}`, message: resultObj.msg });
            return res.status(500).json(resultObj);
        }
        logger.info({ label: `${req.url} - ${req.method}`, message: 'Action successfully executed.' });
        res.status(200).json(resultObj);
    } catch (error) {
        logger.error({ label: `${req.url} - ${req.method}`, message: error.message });
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
});

// Update application status by application ID
router.put('/updateApplicationStatus/:applicationId', authenticateToken, updateApplicationStatusValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map(err => ({ [err.param]: err.msg }));
            const logMessage = formattedErrors.map(item => `${Object.keys(item)[0]}: ${Object.values(item)[0]}`).join(', ');
            logger.warn({ label: `${req.url} - ${req.method}`, message: logMessage });
            return res.status(422).json({
                success: false,
                errors: formattedErrors
            });
        }
        const applicationId = req.params.applicationId;
        const newStatus = req.body.newStatus; // Note the corrected property name
        const result = await employeservices.updateApplicationStatus(applicationId, newStatus);
        if (!result.status) {
            logger.error({ label: `${req.url} - ${req.method}`, message: result.message });
            return res.status(500).json(result);
        }
        logger.info({ label: `${req.url} - ${req.method}`, message: 'Application status updated successfully.' });
        res.status(200).json(result);
    } catch (error) {
        logger.error({ label: `${req.url} - ${req.method}`, message: error.message });
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Get application by application ID
router.get("/application/:applicationId", authenticateToken, viewApplicationByApplicationId, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map(err => ({ [err.param]: err.msg }));
            const logMessage = formattedErrors.map(item => `${Object.keys(item)[0]}: ${Object.values(item)[0]}`).join(', ');
            logger.warn({ label: `${req.url} - ${req.method}`, message: logMessage });
            return res.status(422).json({
                success: false,
                errors: formattedErrors
            });
        }
        const applicationId = req.params.applicationId;
        const application = await employeservices.viewApplicationByApplicationId(applicationId);
        if (!application.status) {
            logger.error({ label: `${req.url} - ${req.method}`, message: application.message });
            return res.status(500).json(application);
        }
        logger.info({ label: `${req.url} - ${req.method}`, message: 'Application retrieved successfully.' });
        res.status(200).json(application);
    } catch (error) {
        logger.error({ label: `${req.url} - ${req.method}`, message: error.message });
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
});

router.get("/admindetails/:adminId",authenticateToken,adminDataValidateForUpdate,async(req,res)=>{
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


        let result = await employeservices.adminDetailsByAdminId(req.params.adminId);
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

module.exports = router;


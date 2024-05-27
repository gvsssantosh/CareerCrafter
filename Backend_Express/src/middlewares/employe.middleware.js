const { body, param } = require('express-validator');
const joblisting_model = require('../models/job_listing_model');
const Resume_db_model = require('../models/resume_model');
const Application_model = require('../models/applications_model');

async function checkJobId(jobid) {
    try {
        let jobListingArr = await joblisting_model.findAll({
            where: { job_id: jobid }
        });
        return jobListingArr.length != 0;
    } catch (error) {
        console.error(error.message);
        return error.message;
    }
}

async function checkResume(userId) {
    try {
        let resObjArr = await Resume_db_model.findAll({
            where: { user_id: userId }
        });
        return resObjArr.length != 0;
    } catch (error) {
        console.error(error.message);
        return error.message;
    }
}

const jobDataValidateForCreate = [
    body("job_title")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Job title is required"),

    body("description")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),

    body("qualifications")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Qualifications are required"),

    body("application_instructions")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Application instructions are required"),

    body("created_by")
        .trim()
        .isInt({ min: 1 })
        .withMessage("Invalid created_by value"),

    body("location")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Location is required"),

    body("min_salary")
        .trim()
        .isDecimal({ decimal_digits: '1,2' })
        .withMessage("Minimum salary must be a valid decimal number"),

    body("max_salary")
        .trim()
        .isDecimal({ decimal_digits: '1,2' })
        .withMessage("Maximum salary must be a valid decimal number"),

    body("company_name")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Company name is required"),

    body("job_status")
        .trim()
        .isIn(['open', 'closed'])
        .withMessage("Job status must be 'open' or 'closed'")
        .optional({ nullable: true }),
];

const jobDataValidateForUpdate = [
    body("job_id")
        .trim()
        .isInt({ min: 1 })
        .withMessage("Invalid job_id")
        .custom(async (value) => {
            let exists = await checkJobId(value);
            if (!exists) {
                throw new Error("Job ID does not exist");
            }
        }),

    body("job_title")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Job title is required"),

    body("description")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),

    body("qualifications")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Qualifications are required"),

    body("application_instructions")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Application instructions are required"),

    body("created_by")
        .trim()
        .isInt({ min: 1 })
        .withMessage("Invalid created_by value"),

    body("location")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Location is required"),

    body("min_salary")
        .trim()
        .isDecimal({ decimal_digits: '1,2' })
        .withMessage("Minimum salary must be a valid decimal number"),

    body("max_salary")
        .trim()
        .isDecimal({ decimal_digits: '1,2' })
        .withMessage("Maximum salary must be a valid decimal number"),

    body("company_name")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Company name is required"),

    body("job_status")
        .trim()
        .isIn(['open', 'closed'])
        .withMessage("Job status must be 'open' or 'closed'")
        .optional({ nullable: true }),
];

const jobDataValidateForDelete = [
    param("jobId")
        .trim()
        .isInt({ min: 1 })
        .withMessage("Invalid jobId"),
];


const resumeDataValidateForGet = [
    param('userId')
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("userId is required")
        .bail()
        .isInt()
        .withMessage("userId can have only numerical values")
        .bail()
        .custom(async (value) => {
            let result = await checkResume(value);
            if (!result) {
                throw new Error("Resume not present for this id");
            } else if (typeof result === 'string') {
                throw new Error(result);
            }
        })
];

// Validation for getJobByEmployeeId
const jobDataValidateForGetByEmployeeId = [
    param('employeeId')
        .trim()
        .isInt({ min: 1 })
        .withMessage('Invalid employeeId')
];

// Validation for getJobByJobId
const jobDataValidateForGetByJobId = [
    param('jobId') // Adjusted to match route parameter name
        .trim()
        .isInt({ min: 1 })
        .withMessage('Invalid jobId')
];

// Validation for updateApplicationStatus
const updateApplicationStatusValidation = [
    param('applicationId')
        .trim()
        .isInt({ min: 1 })
        .withMessage('Invalid applicationId')
        .custom(async (value) => {
            let exists = await Application_model.findOne({ where: { Application_id: value } });
            if (!exists) {
                throw new Error('Application ID does not exist');
            }
        }),
    /*body('newStatus')
        .trim()
        .isIn(['Pending', 'Reviewed', 'Rejected'])
        .withMessage("Invalid status. Must be 'Pending', 'Reviewed', 'Rejected'")*/
];


const viewApplicationByApplicationId = [
    param('applicationId') // Adjusted to match route parameter name
        .trim()
        .isInt({ min: 1 })
        .withMessage('Invalid applicationId')
];

const adminDataValidateForUpdate = [
    // body("password")
    //     .trim()
    //     .exists({ checkFalsy: true })
    //     .withMessage("Password is required")
    //     .bail()
    //     .isLength({ min: 8 })
    //     .withMessage("Password should be at least 8 characters"),
    body("first_name")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("first name is required"),
    body("last_name")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("last name is required"),

    param("adminId")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("adminID required")
        .bail()
        .isInt()
        .withMessage("adminid can have only numerical values"),
    body('phone_number')
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("phone number is required")
        .bail()

        .matches(/^\d{10}$/)
        .withMessage("Provide proper phone number")
];

module.exports = {
    jobDataValidateForCreate,
    jobDataValidateForUpdate,
    jobDataValidateForDelete,
    resumeDataValidateForGet,
    jobDataValidateForGetByEmployeeId,
    jobDataValidateForGetByJobId,
    updateApplicationStatusValidation,

    viewApplicationByApplicationId,
    adminDataValidateForUpdate
};

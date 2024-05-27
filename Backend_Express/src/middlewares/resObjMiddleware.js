const { body,param } = require('express-validator');

const resume_model = require('..//models/resume_model');

async function checkResume(userId) {
    try {
        let resObjArr = await resume_model.findAll({
            where: { user_id: userId }
        });
        //console.log(resObjArr);
        if (resObjArr.length != 0) {
            return true;
            //returns true if resume already exists for the userid.
        }
        return false;
    }
    catch (error) {
        console.error(error.message);
        return error.message;
    } 
}


const resumeDataValidateForCreate = [
    body("user_id")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("user_id is required")
        .bail()
        .isInt()
        .withMessage("user_id must a numerical value")
        .bail()
        .custom(async (value) => {
            let result = await checkResume(value);
            if (result == true) {
                throw new Error("resume already present for this id");
            }
            else if (result == false) {
                //console.log("nothing happend");
            } else {
                throw new Error(result);
            }
        }),
    body("description")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("description of yourself is required"),
    body("projects")
        .optional()
        .trim(),
    body('Skills')
        .optional()
        .trim(),
    body("Certifications")
        .optional()
        .trim(),
    body('internships')
        .optional()
        .trim(),
    body('work_experience')
        .optional()
        .trim()
];

const resumeDataValidateForUpdate = [
    body("user_id")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("user_id is required")
        .bail()
        .isInt()
        .withMessage("user_id must a numerical value")
        .bail()
        .custom(async (value) => {
            let result = await checkResume(value);
            if (result == true) {
                //throw new Error("resume already present for this id");
            }
            else if (result == false) {
                //console.log("nothing happend");
                throw new Error("resume not present for this id");
            } else {
                throw new Error(result);
            }
        }),
    body("description")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("description of yourself is required"),
    body("projects")
        .optional()
        .trim(),
    body('Skills')
        .optional()
        .trim(),
    body("Certifications")
        .optional()
        .trim(),
    body('internships')
        .optional()
        .trim(),
    body('work_experience')
        .optional()
        .trim()
];

const resumeDataFileValidateForUpdate = [
    body("user_id")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("user_id is required")
        .bail()
        .isInt()
        .withMessage("user_id must a numerical value")
        .bail()
        .custom(async (value) => {
            let result = await checkResume(value);
            if (result == true) {
                //throw new Error("resume already present for this id");
            }
            else if (result == false) {
                //console.log("nothing happend");
                throw new Error("resume not present for this id");
            } else {
                throw new Error(result);
            }
        })
];
const resumeDataValidateForGet=[
    param('userId')
    .trim()
    .exists({ checkFalsy: true })
    .withMessage("userId is required")
    .bail()
    .isInt()
    .withMessage("userid can have only numerical values")
    .bail()
    .custom(async (value) => {
        let result = await checkResume(value);
        if (result == true) {
            //throw new Error("resume already present for this id");
        }
        else if (result == false) {
            //console.log("nothing happend");
            throw new Error("resume not present for this id");
        } else {
            throw new Error(result);
        }
    })

];

module.exports = { resumeDataValidateForCreate, resumeDataValidateForUpdate,resumeDataFileValidateForUpdate, resumeDataValidateForGet };
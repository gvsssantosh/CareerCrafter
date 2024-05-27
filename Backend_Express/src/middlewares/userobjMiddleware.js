const { body,param } = require('express-validator');

const users_model = require('..//models/users_model');

async function checkUser(emailId) {
    try {
        let userObjArr = await users_model.findAll({
            where: { email: emailId }
        });
        console.log(userObjArr);
        if (userObjArr.length != 0) {
            return true;
            //returns true if user already exists.
        }
        return false;

    }
    catch (error) {
        console.error(error.message);
        return error.message;
    }

}
const userDataValidateForLogin = [
    body("password")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Password is required")
        .bail()
        .isLength({ min: 8 })
        .withMessage("Password should be at least 8 characters"),

    body('email')
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("email is required")
        .bail()
        .toLowerCase()
        .isEmail()
        .withMessage("Provide proper email id")
    //.bail()
    // .custom(async (value)=>{
    //     let result=await checkUser(value);
    //     if(result==true){
    //         throw new Error("user already present");
    //     }
    //     else if (result==false) {
    //         //console.log("nothing happend");
    //     } else {
    //         throw new Error(result);
    //     }
    // })
];

const userDataValidateForCreate = [
    body("password")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Password is required")
        .bail()
        .isLength({ min: 8 })
        .withMessage("Password should be at least 8 characters"),
    body("first_name")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("first name is required"),
    body("last_name")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("last name is required"),

    body('email')
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("email is required")
        .bail()
        .toLowerCase()
        .isEmail()
        .withMessage("Provide proper email id")
        .bail()
        .custom(async (value) => {
            let result = await checkUser(value);
            if (result == true) {
                throw new Error("user already present");
            }
            else if (result == false) {
                //console.log("nothing happend");
            } else {
                throw new Error(result);
            }
        }),
    body('phone_number')
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("phone number is required")
        .bail()

        .matches(/^\d{10}$/)
        .withMessage("Provide proper phone number")
];

const userDataValidateForUpdate = [
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

    param("userId")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("userID required")
        .bail()
        .isInt()
        .withMessage("userid can have only numerical values"),
    body('phone_number')
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("phone number is required")
        .bail()

        .matches(/^\d{10}$/)
        .withMessage("Provide proper phone number")
];

const userValidateForPasswordUpdate = [
    body("password")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Password is required")
        .bail()
        .isLength({ min: 8 })
        .withMessage("Password should be at least 8 characters"),
    body('email')
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("email is required")
        .bail()
        .toLowerCase()
        .isEmail()
        .withMessage("Provide proper email id")
        .bail()
        .custom(async (value) => {
            let result = await checkUser(value);
            if (result == true) {
                // throw new Error("user already present");
            }
            else if (result == false) {
                // console.log("nothing happend");
                throw new Error("user not present");
            } else {
                throw new Error(result);
            }
        })
];




module.exports = { userDataValidateForLogin, userDataValidateForCreate, userDataValidateForUpdate, userValidateForPasswordUpdate };
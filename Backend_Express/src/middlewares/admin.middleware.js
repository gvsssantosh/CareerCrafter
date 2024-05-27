const { body } = require('express-validator');
const Admins_model = require('../models/admin_model');

async function checkAdmin(emailId) {
    try {
        let adminObjArr = await Admins_model.findAll({
            where: { email: emailId }
        });
        console.log(adminObjArr);
        if (adminObjArr.length != 0) {
            console.log("inside");
            return true;
            //returns true if admin already exists.
        }
        return false;

    }
    catch (error) {
        console.error(error.message);
        return error.message;
    }

}
const adminDataValidateForLogin = [
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
];

const adminDataValidateForCreate = [
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
            let result = await checkAdmin(value);
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


const adminValidateForPasswordUpdate = [
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
            let result = await checkAdmin(value);
            if (result == true) {
                // throw new Error("admin already present");
            }
            else if (result == false) {
                // console.log("nothing happend");
                throw new Error("admin not present");
            } else {
                throw new Error(result);
            }
        })
];



module.exports = { adminDataValidateForLogin, adminDataValidateForCreate, adminValidateForPasswordUpdate};





































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
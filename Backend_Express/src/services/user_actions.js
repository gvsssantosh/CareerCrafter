// const db = require('../database/db');
const { Op, where } = require("sequelize");
const users_model = require('..//models/users_model');
const job_listing_model = require('..//models/job_listing_model');
const applications_model = require('..//models/applications_model');
const resume_db_model = require("../models/resume_model");
const { error } = require("winston");

exports.createUser = async (userObj) => {
    try {
        await users_model.create(userObj);

        let userObjArr = await users_model.findAll({
            where: { email: userObj.email }
            // order: [['user_id', 'DESC']],
            // limit: 1
        });
        return { success: true, code: 200, obj: userObjArr };

    } catch (error) {
        //console.error(error.message);
        return { success: false, code: 500, msg: error.message };
    }
};

exports.userLogin = async (user_email) => {
    try {
        let user_pswrd = await users_model.findAll({
            where: { email: user_email },
            attributes: ['password'],
        });
        //console.log(user_pswrd);
        return user_pswrd;
    } catch (error) {
        console.error(error.message);
        return "error encountered";
    }
};

exports.userDetailsByUserId = async (userId) => {
    try {
        let user_details = await users_model.findByPk(userId,{
            attributes: ['first_name', 'last_name', "phone_number"],
        });
        if (user_details == null) {
            throw new Error("no user details: Invalid User");
        }
        //console.log(user_pswrd);
        return { success: true, obj: user_details };
    } catch (error) {
        console.error(error.message);
        return { success: false, msg: error.message };
    }
};
exports.updateUserPassword = async (userObj, user_email) => {
    try {
        await users_model.update(userObj, {
            where:
            {
                email: user_email
            }
        });
        return { status: true, msg: "user password is updated" };
    } catch (error) {
        //console.error(error.message);
        return { status: false, msg: error.message };
    }
};

exports.updateUser = async (userObj, userID) => {
    try {
        let user_details = await users_model.findByPk(userID); 
        if(user_details==null){
            throw new Error("no user with this ID");
        }
        await users_model.update(userObj, {
            where:
            {
                user_id: userID
            }
        });
        return { status: true, msg: "user details are updated" };
    } catch (error) {
        //console.error(error.message);
        return { status: false, msg: error.message };
    }
};

exports.InsertIntoResume = async (resumeObj) => {
    try {
        await resume_db_model.create(resumeObj);

        let resumeObjArr = await resume_db_model.findAll({
            where: { user_id: resumeObj.user_id },
            order: [['last_updated', 'DESC']],
            limit: 1
        });
        return { status: true, obj: resumeObjArr }
    } catch (error) {
        return { status: false, msg: error.message };
    }
};

exports.getResumeByID = async (userId) => {
    try {
        let resumeObj = await resume_db_model.findAll({ where: { user_id: userId } });
        return ({ status: true, obj: resumeObj });
    } catch (error) {
        return ({ status: false, msg: error.message });
    }
}

exports.updateResume = async (resumeObj) => {
    try {
        await resume_db_model.update(resumeObj, {
            where:
            {
                user_id: resumeObj.user_id,
            }
        });
        return { status: true, msg: "resume details are updated" };
    } catch (error) {
        return { status: false, msg: error.message };
    }

};

exports.updateResumeFile = async (resumeObj) => {
    try {
        await resume_db_model.update(resumeObj, {
            where:
            {
                user_id: resumeObj.user_id,
            }
        });
        return { status: true, msg: "resume file details are updated" };
    } catch (error) {
        return { status: false, msg: error.message };
    }

};

exports.searchJobById = async (jobid) => {
    try {
        let jobArrayObj = await job_listing_model.findByPk(jobid);
        return { status: true, obj: jobArrayObj };
    } catch (error) {
        return ({ status: false, msg: error.message });
    }

};


exports.searchJobByLocation = async (loc) => {
    try {
        let jobArrayObj = await job_listing_model.findAll({
            where: { location: { [Op.like]: loc } }
        });
        return { status: true, obj: jobArrayObj };
    } catch (error) {
        return ({ status: false, msg: error.message });
    }
};

exports.searchJobByIndustry = async (industry) => {
    try {
        let jobArrayObj = await job_listing_model.findAll({
            where: { job_industry: { [Op.like]: industry } }
        });
        return { status: true, obj: jobArrayObj };
    } catch (error) {
        return ({ status: false, msg: error.message });
    }
};

exports.searchJobByIndLoc = async (searchObj) => {
    try {
        let jobArrayObj = await job_listing_model.findAll({
            where: {
                job_industry: { [Op.like]: searchObj.job_industry },
                location: { [Op.like]: searchObj.location },
            }
        });
        return { status: true, obj: jobArrayObj };
    } catch (error) {
        console.log(error.message);
        return ({ status: false, msg: error.message });
    }
}

exports.searchJobByTitleIndLoc = async (searchObj) => {
    try {
        let jobArrayObj = await job_listing_model.findAll({
            where: {
                job_title: { [Op.like]: `%${searchObj.job_title}%` },
                job_industry: { [Op.like]: searchObj.job_industry },
                location: { [Op.like]: searchObj.location }
            }
        });
        return { status: true, obj: jobArrayObj };
    } catch (error) {
        return ({ status: false, msg: error.message });
    }
}

exports.applyToJob = async (applyJobObj) => {
    try {
        // checking if job is present or not
        let jobObj = await job_listing_model.findByPk(applyJobObj.job_id);
        let resumeObj =await resume_db_model.findAll({where: {
            user_id: applyJobObj.user_id
        }});
        if(resumeObj.length==0){
            return { success: false, code: 404, msg: "no resume present for this user" };
        }
        if (jobObj == null) {
            return { success: false, code: 404, msg: "no job present with this id" };
        }

        // checking if job is accepting applications or not
        if (jobObj.job_status == "closed") {
            return { success: false, code: 403, msg: "applications for this job are closed" };
        }

        let applicationObj = await applications_model.findAll({
            where: {
                user_id: applyJobObj.user_id,
                job_id: applyJobObj.job_id
            }
        });
        // console.log(applicationObj.length);
        // checking if applied to the job previously, if so, then displaying the applied date, updated date
        if (applicationObj.length != 0) {
            for (let item of applicationObj) {
                Applied_on = item.Applied_on;
                Updated_on = item.Updated_on;
            }
            return { success: false, code: 400, msg: `already applied for this job on ${Applied_on} and updated on ${Updated_on}` };
        }

        applyJobObj.admin_id = jobObj.created_by;
        console.log(applyJobObj);

        await applications_model.create({ job_id: applyJobObj.job_id, user_id: applyJobObj.user_id, employer_id: applyJobObj.admin_id });
        return { success: true, code: 200, msg: "applied to the job successfully" };

    } catch (error) {
        return { success: false, code: 500, msg: error.message };
    }

    // return deptArray;
    // 1001,101,100
};

exports.viewApplicationsByUserId = async (userId) => {
    try {
        let applicationObj = await applications_model.findAll({
            where: { user_id: userId }
        });
        if (applicationObj.length == 0) { return { status: false, code: 404, msg: `no applications from this userId:${userId}` }; }
        return { status: true, code: 200, obj: applicationObj };
    } catch (error) {
        return { status: false, code: 500, msg: error.message };
    }
};

exports.deleteApplication = async (deleteObj) => {
    try {
        let applicationObj = await applications_model.findAll({
            where:
            {
                user_id: deleteObj.user_id,
                job_id: deleteObj.job_id
            }
        });
        console.log(applicationObj);
        //checking if application present or not
        if (applicationObj.length == 0) {

            return { status: false, code: 404, msg: "application not found" };
        }

        await applications_model.destroy({
            where:
            {
                user_id: deleteObj.user_id,
                job_id: deleteObj.job_id
            }
        });
        return { status: true, msg: "application withdrawn" };
    } catch (error) {
        return { status: false, code: 500, msg: error.message };
    }

};

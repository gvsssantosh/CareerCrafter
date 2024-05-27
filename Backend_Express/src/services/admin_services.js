const { Op } = require("sequelize");
const Admins_model = require('../models/admin_model');

exports.createadmin = async (adminObj) => {
    try {
        await Admins_model.create(adminObj);

        let adminObjArr = await Admins_model.findAll({
            where: { email: adminObj.email }
            // order: [['employee_id', 'DESC']],
            // limit: 1
        });
        return { success: true, code: 200, obj: adminObjArr };

    } catch (error) {
        //console.error(error.message);
        return { success: false, code: 500, msg: error.message };
    }
};

exports.adminLogin = async (admin_email) => {
    try {
        let admin_pswrd = await Admins_model.findAll({
            where: { email: admin_email },
            attributes: ['password'],
        });
        //console.log(admin_pswrd);
        return admin_pswrd;
    } catch (error) {
        console.error(error.message);
        return "error encountered";
    }
};


exports.updateAdminPassword = async (adminObj, email) => {
    try {
        await Admins_model.update(adminObj, {
            where:
            {
                email: email
            }
        });
        return { status: true, msg: "admin password is updated" };
    } catch (error) {
        //console.error(error.message);
        return { status: false, msg: error.message };
    }
};
exports.updateAdmin = async (adminObj, adminID) => {
    try {
        let admin_details = await Admins_model.findByPk(userID); 
        if(admin_details==null){
            throw new Error("no user with this ID");
        }
        await Admins_model.update(adminObj, {
            where:
            {
                amdin_id: adminID
            }
        });
        return { status: true, msg: "admin details are updated" };
    } catch (error) {
        //console.error(error.message);
        return { status: false, msg: error.message };
    }
};
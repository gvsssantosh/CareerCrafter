const { Op } = require("sequelize");
const Job_Listing = require('../models/job_listing_model');
const Application_model = require('../models/applications_model');
const Resume_db_model = require('../models/resume_model');
const Admins_model= require('../models/admin_model');

// Retrieve all job listing details
exports.getJobListingDetails = async () => {
    try {
        const jobListingDetails = await Job_Listing.findAll();
        return { status: true, data: jobListingDetails };
    } catch (error) {
        console.error(`Error in getJobListingDetails: ${error.message}`);
        return { status: false, message: `Error in getJobListingDetails: ${error.message}` };
    }
};

exports.adminDetailsByAdminId = async (adminId) => {
    try {
        let admin_details = await Admins_model.findByPk(adminId,{
            attributes: ['first_name', 'last_name', "phone_number"],
        });
        if (admin_details == null) {
            throw new Error("no user details: Invalid User");
        }
        //console.log(admin_pswrd);
        return { success: true, obj: admin_details };
    } catch (error) {
        console.error(error.message);
        return { success: false, msg: error.message };
    }
};

// Get jobs by employee ID
exports.getJobByEmployeeId = async (employeeId) => {
    try {
        const jobListings = await Job_Listing.findAll({ where: { created_by: employeeId } });
        if (jobListings.length > 0) {
            return { status: true, data: jobListings };
        } else {
            return { status: false, message: "No job listings found for this employee" };
        }
    } catch (error) {
        console.error(`Error in getJobByEmployeeId: ${error.message}`);
        return { status: false, message: `Error in getJobByEmployeeId: ${error.message}` };
    }
};

// Get jobs by job ID
exports.getJobByJobId = async (jobId) => {
    try {
        const jobListings = await Job_Listing.findAll({ where: { job_id: jobId } });
        if (jobListings.length > 0) {
            return { status: true, data: jobListings };
        } else {
            return { status: false, message: "No job listings found for this job ID" };
        }
    } catch (error) {
        console.error(`Error in getJobByJobId: ${error.message}`);
        return { status: false, message: `Error in getJobByJobId: ${error.message}` };
    }
};

// Create a new job listing
exports.postJobListing = async (jobDetails) => {
    try {
        await Job_Listing.create(jobDetails);
        return { status: true, message: "Job listing created successfully" };
    } catch (error) {
        console.error(`Error in postJobListing: ${error.message}`);
        return { status: false, message: `Error in postJobListing: ${error.message}` };
    }
};

// Update a job listing
exports.updateJobListing = async (updateDetails) => {
    try {
        const [updatedRows] = await Job_Listing.update(updateDetails, { where: { job_id: updateDetails.job_id } });
        if (updatedRows > 0) {
            return { status: true, message: "Job listing updated successfully" };
        } else {
            return { status: false, message: "Job listing not found or no changes detected" };
        }
    } catch (error) {
        console.error(`Error in updateJobListing: ${error.message}`);
        return { status: false, message: `Error in updateJobListing: ${error.message}` };
    }
};

// Delete a job listing
exports.deleteJobListing = async (jobId) => {
    try {
        const deletedRows = await Job_Listing.destroy({ where: { job_id: jobId } });
        if (deletedRows > 0) {
            return { status: true, message: "Job listing deleted successfully" };
        } else {
            return { status: false, message: "Job listing not found" };
        }
    } catch (error) {
        console.error(`Error in deleteJobListing: ${error.message}`);
        return { status: false, message: `Error in deleteJobListing: ${error.message}` };
    }
};

// Read all applications
exports.viewApplications = async () => {
    try {
        const applicationDetails = await Application_model.findAll();
        return { status: true, data: applicationDetails };
    } catch (error) {
        console.error(`Error in viewApplications: ${error.message}`);
        return { status: false, message: `Error in viewApplications: ${error.message}` };
    }
};

// Get resume by user ID
exports.getResumeByID = async (userId) => {
    try {
        const resumeObj = await Resume_db_model.findAll({ where: { user_id: userId } });
        if (resumeObj.length > 0) {
            return { status: true, data: resumeObj };
        } else {
            return { status: false, message: "Resume not found" };
         }
    } catch (error) {
        console.error(`Error in getResumeByID: ${error.message}`);
        return { status: false, message: `Error in getResumeByID: ${error.message}` };
    }
};

// View a job application by application ID
exports.viewApplicationByApplicationId = async (id) => {
    try {
        const application = await Application_model.findAll({ where: { Application_id: id }, order: [['status', 'ASC']] });
        if (application.length > 0) {
            return { status: true, data: application };
        } else {
            return { status: false, message: "Application not found" };
        }
    } catch (error) {
        console.error(`Error in viewApplicationByApplicationId: ${error.message}`);
        return { status: false, message: `Error in viewApplicationByApplicationId: ${error.message}` };
    }
};

/*exports.updateApplicationStatus = async (applicationId, newStatus) => {
    try {
        const [updatedRows] = await Application_model.update(
            { status: newStatus }, 
            { where: { Application_id: applicationId } }
        );

        if (updatedRows > 0) {
            return { status: true, message: "Application status updated successfully" };
        } else {
            return { status: false, message: "Application not found or no changes detected" };
        }
    } catch (error) {
        console.error(`Error in updateApplicationStatus: ${error.message}`);
        return { status: false, message: `Error in updateApplicationStatus: ${error.message}` };
    }
};*/
exports.updateApplicationStatus = async (applicationId, newStatus) => {
    try {
        console.log(applicationId,newStatus);
        await Application_model.update(
            { Status: newStatus }, 
            { where: { Application_id: applicationId } }
        );

        return { status: true, message: "Application status updated successfully" };
        
    } catch (error) {
        console.error(`Error in updateApplicationStatus: ${error.message}`);
        return { status: false, message: `Error in updateApplicationStatus: ${error.message}` };
    }
};

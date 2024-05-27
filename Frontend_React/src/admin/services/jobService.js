import axios from 'axios';

const url = 'http://localhost:3002/empapi';

export const jobServiceObj = {
    getJobListingDetails,
    postJobListing,
    getJobByJobId,
    updateJobListing,
    deleteJobListing,
    viewApplications,
    getResumeByID,
    viewApplicationByApplicationId,
    updateApplicationStatus,
    getJobByEmployeeId,
    adminDetailsByAdminId
};

async function getJobListingDetails(token) {
    try {
        console.log('Token:', token); // Log the token to check its value
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get(`${url}/jobs`, config);
        return response;
    }catch (error) {
        console.error('Error fetching job listings:', error.response ? error.response.data : error.message);
        throw error;
      }
    };



async function postJobListing(jobData) {
    try {
        const token = sessionStorage.getItem('admin-token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const response = await axios.post(`${url}/createjobbyemp`, jobData, config);
        return response.data;
    } catch (error) {
        console.error('Error creating job listing:', error);
        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw new Error('Error creating job listing');
        }
    }
}

async function getJobByJobId(jobId) {
    try {
        const token = sessionStorage.getItem('admin-token');
        const response = await axios.get(`${url}/jobs/${jobId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    
        return { status: true, data: response.data };
    } catch (error) {
        console.error('Error fetching job by ID:', error);
        return { status: false, message: error.response ? error.response.data : 'An error occurred' };
    }
}

async function updateJobListing(jobId, updatedetails) {
    try {
        const token = sessionStorage.getItem('admin-token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.put(`${url}/updatejobbyemp/${jobId}`, updatedetails, config);
        return response.data;
    } catch (error) {
        console.error('Error updating job listing:', error);
        throw error;
    }
}

async function deleteJobListing(jobId) {
    try {
        const token = sessionStorage.getItem('admin-token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.delete(`${url}/deletejobbyemp/${jobId}`, config);
        return response.data;
    } catch (error) {
        console.error('Error deleting job listing:', error);
        throw error;
    }
}

async function viewApplications() {
    try {
        const token = sessionStorage.getItem('admin-token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get(`${url}/applications`, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching applications:', error);
        throw error;
    }
}

async function viewApplicationByApplicationId(id) {
    try {
        const token = sessionStorage.getItem('admin-token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get(`${url}/applications/${id}`, config); // Ensure the endpoint is correct
        return response.data;
    } catch (error) {
        console.error('Error fetching application by ID:', error);
        throw error;
    }
}

async function updateApplicationStatus(applicationId, newStatus) {
    try {
        const token = sessionStorage.getItem('admin-token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.put(`${url}/updateApplicationStatus/${applicationId}`, { status: newStatus }, config); // Ensure the endpoint is correct
        return response.data;
    } catch (error) {
        console.error('Error updating application status:', error);
        throw error;
    }
}

async function getResumeByID(userId) {
    try {
        const token = sessionStorage.getItem('admin-token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get(`${url}/getResumeByUserId/${userId}`, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching resume by user ID:', error);
        throw error;
    }
}

async function getJobByEmployeeId(employeeId) {
    try {
        const token = sessionStorage.getItem('admin-token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get(`${url}/jobs/employee/${employeeId}`, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching job listings by employee ID:', error);
        throw error;
    }
}

async function adminDetailsByAdminId(adminId) {
    const token = sessionStorage.getItem('admin-token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        let result = await axios.get(url + `/admindetails/${adminId}`, config);
        return result.data;
    } catch (error) {
        return (error.response.data);
    }
}

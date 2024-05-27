import axios from 'axios';

export let userServiceObj =
{
    getJobById, getJobByInd, getJobByLoc, getJobByLocInd, getJobByTitleLocInd,

    jobApply, getAllApplicationsByUser,
    deleteApplication, getUserDetailsByUserId, updateUserDetails
};

let url = "http://localhost:3002/userApi"

// async function getToken() {
//     let authApiUrl = "http://localhost:3002/authapi/login";
//     let userObj = { "userName": "scott", "password": "scott123" }
//     let response = await axios.post(authApiUrl, userObj);
//     return response.data.token;
// }

async function getJobById(id) {
    const token = sessionStorage.getItem('user-token');
    // const token = await getToken();
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        let result = await axios.get(url + `/jobId/${id}`, config);
        return result.data;
    } catch (error) {
        return (error.response.data);
    }
}

async function getJobByLoc(loc) {
    const token = sessionStorage.getItem('user-token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        let result = await axios.get(url + `/jobLoc/${loc}`, config);
        return result.data;
    } catch (error) {
        return (error.response.data);
    }

}

async function getJobByInd(ind) {
    const token = sessionStorage.getItem('user-token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        let result = await axios.get(url + `/jobInd/${ind}`, config);
        return result.data;
    } catch (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        return (error.response.data);
    }

}

async function getJobByLocInd(searchObj) {
    const token = sessionStorage.getItem('user-token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const queryString = new URLSearchParams(searchObj).toString();
    // const url = `/search?${queryString}`;
    try {
        let result = await axios.get(url + `/jobInd_loc?${queryString}`, config);
        return result.data;
    } catch (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        return (error.response.data);
    }

}

async function getJobByTitleLocInd(searchObj) {
    const token = sessionStorage.getItem('user-token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const queryString = new URLSearchParams(searchObj).toString();
    try {
        let result = await axios.get(url + `/jobInd_loc_title?${queryString}`, config);
        return result.data;
    } catch (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        return (error.response.data);
    }

}

async function jobApply(jobObj) {
    //         let applyJobObj = {
    //             job_id: parseInt(req.body.job_id),
    //             user_id: parseInt(req.body.user_id)
    const token = sessionStorage.getItem('user-token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        let result = await axios.post(url + "/jobApply", jobObj, config);
        return result.data;
    } catch (error) {
        return (error.response.data);
    }
}

async function getAllApplicationsByUser(userId) {
    const token = sessionStorage.getItem('user-token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        let result = await axios.get(url + `/getAllApllicationsByUser/${userId}`, config);
        return result.data;
    } catch (error) {
        return (error.response.data);
    }
}

async function deleteApplication(deleteObj) {
    //         let deleteObj = {
    //             user_id: parseInt(req.body.user_id),
    //             job_id: parseInt(req.body.job_id)
    //         }
    const token = sessionStorage.getItem('user-token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const queryString = new URLSearchParams(deleteObj).toString();
    console.log(queryString);
    try {
        let result = await axios.delete(url + `/delJobApplication?${queryString}`, config);
        return result.data;
    } catch (error) {
        console.log(error.message);
        return (error.response.data);
    }
}

async function getUserDetailsByUserId(userId) {
    const token = sessionStorage.getItem('user-token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        let result = await axios.get(url + `/userdetails/${userId}`, config);
        return result.data;
    } catch (error) {
        return (error.response.data);
    }
}
async function updateUserDetails(userId, userObj) {
    const token = sessionStorage.getItem('user-token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        let result = await axios.put(`http://localhost:3002/authenticationApi/userUpdate/${userId}`, userObj, config);
        return result.data;
    } catch (error) {
        return (error.response.data);
    }
}

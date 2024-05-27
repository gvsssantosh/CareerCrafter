import axios from 'axios';

export let resumeServiceObj =
{
    getResumeByUserId, resumeInsert, updateResume,updateResumeFile
};

let url = "http://localhost:3002/resumeApi"


async function getResumeByUserId(userId) {
    const token = sessionStorage.getItem('user-token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        let result = await axios.get(url + `/getResumeByUserId/${userId}`, config);
        // console.log(result.data);
        return result.data;
    } catch (error) {
        return(error.response.data);
    }
}


async function resumeInsert(resumeObj) {
    //         let resumeObj = {
    //             user_id: parseInt(req.body.user_id),
    //             description: req.body.description,
    //             projects: req.body.projects,
    //             Skills: req.body.Skills,
    //             Certifications: req.body.Certifications,
    //             internships: req.body.internships,
    //             work_experience: req.body.work_experience,
    //             resume_file_link: req.body.resume_file_link
    //         };
    const token = sessionStorage.getItem('user-token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let result = await axios.post(url + "/resumeInsert", resumeObj, config);
    return result.data;
}

async function updateResume(resumeObj) {
    //    let resumeObj = {
    //             user_id: parseInt(req.body.user_id),
    //             //user_id: req.params.user_id,
    //             description: req.body.description,
    //             projects: req.body.projects,
    //             Skills: req.body.Skills,
    //             Certifications: req.body.Certifications,
    //             internships: req.body.internships,
    //             work_experience: req.body.work_experience,
    //             last_updated: timestamp.getCurrentTimestamp(),
    //             resume_file_link: req.body.resume_file_link
    //         };
    const token = sessionStorage.getItem('user-token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let result = await axios.put(url + `/updateResume`, resumeObj, config);
    return result.data;
}

async function updateResumeFile(formData) {
    try {
        const token = sessionStorage.getItem('user-token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        // const response = await axios.put('http://localhost:3002/resumeApi/updateResumeFile', formData, config);
        console.log(formData);
        let result = await axios.put(url +'/updateResumeFile', formData, config);
        return result.data;

    } catch (error) {
        return(error.response.data);
    }
}
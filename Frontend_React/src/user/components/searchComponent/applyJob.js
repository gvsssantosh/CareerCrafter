import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./applyJob.css";
import { userServiceObj } from '../../services/userService';
function ApplyJob() {
    const location = useLocation();
    const navigate = useNavigate();
    const { jobObj } = location.state || {};
    if (jobObj == null) {
        navigate(-1);
    }
    async function applyJob_buttonClick(jobId) {
        try {
            let result = await userServiceObj.jobApply({ job_id: jobId, user_id: sessionStorage.getItem('user_id') });
            if (result.success === true && result.code === 200) {
                alert(result.msg);
            }
            else {
                if (result.code === 400) { alert(result.msg); }
                else if (result.code === 403) { alert(result.msg); }
                else if (result.code === 404) { alert(result.msg); }
                else { alert(result.msg); }
            }
            navigate("/userHome/searchJobs");
        } catch (error) {
            alert("error occured");
            navigate("/userHome/searchJobs");
        }
    }

    return (<>
        <div>
            <h1>Job Details</h1>
            <hr/>
            <div className="centered-container">
            <table>
                <tbody>
                    <tr>
                        <td><label>Job ID:</label></td>
                        <td>{jobObj.job_id} </td>
                    </tr>
                    <tr>
                        <td><label>Title:</label></td>
                        <td>{jobObj.job_title}</td>
                    </tr>
                    <tr>
                        <td><label>Description:</label></td>
                        <td>{jobObj.description}</td>
                    </tr>
                    <tr>
                        <td><label>Industry:</label></td>
                        <td>{jobObj.job_industry}</td>
                    </tr>
                    <tr>
                        <td><label>Qualifications:</label></td>
                        <td>{jobObj.qualifications}</td>
                    </tr>
                    <tr>
                        <td><label>Location:</label></td>
                        <td>{jobObj.location}</td>
                    </tr>
                    <tr>
                        <td><label>Minimum Salary:</label></td>
                        <td>{jobObj.min_salary}</td>
                    </tr>
                    <tr>
                        <td><label>Maximum Salary:</label></td>
                        <td>{jobObj.max_salary}</td>
                    </tr>
                    <tr>
                        <td><label>Company:</label></td>
                        <td>{jobObj.company_name}</td>
                    </tr>
                    <tr>
                        <td><label>Job Status:</label></td>
                        <td>{jobObj.job_status} </td>
                    </tr>
                    <tr>
                        <td><label>Posted on:</label></td>
                        <td>{new Date(jobObj.created_on).toLocaleDateString()} </td>
                    </tr>
                </tbody>
            </table>
            </div>
            <div className='centered-container'>
                <button
                    onClick={() => applyJob_buttonClick(jobObj.job_id)}
                    disabled={jobObj.job_status !== 'open'}
                >
                    Apply Job
                </button>
                <button onClick={() => navigate(-1)}>Back</button>
            </div>
        </div>

    </>);
}

export default ApplyJob;
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import "../searchComponent/applyJob.css";
import { userServiceObj } from '../../services/userService';
import UserNavigationBar from '../userNavBar';

function ViewJob() {
    const navigate = useNavigate();
    const { jobId } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        async function fetchJobDetails() {
            try {
                let result = await userServiceObj.getJobById(jobId);
                if (result.status === true) {
                    setJob(result.obj);
                }
                console.log(job);

            } catch (error) {
                alert(error);
            }
        }

        fetchJobDetails();
    }, [jobId]);

    return (<>
        <UserNavigationBar />
        <div className="centered-container">
            {job && (
                <table  class="search-table">
                    <tbody>
                        <tr>
                            <td><strong>Job ID</strong></td>
                            <td>{job.job_id}</td>
                        </tr>
                        <tr>
                            <td><strong>Job Title</strong></td>
                            <td>{job.job_title}</td>
                        </tr>
                        <tr>
                            <td><strong>Description</strong></td>
                            <td>{job.description}</td>
                        </tr>
                        <tr>
                            <td><strong>Industry</strong></td>
                            <td>{job.job_industry}</td>
                        </tr>
                        <tr>
                            <td><strong>Qualifications</strong></td>
                            <td>{job.qualifications}</td>
                        </tr>
                        <tr>
                            <td><strong>Location</strong></td>
                            <td>{job.location}</td>
                        </tr>
                        <tr>
                            <td><strong>Salary</strong></td>
                            <td>{job.min_salary} - {job.max_salary}</td>
                        </tr>
                        <tr>
                            <td><strong>Company Name</strong></td>
                            <td>{job.company_name}</td>
                        </tr>
                        <tr>
                            <td><strong>Status</strong></td>
                            <td>{job.job_status}</td>
                        </tr>
                        <tr>
                            <td><strong>Created On</strong></td>
                            <td>{new Date(job.created_on).toLocaleDateString()}</td>
                        </tr>
                    </tbody>
                </table>)}
        </div>

    </>);

}

export default ViewJob;
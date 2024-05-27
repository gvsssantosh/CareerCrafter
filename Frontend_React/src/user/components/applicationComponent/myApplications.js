import UserNavigationBar from "../userNavBar";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userServiceObj } from "../../services/userService";
import "../tableStyle.css";

function MyApplications() {
    const [applications, setApplications] = useState([]);
    const navigate = useNavigate();
    const userId = sessionStorage.getItem('user_id');
    async function fetchApplications() {
        try {
            const result = await userServiceObj.getAllApplicationsByUser(userId);
            if (result.status === true) { setApplications(result.obj); }
            else {
                if (result.code === 404) { setApplications([]); }
                else { alert(`${result.msg}`); }
            }

        } catch (error) { alert("error while fetching your applications"); }
    }
    useEffect(() => { fetchApplications(); }, []);

    const handleViewJob = (jobId) => {
        // Implement view job functionality
        alert(`View job with ID: ${jobId}`);
        navigate(`/viewJob/${jobId}`);
    };

    const handleDeleteApplication = async (applicationId) => {
        // Implement delete application functionality
        const confirmDelete = window.confirm('Are you sure you want to delete this application?');
        if (!confirmDelete) return;
        // Example of delete request
        try {
            const result = await userServiceObj.deleteApplication({ user_id: sessionStorage.getItem('user_id'), job_id: applicationId });
            if (result.success === true) {
                alert("job application withdrawn");
            }
            else {
                if (result.code === 404) {
                    alert(result.msg);
                }
                else {
                    //error code 500
                    alert(result.msg);
                }
            }
            fetchApplications();
        } catch (error) {
            alert(`Internal error`)
            console.error(error.message);
        }
    };

    return (
        <>
            <UserNavigationBar />
            <div>
                <h2 style={{ textAlign: 'center' }}>Applications</h2>
                <table class="search-table">
                    <thead>
                        <tr>
                            <th>Application ID</th>
                            <th>Job ID</th>
                            <th>Applied On</th>
                            {/* <th>Updated On</th> */}
                            <th>User ID</th>
                            <th>Status</th>
                            <th>Employer ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((app) => (
                            <tr key={app.Application_id}>
                                <td>{app.Application_id}</td>
                                <td>{app.job_id}</td>

                                <td>{new Date(app.Applied_on).toLocaleDateString()}</td>
                                {/* <td>{new Date(app.Updated_on).toLocaleDateString()}</td> */}
                                <td>{app.user_id}</td>
                                <td>{app.Status}</td>
                                <td>{app.employer_id}</td>
                                <td>
                                    <button onClick={() => handleViewJob(app.job_id)}>View Job</button>
                                    <button onClick={() => handleDeleteApplication(app.job_id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default MyApplications;
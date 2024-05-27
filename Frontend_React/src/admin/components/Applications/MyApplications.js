// MyApplicationsAdmin.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobServiceObj } from '../../services/jobService';
import AdminNavigationBar from '../AdminNav';
import UpdateApplicationStatus from './updateApplicationStatus';
import './Applications.css'; // Import the CSS file for styling

const MyApplicationsAdmin = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const token = sessionStorage.getItem('admin-token');
                if (!token) {
                    throw new Error('Admin token not found in session storage');
                }

                const applicationData = await jobServiceObj.viewApplications(token);
                if (applicationData.status) {
                    // Filter applications to only include those created by the admin
                    const adminId = JSON.parse(atob(token.split('.')[1])).adminId; // Decode JWT to get adminId
                    const filteredApplications = applicationData.data.filter(app => app.employer_id === adminId);
                    setApplications(filteredApplications);
                } else {
                    throw new Error(applicationData.message || 'Failed to fetch applications');
                }
            } catch (error) {
                setError(error.message || 'An error occurred while fetching applications.');
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    const handleViewUserDetails = (userId) => {
        // Navigate to the user profile page with the user ID
        alert(`View user with ID: ${userId}`);
        navigate(`/viewuser/${userId}`);
    };

    const handleStatusUpdate = (applicationId, newStatus) => {
        setApplications(applications.map(app => 
            app.Application_id === applicationId ? { ...app, Status: newStatus } : app
        ));
    };

    return (
        <>
            <AdminNavigationBar />
            <div className="applications-container">
                <h2>Applications</h2>
                {loading ? (
                    <div className="loading">Loading...</div>
                ) : error ? (
                    <div className="error">Error: {error}</div>
                ) : (
                    <table className="applications-table">
                        <thead>
                            <tr>
                                <th>Application ID</th>
                                <th>Job ID</th>
                                <th>User ID</th>
                                <th>Applied On</th>
                                <th>Updated On</th>
                                <th>Current Status</th>
                                <th>Status</th>
                                <th>Employer ID</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map(application => (
                                <tr key={application.Application_id}>
                                    <td>{application.Application_id}</td>
                                    <td>{application.job_id}</td>
                                    <td>{application.user_id}</td>
                                    <td>{new Date(application.Applied_on).toLocaleDateString()}</td>
                                    <td>{new Date(application.Updated_on).toLocaleDateString()}</td>
                                    <td>{application.Status}</td>
                                    <td>
                                        <UpdateApplicationStatus 
                                            application={application} 
                                            onUpdate={handleStatusUpdate} 
                                        />
                                    </td>
                                    <td>{application.employer_id}</td>
                                    <td>
                                        <button className='mybutton' onClick={() => handleViewUserDetails(application.user_id)}>View User</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default MyApplicationsAdmin;

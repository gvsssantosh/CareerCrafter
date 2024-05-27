// UpdateApplicationStatus.js
import React, { useState } from 'react';
import { jobServiceObj } from '../../services/jobService';
import "./Applications.css";

const UpdateApplicationStatus = ({ application, onUpdate }) => {
    const [status, setStatus] = useState(application.Status);

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
    };

    const handleStatusUpdate = async () => {
        try {
            console.log(application.Application_id, status);
            const token = sessionStorage.getItem('admin-token');
            if (!token) {
                throw new Error('Admin token not found in session storage');
            }

            const updateResult = await jobServiceObj.updateApplicationStatus(application.Application_id, status, token);
            if (updateResult.status) {
                alert('Status updated successfully');
                onUpdate(application.Application_id, status);
            } else {
                throw new Error(updateResult.message || 'Failed to update application status');
            }
        } catch (error) {
            alert('Failed to update status. Please try again.');
            console.error('Status update error:', error);
        }
    };

    return (
        <div>
            <select 
                value={status} 
                onChange={(e) => handleStatusChange(e.target.value)}
            >
                <option value="Pending">Pending</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Rejected">Rejected</option>
            </select>
            <button onClick={handleStatusUpdate}>Update Status</button>
        </div>
    );
};

export default UpdateApplicationStatus;

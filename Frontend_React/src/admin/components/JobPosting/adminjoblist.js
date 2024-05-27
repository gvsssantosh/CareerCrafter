import React, { useState, useEffect } from 'react';
import AdminNavigationBar from '../AdminNav';
import { jobServiceObj } from '../../services/jobService';
import './adminJobStyles.css'; // Import the CSS file for styling

const AdminJobList = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedJob, setUpdatedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const adminId = sessionStorage.getItem('adminId');
        if (!adminId) {
          throw new Error('Admin ID not found in session storage');
        }
        
        const jobData = await jobServiceObj.getJobByEmployeeId(adminId);
        if (jobData.status) {
          setJobs(jobData.data);
          setLoading(false);
        } else {
          throw new Error(jobData.message || 'Failed to fetch job listings');
        }
      } catch (error) {
        setError(error.message || 'An error occurred while fetching job listings.');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const formatSalary = (salary) => {
    return (salary / 100000).toFixed(1) + ' LPA';
  };

  const handleView = (job) => {
    setSelectedJob(job);
    setIsEditing(false);
  };

  const handleEdit = (job) => {
    setSelectedJob(job);
    setUpdatedJob(job);
    setIsEditing(true);
  };

  const handleDelete = async (jobId) => {
    try {
      const token = sessionStorage.getItem('admin-token');
      if (!token) {
        throw new Error('Token not found');
      }

      const confirmation = window.confirm('Are you sure you want to delete this job listing?');
      if (!confirmation) {
        return; // User cancelled the delete operation
      }

      await jobServiceObj.deleteJobListing(jobId, token);
      setJobs(prevJobs => prevJobs.filter(job => job.job_id !== jobId));
    } catch (error) {
      console.error('Error deleting job listing:', error);
      // Handle error
    }
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedJob(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('admin-token');
      if (!token) {
        throw new Error('Token not found');
      }

      await jobServiceObj.updateJobListing(updatedJob.job_id, updatedJob, token);
      setJobs(prevJobs => prevJobs.map(job => (job.job_id === updatedJob.job_id ? updatedJob : job)));
      setIsEditing(false);
      setSelectedJob(updatedJob);
    } catch (error) {
      console.error('Error updating job listing:', error);
      // Handle error
    }
  };

  return (
    <>
      <AdminNavigationBar /> {/* Include the admin navigation bar */}
      <div className="jobs">
        {loading ? (
          <p>Loading job listings...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          jobs.map(job => (
            <div className="job-card" key={job.job_id}>
              <div className="color-box">
                <span className="hiring-text">Hiring</span>
              </div>
              <div className="job-details">
                <h2>{job.job_title}</h2>
                <div className="qualification-industry">
                  <span className="box">{job.qualifications}</span>
                  <span className="box">{job.job_industry}</span>
                  <span className="box">{job.company_name}</span>
                </div>

                <p className="salary" style={{ color: 'green' }}>
                  {formatSalary(job.min_salary)} - {formatSalary(job.max_salary)}
                </p>
                <p className="location">
                  <img src="/Images/location.webp" alt="Location Icon" className="location-icon" />
                  {job.location}
                </p>
                <div className="button-group">
                  <button className="view-button" onClick={() => handleView(job)}>View</button>
                  <button className="edit-button" onClick={() => handleEdit(job)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(job.job_id)}>
                    <img src="/Images/delete.png" alt="Delete Icon" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {selectedJob && (
        <div className="job-details-modal">
          {isEditing ? (
            <div className="job-details-content">
              <h2>Edit Job Listing</h2>
              <form onSubmit={handleUpdateSubmit}>
                <div className="form-group">
                  <label>Job Title:</label>
                  <input
                    type="text"
                    name="job_title"
                    value={updatedJob.job_title}
                    onChange={handleUpdateChange}
                  />
                </div>
                <div className="form-group">
                  <label>Job Industry:</label>
                  <input
                    type="text"
                    name="job_industry"
                    value={updatedJob.job_industry}
                    onChange={handleUpdateChange}
                  />
                </div>
                <div className="form-group">
                  <label>Description:</label>
                  <textarea
                    name="description"
                    value={updatedJob.description}
                    onChange={handleUpdateChange}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Qualifications:</label>
                  <textarea
                    name="qualifications"
                    value={updatedJob.qualifications}
                    onChange={handleUpdateChange}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Application Instructions:</label>
                  <textarea
                    name="application_instructions"
                    value={updatedJob.application_instructions}
                    onChange={handleUpdateChange}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Location:</label>
                  <input
                    type="text"
                    name="location"
                    value={updatedJob.location}
                    onChange={handleUpdateChange}
                  />
                </div>
                <div className="form-group">
                  <label>Min Salary:</label>
                  <input
                    type="text"
                    name="min_salary"
                    value={updatedJob.min_salary}
                    onChange={handleUpdateChange}
                  />
                </div>
                <div className="form-group">
                  <label>Max Salary:</label>
                  <input
                    type="text"
                    name="max_salary"
                    value={updatedJob.max_salary}
                    onChange={handleUpdateChange}
                  />
                </div>
                <div className="form-group">
                  <label>Company Name:</label>
                  <input
                    type="text"
                    name="company_name"
                    value={updatedJob.company_name}
                    onChange={handleUpdateChange}
                  />
                </div>
                <div className="form-group">
                  <label>Status:</label>
                  <input
                    type="text"
                    name="job_status"
                    value={updatedJob.job_status}
                    onChange={handleUpdateChange}
                  />
                </div>
                <button type="submit">Update Job</button>
                <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
              </form>
            </div>
          ) : (
            <div className="job-details-content">
              <h2>{selectedJob.job_title}</h2>
              <p><strong>Industry:</strong> {selectedJob.job_industry}</p>
              <p><strong>Description:</strong> {selectedJob.description}</p>
              <p><strong>Qualifications:</strong> {selectedJob.qualifications}</p>
              <p><strong>Application Instructions:</strong> {selectedJob.application_instructions}</p>
              <p><strong>Created By:</strong> {selectedJob.created_by}</p>
              <p><strong>Location:</strong> {selectedJob.location}</p>
              <p><strong>Min Salary:</strong> {formatSalary(selectedJob.min_salary)}</p>
              <p><strong>Max Salary:</strong> {formatSalary(selectedJob.max_salary)}</p>
              <p><strong>Company Name:</strong> {selectedJob.company_name}</p>
              <p><strong>Status:</strong> {selectedJob.job_status}</p>
              <button onClick={() => setSelectedJob(null)}>Close</button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AdminJobList;

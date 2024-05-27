  import React, { useState } from 'react';
  import { jobServiceObj } from '../../services/jobService'; // Import the job service object

  function ManageJobByAdmin() {
      const [jobs, setJobs] = useState([]);
      const [jobData, setJobData] = useState({
          job_id: '',
          job_title: '',
          job_industry: '',
          description: '',
          qualifications: '',
          application_instructions: '',
          created_by: '',
          location: '',
          min_salary: '',
          max_salary: '',
          company_name: '',
          job_status: ''
      });

      async function getJobsButton_click() {
          try {
              const response = await jobServiceObj.getJobListingDetails();
              setJobs(response.data);
          } catch (error) {
              console.error('Error fetching job listings:', error);
          }
      }

      async function selectjob_click(jobId) {
          try {
              const response = await jobServiceObj.getJobByJobId(jobId);
              setJobData(response.data);
          } catch (error) {
              console.error('Error fetching job by ID:', error);
          }
      }

      async function updatejobButton_click() {
          try {
              await jobServiceObj.updateJobListing(jobData.job_id, jobData);
              // After updating, clear the input fields
              clearFields();
              // Refresh the job list
              getJobsButton_click();
          } catch (error) {
              console.error('Error updating job:', error);
          }
      }

      function clearFields() {
          setJobData({
              job_id: '',
              job_title: '',
              job_industry: '',
              description: '',
              qualifications: '',
              application_instructions: '',
              created_by: '',
              location: '',
              min_salary: '',
              max_salary: '',
              company_name: '',
              job_status: ''
          });
      }
      return (
          <div>
            {/* Input fields for job details */}
            <input type="text" placeholder="Job ID" value={jobData.job_id} onChange={(e) => setJobData({ ...jobData, job_id: e.target.value })} />
            <input type="text" placeholder="Job Title" value={jobData.job_title} onChange={(e) => setJobData({ ...jobData, job_title: e.target.value })} />
            <input type="text" placeholder="Job Industry" value={jobData.job_industry} onChange={(e) => setJobData({ ...jobData, job_industry: e.target.value })} />
            <input type="text" placeholder="Description" value={jobData.description} onChange={(e) => setJobData({ ...jobData, description: e.target.value })} />
            <input type="text" placeholder="Qualifications" value={jobData.qualifications} onChange={(e) => setJobData({ ...jobData, qualifications: e.target.value })} />
            <input type="text" placeholder="Application Instructions" value={jobData.application_instructions} onChange={(e) => setJobData({ ...jobData, application_instructions: e.target.value })} />
            <input type="text" placeholder="Created By" value={jobData.created_by} onChange={(e) => setJobData({ ...jobData, created_by: e.target.value })} />
            <input type="text" placeholder="Location" value={jobData.location} onChange={(e) => setJobData({ ...jobData, location: e.target.value })} />
            <input type="text" placeholder="Minimum Salary" value={jobData.min_salary} onChange={(e) => setJobData({ ...jobData, min_salary: e.target.value })} />
            <input type="text" placeholder="Maximum Salary" value={jobData.max_salary} onChange={(e) => setJobData({ ...jobData, max_salary: e.target.value })} />
            <input type="text" placeholder="Company Name" value={jobData.company_name} onChange={(e) => setJobData({ ...jobData, company_name: e.target.value })} />
            <input type="text" placeholder="Job Status" value={jobData.job_status} onChange={(e) => setJobData({ ...jobData, job_status: e.target.value })} />
      
            {/* Buttons to trigger operations */}
            <button onClick={getJobsButton_click}>Get Jobs</button>
            <button onClick={selectjob_click}>Select Job</button>
            <button onClick={updatejobButton_click}>Update Job</button>
            <button onClick={clearFields}>Clear Fields</button>
      
            {/* Table to display job data */}
            <table>
              <thead>
                <tr>
                  <th>Job ID</th>
                  <th>Job Title</th>
                  <th>Job Industry</th>
                  <th>Description</th>
                  <th>Qualifications</th>
                  <th>Application Instructions</th>
                  <th>Created By</th>
                  <th>Location</th>
                  <th>Minimum Salary</th>
                  <th>Maximum Salary</th>
                  <th>Company Name</th>
                  <th>Job Status</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.job_id} onClick={() => selectjob_click(job.job_id)}>
                    <td>{job.job_id}</td>
                    <td>{job.job_title}</td>
                    <td>{job.job_industry}</td>
                    <td>{job.description}</td>
                    <td>{job.qualifications}</td>
                    <td>{job.application_instructions}</td>
                    <td>{job.created_by}</td>
                    <td>{job.location}</td>
                    <td>{job.min_salary}</td>
                    <td>{job.max_salary}</td>
                    <td>{job.company_name}</td>
                    <td>{job.job_status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      };
      
      export default ManageJobByAdmin;

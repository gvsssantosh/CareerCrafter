import React, { useState, useEffect } from 'react';
import { jobServiceObj } from '../../services/jobService'; // Import the job service object
import './formstyles.css'; // Import the CSS file
import AdminNavigationBar from '../AdminNav';
import { useNavigate } from 'react-router-dom';

function JobForm() {
    const [jobobj, setjobobj] = useState({
        job_title: 'Software Engineer',
        job_industry: 'Technology',
        description: '',
        qualifications: 'Bachelor\'s degree in Computer Science or related field',
        application_instructions: 'Ex: Please email your resume to hr@example.com',
        created_by: '', // Include created_by field
        location: 'Remote',
        min_salary: '500000',
        max_salary: '800000',
        company_name: 'Hexaware',
        job_status: 'Open'
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [jobListings, setJobListings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch job listings when component mounts
        fetchJobListings();
    }, []);

    const fetchJobListings = async () => {
        try {
            const token = sessionStorage.getItem('admin-token');
            const response = await jobServiceObj.getJobListingDetails(token);
            setJobListings(response.data);
        } catch (error) {
            console.error('Error fetching job listings:', error);
            setJobListings([]); // Set to an empty array in case of error
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setjobobj(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validate = () => {
        let tempErrors = {};
        tempErrors.job_title = jobobj.job_title ? '' : 'Job title is required';
        tempErrors.job_industry = jobobj.job_industry ? '' : 'Industry is required';
        tempErrors.description = jobobj.description ? '' : 'Description is required';
        tempErrors.qualifications = jobobj.qualifications ? '' : 'Qualifications are required';
        tempErrors.application_instructions = jobobj.application_instructions ? '' : 'Application instructions are required';
        tempErrors.location = jobobj.location ? '' : 'Location is required';
        tempErrors.min_salary = jobobj.min_salary ? '' : 'Min salary is required';
        tempErrors.max_salary = jobobj.max_salary ? '' : 'Max salary is required';
        tempErrors.company_name = jobobj.company_name ? '' : 'Company name is required';
        tempErrors.job_status = jobobj.job_status ? '' : 'Status is required';

        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const adminId = sessionStorage.getItem('adminId');
                const jobData = {
                    ...jobobj,
                    created_by: adminId
                };
                const response = await jobServiceObj.postJobListing(jobData);
                setMessage('Job listing created successfully!');
                console.log('Job listing created:', response);

                // Fetch updated job listings after successful submission
                fetchJobListings();
            } catch (error) {
                setMessage('Error creating job listing. Please try again later.');
                console.error('Error creating job listing:', error);
            }
        }
    };

    return (
        <>
            <AdminNavigationBar />
            <div className="containerr">
                <div className="form-wrapper">
                    <h2>Create Job Listing</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Job Title:</label>
                            <input type="text" name="job_title" value={jobobj.job_title} onChange={handleChange} required />
                            {errors.job_title && <div className="error">{errors.job_title}</div>}
                        </div>
                        <div className="form-group">
                            <label>Industry:</label>
                            <input type="text" name="job_industry" value={jobobj.job_industry} onChange={handleChange} required />
                            {errors.job_industry && <div className="error">{errors.job_industry}</div>}
                        </div>
                        <div className="form-group">
                            <label>Description:</label>
                            <textarea name="description" value={jobobj.description} onChange={handleChange} required></textarea>
                            {errors.description && <div className="error">{errors.description}</div>}
                        </div>
                        <div className="form-group">
                            <label>Qualifications:</label>
                            <textarea name="qualifications" value={jobobj.qualifications} onChange={handleChange} required></textarea>
                            {errors.qualifications && <div className="error">{errors.qualifications}</div>}
                        </div>
                        <div className="form-group">
                            <label>Application Instructions:</label>
                            <textarea name="application_instructions" value={jobobj.application_instructions} onChange={handleChange} required></textarea>
                            {errors.application_instructions && <div className="error">{errors.application_instructions}</div>}
                        </div>
                        <div className="form-group">
                            <label>Location:</label>
                            <input type="text" name="location" value={jobobj.location} onChange={handleChange} required />
                            {errors.location && <div className="error">{errors.location}</div>}
                        </div>
                        <div className="form-group">
                            <label>Min Salary:</label>
                            <input type="text" name="min_salary" value={jobobj.min_salary} onChange={handleChange} required />
                            {errors.min_salary && <div className="error">{errors.min_salary}</div>}
                        </div>
                        <div className="form-group">
                            <label>Max Salary:</label>
                            <input type="text" name="max_salary" value={jobobj.max_salary} onChange={handleChange} required />
                            {errors.max_salary && <div className="error">{errors.max_salary}</div>}
                        </div>
                        <div className="form-group">
                            <label>Company Name:</label>
                            <input type="text" name="company_name" value={jobobj.company_name} onChange={handleChange} required />
                            {errors.company_name && <div className="error">{errors.company_name}</div>}
                        </div>
                        <div className="form-group">
                            <label>Job Status:</label>
                            <input type="text" name="job_status" value={jobobj.job_status} onChange={handleChange} required />
                            {errors.job_status && <div className="error">{errors.job_status}</div>}
                        </div>
                        <button type="submit">Submit</button>
                        {message && <div className="message">{message}</div>}
                    </form>
                </div>
                <button className="button" onClick={() => navigate('/AdminHome/Jobs')}>Back to Jobs</button>
            </div>
        </>
    );
}

export default JobForm;

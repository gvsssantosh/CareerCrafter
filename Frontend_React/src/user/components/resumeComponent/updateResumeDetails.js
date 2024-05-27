import UserNavigationBar from "../userNavBar";
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { resumeServiceObj } from "../../services/resumeService";
import "./updateResumeDetails.css";

function UpdateResumeDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const { resume } = location.state || {};
    if (resume == null) {
        navigate(-1);
    }
    let cleanResume = Object.assign({}, resume);
    delete cleanResume.resume_file_link;
    delete cleanResume.created_on;
    delete cleanResume.last_updated;

    const [updatedResume, setUpdatedResume] = useState({ ...cleanResume });
    const [errorMessage, setErrorMessage] = useState("");
    console.log(updatedResume);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedResume(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCancel = () => {
        navigate(-1); // Go back to the previous page
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!updatedResume.description.trim()) {
            setErrorMessage("Description is required.");
            return;
        }
        try {
            const result = await resumeServiceObj.updateResume(updatedResume);
            if (result.status === true) {
                // Handle success
                alert("resume details are updated");
                handleCancel();
            } else {
                // Handle error
                alert(result.msg);
            }
        } catch (error) {
            // Handle error
            alert("internal error");
        }
    };

    return (
        <>
            <UserNavigationBar />
            <div className="resume-form-container">
                <h2>Update Resume Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={updatedResume.description}
                            onChange={handleChange}
                        />
                    </div>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <div className="form-group">
                        <label htmlFor="projects">Projects:</label>
                        <textarea
                            id="projects"
                            name="projects"
                            value={updatedResume.projects}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="skills">Skills:</label>
                        <textarea
                            id="skills"
                            name="skills"
                            value={updatedResume.Skills}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="certifications">Certifications:</label>
                        <textarea
                            id="certifications"
                            name="certifications"
                            value={updatedResume.Certifications}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="internships">Internships:</label>
                        <textarea
                            id="internships"
                            name="internships"
                            value={updatedResume.internships}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="work_experience">Work Experience:</label>
                        <textarea
                            id="work_experience"
                            name="work_experience"
                            value={updatedResume.work_experience}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Update</button>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </>
    );
}

export default UpdateResumeDetails;

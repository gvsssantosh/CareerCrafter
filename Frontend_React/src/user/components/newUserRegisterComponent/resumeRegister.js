import React, { useState } from 'react';
import './resumeRegister.css'
import { useNavigate } from 'react-router-dom';
import { resumeServiceObj } from '../../services/resumeService';

const ResumeRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_id: sessionStorage.getItem("user_id"),
    description: '',
    projects: '',
    Skills: '',
    Certifications: '',
    internships: '',
    work_experience: '',
    resume_file_link: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      resume_file_link: file
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add validation for mandatory fields
    if (formData.description === '' || formData.resume_file_link === null) {
      alert('Please fill out mandatory fields: description and upload a resume file');
      return;
    }
    const data = new FormData();
    data.append('user_id', formData.user_id);
    data.append('description', formData.description);
    data.append('projects', formData.projects);
    data.append('Skills', formData.Skills);
    data.append('Certifications', formData.Certifications);
    data.append('internships', formData.internships);
    data.append('work_experience', formData.work_experience);
    data.append('resume_file_link', formData.resume_file_link);
    try {


      // formData.append("user_id", sessionStorage.getItem("user_id"));
      let result = await resumeServiceObj.resumeInsert(data);
      if (result.status === true) {
        alert("resume added successfully");
        navigate("/userHome/searchJobs");
      }
      else {
        alert(`error occured:${result.msg}`);
      }
    } catch (error) {
      alert(`error occured: ${error.message}`);
    }
    // Submit the form data or perform further actions
    console.log(formData);
  };
  function homeButtonClick() {
    navigate("/userHome/searchJobs");
  }

  return (
    <>
      <div className='ResumeForm'>
        <button onClick={homeButtonClick}>User Home</button>
        <h2>Create Your Resume Profile</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="description">Description<span>*</span>:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="projects">Projects:</label>
            <textarea
              id="projects"
              name="projects"
              value={formData.projects}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <label htmlFor="Skills">Skills:</label>
            <textarea
              id="Skills"
              name="Skills"
              value={formData.Skills}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <label htmlFor="Certifications">Certifications:</label>
            <textarea
              id="Certifications"
              name="Certifications"
              value={formData.Certifications}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <label htmlFor="internships">Internships:</label>
            <textarea
              id="internships"
              name="internships"
              value={formData.internships}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <label htmlFor="work_experience">Work Experience:</label>
            <textarea
              id="work_experience"
              name="work_experience"
              value={formData.work_experience}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <label htmlFor="resume_file_link">Upload Resume (PDF only)<span>*</span>:</label>
            <input
              type="file"
              id="resume_file_link"
              name="resume_file_link"
              accept=".pdf"
              onChange={handleFileChange}
              required
            />
          </div>
          <button type="submit"  >Submit</button>

        </form>
      </div>
    </>
  );
};

export default ResumeRegister;

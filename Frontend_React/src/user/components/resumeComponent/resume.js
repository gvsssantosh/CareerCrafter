import UserNavigationBar from "../userNavBar";
import "./resume.css";
import { useNavigate } from 'react-router-dom';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import packageJson from '../../../../package.json';
import React, { useState, useEffect } from 'react';


import { resumeServiceObj } from "../../services/resumeService";

function Resume() {
  let userID = sessionStorage.getItem("user_id");
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [pdfFileLink, setPdfFileLink] = useState(null);
  const pdfjsVersion = packageJson.dependencies['pdfjs-dist'];

  const handleEditDetailsClick = () => {
    navigate(`/updateResume/details/${userID}`, { state: { resume } });

  };

  const handleEditFileLinkClick = () => {
    navigate(`/updateResume/fileLink/${userID}`, { state: { resume } });

  };

  useEffect(() => {
    fetchResume();
  }, []);

  async function fetchResume() {
    try {
      let result = await resumeServiceObj.getResumeByUserId(userID);
      if (result.status === true) {
        setResume(result.obj[0]);
        setPdfFileLink(`/pdf/${result.obj[0].resume_file_link}`);
      }
      else {
        // console.log(result);
        if (result.msg == "no resume for this user" || result.msg == " [userId]: resume not present for this id ") {
          alert("resume not created with your account");
          navigate("/resumeRegister");
        }
        else { alert(result.msg); }

      }
    } catch (error) {
      alert("internal error");
    }
  };


  return (
    <>
      <UserNavigationBar />
      <div>
        {resume && (
          <table class="search-table">
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Description</td>
                <td>{resume.description}</td>
              </tr>
              <tr>
                <td>Projects</td>
                <td>{resume.projects}</td>
              </tr>
              <tr>
                <td>Skills</td>
                <td>{resume.Skills}</td>
              </tr>
              <tr>
                <td>Certifications</td>
                <td>{resume.Certifications}</td>
              </tr>
              <tr>
                <td>Internships</td>
                <td>{resume.internships}</td>
              </tr>
              <tr>
                <td>Work Experience</td>
                <td>{resume.work_experience}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <div>
        {pdfFileLink ? (
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>

            <div
              style={{
                border: '1px solid rgba(0, 0, 0, 0.3)',
                height: '650px',
                justifyContent:"center",
                alignItems:"center"
            //     justify- content: center;
            // align-items: center;
              }}
            >
            <Viewer fileUrl={pdfFileLink} />
          </div>
            {/* <Viewer fileUrl="/pdf/CareerCrafter-Job Portal.pdf" /> */}
      </Worker>
      ) : (
      <p>Loading...</p>
        )}
    </div >
      <div className="centered-container-resume">
        {resume && (
          <div style={{ marginTop: '20px', alignItems: "center" }}>
            <button onClick={handleEditDetailsClick}>Update Details</button>
            <button onClick={handleEditFileLinkClick}>Update Resume</button>
          </div>
        )}
      </div>

    </>
  );
};

export default Resume;

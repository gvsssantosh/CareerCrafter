import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams and useNavigate
import { jobServiceObj } from '../../services/jobService';
import AdminNavigationBar from '../AdminNav';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

function Viewuser() {
    const navigate = useNavigate();
    const { userId } = useParams(); // Get userId from URL params
    const [data, setData] = useState(null);
    const [pdfFileLink, setPdfFileLink] = useState(null);

    useEffect(() => {
        async function fetchUserDetails() {
            try {
                const result = await jobServiceObj.getResumeByID(userId);
                if (result.status === true) {
                    console.log(result);
                    setData(result.data[0]); // Assuming result.obj is an array containing user details
                    setPdfFileLink(`/pdf/${result.data[0].resume_file_link}`);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        }

        fetchUserDetails();
    }, [userId]); // Fetch user details when userId changes

    return (
        <>
            <AdminNavigationBar />
            <div style={styles.container}>
                {data && (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Field</th>
                                <th style={styles.th}>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={styles.td}>Description</td>
                                <td style={styles.td}>{data.description}</td>
                            </tr>
                            <tr>
                                <td style={styles.td}>Projects</td>
                                <td style={styles.td}>{data.projects}</td>
                            </tr>
                            <tr>
                                <td style={styles.td}>Skills</td>
                                <td style={styles.td}>{data.Skills}</td>
                            </tr>
                            <tr>
                                <td style={styles.td}>Certifications</td>
                                <td style={styles.td}>{data.Certifications}</td>
                            </tr>
                            <tr>
                                <td style={styles.td}>Internships</td>
                                <td style={styles.td}>{data.internships}</td>
                            </tr>
                            <tr>
                                <td style={styles.td}>Work Experience</td>
                                <td style={styles.td}>{data.work_experience}</td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
            <div style={styles.pdfContainer}>
                {pdfFileLink ? (
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
                        <div style={styles.pdfViewer}>
                            <Viewer fileUrl={pdfFileLink} />
                        </div>
                    </Worker>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <button style={styles.button} onClick={() => navigate('/AdminHome/Applications')}>Back to Applications</button>
        </>
    );
}

const styles = {
    container: {
        padding: '20px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px',
    },
    th: {
        backgroundColor: 'lightgreen',
        padding: '10px',
        border: '1px solid #ddd',
        textAlign: 'center',
    },
    td: {
        padding: '10px',
        border: '1px solid #ddd',
        textAlign: 'center',
    },
    pdfContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
    },
    pdfViewer: {
        border: '1px solid rgba(0, 0, 0, 0.3)',
        width: '80%', // Decrease the width
        height: '650px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'block',
        margin: '0 auto', // Center the button horizontally
    },
};

export default Viewuser;

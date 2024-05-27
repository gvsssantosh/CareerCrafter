import { useLocation, useNavigate } from 'react-router-dom';
import UserNavigationBar from "../userNavBar";
import React, { useState } from 'react';
import { resumeServiceObj } from "../../services/resumeService";

function UpdateResumeFile() {
    const location = useLocation();
    const navigate = useNavigate();
    const { resume } = location.state || {};
    if (resume == null) {
        navigate(-1);
    }

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('pdf', selectedFile);
        formData.append("user_id", sessionStorage.getItem("user_id"));
        console.log(sessionStorage.getItem("user_id"));
        console.log(formData);


        try {
            let result = await resumeServiceObj.updateResumeFile(formData);
            if(result.status===true){
                alert('File uploaded successfully');
                navigate(-1);
            }
            else{
                alert(result.msg);
            }
            
        } catch (error) {
            
            console.error('Error uploading file', error.response.data.result.msg);
            alert('Failed to upload file');
        }
    };
    return (<>
        <UserNavigationBar />
        <form onSubmit={handleSubmit}>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            <button type="submit">Upload PDF</button>
        </form>

    </>);
}
export default UpdateResumeFile;
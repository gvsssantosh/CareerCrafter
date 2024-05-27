import { userServiceObj } from "../../services/userService";
import { useState } from "react";
import React from 'react';
import UserNavigationBar from "../userNavBar";
import { useNavigate } from 'react-router-dom';
import "../tableStyle.css";
import "./applyJob.css";

function SearchJobs() {
    const [data, setData] = useState([]);
    const [serviceCalled, setServiceCalled] = useState(false);
    const [parameter, setParameter] = useState('');
    const [values, setValues] = useState({ value1: '', value2: '' });
    const [errors, setErrors] = useState({});
    const [parameterError, setParameterError] = useState('');
    const navigate = useNavigate();
    const parametersConfig = {
        id: { labels: ['ID'], placeholders: ['Enter ID'], fields: 1 },
        location: { labels: ['Location'], placeholders: ['Enter Location'], fields: 1 },
        industry: { labels: ['Industry'], placeholders: ['Enter Industry'], fields: 1 },
        'location, industry': { labels: ['Location', 'Industry'], placeholders: ['Enter Location', 'Enter Industry'], fields: 2 },
        'title, industry, location': { labels: ['Title', 'Industry', 'Location'], placeholders: ['Enter Title', 'Enter Industry', 'Enter Location'], fields: 3 },
    };

    const handleParameterChange = (event) => {
        setParameter(event.target.value);
        setParameterError('');
        setValues({ value1: '', value2: '', value3: '' });
        setErrors({});
    };

    const handleInputChange = (event, fieldIndex) => {
        const { name, value } = event.target;
        setValues(prevValues => ({ ...prevValues, [name]: value }));
    };

    const callServiceById = async (id) => {
        // Simulate a service call for searching by ID
        try {
            let result = await userServiceObj.getJobById(id);
            setServiceCalled(true);
            if (result.status === true) {
                setData([result.obj]);
            }

        } catch (error) {
            alert(error);
        }
    };

    const callServiceByLocation = async (location) => {
        // Simulate a service call for searching by Location
        try {
            let result = await userServiceObj.getJobByLoc(location);
            setServiceCalled(true);
            if (result.status === true) {
                setData(result.obj);
            }

        } catch (error) {
            alert(error);
        }
    };

    const callServiceByIndustry = async (industry) => {
        // Simulate a service call for searching by Industry
        try {
            let result = await userServiceObj.getJobByInd(industry);
            setServiceCalled(true);
            if (result.status === true) {
                setData(result.obj);
            }

        } catch (error) {
            alert(error);
        }
    };

    const callServiceByLocationAndIndustry = async (location, industry) => {
        // Simulate a service call for searching by Location and Industry
        try {
            let result = await userServiceObj.getJobByLocInd({
                "job_industry": industry,
                "location": location
            });
            setServiceCalled(true);
            if (result.status === true) {
                setData(result.obj);
            }

        } catch (error) {
            alert(error);
        }
    };

    const callServiceByTitleIndustryLocation = async (title, industry, location) => {
        // Simulate a service call for searching by Title, Industry, and Location
        try {
            let result = await userServiceObj.getJobByTitleLocInd({
                "job_title": title,
                "job_industry": industry,
                "location": location
            });
            setServiceCalled(true);
            if (result.status === true) {
                setData(result.obj);
            }

        } catch (error) {
            alert(error);
        }
    };

    const validate = () => {
        const newErrors = {};
        if (parameter === 'location, industry' || parameter === 'title, industry, location') {
            if (!values.value1) newErrors.value1 = `${parametersConfig[parameter].labels[0]} is required`;
            if (!values.value2) newErrors.value2 = `${parametersConfig[parameter].labels[1]} is required`;
            if (parameter === 'title, industry, location' && !values.value3) newErrors.value3 = `${parametersConfig[parameter].labels[2]} is required`;
        } else {
            if (!values.value1) newErrors.value1 = `${parametersConfig[parameter].labels[0]} is required`;
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = (event) => {
        setData([]);
        event.preventDefault();
        if (!parameter) {
            setParameterError('Please select a parameter.');
            return;
          }
        if (validate()) {
            switch (parameter) {
                case 'id':
                    callServiceById(values.value1);
                    break;
                case 'location':
                    callServiceByLocation(values.value1);
                    break;
                case 'industry':
                    callServiceByIndustry(values.value1);
                    break;
                case 'location, industry':
                    callServiceByLocationAndIndustry(values.value1, values.value2);
                    break;
                case 'title, industry, location':
                    callServiceByTitleIndustryLocation(values.value1, values.value2, values.value3);
                    break;
                default:
                    alert('Please select a parameter.');
            }
        }
    };


    function viewJob_click(jobObj) {
        navigate(`/applyJob/:${jobObj.job_id}`, { state: { jobObj } });
    }

    let finalresult = data.map((item, index) => {
        if (data.length == 0) {
            return (<tr>
                <td colSpan="11"><img src="https://cdn.dribbble.com/users/1242216/screenshots/9326781/media/6384fef8088782664310666d3b7d4bf2.png?resize=1200x900&vertical=center" width="400" alt="logo" /></td>
            </tr>)
        }
        return (
            <tr key={index}>
                <td>{item.job_id}</td>
                <td>{item.job_title}</td>
                <td>{item.job_industry}</td>
                <td>{item.qualifications}</td>
                <td>{item.location}</td>
                <td>{item.min_salary}</td>
                <td>{item.max_salary}</td>
                <td>{item.company_name}</td>
                <td>{item.job_status}</td>
                <td>{new Date(item.created_on).toLocaleDateString()}</td>
                <td align="center">
                    <a onClick={() => viewJob_click(item)} href="javascript:void(0);">View</a>
                </td>
            </tr>)
    })
    return (
        <>
            <UserNavigationBar />
            <div style={{ textAlign: "center" }} >
                <img src="/images/44371335.jpg" width="60%"  alt="Alternate text" />

            </div>


            <form style={{ display:"flex",flexDirection:"column",gap: "10px" }} onSubmit={handleSubmit}>

                <div className="centered-container">
                    <label style={{ fontSize: '18px' }}>
                        Select Parameter : 
                        <select style={{ fontSize: '16px' }} value={parameter} onChange={handleParameterChange}>
                            <option value="">Select...</option>
                            <option value="id">Search by ID</option>
                            <option selected value="location">Location</option>
                            <option value="industry">Industry</option>
                            <option value="location, industry">Location, Industry</option>
                            <option value="title, industry, location">Title, Industry, Location</option>
                        </select>
                    </label>
                    {parameterError && <span className="error" style={{ color: 'red' }}>{parameterError}</span>}
                </div>
                <div className="centered-container-searchparameter">

                    {parametersConfig[parameter]?.fields >= 1 && (
                        <div>
                            <label style={{ fontSize: '18px' }}>{parametersConfig[parameter].labels[0]}: </label>
                            <input
                                type="text"
                                name="value1"
                                placeholder={parametersConfig[parameter].placeholders[0]}
                                value={values.value1}
                                onChange={(e) => handleInputChange(e, 1)}
                                //  style={{ padding: '10px', fontSize: '16px', width: '300px' }} // Inline styles for input
                                style={{  fontSize: '16px' }} // Inline styles for input
                            />
                            {errors.value1 && <span className="error" style={{ color: 'red' }}>{errors.value1}</span>}
                        </div>
                    )}

                    {parametersConfig[parameter]?.fields >= 2 && (
                        <div>
                            <label style={{ fontSize: '18px' }}>{parametersConfig[parameter].labels[1]}: </label>
                            <input
                                type="text"
                                name="value2"
                                placeholder={parametersConfig[parameter].placeholders[1]}
                                value={values.value2}
                                onChange={(e) => handleInputChange(e, 2)}
                                style={{  fontSize: '16px' }}
                            />
                            {errors.value2 && <span className="error" style={{ color: 'red' }}>{errors.value2}</span>}
                        </div>
                    )}

                    {parametersConfig[parameter]?.fields >= 3 && (
                        <div>
                            <label style={{ fontSize: '18px' }}>{parametersConfig[parameter].labels[2]}: </label>
                            <input
                                type="text"
                                name="value3"
                                placeholder={parametersConfig[parameter].placeholders[2]}
                                value={values.value3}
                                onChange={(e) => handleInputChange(e, 3)}
                                style={{  fontSize: '16px' }}
                            />
                            {errors.value3 && <span className="error" style={{ color: 'red' }}>{errors.value3}</span>}
                        </div>
                    )}
                </div>

                <div className="centered-container"><button className="search-parameter-button" type="submit">Search</button></div>

            </form>

            {/* <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}></table> */}
            <div className="centered-container">
                <table className="rounded-corners">
                    <thead>
                        <tr>
                            <th>Job ID</th>
                            <th>Title</th>
                            <th>Industry</th>
                            <th>Qualifications</th>
                            <th>Location</th>
                            <th>Min Salary</th>
                            <th>Max Salary</th>
                            <th>Company</th>
                            <th>Status</th>
                            <th>Posted On</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {finalresult}
                        {serviceCalled && data.length == 0 && (
                            <tr>
                                <td colSpan="11" style={{ textAlign: 'center'}}><img src="https://cdn.dribbble.com/users/1242216/screenshots/9326781/media/6384fef8088782664310666d3b7d4bf2.png?resize=1200x900&vertical=center" width="400" alt="logo" /></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </>
    );
}

export default SearchJobs;


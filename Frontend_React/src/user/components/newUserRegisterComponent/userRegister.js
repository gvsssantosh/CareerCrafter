import React, { useState } from 'react';
import { authServiceObj } from '../../services/authService';
import "./userRegister.css";
import { Navigate, useNavigate } from 'react-router-dom';
import Header from '../../../commonComponents/header';
function UserRegistrationForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
        retypePassword: ''
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.retypePassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
        if (!/^[6-9]\d{9}$/.test(formData.phoneNumber)) {
            setErrorMessage('Invalid phone number');
            return;
        }
        if (formData.password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long');
            return;
        }
        // Call the service
        try {
            let userObj = {
                first_name: formData.firstName,
                last_name: formData.lastName,
                phone_number: formData.phoneNumber,
                email: formData.email,
                password: formData.password
            }
            let result = await authServiceObj.userRegister(userObj);
            if (result.success === true) {
                alert('Registration successful!');
                navigate("/");
            }
            else {
                alert(`registration failed: ${result.msg}`);

            }

        } catch (error) {
            // console.error('Error registering user:', error);
            alert(`error while registering ${error.message}`);
        }
    };
    function homeButtonClick() {
        navigate("/");
    }
    return (
        <>
        <Header/>
            <div>
                <h2>User Registration</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleSubmit} className="registration-form">
                    <label>
                        First Name:
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Last Name:
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Phone Number:
                        <input
                            type="tel"
                            name="phoneNumber"
                            pattern="[6-9]{1}[0-9]{9}"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength="8"
                        />
                    </label>
                    <br />
                    <label>
                        Retype Password:
                        <input
                            type="password"
                            name="retypePassword"
                            value={formData.retypePassword}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                    <button className='registration-form-button' type="submit">Register</button>

                </form>

            </div>
        </>
    );
}


export default UserRegistrationForm;

import React, { useState } from 'react';
import './forgotAdminPassword.css';
import { adminServiceObj } from '../../services/adminService';
import { useNavigate } from "react-router-dom";

function ForgotAdminPassword() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    let navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        if (password !== retypePassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            let result = await adminServiceObj.updateAdminPassword({ email: email, password: password });

            if (result.status===true) {
                setSuccess('Password updated successfully.');
                setEmail('');
                setPassword('');
                setRetypePassword('');
                navigate('/admin-login')
                
            } else {
                setError(`Failed to update password. Please try again.${result.msg}`);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="forgot-password">
            <form onSubmit={handleSubmit} className="updateForm">
                <h2>Update Password</h2>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <div className="formGroup">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="formGroup">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength="8"
                    />
                </div>
                <div className="formGroup">
                    <label>Re-type Password:</label>
                    <input
                        type="password"
                        value={retypePassword}
                        onChange={(e) => setRetypePassword(e.target.value)}
                        required
                        minLength="8"
                    />
                </div>
                <button className="updateButton" type="submit">Update Password</button>
            </form>
        </div>
    );
}

export default ForgotAdminPassword;

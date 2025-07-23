// client/src/components/AdminLogin.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent the form from reloading the page
        setError(''); // Clear previous errors

        try {
            const response = await axios.post('https://insight-hub-api.onrender.com/api/admin/login', {
                email,
                password,
            });

            if (response.data.success) {
                // In a real, more secure app, you'd save the token
                // For now, we'll just redirect
                alert('Login Successful!');
                navigate('/admin'); // Redirect to the admin dashboard
            }
        } catch (err) {
            // If the server sends a 401 error, it will be caught here
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="container">
            <h1>Admin Login</h1>
            <form onSubmit={handleLogin} className="data-form">
                <input
                    type="email"
                    placeholder="Admin Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p style={{ color: 'var(--error-color)' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
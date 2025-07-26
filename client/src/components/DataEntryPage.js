// client/src/components/HomePage.js

import React, { useState } from 'react';
import axios from 'axios';

const HomePage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Note: In deployment, you'd change this URL to your live backend URL
            const response = await axios.post('https://insight-hub-api.onrender.com/api/individuals', formData);
            alert('Details submitted successfully!');
            console.log(response.data);
            // Clear the form
            setFormData({ name: '', email: '', phone: '', address: '' });
        } catch (error) {
            alert('Error submitting details. Please check the console.');
            console.error('Submission error:', error);
        }
    };

    return (
        <div className="container">
            <h1>Submit Your Details</h1>
            <p>Please fill out the form below to add your information to our system.</p>
            

            <form onSubmit={handleSubmit} className="data-form">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required />
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required />
                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
                <button type="submit">Submit</button>
            </form>

           
        </div>
    );
};

export default HomePage;
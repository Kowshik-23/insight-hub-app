// client/src/components/HomePage.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="hero-section">
            <motion.div 
                className="hero-content"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="hero-title">Unlock Your Data's Potential with InsightHub</h1>
                <p className="hero-description">
                    At InsightHub, we specialize in seamless data collection and powerful analytics. 
                    Our platform provides a robust, secure, and user-friendly way to gather individual details, 
                    transforming raw information into actionable reports and intuitive dashboards. Empower your
                    decision-making with clarity and precision.
                </p>
                <Link to="/submit-details" className="hero-cta-button">Get Started</Link>
            </motion.div>
        </div>
    );
};

export default HomePage;
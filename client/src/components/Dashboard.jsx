// dashboard.jsx

import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Dashboard.css' // Import CSS file for styling

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="db-content">
                <h1 className="db-text">Welcome!</h1>
                <p className='db-description'>
                You logged in as Admin
                </p>
            </div>
            <div className="db-image"></div>
            <div className='db1-image'></div>
            {/* Other components and content for the dashboard */}
        </div>
    );
}

export default Dashboard;

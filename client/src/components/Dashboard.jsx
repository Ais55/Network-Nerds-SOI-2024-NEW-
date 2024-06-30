// dashboard.jsx

import React from 'react'
import { Link } from 'react-router-dom'
//import '../css/Dashboard.css' // Import CSS file for styling

const Dashboard = () => {
    return (
        <div className="dashboard">
            <nav className="navbar">
                {/* Other existing navbar items */}
                <Link to="/addbook" className="navbar-link">Add Book</Link>
                <Link to="/addstudent" className="navbar-link">Add Student</Link>
                <Link to="/dashboard" className="navbar-link">Dashboard</Link>
            </nav>
            {/* Other components and content for the dashboard */}
        </div>
    );
}

export default Dashboard;

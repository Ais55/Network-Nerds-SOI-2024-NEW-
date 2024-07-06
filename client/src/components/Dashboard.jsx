import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/Dashboard.css'; // Import CSS file for styling

const Dashboard = () => {
    const [students, setStudents] = useState(0);
    const [admin, setAdmin] = useState(0);
    const [books, setBooks] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:3001/dashboard')
            .then(res => {
                if (res.data.ok) {
                    setStudents(res.data.student);
                    setAdmin(res.data.admin);
                    setBooks(res.data.book);
                }
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="dashboard">
            <div className="db-content">
                <h1 className="db-text">Welcome!</h1>
                <p className="db-description">You logged in as Admin</p>
                <br />
                <div className="db-books">
                    <h2>Total Book Types</h2>
                    <h2>{books}</h2>
                    <br />
                </div>
                <div className="db-students">
                    <h2>Total Students</h2>
                    <h2>{students}</h2>
                    <br />
                </div>
                <div className="db-admins">
                    <h2>Total Admins</h2>
                    <h2>{admin}</h2>
                </div>
            </div>
            <div className="db-image"></div>
            <div className="db1-image"></div>
            {/* Other components and content for the dashboard */}
        </div>
    );
}

export default Dashboard;

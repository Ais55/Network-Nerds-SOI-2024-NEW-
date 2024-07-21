import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/AddStudent.css'; // Ensure this is the path to your CSS file

const EditStudent = ({ role }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [roll, setRoll] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [batch, setBatch] = useState('');

    useEffect(() => {
        if (role !== '' && role !== 'admin') {
            navigate('/error');
        }
    }, [role, navigate]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/student/get-student/${id}`)
            .then(res => {
                setRoll(res.data.roll);
                setEmail(res.data.email);
                setUsername(res.data.username);
                setBatch(res.data.batch);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const invalid = roll === '' || email === '' || username === '' || batch === '';

        if (invalid) {
            alert('Invalid Entries');
            return;
        }

        axios.put(`${import.meta.env.VITE_API_URL}/student/update-student/${id}`, {
            roll,
            email,
            username,
            batch,
        })
            .then(res => {
                if (res.data.updated) {
                    navigate('/students'); // Redirect to student list or any other page
                } else {
                    console.log(res);
                }
            })
            .catch(err => console.log(err));
    };

    return (role === 'admin' &&
        <div className="student-form-container">
            <div className="student-form">
                <h2>Edit Student</h2>
                <br />
                <div className="form-group">
                    <label htmlFor='roll'>Roll No:</label>
                    <input type="text" id="roll" name="roll" value={roll} onChange={(e) => setRoll(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor='email'>Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="username">User Name:</label>
                    <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="batch">Batch:</label>
                    <input type="text" id="batch" name="batch" value={batch} onChange={(e) => setBatch(e.target.value)} />
                </div>
                <button className="submit" onClick={handleSubmit}>Update</button>
            </div>
        </div>
    );
};

export default EditStudent;

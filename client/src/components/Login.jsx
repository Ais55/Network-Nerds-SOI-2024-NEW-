import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
import axios from 'axios';

const Login = ({ setRole }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRoleVar] = useState('admin');
    const [email, setEmail] = useState('')
   // const [email, setEmail] = useState('');
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = () => {
        axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { username, password, email, role })
            .then(res => {
                if (res.data.login && res.data.role === 'admin') {
                    setRole('admin');
                    navigate('/dashboard');
                } 
                else if (res.data.login && res.data.role === 'student') {
                    setRole('student');
                    navigate('/studentdashboard');
                }
                console.log(res);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='login-page'>
            <div className="login-container">
                <h2>Login</h2> <br />
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" placeholder="Enter Username"
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
                {<div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text" placeholder="Enter Email"
                        onChange={(e) => setEmail(e.target.value)} />
                </div> }
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                
                {/* <div className="form-group">
                    <label htmlFor="role">Role:</label>
                    <select name="role" id="role"
                        onChange={(e) => setRoleVar(e.target.value)}>
                        <option value='admin'>Admin</option>
                        <option value='student'>Student</option>
                    </select>
                </div> */}
                
                <button className='btn-login' onClick={handleSubmit}>Login</button>
            </div>
            <div className="login-image"></div>
        </div>
    );
}

export default Login;
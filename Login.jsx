import React, { useState } from 'react'
import './login.css'
import axios from 'axios'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [role,setRole] = useState('student')
    const [isLogin, setIsLogin] = useState(true);

    axios.defaults.withCredentials = true;

    const handleSignup = () => {
        axios.post('http://localhost:3001/auth/signup', { username, password, role })
            .then(res => console.log(res))
            .catch(err => {
                console.log('Error:', err);
                if (err.response) {
                    console.log('Data:', err.response.data);
                    console.log('Status:', err.response.status);
                    console.log('Headers:', err.response.headers);
                } else if (err.request) {
                    console.log('Request:', err.request);
                } else {
                    console.log('Error Message:', err.message);
                }
            });
    }; 

    const handleLogin = () => {
        axios.post('http://localhost:3001/auth/login', { username, password, role })
            .then(res => console.log(res))
            .catch(err => {
                console.log('Error:', err);
                if (err.response) {
                    console.log('Data:', err.response.data);
                    console.log('Status:', err.response.status);
                    console.log('Headers:', err.response.headers);
                } else if (err.request) {
                    console.log('Request:', err.request);
                } else {
                    console.log('Error Message:', err.message);
                }
            });
    };
    
    return (
        <div className='login-page'>
            <div className="login-container">
                <h2>{isLogin ? 'Login' : 'Sign Up'}</h2> <br />
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" placeholder="Enter Username"
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Role:</label>
                    <select name="role" id="role"
                        onChange={(e) => setRole(e.target.value)}>
                        <option value='admin'>Admin</option>
                        <option value='student'>Student</option>
                    </select>
                </div>
                <button className='btn-login' onClick={isLogin ? handleLogin : handleSignup}>
                    {isLogin ? 'Login' : 'Sign Up'}
                </button>
                <div className="toggle-link">
                    <a onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Login;
import React, { useState, useEffect } from "react"
import '../css/AddStudent.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


const AddStudent = ({role}) => {
    const [roll, setRoll] = useState('')
    const [username,setUsername] = useState('')
    const [batch,setBatch] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        if (role!=='' && role!=='admin') {
            navigate('/error')
        }
    }, [role])
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${import.meta.env.VITE_API_URL}/student/register`,{roll, email, username, batch, password})
        .then(res => { console.log(res)
            if(res.data.registered) {
                navigate('/dashboard')
            }
            console.log(res)
        })
        .catch(err => console.log(err))
       
    }

    return (role==='admin' && 
        <div className="student-form-container">
            <div className="student-form" >
                <h2>Add Student</h2> <br />
                <div className="form-group">
                    <label htmlFor='roll'>Roll No:</label>
                    <input type="text" id="roll" name="roll"
                    onChange={(e) => setRoll(e.target.value)}/>
                
                </div>
                <div className="form-group">
                    <label htmlFor='email'>Email:</label>
                    <input type="text" id="email" name="email"
                    onChange={(e) => setEmail(e.target.value)}/>
                
                </div>
                <div className="form-group">
                    <label htmlFor="username">User Name:</label>
                    <input type="text" id="username" name="username"
                    onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="batch">Batch:</label>
                    <input type="text" id="batch" name="batch"
                    onChange={(e) => setBatch(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password"
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>
 
                <button className="submit" onClick={handleSubmit}>Register</button>
            </div>
        </div>
    )
}

export default AddStudent
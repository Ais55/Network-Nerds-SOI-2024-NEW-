import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Students.css'
const Students = ({role}) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (role!=='' && role!=='admin') {
            navigate('/error')
        }
    }, [role])
    const [students, setStudents] = useState([])
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/student/get-students`);
                setStudents(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchStudents();
    }, []); // Added searchQuery as a dependency

    const handleEdit = (id) => {
        navigate(`/student/${id}`)
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/student/student/${id}`);
            const newStudents = students.filter(student => student._id !== id)
            setStudents(newStudents)
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="admin-students-list">
            <h1>Student List: </h1>
            {students.length ? (
                <ul className="admin-students">
                    {students.map((student) => (
                        <li key={student._id}>
                            <div className="student-details">
                                <div className="text-details">
                                    <p><strong>Roll:</strong> {student.roll}</p>
                                    <p><strong>Email:</strong> {student.email}</p>
                                    <p><strong>Batch:</strong> {student.batch}</p>
                                    <p><strong>Username:</strong> {student.username}</p>
                                    <div className="buttons-container">
                                        <button onClick={() => handleEdit(student._id)} className="edit-button">Edit</button>
                                        <button onClick={() => handleDelete(student._id)} className="delete-button">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>No Students currently.</div>
            )}
        </div>
    );
};

export default Students;
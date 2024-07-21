import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import Cookies from 'js-cookie';
import '../css/StudentDashboard.css'; // Ensure you have this CSS file
import {useNavigate} from 'react-router-dom'

const StudentDashboard = ({role}) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
      if (role!=='' && role!=='student') {
          navigate('/error')
      }
  }, [role])
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        // const studentId = Cookies.get('token');
        // // console.log('Fetched studentId from cookies:', studentId);
        // if (!studentId) {
        //   throw new Error("Student ID not found in cookies.");
        // }
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/student/students/`);
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (role==='student' &&
    <div className="student-dashboard">
      <div className='msg'>
        <div className="box">
          <div className='wlcm'>
            <img src="https://masterbundles.com/wp-content/uploads/2023/02/06-clipart-school-book-clipart-library-479.jpg" alt="Welcome" width='150px'/>
            <h1 id='heading'>Welcome, {student.username}!</h1>
            <p><strong>Roll:</strong> {student.roll}</p>
            <p><strong>Batch:</strong> {student.batch}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/student/studentdashboard'); // Adjust the URL as needed
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student data", error);
      }
    };

    fetchStudentData();
  }, []);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {student.username}!</h1>
      <p>Roll: {student.roll}</p>
      <p>Batch: {student.batch}</p>
    </div>
  );
};

export default StudentDashboard;

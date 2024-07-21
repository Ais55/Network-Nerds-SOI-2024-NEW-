// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Books from './components/Books';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddStudent from './components/AddStudent';
import Logout from './components/Logout';
import AddBook from './components/AddBook';
import { useState, useEffect } from 'react';
import axios from 'axios';
import EditBook from './components/EditBook';
import DeleteBook from './components/DeleteBook';
import BookHistory from './components/BookHistory';
import StudentDashboard from './components/StudentDashboard';
import AdminIssuedBooks from './components/AdminIssuedBooks';
import AdminBookRequests from './components/AdminBookRequests';
import ErrorPage from './components/ErrorPage'
import Students from './components/Students'
import EditStudent from './components/EditStudent';
function App() {
    const [role, setRole] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/auth/verify`)
            .then(res => {
                if (res.data.login) {
                    setRole(res.data.role);
                } else {
                    setRole('guest');
                }
                // console.log(res);
            }).catch(err => console.log(err));
    }, []);
    // console.log(role)
    return (
        <BrowserRouter>
            <Navbar role={role} onSearch={setSearchQuery} />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/books' element={<Books role={role} searchQuery={searchQuery} />} />
                <Route path='/login' element={<Login setRole={setRole} />} />
                <Route path='/dashboard' element={<Dashboard role={role}/>} />
                <Route path='/addstudent' element={<AddStudent role={role}/>} />
                <Route path='/logout' element={<Logout setRole={setRole} />} />
                <Route path='/addbook' element={<AddBook role={role}/>} />
                <Route path="/book/:id" element={<EditBook role={role}/>} />
                <Route path="/delete/:id" element={<DeleteBook role={role}/>} />
                <Route path='/studentdashboard' element={<StudentDashboard role={role}/>} />
                <Route path='/adminbookrequests' element={<AdminBookRequests role={role}/>} />
                <Route path='/bookhistory' element={<BookHistory role={role} />} />
                <Route path='/adminissuedbooks' element={<AdminIssuedBooks role={role}/>} />
                <Route path='/students' element={<Students role={role}/>} />
                <Route path='/student/:id' element={<EditStudent role={role}/>} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

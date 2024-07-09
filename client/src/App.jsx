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
import IssuedBook from './components/IssuedBook';
import StudentDashboard from './components/StudentDashboard';
import MyBooks from './components/MyBooks';

function App() {
    const [role, setRole] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3001/auth/verify')
            .then(res => {
                if (res.data.login) {
                    setRole(res.data.role);
                } else {
                    setRole('');
                }
                console.log(res);
            }).catch(err => console.log(err));
    }, []);

    return (
        <BrowserRouter>
            <Navbar role={role} onSearch={setSearchQuery} />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/books' element={<Books role={role} searchQuery={searchQuery} />} />
                <Route path='/login' element={<Login setRole={setRole} />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/addstudent' element={<AddStudent />} />
                <Route path='/logout' element={<Logout setRole={setRole} />} />
                <Route path='/addbook' element={<AddBook />} />
                <Route path="/book/:id" element={<EditBook />} />
                <Route path="/delete/:id" element={<DeleteBook />} />
                <Route path='/studentdashboard' element={<StudentDashboard />} />
                <Route path='/issuedbook' element={<IssuedBook />} />
                <Route path='/mybooks' element={<MyBooks />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

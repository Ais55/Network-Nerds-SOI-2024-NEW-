import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Books from './components/Books'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import AddStudent from './components/AddStudent'
import Logout from './components/Logout'
import AddBook from './components/AddBook'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import EditBook from './components/EditBook'

function App(){
    const [role, setRole] = useState('')

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3001/auth/verify')
        .then(res => {
            if(res.data.login) {
                setRole(res.data.role)
            } else {
                setRole('')
            }
            console.log(res)
        }).catch(err => console.log(err))
    }, [])
    return(
        <BrowserRouter>
        <Navbar role = {role} />
        <Routes>
            <Route path='/' element={<Home  />}></Route>
            <Route path='/books' element={<Books />}></Route>
            <Route path='/login' element={<Login setRole = {setRole} />}></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/addstudent' element={<AddStudent />}></Route>
            <Route path='/logout' element={<Logout setRole = {setRole} />}></Route>
            <Route path='/addbook' element={<AddBook />}></Route>
            <Route path="/book/:id" element={<EditBook/>}></Route>
        </Routes>
        </BrowserRouter>
    )
}

export default App
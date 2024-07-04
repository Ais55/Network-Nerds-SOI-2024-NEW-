import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Books from './components/Books'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import AddStudent from './components/AddStudent'
import Logout from './components/Logout'
import { useState } from 'react'

function App(){
    const [role, setRole] = useState('')
    return(
        <BrowserRouter>
        <Navbar role = {role} />
        <Routes>
            <Route path='/' element={<Home setRoleVar = {setRole} />}></Route>
            <Route path='/books' element={<Books />}></Route>
            <Route path='/login' element={<Login setRoleVar = {setRole} />}></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/addstudent' element={<AddStudent />}></Route>
            <Route path='/logout' element={<Logout setRoleVar = {setRole} />}></Route>
        </Routes>
        </BrowserRouter>
    )
}

export default App
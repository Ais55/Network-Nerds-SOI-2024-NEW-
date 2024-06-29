//import { useState } from 'react'
import React from 'react'
import Navbar from './navbar.jsx'
import Home from './home2.jsx'
import Login from './Login.jsx'
import Acad from './acad.jsx'
import NonAcad from './nonacad.jsx'

import {
   BrowserRouter as Router,
    Routes,
     Route
} from 'react-router-dom';
    


function App()
{
  return(
    <Router>
    <Navbar />
    <Routes>
      <Route exact path="/" element={<Home />} />
        <Route exact path="/books/academic" element={<Acad/>} />
        <Route exact path="/books/non-academic" element={<NonAcad/>} />
    
      <Route exact path="/login" element={<Login />} />
      
    </Routes>
  </Router>

  );
}   


export default App

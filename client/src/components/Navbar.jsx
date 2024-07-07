import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import '../css/Navbar.css';

const Navbar = ({ role, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const location = useLocation();

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value); // Notify parent component of search term change if needed
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log("Search term submitted: ", searchTerm);
        // Additional search handling logic if needed
    };

    // Check if current path is '/books' or the user is an admin or student
    const isBooksPage = location.pathname === "/books";
    const isAdmin = role === "admin";
    const isStudent = role === "student";

    return (
        <nav className='navbar'>
            <div className='navbar-left'>
                <Link to="/" className='navbar-brand'>My Library</Link>
            </div>
            <div className='navbar-right'>
                <Link to="/books" className='navbar-link'>Books</Link>
                
                {isAdmin &&  (
                    <>
                        <Link to="/addbook" className="navbar-link">Add Book</Link>
                        <Link to="/addstudent" className="navbar-link">Add Student</Link>
                        <Link to="/dashboard" className="navbar-link">Dashboard</Link>
                        { isBooksPage && (
                            <div className="navbar-search-form">
                                <input 
                                    type="text" 
                                    className="navbar-search-input" 
                                    placeholder="Search by BookID, Title, Author, Dept.." 
                                    value={searchTerm} 
                                    onChange={handleSearchChange} 
                                />
                                <button type="submit" className="navbar-search-button" onClick={handleSearchSubmit}>Search</button>
                            </div>
                        )}
                    </>
                )}
                {isStudent && (
                    <>
                        <Link to="/issuedbook" className="navbar-link">My books</Link>
                        { isBooksPage && (
                            <div className="navbar-search-form">
                                <input 
                                    type="text" 
                                    className="navbar-search-input" 
                                    placeholder="Search by BookID, Title, Author, Dept.." 
                                    value={searchTerm} 
                                    onChange={handleSearchChange} 
                                />
                                <button type="submit" className="navbar-search-button" onClick={handleSearchSubmit}>Search</button>
                            </div>
                        )}
                    </>
                )}
                {role === "" ? 
                    <Link to="/login" className='navbar-link'>Login</Link>
                 : 
                    <Link to="/logout" className='navbar-link'>Logout</Link>
                }
            </div>
        </nav>
    );
}

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.css';

function Navbar() {
  return (
    <>
    <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/"><h2>My Library</h2></Link>
        </div>

        <div>
          <ul className="navbar-links">
            <li><h2>Books</h2>
              <div className="dropdown">
                <ul>
                  <li><Link to="/books/academic"><h2>Academic</h2></Link></li>
                  <li><Link to="/books/non-academic"><h2>Non-Academic</h2></Link></li>
                </ul>

              </div>
            </li>
            <li><Link to="/login"><h2>Login</h2></Link></li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
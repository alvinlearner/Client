// NavBar.jsx
import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { logo } from '../assets';
import './navbar.css'

const NavBar = () => {
  const { admin, logout } = useAuth();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(true);
  };

  // Check if the current route is the login page
  const isLoginPage = location.pathname === '/';

  // Render the NavBar only if the user is logged in and not on the login page
  // if (!admin || isLoginPage) {  NORMAL NAVBAR FUNCTION
  if (!admin || isLoginPage) {
    return null;
  }

  return (
    <nav className="bg-gray-800 p-4 mb-4 bg-opacity-60">
      <div className="container flex justify-between items-center relative">
        {/* Brand/logo */}
        <Link to="/" className="text-white text-xl font-bold">
          <img src={logo} alt='logo' style={{ width: 36 }} />
        </Link>
  
        {/* Hamburger menu for smaller screens */}
        <div className="md:hidden">
          <button className="text-white" onClick={toggleNav}>
            &#9776; {/* Hamburger icon */}
          </button>
          {isNavOpen && (
            <div className="absolute top-full right-1 bg-gray-800 bg-opacity-60 p-4 mt-5 space-y-2">
              <NavLink
                to="/dashboard"
                className="cursor-pointer flex items-center fill-lime-400 bg-blue-950 hover:bg-blue-900 active:border active:border-blue-400 rounded-md duration-100 p-2 text-sm text-gray-100 font-bold pr-1"
                activeClassName="border-b-2 border-white"
                onClick={closeNav}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/motor"
                className="cursor-pointer flex items-center fill-lime-400 bg-blue-950 hover:bg-blue-900 active:border active:border-blue-400 rounded-md duration-100 p-2 text-sm text-gray-100 font-bold pr-1"
                activeClassName="border-b-2 border-white"
                onClick={closeNav}
              >
                Motor
              </NavLink>
              <NavLink
                to="/client"
                className="cursor-pointer flex items-center fill-lime-400 bg-blue-950 hover:bg-blue-900 active:border active:border-blue-400 rounded-md duration-100 p-2 text-sm text-gray-100 font-bold pr-1"
                activeClassName="border-b-2 border-white"
                onClick={closeNav}
              >
                Client
              </NavLink>
              {/* Logout button */}
              <button className="cursor-pointer flex items-center fill-lime-400 bg-red-900 hover:bg-red-600 active:border active:border-blue-400 rounded-md duration-100 p-2 text-sm text-gray-100 font-bold pr-1" onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </div>
  
        {/* Navigation links */}
        <div className="hidden md:flex md:items-center space-x-4 ml-auto"> {/* Remove mx-auto */}
          <NavLink
            to="/dashboard"
            className="text-white hover:text-blue-400"
            activeClassName="border-b-2 border-white"
            onClick={closeNav}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/motor"
            className="text-white hover:text-blue-400"
            activeClassName="border-b-2 border-white"
            onClick={closeNav}
          >
            Motor
          </NavLink>
          <NavLink
            to="/client"
            className="text-white hover:text-blue-400"
            activeClassName="border-b-2 border-white"
            onClick={closeNav}
          >
            Client
          </NavLink>
          {/* <NavLink
            to="/client-policies"
            className="text-white hover:text-blue-400"
            activeClassName="border-b-2 border-white"
            onClick={closeNav}
          >
            Client Policies
          </NavLink> */}
          <button className="Btn" onClick={logout}>
            <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
            <div className="text">Logout</div>
          </button>
        </div>
      </div>
    </nav>
  );
  
  
};

export default NavBar;

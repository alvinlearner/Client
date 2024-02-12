// NavBar.jsx
import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { logo } from '../assets';
import './navbar.css'
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/solid';




const NavBar = () => {
  const { admin, logout } = useAuth();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  // Check if the current route is the login page
  const isLoginPage = location.pathname === '/';

  // Render the NavBar only if the user is logged in and not on the login page
  // if (!admin || isLoginPage) {  NORMAL NAVBAR FUNCTION
  if (!admin || isLoginPage) {
    return null;
  }

  return (
    <nav className="  bg-gray-800  w-full p-4 mb-4 bg-opacity-60">
      <div className="container flex justify-between items-center relative">
        {/* Brand/logo */}
        <Link to="/dashboard" className="text-white text-xl font-bold">
          <img src={logo} alt='logo' style={{ width: 36 }} />

        </Link>
  
        {/* Hamburger menu for smaller screens */}
        <div className="md:hidden">
          <button className="text-white" onClick={toggleNav}>
            &#9776; {/* Hamburger icon */}
          </button>
          {isNavOpen && (
            <div className="absolute top-full right-1 bg-gray-800 bg-opacity-60 p-4 mt-5 space-y-2">
              {/* <NavLink
                to="/dashboard"
                className="cursor-pointer flex items-center fill-lime-400 bg-blue-950 hover:bg-blue-900 active:border active:border-blue-400 rounded-md duration-100 p-2 text-sm text-gray-100 font-bold pr-1"
               activeclassname="border-b-2 border-white"
                onClick={closeNav}
              >
                Dashboard
              </NavLink> */}
              <NavLink
                to="/motor"
                className="cursor-pointer flex items-center fill-lime-400 bg-blue-950 hover:bg-blue-900 active:border active:border-blue-400 rounded-md duration-100 p-2 text-sm text-gray-100 font-bold pr-1"
               activeclassname="border-b-2 border-white"
                onClick={closeNav}
              >
                Motor
              </NavLink>

              {/* <NavLink
                to="/client"
                className="cursor-pointer flex items-center fill-lime-400 bg-blue-950 hover:bg-blue-900 active:border active:border-blue-400 rounded-md duration-100 p-2 text-sm text-gray-100 font-bold pr-1"
               activeclassname="border-b-2 border-white"
                onClick={closeNav}
              >
                Client
              </NavLink> */}
              {/* <NavLink
                to="/companies"
                className="cursor-pointer flex items-center fill-lime-400 bg-blue-950 hover:bg-blue-900 active:border active:border-blue-400 rounded-md duration-100 p-2 text-sm text-gray-100 font-bold pr-1"
               activeclassname="border-b-2 border-white"
                onClick={closeNav}
              >
                Companies
              </NavLink> */}
              {/* Logout button */}
              <button className="cursor-pointer flex items-center fill-lime-400 bg-red-900 hover:bg-red-600 active:border active:border-blue-400 rounded-md duration-100 p-2 text-sm text-gray-100 font-bold pr-1" onClick={logout}>
                Logout
              </button>
             
            </div>
          )}
        </div>
  
        {/* Navigation links */}
        <div className="hidden md:flex md:items-center space-x-5 ml-auto"> {/* Remove mx-auto */}
          {/* <NavLink
            to="/dashboard"
            className="text-white hover:text-blue-400"
           activeclassname="border-b-2 border-white"
            onClick={closeNav}
          >
            Dashboard
          </NavLink> */}
          <NavLink
            to="/motor"
            className="text-white hover:text-blue-400 font-semibold "
           activeclassname="border-b-2 border-white"
            onClick={closeNav}
          >
            Motor
          </NavLink>
          {/* <NavLink
            to="/client"
            className="text-white hover:text-blue-400"
           activeclassname="border-b-2 border-white"
            onClick={closeNav}
          >
            Client
          </NavLink> */}
          {/* <NavLink
            to="/companies"
            className="text-white hover:text-blue-400"
           activeclassname="border-b-2 border-white"
            onClick={closeNav}
          >
            Companies
          </NavLink> */}


          {/* <button onClick={logout} className="bg-transparent hover:bg-red-500 text-white font-semibold hover:text-white py-1 px-2 border border-gray-500 hover:border-transparent rounded">
              Logout
          </button> */}

          <ArrowRightEndOnRectangleIcon onClick={logout} className="h-8 w-8 text-white hover:text-red-500 mr-1" />



        </div>
      </div>
    </nav>
  );
  
  
};

export default NavBar;

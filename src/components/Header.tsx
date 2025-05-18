// src/components/Header.tsx
import React, { useState } from 'react';
import { FaBell, FaHome, FaPaperPlane, FaGift, FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-white shadow-md px-4 py-3 flex items-center justify-between">
      {/* Left Logo */}
      <div className="text-xl font-bold text-blue-600">
        MyApp
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center space-x-6">
      
        {/* Links */}
        <nav className="flex items-center space-x-4 text-gray-700 font-medium">
   <Link to="/" className="hover:text-blue-600">Home</Link>
  <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
  <Link to="/transactions" className="hover:text-blue-600">Transactions</Link>
  <Link to="/reports" className="hover:text-blue-600">Reports</Link>
</nav>

          {/* Profile */}
        <FaUserCircle className="text-2xl text-gray-700 cursor-pointer" />

        {/* Bell */}
        <FaBell className="text-2xl text-gray-700 cursor-pointer" />

      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden z-10 p-4 space-y-4">
          <div className="flex items-center space-x-4">
            <FaUserCircle className="text-2xl text-gray-700" />
            <FaBell className="text-2xl text-gray-700" />
          </div>
         <nav className="flex flex-col space-y-2 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
  <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
  <Link to="/transactions" className="hover:text-blue-600">Transactions</Link>
  <Link to="/reports" className="hover:text-blue-600">Reports</Link>
</nav>

        </div>
      )}
    </header>
  );
};

export default Header;

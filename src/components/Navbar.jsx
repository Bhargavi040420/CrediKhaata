import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white dark:bg-gray-900">
      <h1 className="text-xl font-bold">CrediKhaata</h1>

      <div className="flex items-center gap-4">
        

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;











import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Menu, X, LogOut, User, Map, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import NotificationDropdown from '../notifications/NotificationDropdown';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleNotifications = () => setIsNotificationsOpen(!isNotificationsOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <span className="text-xl font-bold text-gray-800">Disaster<span className="text-red-600">SOS</span></span>
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-gray-700 hover:text-red-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="nav-link text-gray-700 hover:text-red-600">Home</Link>
            
            {user ? (
              <>
                {user.role === 'user' && (
                  <>
                    <Link to="/user/dashboard" className="nav-link text-gray-700 hover:text-red-600">Dashboard</Link>
                    <Link to="/report-disaster" className="nav-link text-gray-700 hover:text-red-600">Report Disaster</Link>
                  </>
                )}
                
                {user.role === 'volunteer' && (
                  <Link to="/volunteer/dashboard" className="nav-link text-gray-700 hover:text-red-600">Dashboard</Link>
                )}
                
                <div className="relative">
                  <button
                    onClick={toggleNotifications}
                    className="text-gray-700 hover:text-red-600 focus:outline-none relative"
                  >
                    <Bell size={20} />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </button>
                  
                  {isNotificationsOpen && <NotificationDropdown onClose={() => setIsNotificationsOpen(false)} />}
                </div>
                
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-red-600 focus:outline-none">
                    <User size={20} />
                    <span>{user.name}</span>
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 hidden group-hover:block">
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link text-gray-700 hover:text-red-600">Login</Link>
                <Link to="/register" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300">Register</Link>
              </>
            )}
          </nav>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-2 border-t">
            <ul className="space-y-2">
              <li>
                <Link to="/" className="block py-2 text-gray-700 hover:text-red-600" onClick={() => setIsMenuOpen(false)}>Home</Link>
              </li>
              
              {user ? (
                <>
                  {user.role === 'user' && (
                    <>
                      <li>
                        <Link to="/user/dashboard" className="block py-2 text-gray-700 hover:text-red-600" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                      </li>
                      <li>
                        <Link to="/report-disaster" className="block py-2 text-gray-700 hover:text-red-600" onClick={() => setIsMenuOpen(false)}>Report Disaster</Link>
                      </li>
                    </>
                  )}
                  
                  {user.role === 'volunteer' && (
                    <li>
                      <Link to="/volunteer/dashboard" className="block py-2 text-gray-700 hover:text-red-600" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                    </li>
                  )}
                  
                  <li>
                    <Link to="/profile" className="block py-2 text-gray-700 hover:text-red-600" onClick={() => setIsMenuOpen(false)}>
                      <div className="flex items-center space-x-2">
                        <User size={18} />
                        <span>Profile</span>
                      </div>
                    </Link>
                  </li>
                  
                  <li>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full text-left py-2 text-gray-700 hover:text-red-600"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="block py-2 text-gray-700 hover:text-red-600" onClick={() => setIsMenuOpen(false)}>Login</Link>
                  </li>
                  <li>
                    <Link to="/register" className="block py-2 text-gray-700 hover:text-red-600" onClick={() => setIsMenuOpen(false)}>Register</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
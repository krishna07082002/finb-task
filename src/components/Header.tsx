import React, { useState } from 'react';
import { FaBell, FaBars, FaTimes, FaUserCircle, FaExclamationTriangle, FaInfoCircle, FaLightbulb } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface Notification {
  id: string;
  type: 'alert' | 'tip' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'alert',
      title: 'Overspending Alert',
      message: 'You\'ve exceeded your food budget by ₹2,500 this month',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: false
    },
    {
      id: '2',
      type: 'alert',
      title: 'Salary Not Received',
      message: 'Your expected salary hasn\'t been received yet',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      isRead: false
    },
    {
      id: '3',
      type: 'tip',
      title: 'Budget Tip',
      message: 'Consider setting up automatic transfers to your savings account',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      isRead: true
    },
    {
      id: '4',
      type: 'info',
      title: 'Monthly Insight',
      message: 'You saved 15% more than last month. Great job!',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      isRead: false
    }
  ]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleNotifications = () => setShowNotifications(!showNotifications);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <FaExclamationTriangle className="text-red-500" />;
      case 'tip':
        return <FaLightbulb className="text-yellow-500" />;
      case 'info':
        return <FaInfoCircle className="text-blue-500" />;
      default:
        return <FaInfoCircle className="text-gray-500" />;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  return (
    <header className="bg-white shadow-md px-4 py-3 flex items-center justify-between relative">
    
<div className="flex items-center space-x-2">
  <img
    src="https://finb.tech/_next/static/media/FINB_LOGO.3861d3c8.svg"
    alt="FINB Logo"
    className="h-8 w-auto"
  />

  <img
    src="https://finb.tech/_next/static/media/FINB_TEXT_LOGO.4055e333.svg"
    alt="Secondary Logo"
    className="h-5 w-auto"
  />
</div>



      {/* Desktop Nav */}
      <div className="hidden md:flex items-center space-x-6">
        <nav className="flex items-center space-x-4 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
          <Link to="/transactions" className="hover:text-blue-600">Transactions</Link>
          <Link to="/reports" className="hover:text-blue-600">Reports</Link>
        </nav>

        <FaUserCircle className="text-2xl text-gray-700 cursor-pointer hover:text-blue-600" />

        <div className="relative">
          <button onClick={toggleNotifications} className="relative">
            <FaBell className="text-2xl text-gray-700 cursor-pointer hover:text-blue-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-96 overflow-y-auto">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">Notifications & Tips</h3>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              <div className="max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No notifications yet
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                        !notification.isRead ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-gray-800 text-sm">
                              {notification.title}
                            </h4>
                            <span className="text-xs text-gray-500 ml-2">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden z-10 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FaUserCircle className="text-2xl text-gray-700" />
              <div className="relative">
                <button onClick={toggleNotifications}>
                  <FaBell className="text-2xl text-gray-700" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          <nav className="flex flex-col space-y-2 text-gray-700 font-medium">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
            <Link to="/transactions" className="hover:text-blue-600">Transactions</Link>
            <Link to="/reports" className="hover:text-blue-600">Reports</Link>
          </nav>

          {showNotifications && (
            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-800 mb-3">Recent Notifications</h4>
              <div className="space-y-3 max-h-40 overflow-y-auto">
                {notifications.slice(0, 3).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border ${
                      !notification.isRead ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-2">
                      {getNotificationIcon(notification.type)}
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {showNotifications && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowNotifications(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;
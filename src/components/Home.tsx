import React, { useState } from 'react';
import { 
  FiUsers, 
  FiCreditCard, 
  FiUserPlus, 
  FiZap, 
  FiList, 
  FiDollarSign,
  FiHelpCircle,
  FiMenu,
  FiX,
  FiArrowUpRight,
  FiDownload,
  FiShoppingBag,
  FiTrendingUp
} from 'react-icons/fi';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarItems = [
    {
      id: 'accounts',
      icon: FiUsers,
      title: 'Accounts',
      subtitle: '2 accounts',
      bgColor: 'bg-gray-50'
    },
    {
      id: 'debit-card',
      icon: FiCreditCard,
      title: 'Debit card',
      subtitle: 'Mastercard ending in 1234',
      bgColor: 'bg-gray-50'
    },
    {
      id: 'invite-friends',
      icon: FiUserPlus,
      title: 'Invite friends',
      subtitle: 'Get $5 when you sign up',
      bgColor: 'bg-gray-50'
    },
    {
      id: 'boosts',
      icon: FiZap,
      title: 'Boosts',
      subtitle: 'Get early access to direct deposit',
      bgColor: 'bg-gray-50'
    },
    {
      id: 'activity',
      icon: FiList,
      title: 'Activity',
      subtitle: 'See your recent transactions',
      bgColor: 'bg-gray-50'
    },
    {
      id: 'cash',
      icon: FiDollarSign,
      title: 'Cash',
      subtitle: 'Add cash to your balance',
      bgColor: 'bg-gray-50'
    },
    {
      id: 'help',
      icon: FiHelpCircle,
      title: 'Help',
      subtitle: 'Support available 24/7',
      bgColor: 'bg-gray-50'
    }
  ];

  const recentTransactions = [
    {
      id: 1,
      type: 'Transfer',
      date: 'Jan 23, 2023',
      time: '9:41 PM',
      amount: '$250',
      icon: FiArrowUpRight,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      id: 2,
      type: 'Deposit',
      date: 'Jan 21, 2023',
      time: '11:21 AM',
      amount: '$2,500',
      icon: FiDownload,
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      id: 3,
      type: 'Groceries',
      date: 'Jan 19, 2023',
      time: '3:16 PM',
      amount: '$50',
      icon: FiShoppingBag,
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    {
      id: 4,
      type: 'Paycheck',
      date: 'Jan 18, 2023',
      time: '8:45 AM',
      amount: '$1,500',
      icon: FiTrendingUp,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-14 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        transition-transform duration-300 ease-in-out
        w-80 h-full overflow-y-auto
      `}>
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Quick actions</h2>
          
          <nav className="space-y-3">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  className={`
                    w-full flex items-center p-3 rounded-lg
                    hover:bg-gray-100 transition-colors duration-200
                    text-left group
                  `}
                >
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-lg mr-3
                    ${item.bgColor} group-hover:bg-gray-200 transition-colors duration-200
                  `}>
                    <IconComponent 
                      className="text-gray-600 group-hover:text-gray-800" 
                      size={20} 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {item.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0 ml-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8 mt-12 lg:mt-0">
            <h1 className="text-3xl font-semibold text-gray-900">Good evening, Adam</h1>
          </div>

          {/* Balance Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Spendable Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Spendable</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">$2,500</span>
                <span className="text-sm font-medium text-red-500">-15%</span>
              </div>
            </div>

            {/* Total Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Total</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">$2,500</span>
                <span className="text-sm font-medium text-red-500">-15%</span>
              </div>
            </div>
          </div>

          {/* Referral Bonus Banner */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  You're eligible for a $10 referral bonus
                </p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Learn more
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent activity</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {recentTransactions.map((transaction) => {
                const IconComponent = transaction.icon;
                return (
                  <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`
                          flex items-center justify-center w-10 h-10 rounded-lg mr-4
                          ${transaction.iconBg}
                        `}>
                          <IconComponent 
                            className={transaction.iconColor} 
                            size={20} 
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {transaction.type}
                          </p>
                          <p className="text-xs text-gray-500">
                            {transaction.date} • {transaction.time}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">
                          {transaction.amount}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
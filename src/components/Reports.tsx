import React, { useState } from 'react';
import { 
  FaHome, 
  FaUtensils, 
  FaCar, 
  FaHeartbeat, 
  FaShoppingCart, 
  FaPlane, 
  FaGamepad 
} from 'react-icons/fa';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('This month');

  const tabs = ['Last month', 'This month', 'Last 3 months'];

  // Different data for each time period
  const spendingDataByPeriod = {
    'Last month': {
      data: [
        { category: 'Home', amount: 920, icon: FaHome },
        { category: 'Food & Dining', amount: 580, icon: FaUtensils },
        { category: 'Auto & Transport', amount: 1350, icon: FaCar },
        { category: 'Health & Fitness', amount: 380, icon: FaHeartbeat },
        { category: 'Shopping', amount: 820, icon: FaShoppingCart },
        { category: 'Travel', amount: 650, icon: FaPlane },
        { category: 'Entertainment', amount: 450, icon: FaGamepad },
      ],
      comparison: { value: '+12.5%', type: 'increase', vs: 'vs Previous Month' },
      insights: {
        highest: 'Auto & Transport',
        trend: 'Higher spending on transportation',
        categories: 7
      }
    },
    'This month': {
      data: [
        { category: 'Home', amount: 850, icon: FaHome },
        { category: 'Food & Dining', amount: 650, icon: FaUtensils },
        { category: 'Auto & Transport', amount: 1200, icon: FaCar },
        { category: 'Health & Fitness', amount: 450, icon: FaHeartbeat },
        { category: 'Shopping', amount: 750, icon: FaShoppingCart },
        { category: 'Travel', amount: 900, icon: FaPlane },
        { category: 'Entertainment', amount: 300, icon: FaGamepad },
      ],
      comparison: { value: '-8.2%', type: 'decrease', vs: 'vs Last Month' },
      insights: {
        highest: 'Auto & Transport',
        trend: 'Reduced overall spending',
        categories: 7
      }
    },
    'Last 3 months': {
      data: [
        { category: 'Home', amount: 2650, icon: FaHome },
        { category: 'Food & Dining', amount: 1950, icon: FaUtensils },
        { category: 'Auto & Transport', amount: 3800, icon: FaCar },
        { category: 'Health & Fitness', amount: 1280, icon: FaHeartbeat },
        { category: 'Shopping', amount: 2400, icon: FaShoppingCart },
        { category: 'Travel', amount: 2200, icon: FaPlane },
        { category: 'Entertainment', amount: 980, icon: FaGamepad },
      ],
      comparison: { value: '+5.7%', type: 'increase', vs: 'vs Previous Quarter' },
      insights: {
        highest: 'Auto & Transport',
        trend: 'Consistent spending pattern',
        categories: 7
      }
    }
  };

  const currentData = spendingDataByPeriod[activeTab];
  const maxAmount = Math.max(...currentData.data.map(item => item.amount));
  const totalSpending = currentData.data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
          Spending Report
        </h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-blue-500 text-white shadow-md transform scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-blue-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentData.comparison.type === 'decrease' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <span className={`font-bold ${
                  currentData.comparison.type === 'decrease' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {currentData.comparison.type === 'decrease' ? '↓' : '↑'}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">{currentData.comparison.vs}</p>
                <p className={`text-lg font-semibold ${
                  currentData.comparison.type === 'decrease' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {currentData.comparison.value}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">#</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-lg font-semibold text-gray-900">
                  ${totalSpending.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold">★</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Highest Category</p>
                <p className="text-lg font-semibold text-gray-900">{currentData.insights.highest}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Spending Categories Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Spending Categories
            </h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {activeTab}
            </span>
          </div>

          <div className="space-y-6">
            {currentData.data.map((item, index) => {
              const IconComponent = item.icon;
              const barWidth = (item.amount / maxAmount) * 100;
              const percentage = ((item.amount / totalSpending) * 100).toFixed(1);

              return (
                <div key={index} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center text-blue-500 group-hover:text-blue-600 transition-colors">
                        <IconComponent size={20} />
                      </div>
                      <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
                        {item.category}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-900 font-semibold block">
                        ${item.amount.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-500">
                        {percentage}% of total
                      </span>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all duration-700 ease-out group-hover:from-blue-500 group-hover:to-blue-700 group-hover:shadow-lg"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-semibold text-gray-700">
                Total Spending ({activeTab})
              </span>
              <span className="text-2xl font-bold text-gray-900">
                ${totalSpending.toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {currentData.insights.trend} • {currentData.insights.categories} categories tracked
            </p>
          </div>
        </div>

        {/* Period Insights */}
        <div className="mt-6 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Period Insights
          </h3>
          <p className="text-blue-800">
            {activeTab === 'Last month' && 
              "Your transportation costs were higher than usual last month. Consider reviewing your commute options or travel frequency."
            }
            {activeTab === 'This month' && 
              "Great job reducing your spending this month! You saved the most on entertainment and auto expenses."
            }
            {activeTab === 'Last 3 months' && 
              "Your spending pattern shows consistency across categories. Auto & Transport remains your largest expense, followed by Shopping and Home expenses."
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
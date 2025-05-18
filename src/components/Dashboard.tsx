// Dashboard.tsx

import React, { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import {
  FiTrendingUp, FiTrendingDown, FiDollarSign, FiTarget
} from 'react-icons/fi';
import { FaPiggyBank } from 'react-icons/fa';
import { AiOutlineCreditCard } from 'react-icons/ai';

const Dashboard = () => {
  const [selectedView, setSelectedView] = useState<'monthly' | 'quarterly' | 'ytd'>('monthly');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const netWorthData = [
    { month: 'Jan', value: 8500 }, { month: 'Feb', value: 11200 },
    { month: 'Mar', value: 9800 }, { month: 'Apr', value: 10500 },
    { month: 'May', value: 12800 }, { month: 'Jun', value: 15600 },
    { month: 'Jul', value: 12345.67 }
  ];

  const incomeExpensesData = [
    { month: 'Jan', income: 7890, expenses: 3200 },
    { month: 'Feb', income: 7890, expenses: 3800 },
    { month: 'Mar', income: 7890, expenses: 3100 },
    { month: 'Apr', income: 7890, expenses: 3600 },
    { month: 'May', income: 7890, expenses: 3900 },
    { month: 'Jun', income: 7890, expenses: 3300 },
    { month: 'Jul', income: 7890, expenses: 3456.78 }
  ];

  const categoryData = {
    topLevel: [
      { name: 'Housing', value: 1200, color: '#8884d8', key: 'housing' },
      { name: 'Food', value: 650, color: '#82ca9d', key: 'food' },
      { name: 'Transportation', value: 400, color: '#ffc658', key: 'transport' },
      { name: 'Utilities', value: 300, color: '#ff7300', key: 'utilities' },
      { name: 'Entertainment', value: 250, color: '#00ff88', key: 'entertainment' },
      { name: 'Others', value: 656.78, color: '#0088fe', key: 'others' }
    ],
    subcategories: {
      food: [
        { name: 'Groceries', value: 400, color: '#82ca9d' },
        { name: 'Dining Out', value: 250, color: '#66bb6a' }
      ],
      entertainment: [
        { name: 'Movies', value: 150, color: '#00ff88' },
        { name: 'Games', value: 100, color: '#00cc66' }
      ]
    }
  };

  const savingsGoals = [
    { goal: 'Emergency Fund', current: 5000, target: 10000, color: '#8884d8' },
    { goal: 'Vacation', current: 2500, target: 4000, color: '#82ca9d' },
    { goal: 'New Car', current: 8000, target: 15000, color: '#ffc658' },
    { goal: 'Investment', current: 3000, target: 5000, color: '#ff7300' }
  ];

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  const formatPercentage = (value: number) => `${value.toFixed(1)}%`;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload?.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Your current financial overview</p>
        </div>

        {/* View Toggle */}
        <div className="flex justify-end mb-4">
          {['monthly', 'quarterly', 'ytd'].map((view) => (
            <button
              key={view}
              className={`px-3 py-1 text-sm rounded-md border ${
                selectedView === view
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
              onClick={() => setSelectedView(view as any)}
            >
              {view.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Total Balance', icon: <FiDollarSign className="text-green-600" />, value: 12345.67, change: 12.5, isUp: true },
            { title: 'Monthly Income', icon: <FiTrendingUp className="text-blue-600" />, value: 7890.12, change: 3.2, isUp: true },
            { title: 'Monthly Expenses', icon: <AiOutlineCreditCard className="text-red-600" />, value: 3456.78, change: -2.1, isUp: false },
            { title: 'Savings Ratio', icon: <FaPiggyBank className="text-purple-600" />, value: 0.56, change: 5.4, isUp: true, isPercent: true }
          ].map((card, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">{card.title}</h3>
                {card.icon}
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  {card.isPercent ? `${(card.value * 100).toFixed(0)}%` : formatCurrency(card.value)}
                </span>
                <span className={`${card.isUp ? 'text-green-600' : 'text-red-600'} text-sm flex items-center`}>
                  {card.isUp ? <FiTrendingUp className="mr-1" /> : <FiTrendingDown className="mr-1" />}
                  {card.change}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Net Worth Chart */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Net Worth over Time</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={netWorthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Income vs Expenses Chart */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Income vs Expenses</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={incomeExpensesData}>
                  <defs>
                    <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="income" stroke="#10b981" fill="url(#income)" />
                  <Area type="monotone" dataKey="expenses" stroke="#ef4444" fill="url(#expenses)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Pie Chart Section */}
        <div className="bg-white p-6 rounded-lg border shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Spending Categories</h2>
          <div className="flex flex-col md:flex-row items-center">
            <div className="h-64 w-full md:w-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={activeCategory ? categoryData.subcategories[activeCategory] : categoryData.topLevel}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    onClick={(data, idx) => {
                      const key = categoryData.topLevel[idx]?.key;
                      if (categoryData.subcategories[key]) setActiveCategory(key);
                    }}
                  >
                    {(activeCategory
                      ? categoryData.subcategories[activeCategory]
                      : categoryData.topLevel
                    ).map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 mt-6 md:mt-0 md:ml-6">
              {(activeCategory
                ? categoryData.subcategories[activeCategory]
                : categoryData.topLevel
              ).map((entry, i) => (
                <div key={i} className="flex justify-between py-2">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full" style={{ backgroundColor: entry.color }}></span>
                    <span className="text-sm">{entry.name}</span>
                  </div>
                  <span className="text-sm font-medium">{formatCurrency(entry.value)}</span>
                </div>
              ))}
              {activeCategory && (
                <button
                  onClick={() => setActiveCategory(null)}
                  className="text-blue-600 text-sm mt-3 underline"
                >
                  ← Back to main categories
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

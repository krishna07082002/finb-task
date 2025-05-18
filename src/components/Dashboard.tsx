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

  // Monthly Data
  const monthlyData = {
    netWorth: [
      { period: 'Jan', value: 8500 },
      { period: 'Feb', value: 11200 },
      { period: 'Mar', value: 9800 },
      { period: 'Apr', value: 10500 },
      { period: 'May', value: 12800 },
      { period: 'Jun', value: 15600 },
      { period: 'Jul', value: 17345 }
    ],
    incomeExpenses: [
      { period: 'Jan', income: 7890, expenses: 3200 },
      { period: 'Feb', income: 7890, expenses: 3800 },
      { period: 'Mar', income: 7890, expenses: 3100 },
      { period: 'Apr', income: 7890, expenses: 3600 },
      { period: 'May', income: 7890, expenses: 3900 },
      { period: 'Jun', income: 7890, expenses: 3300 },
      { period: 'Jul', income: 7890, expenses: 3456 }
    ],
    categoryData: {
      topLevel: [
        { name: 'Housing', value: 1200, color: '#8884d8', key: 'housing' },
        { name: 'Food', value: 650, color: '#82ca9d', key: 'food' },
        { name: 'Transportation', value: 400, color: '#ffc658', key: 'transport' },
        { name: 'Utilities', value: 300, color: '#ff7300', key: 'utilities' },
        { name: 'Entertainment', value: 250, color: '#00ff88', key: 'entertainment' },
        { name: 'Others', value: 656, color: '#0088fe', key: 'others' }
      ],
      subcategories: {
        food: [
          { name: 'Groceries', value: 400, color: '#82ca9d' },
          { name: 'Dining Out', value: 250, color: '#66bb6a' }
        ],
        entertainment: [
          { name: 'Movies', value: 150, color: '#00ff88' },
          { name: 'Games', value: 100, color: '#00cc66' }
        ],
        housing: [
          { name: 'Rent', value: 800, color: '#8884d8' },
          { name: 'Maintenance', value: 400, color: '#7773d8' }
        ],
        transport: [
          { name: 'Gas', value: 200, color: '#ffc658' },
          { name: 'Maintenance', value: 120, color: '#ffb528' },
          { name: 'Insurance', value: 80, color: '#ff9f00' }
        ]
      }
    },
    cards: {
      totalBalance: { value: 17345, change: 12.5, isUp: true },
      monthlyIncome: { value: 7890, change: 3.2, isUp: true },
      monthlyExpenses: { value: 3456, change: -2.1, isUp: false },
      savingsRatio: { value: 0.56, change: 5.4, isUp: true }
    }
  };

  // Quarterly Data
  const quarterlyData = {
    netWorth: [
      { period: 'Q1 2024', value: 29500 },
      { period: 'Q2 2024', value: 38900 },
      { period: 'Q3 2024', value: 45600 },
      { period: 'Q4 2024', value: 52100 }
    ],
    incomeExpenses: [
      { period: 'Q1 2024', income: 23670, expenses: 9100 },
      { period: 'Q2 2024', income: 23670, expenses: 10800 },
      { period: 'Q3 2024', income: 23670, expenses: 11700 },
      { period: 'Q4 2024', income: 23670, expenses: 10368 }
    ],
    categoryData: {
      topLevel: [
        { name: 'Housing', value: 3600, color: '#8884d8', key: 'housing' },
        { name: 'Food', value: 1950, color: '#82ca9d', key: 'food' },
        { name: 'Transportation', value: 1200, color: '#ffc658', key: 'transport' },
        { name: 'Utilities', value: 900, color: '#ff7300', key: 'utilities' },
        { name: 'Entertainment', value: 750, color: '#00ff88', key: 'entertainment' },
        { name: 'Others', value: 1968, color: '#0088fe', key: 'others' }
      ],
      subcategories: {
        food: [
          { name: 'Groceries', value: 1200, color: '#82ca9d' },
          { name: 'Dining Out', value: 750, color: '#66bb6a' }
        ],
        entertainment: [
          { name: 'Movies', value: 450, color: '#00ff88' },
          { name: 'Games', value: 300, color: '#00cc66' }
        ],
        housing: [
          { name: 'Rent', value: 2400, color: '#8884d8' },
          { name: 'Maintenance', value: 1200, color: '#7773d8' }
        ],
        transport: [
          { name: 'Gas', value: 600, color: '#ffc658' },
          { name: 'Maintenance', value: 360, color: '#ffb528' },
          { name: 'Insurance', value: 240, color: '#ff9f00' }
        ]
      }
    },
    cards: {
      totalBalance: { value: 52100, change: 15.8, isUp: true },
      monthlyIncome: { value: 23670, change: 4.7, isUp: true },
      monthlyExpenses: { value: 10368, change: -1.8, isUp: false },
      savingsRatio: { value: 0.56, change: 7.2, isUp: true }
    }
  };

  // Year-to-Date Data
  const ytdData = {
    netWorth: [
      { period: '2020', value: 15000 },
      { period: '2021', value: 28500 },
      { period: '2022', value: 42300 },
      { period: '2023', value: 58700 },
      { period: '2024', value: 75200 }
    ],
    incomeExpenses: [
      { period: '2020', income: 85000, expenses: 52000 },
      { period: '2021', income: 89000, expenses: 54500 },
      { period: '2022', income: 92000, expenses: 56800 },
      { period: '2023', income: 95000, expenses: 58200 },
      { period: '2024', income: 98000, expenses: 59500 }
    ],
    categoryData: {
      topLevel: [
        { name: 'Housing', value: 18000, color: '#8884d8', key: 'housing' },
        { name: 'Food', value: 9750, color: '#82ca9d', key: 'food' },
        { name: 'Transportation', value: 6000, color: '#ffc658', key: 'transport' },
        { name: 'Utilities', value: 4500, color: '#ff7300', key: 'utilities' },
        { name: 'Entertainment', value: 3750, color: '#00ff88', key: 'entertainment' },
        { name: 'Others', value: 17500, color: '#0088fe', key: 'others' }
      ],
      subcategories: {
        food: [
          { name: 'Groceries', value: 6000, color: '#82ca9d' },
          { name: 'Dining Out', value: 3750, color: '#66bb6a' }
        ],
        entertainment: [
          { name: 'Movies', value: 2250, color: '#00ff88' },
          { name: 'Games', value: 1500, color: '#00cc66' }
        ],
        housing: [
          { name: 'Rent', value: 12000, color: '#8884d8' },
          { name: 'Maintenance', value: 6000, color: '#7773d8' }
        ],
        transport: [
          { name: 'Gas', value: 3000, color: '#ffc658' },
          { name: 'Maintenance', value: 1800, color: '#ffb528' },
          { name: 'Insurance', value: 1200, color: '#ff9f00' }
        ]
      }
    },
    cards: {
      totalBalance: { value: 75200, change: 28.1, isUp: true },
      monthlyIncome: { value: 98000, change: 8.9, isUp: true },
      monthlyExpenses: { value: 59500, change: 2.2, isUp: true },
      savingsRatio: { value: 0.39, change: 12.3, isUp: true }
    }
  };

  // Get current data based on selected view
  const getCurrentData = () => {
    switch (selectedView) {
      case 'quarterly':
        return quarterlyData;
      case 'ytd':
        return ytdData;
      default:
        return monthlyData;
    }
  };

  const currentData = getCurrentData();

  const savingsGoals = [
    { goal: 'Emergency Fund', current: 5000, target: 10000, color: '#8884d8' },
    { goal: 'Vacation', current: 2500, target: 4000, color: '#82ca9d' },
    { goal: 'New Car', current: 8000, target: 15000, color: '#ffc658' },
    { goal: 'Investment', current: 3000, target: 5000, color: '#ff7300' }
  ];

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Financial Dashboard</h1>
          <p className="text-gray-600">Your comprehensive financial overview</p>
        </div>

        {/* View Toggle */}
        <div className="flex justify-end mb-6">
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
            {[
              { key: 'monthly', label: 'Monthly' },
              { key: 'quarterly', label: 'Quarterly' },
              { key: 'ytd', label: 'Year-to-Date' }
            ].map((view) => (
              <button
                key={view.key}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  selectedView === view.key
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedView(view.key as any)}
              >
                {view.label}
              </button>
            ))}
          </div>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { 
              title: 'Total Account Balance', 
              icon: <FiDollarSign className="text-green-600" />, 
              ...currentData.cards.totalBalance 
            },
            { 
              title: `${selectedView === 'ytd' ? 'Annual' : selectedView === 'quarterly' ? 'Quarterly' : 'Monthly'} Income`, 
              icon: <FiTrendingUp className="text-blue-600" />, 
              ...currentData.cards.monthlyIncome 
            },
            { 
              title: `${selectedView === 'ytd' ? 'Annual' : selectedView === 'quarterly' ? 'Quarterly' : 'Monthly'} Expenses`, 
              icon: <AiOutlineCreditCard className="text-red-600" />, 
              ...currentData.cards.monthlyExpenses 
            },
            { 
              title: 'Savings Ratio', 
              icon: <FaPiggyBank className="text-purple-600" />, 
              ...currentData.cards.savingsRatio, 
              isPercent: true 
            }
          ].map((card, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
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
                  {Math.abs(card.change)}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Net Worth Chart */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
              Net Worth Over Time - {selectedView === 'ytd' ? 'Yearly' : selectedView === 'quarterly' ? 'Quarterly' : 'Monthly'}
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentData.netWorth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Income vs Expenses Chart */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
              Income vs Expenses - {selectedView === 'ytd' ? 'Yearly' : selectedView === 'quarterly' ? 'Quarterly' : 'Monthly'}
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentData.incomeExpenses}>
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
                  <XAxis dataKey="period" />
                  <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="income" stroke="#10b981" fill="url(#income)" />
                  <Area type="monotone" dataKey="expenses" stroke="#ef4444" fill="url(#expenses)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Category-Wise Spending Pie Chart */}
        <div className="bg-white p-6 rounded-lg border shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Category-Wise Spending - {selectedView === 'ytd' ? 'Yearly' : selectedView === 'quarterly' ? 'Quarterly' : 'Monthly'}
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="h-72 w-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={activeCategory ? currentData.categoryData.subcategories[activeCategory] : currentData.categoryData.topLevel}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    onClick={(data, idx) => {
                      if (!activeCategory) {
                        const entry = currentData.categoryData.topLevel[idx];
                        if (entry && currentData.categoryData.subcategories[entry.key]) {
                          setActiveCategory(entry.key);
                        }
                      }
                    }}
                    className="cursor-pointer"
                  >
                    {(activeCategory
                      ? currentData.categoryData.subcategories[activeCategory]
                      : currentData.categoryData.topLevel
                    ).map((entry, i) => (
                      <Cell key={i} fill={entry.color} className="hover:opacity-80 transition-opacity" />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Category Legend */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium mb-4">
                {activeCategory ? `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Breakdown` : 'Spending Categories'}
              </h3>
              <div className="space-y-3">
                {(activeCategory
                  ? currentData.categoryData.subcategories[activeCategory]
                  : currentData.categoryData.topLevel
                ).map((entry, i) => {
                  const total = (activeCategory
                    ? currentData.categoryData.subcategories[activeCategory]
                    : currentData.categoryData.topLevel
                  ).reduce((sum, item) => sum + item.value, 0);
                  const percentage = ((entry.value / total) * 100).toFixed(1);
                  
                  return (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <span 
                          className="w-4 h-4 rounded-full flex-shrink-0" 
                          style={{ backgroundColor: entry.color }}
                        ></span>
                        <span className="text-sm font-medium text-gray-700">{entry.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-900">{formatCurrency(entry.value)}</div>
                        <div className="text-xs text-gray-500">{percentage}%</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {activeCategory && (
                <button
                  onClick={() => setActiveCategory(null)}
                  className="text-blue-600 text-sm mt-4 flex items-center gap-1 hover:text-blue-700 transition-colors"
                >
                  ← Back to main categories
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Savings Goals */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Savings Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savingsGoals.map((goal, i) => {
              const progress = (goal.current / goal.target) * 100;
              return (
                <div key={i} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-900">{goal.goal}</h3>
                    <FiTarget className="text-gray-400" />
                  </div>
                  <div className="mb-2">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="h-3 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${Math.min(progress, 100)}%`,
                          backgroundColor: goal.color 
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {formatCurrency(goal.current)} / {formatCurrency(goal.target)}
                    </span>
                    <span className="font-medium" style={{ color: goal.color }}>
                      {progress.toFixed(1)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState } from 'react';
import {
  FiSearch,
  FiTrendingUp,
  FiTrendingDown,
  FiRepeat
} from 'react-icons/fi';

type TransactionType = 'income' | 'expense' | 'transfer';

interface Transaction {
  date: string;
  category: 'Income' | 'Expense' | 'Transfer';
  description: string;
  amount: number;
  type: TransactionType;
}

const Transactions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'All' | 'Income' | 'Expense' | 'Transfer'>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const tabs: Array<'All' | 'Income' | 'Expense' | 'Transfer'> = ['All', 'Income', 'Expense', 'Transfer'];

const transactions: Transaction[] = [
  { date: 'Jun 26', category: 'Income', description: 'Paycheck', amount: 2500.0, type: 'income' },
  { date: 'Jun 25', category: 'Expense', description: 'Rent', amount: -1500.0, type: 'expense' },
  { date: 'Jun 24', category: 'Expense', description: 'Groceries', amount: -65.0, type: 'expense' },
  { date: 'Jun 23', category: 'Expense', description: 'Dinner', amount: -30.0, type: 'expense' },
  { date: 'Jun 22', category: 'Expense', description: 'Gas', amount: -40.0, type: 'expense' },
  { date: 'Jun 21', category: 'Income', description: 'Freelance', amount: 300.0, type: 'income' },
  { date: 'Jun 20', category: 'Transfer', description: 'Savings Transfer', amount: -200.0, type: 'transfer' },
  { date: 'Jun 19', category: 'Transfer', description: 'Emergency Fund', amount: -100.0, type: 'transfer' },
  { date: 'Jun 18', category: 'Expense', description: 'Lunch', amount: -15.0, type: 'expense' },
  { date: 'Jun 17', category: 'Income', description: 'Refund', amount: 100.0, type: 'income' },
  { date: 'Jun 16', category: 'Transfer', description: 'Investment Account', amount: -500.0, type: 'transfer' },
];


  // Filter by tab and search term
  const filteredTransactions = transactions
    .filter(transaction => {
      const matchesTab = activeTab === 'All' || transaction.category === activeTab;
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTab && matchesSearch;
    })
    .slice(0, 10);

  const getCategoryIcon = (category: string, type: string) => {
    if (category === 'Income') return <FiTrendingUp className="text-green-500" />;
    if (category === 'Expense') return <FiTrendingDown className="text-red-500" />;
    if (category === 'Transfer') return <FiRepeat className="text-blue-500" />;
    return null;
  };

  const getAmountColor = (amount: number): string => {
    if (amount > 0) return 'text-green-600';
    if (amount < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const formatAmount = (amount: number): string => {
    return amount > 0 ? `+$${amount.toFixed(2)}` : `-$${Math.abs(amount).toFixed(2)}`;
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Latest Transactions</h1>

        {/* Search */}
        <div className="relative max-w-sm">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTransactions.map((transaction, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(transaction.category, transaction.type)}
                    <span className="text-sm text-gray-900">{transaction.category}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{transaction.description}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${getAmountColor(transaction.amount)}`}>
                  {formatAmount(transaction.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filteredTransactions.map((transaction, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {getCategoryIcon(transaction.category, transaction.type)}
                <span className="text-sm font-medium text-gray-900">{transaction.category}</span>
              </div>
              <span className="text-sm text-gray-500">{transaction.date}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-600">{transaction.description}</span>
              <span className={`text-sm font-medium ${getAmountColor(transaction.amount)}`}>
                {formatAmount(transaction.amount)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTransactions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No transactions found</div>
          <div className="text-gray-500 text-sm">
            {searchTerm ? 'Try adjusting your search terms' : 'No transactions match the selected filter'}
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;

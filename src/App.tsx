
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Reports from './components/Reports';
import Header from './components/Header';
function App() {

  return (
  <Router>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/transactions" element={<Transactions />} />
    </Routes>
  </Router>
  )
}

export default App

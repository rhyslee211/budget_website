import { React , useContext } from 'react'
import Budget from './pages/budget'
import Ledger from './pages/ledger'
import DebtManagement from './pages/debtManagement'
import GoalManagement from './pages/goalManagement'
import Dashboard from './pages/dashboard'
import { BudgetProvider } from './contexts/budgetContext';
import { LedgerProvider } from './contexts/LedgerContext';
import { DebtProvider } from './contexts/DebtContext';
import { GoalProvider } from './contexts/GoalsContext';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {


  return (
      <DebtProvider>
        <BudgetProvider>
          <LedgerProvider>
            <GoalProvider>
              <Router>
                <div className='w-screen h-screen bg-[#87e087] flex flex-col items-center justify-between overflow-y-auto'>
                  {/* A <Switch> looks through its children <Route>s and
                      renders the first one that matches the current URL. */}
                  <nav className='w-full flex justify-center items-center gap-4 mb-4 bg-[#80d880] rounded-lg shadow-lg p-4 border-2 border-[#80d880] sticky top-0 z-60'>
                    <Link to="/" className='bg-white text-black px-4 py-2 rounded-lg shadow-lg'>Home</Link>
                    <Link to="/ledger" className='bg-white text-black px-4 py-2 rounded-lg shadow-lg'>Ledger</Link>
                    <Link to="/budget" className='bg-white text-black px-4 py-2 rounded-lg shadow-lg'>Budget</Link>
                    <Link to="/debtManager" className='bg-white text-black px-4 py-2 rounded-lg shadow-lg'>Debt Manager</Link>
                    <Link to="/goalManager" className='bg-white text-black px-4 py-2 rounded-lg shadow-lg'>Goal Manager</Link>
                  </nav>
                  <Routes>
                    <Route path="/" element={<Dashboard />}></Route>
                    <Route path="/ledger" element={<Ledger />}></Route>
                    <Route path="/budget" element={<Budget />}></Route>
                    <Route path="/debtManager" element={<DebtManagement />}></Route>
                    <Route path="/goalManager" element={<GoalManagement />}></Route>
                  </Routes>
                </div>
              </Router>
            </GoalProvider>
          </LedgerProvider>
        </BudgetProvider>
      </DebtProvider>
  
  )
}

export default App

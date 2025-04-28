import { React , useContext } from 'react'
import Ledger from './pages/ledger'
import { LedgerProvider } from './contexts/ledgerContext';

function App() {


  return (
    <div className='w-screen h-screen bg-[#87e087] flex items-center justify-center'>
      <LedgerProvider>
        <Ledger />
      </LedgerProvider>
    </div>
  )
}

export default App

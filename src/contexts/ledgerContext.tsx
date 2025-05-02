import { createContext, useContext, useState , ReactNode } from 'react';
import { LedgerEntry } from '../types/Ledger';

interface LedgerContextType {
  entries: LedgerEntry[];
  setEntries: (entries: LedgerEntry[]) => void;
  addEntry: (entry: LedgerEntry) => void;
  deleteEntry: (id: string) => void;
  editEntry: (id: string, updatedEntry: LedgerEntry) => void;
}

const LedgerContext = createContext<LedgerContextType | undefined>(undefined);

export const LedgerProvider = ({ children }: { children: ReactNode }) => {
  const [entries, setEntries] = useState<LedgerEntry[]>([]);

  const addEntry = (entry: LedgerEntry) => {
    setEntries((prev) => [...prev, entry]);
  };

  const deleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const editEntry = (id: string, updatedEntry: LedgerEntry) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, ...updatedEntry } : entry))
    );
  };

  return (
    <LedgerContext.Provider value={{ entries, setEntries, addEntry, deleteEntry , editEntry }}>
      {children}
    </LedgerContext.Provider>
  );
};

export const useLedger = (): LedgerContextType => {
  const context = useContext(LedgerContext);
  if (!context) throw new Error('useLedger must be used within a LedgerProvider');
  return context;
};
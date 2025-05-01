import { createContext, useContext, useState , ReactNode } from 'react';
import { BudgetEntry } from '../types/Budget';

interface BudgetContextType {
  entries: BudgetEntry[];
  setEntries: (entries: BudgetEntry[]) => void;
  addEntry: (entry: BudgetEntry) => void;
  deleteEntry: (id: string) => void;
  editEntry: (id: string, updatedEntry: BudgetEntry) => void;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
  const [entries, setEntries] = useState<BudgetEntry[]>([]);

  const addEntry = (entry: BudgetEntry) => {
    setEntries((prev) => [...prev, entry]);
  };

  const deleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const editEntry = (id: string, updatedEntry: BudgetEntry) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, ...updatedEntry } : entry))
    );
  };

  return (
    <BudgetContext.Provider value={{ entries, setEntries, addEntry, deleteEntry , editEntry }}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = (): BudgetContextType => {
  const context = useContext(BudgetContext);
  if (!context) throw new Error('useBudget must be used within a BudgetProvider');
  return context;
};
import { debtEntry } from "../types/Debt";
import { createContext, useContext, useState , ReactNode } from 'react';

interface DebtContextType {
    entries: debtEntry[];
    setEntries: (entries: debtEntry[]) => void;
    addEntry: (entry: debtEntry) => void;
    deleteEntry: (id: string) => void;
    editEntry: (id: string, updatedEntry: debtEntry) => void;
    getCounter: () => number;
}

const DebtContext = createContext<DebtContextType | undefined>(undefined);

export const DebtProvider = ({ children }: { children: ReactNode }) => {
    const [entries, setEntries] = useState<debtEntry[]>([]);

    const [counter, setCounter] = useState(0);

    const getCounter = () => {
        return counter;
    }

    const addEntry = (entry: debtEntry) => {
        setEntries((prev) => [...prev, entry]);
        setCounter((prev) => prev + 1); // Increment counter when a new entry is added
    };

    const deleteEntry = (id: string) => {
        setEntries((prev) => prev.filter((entry) => entry.id !== id));
    };

    const editEntry = (id: string, updatedEntry: debtEntry) => {
        setEntries((prev) =>
            prev.map((entry) => (entry.id === id ? { ...entry, ...updatedEntry } : entry))
        );
    }

    return (
        <DebtContext.Provider value={{ entries, setEntries, addEntry, deleteEntry , editEntry, getCounter }}>
            {children}
        </DebtContext.Provider>
    );
}

export const useDebt = (): DebtContextType => {
    const context = useContext(DebtContext);
    if (!context) throw new Error('useDebt must be used within a DebtProvider');
    return context;
}
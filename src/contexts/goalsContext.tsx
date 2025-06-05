import { goalEntry } from "../types/Goal";
import { createContext, useContext, useState , ReactNode } from 'react';

interface GoalContextType {
    entries: goalEntry[];
    setEntries: (entries: goalEntry[]) => void;
    addEntry: (entry: goalEntry) => void;
    deleteEntry: (id: string) => void;
    editEntry: (id: string, updatedEntry: goalEntry) => void;
    getCounter: () => number;
}

const GoalContext = createContext<GoalContextType | undefined>(undefined);

export const GoalProvider = ({ children }: { children: ReactNode }) => {
    const [entries, setEntries] = useState<goalEntry[]>([]);

    const [counter, setCounter] = useState(0);

    const getCounter = () => {
        return counter;
    }

    const addEntry = (entry: goalEntry) => {
        setEntries((prev) => [...prev, entry]);
        setCounter((prev) => prev + 1); // Increment counter when a new entry is added
    };

    const deleteEntry = (id: string) => {
        setEntries((prev) => prev.filter((entry) => entry.id !== id));
    };

    const editEntry = (id: string, updatedEntry: goalEntry) => {
        setEntries((prev) =>
            prev.map((entry) => (entry.id === id ? { ...entry, ...updatedEntry } : entry))
        );
    }

    return (
        <GoalContext.Provider value={{ entries, setEntries, addEntry, deleteEntry , editEntry, getCounter }}>
            {children}
        </GoalContext.Provider>
    );
}

export const useGoal = (): GoalContextType => {
    const context = useContext(GoalContext);
    if (!context) throw new Error('useGoal must be used within a GoalProvider');
    return context;
}
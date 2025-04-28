export interface LedgerEntry {
  id: string;
    date: string; // ISO date string (YYYY-MM-DD)
    description: string; // e.g., 'Groceries', 'Rent', etc.
    amount: number; // Positive for income, negative for expenses (automated calculation)
    type: 'income' | 'expense'; // Type of the entry
    category: string; // e.g., 'Food', 'Utilities', etc. (different for income and expense)
    notes?: string; // Optional notes for the entry
}

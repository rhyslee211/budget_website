export interface BudgetEntry {
  id: string;
    description: string; // e.g., 'Groceries', 'Rent', etc.
    amount: number; // Positive for income, negative for expenses (automated calculation)
    type: 'income' | 'expense'; // Type of the entry
    category: string; // e.g., 'Food', 'Utilities', etc. (different for income and expense)
    notes?: string; // Optional notes for the entry
}

// src/types/Expense.ts
export interface Expense {
    id: string;
    category: string; // e.g., 'Rent', 'Food', 'Utilities'
    amount: number;
    date: string; // ISO date string
    notes?: string;
  }
  
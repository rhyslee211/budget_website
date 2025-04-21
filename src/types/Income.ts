// src/types/Income.ts
export interface Income {
    id: string;
    source: string; // e.g., 'Salary', 'Freelance', etc.
    amount: number;
    date: string; // ISO date string (YYYY-MM-DD)
    notes?: string;
  }
  
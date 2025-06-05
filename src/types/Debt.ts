export interface DebtEntry {
    id: string;
    description: string; // e.g., 'Credit Card', 'Student Loan', etc.
    debtAmount: number; // Total amount of the debt
    interestRate: number; // Annual interest rate (in percentage)
    type: 'credit' | 'loan'; // Type of the debt
    category: string; // e.g., 'Credit Card', 'Mortgage', etc.
    paymentAmount: number; // Monthly payment amount
    paymentFrequency: 'monthly' | 'bi-weekly' | 'weekly'; // Frequency of payments
    dueDate: string; // Due date for the payment (e.g., '2023-10-15')
    name?: string; // Optional notes for the entry
}
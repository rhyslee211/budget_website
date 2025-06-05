export interface GoalEntry {
    id: string;
    description: string; // e.g., 'House Down Payment', 'Retirement', etc.
    goalAmount: number; // Total amount to reach goal
    paymentAmount: number; // Monthly payment amount
    paymentFrequency: 'monthly' | 'bi-weekly' | 'weekly'; // Frequency of payments
    goalDate: string; // Date to finish the goal (e.g., '2023-10-15')
    notes?: string; // Optional notes for the entry
}
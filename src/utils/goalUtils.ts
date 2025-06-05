// This function takes an array of entries and calculates the monthly goal data points for each entry.
export const calculateMonthlyGoalDataPoints = (entries: any[]) => {

    const monthlyDataPoints = entries.map((entry) => {
        const { goalAmount, paymentAmount, paymentFrequency } = entry;

        let monthlyPayment = paymentAmount;
        // Adjust payment amount based on frequency
        switch (paymentFrequency) {
            case 'monthly':
                monthlyPayment = paymentAmount;
                break;
            case 'bi-weekly':
                monthlyPayment = paymentAmount * 2;
                break;
            case 'weekly':
                monthlyPayment = paymentAmount * 4;
                break;
            default:
                monthlyPayment = paymentAmount;
                break;

        };

        let months : number = 0; // Initialize month count
        let remainingGoal : number = goalAmount;
        const dataPoints = [goalAmount];

        while (remainingGoal > 0 && months < 60) {
            remainingGoal = Math.max(Number(remainingGoal) - monthlyPayment,0); // Ensure we don't go negative
            dataPoints.push(remainingGoal > 0 ? remainingGoal : 0); // Ensure goal doesn't go negative
            months = months + 1; // Increment month count
        }

        return dataPoints;
    });

    return monthlyDataPoints;
}

export const calculateLastMonthofGoal = (entries: any[]) => {
    const lastMonth = entries.reduce((max, entry) => {
        const { goalAmount, paymentAmount, paymentFrequency } = entry;

        let monthlyPayment = paymentAmount;
        // Adjust payment amount based on frequency
        switch (paymentFrequency) {
            case 'monthly':
                monthlyPayment = paymentAmount;
                break;
            case 'bi-weekly':
                monthlyPayment = paymentAmount * 2;
                break;
            case 'weekly':
                monthlyPayment = paymentAmount * 4;
                break;
            default:
                monthlyPayment = paymentAmount;
                break;

        };

        let months : number = 0; // Initialize month count
        let remainingGoal : number = goalAmount;

        while (remainingGoal > 0 && months < 60) {
            remainingGoal = Math.max(Number(remainingGoal) - monthlyPayment,0); // Ensure we don't go negative
            months = months + 1; // Increment month count
        }

        return Math.max(max, months + 1);
    }, 0);

    return lastMonth;
}


export const formatMonth = (month: number) => {
    const date = new Date();
    date.setMonth(date.getMonth() + month);
    return date.toLocaleString('default', { month: 'short' }) + ' ' + date.getFullYear();
}


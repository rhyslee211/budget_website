// This function takes an array of entries and calculates the monthly debt data points for each entry.
export const calculateMonthlyDebtDataPoints = (entries: any[]) => {

    const monthlyDataPoints = entries.map((entry) => {
        const { debtAmount, interestRate, paymentAmount, paymentFrequency } = entry;

        const monthlyInterestRate = interestRate / 100 / 12; // Convert annual interest rate to monthly

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
        let remainingDebt : number = debtAmount;
        const dataPoints = [debtAmount];

        while (remainingDebt > 0 && months < 60) {
            const interestForMonth = Number(remainingDebt) * monthlyInterestRate;
            remainingDebt = Math.max(Number(remainingDebt) + interestForMonth - monthlyPayment,0); // Ensure we don't go negative
            dataPoints.push(remainingDebt > 0 ? remainingDebt : 0); // Ensure debt doesn't go negative
            months = months + 1; // Increment month count
        }

        return dataPoints;
    });

    return monthlyDataPoints;
}

export const calculateLastMonthofDebt = (entries: any[]) => {
    const lastMonth = entries.reduce((max, entry) => {
        const { debtAmount, interestRate, paymentAmount, paymentFrequency } = entry;

        const monthlyInterestRate = interestRate / 100 / 12; // Convert annual interest rate to monthly

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
        let remainingDebt : number = debtAmount;

        while (remainingDebt > 0 && months < 60) {
            const interestForMonth = Number(remainingDebt) * monthlyInterestRate;
            remainingDebt = Math.max(Number(remainingDebt) + interestForMonth - monthlyPayment,0); // Ensure we don't go negative
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


import { React } from 'react';
import { useDebt } from '../contexts/debtContext';
import { Line } from 'react-chartjs-2';
import {calculateMonthlyDebtDataPoints , calculateLastMonthofDebt , formatMonth} from '../utils/debtUtils';

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";


Chart.register(CategoryScale);

function DebtManagement() {

    const { entries, addEntry, deleteEntry , editEntry , getCounter } = useDebt();

    const lineChartData = {
        labels: Array.from({ length: Math.min(60,calculateLastMonthofDebt(entries))}, (_, i) => `${formatMonth(i)}`),
        datasets: entries.map((entry, index) => ({
            label: entry.name || `Entry ${index + 1}`,
            data: calculateMonthlyDebtDataPoints([entry])[0],
            borderColor: `hsl(${index * 60}, 100%, 50%)`,
            backgroundColor: `hsl(${index * 60}, 100%, 50%, 0.2)`,
            fill: true,
        })),
    };

    const handleAddEntry = () => {
        const newEntry = {
            id: `entry-${getCounter()}`,
            debtAmount: 0,
            interestRate: 0,
            paymentAmount: 0,
            paymentFrequency: 'monthly',
            dueDate: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
            name: ''
        };
        addEntry(newEntry);
    }

    const handleDeleteEntry = (id: string) => {
        deleteEntry(id);
    }

    const handleEditEntry = (id: string, updateType: string, updateValue: any) => {

        const entry = entries.find(entry => entry.id === id);
        if (!entry) return;

        const updatedEntry = { ...entry, [updateType]: updateValue.target.value };
       
        editEntry(id, updatedEntry);

    }



    return (
        <div className='size-full flex flex-col justify-center items-center overflow-auto'>
            <h1 className='text-3xl font-bold mb-4'>Debt Manager</h1>
            <div className='w-9/10 lg:w-2/3 h-8/10 bg-white rounded-lg shadow-lg text-black overflow-y-auto'>
                <div className='h-full'>
                    <table className='w-full border-collapse border border-gray-300 table-fixed'>
                        <thead className='bg-gray-200'>
                            <tr className='text-center'>
                            <th>Debt Name</th>
                            <th>Principal Amount</th>
                            <th>Interest Rate %</th>
                            <th>Payment Amount</th>
                            <th>Payment Frequency</th>
                            <th>Due Date</th>
                            <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className=''>
                            {entries.map((entry) => (
                            <tr className='h-[60px] text-center' key={entry.id}>
                                <td className=''><input type="text" onChange={(e) => handleEditEntry(entry.id,'name',e)} value={entry.name} className='bg-white border rounded-md overflow-hidden px-1 w-9/10'></input></td>
                                <td className=''><input type="number" step="0.01" onChange={(e) => handleEditEntry(entry.id,'debtAmount',e)} value={entry.debtAmount} className='bg-white border rounded-md overflow-hidden px-1 w-9/10'></input></td>
                                <td className=''><input type="number" onChange={(e) => handleEditEntry(entry.id,'interestRate',e)} value={entry.interestRate} className='bg-white border rounded-md overflow-hidden px-1 w-9/10'></input></td>
                                <td className=''><input type="number" step="0.01" onChange={(e) => handleEditEntry(entry.id,'paymentAmount',e)} value={entry.paymentAmount} className='bg-white border rounded-md overflow-hidden px-1 w-9/10'></input></td>
                                <td className=''>
                                    <select onChange={(e) => handleEditEntry(entry.id,'paymentFrequency',e)} value={entry.paymentFrequency} className='bg-white border rounded-md overflow-hidden px-1 w-9/10'>
                                        <option value="monthly">Monthly</option>
                                        <option value="bi-weekly">Bi-Weekly</option>
                                        <option value="weekly">Weekly</option>
                                    </select>
                                </td>
                                <td className=''><input type="date" onChange={(e) => handleEditEntry(entry.id,'dueDate',e)} value={entry.dueDate} className='bg-white border rounded-md overflow-hidden px-1 w-9/10'></input></td>
                                <td>
                                    <button onClick={() => handleDeleteEntry(entry.id)} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg'>Delete</button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <button onClick={() => handleAddEntry()} className='text-white bg-cyan-500 hover:bg-cyan-700 font-bold py-2 px-4 rounded-lg mt-4'>
                Add Entry
            </button>
            <div className={`size-fit size-min-[500px] text-black mt-4 flex items-center justify-center`}>
                <Line
                    width={500}
                    height={300}
                    data={lineChartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Debt Over Time',
                            },
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Months',
                                },
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Debt Amount',
                                },
                            },
                        },
                    }}
                />
            </div>
        </div>
)
}


export default DebtManagement;

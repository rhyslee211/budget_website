import React, { useState , useMemo } from 'react';
import { useLedger } from '../contexts/LedgerContext';
import { Doughnut } from 'react-chartjs-2';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

function Ledger() {
    
    const { entries, addEntry, deleteEntry , editEntry } = useLedger();

    const expenseData = useMemo(() => {
        const categoryTotals = {
            Food: 0,
            Transport: 0,
            Entertainment: 0,
            Utilities: 0,
            Rent: 0,
            Investments: 0,
            Other: 0
        };

        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1); // Get the date of the previous month

        entries.filter(entry => entry.date <= new Date().toISOString().split('T')[0] && entry.date >= lastMonth.toISOString().split('T')[0]).forEach(entry => {
            if (categoryTotals.hasOwnProperty(entry.category)) {
                categoryTotals[entry.category] += Number(entry.amount); // make sure it's a number
            }
        });

        return [
            categoryTotals.Food,
            categoryTotals.Transport,
            categoryTotals.Entertainment,
            categoryTotals.Utilities,
            categoryTotals.Rent,
            categoryTotals.Investments,
            categoryTotals.Other
        ];
    }, [entries]);

    const excessData = useMemo(() => {

        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1); 

        console.log(entries);

        const totalIncome = entries.filter(entry => entry.date <= new Date().toISOString().split('T')[0] && entry.date >= lastMonth.toISOString().split('T')[0]).reduce((acc, entry) => {
            if (entry.category === 'Paycheck') {
                return acc + Number(entry.amount);
            }
            return acc;
        }, 0);

        const totalExpenses = entries.filter(entry => entry.date <= new Date().toISOString().split('T')[0] && entry.date >= lastMonth.toISOString().split('T')[0]).reduce((acc, entry) => {
            if (entry.category !== 'Paycheck') {
                return acc + Number(entry.amount);
            }
            return acc;
        }, 0);

        return Math.max(totalIncome - totalExpenses,0); // Ensure excess is not negative
    }
    , [entries]);


    const data = {
        labels: ['Food', 'Transport', 'Entertainment', 'Utilities', 'Rent', 'Investments', 'Other', 'Excess'],
        datasets: [{
          label: 'Amount',
          data: expenseData.concat([excessData]),
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',
            'rgb(255, 159, 64)',
            'rgb(89, 247, 194)',
            'rgb(180,180,180)'
          ],
          hoverOffset: 4
        }]
      };

    const [counter, setCounter] = useState(0);

    const handleAddEntry = () => {
        const newEntry = {
            id: `entry-${counter}`,
            date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
            amount: 0,
            category: 'Food',
            note: 'Sample note',
        };
        addEntry(newEntry);
        setCounter(counter + 1);
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
        <h1 className='text-3xl font-bold mb-4'>Ledger</h1>
        <div className='w-9/10 lg:w-2/3 h-8/10 bg-white rounded-lg shadow-lg text-black overflow-y-auto'>
            <table className='w-full h-full border-collapse border border-gray-300 table-fixed'>
                <thead className='bg-gray-200'>
                    <tr className='text-center'>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Note</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {entries.map((entry) => (
                    <tr className='h-[60px] text-center' key={entry.id}>
                        <td className=''><input type="date" onChange={(e) => handleEditEntry(entry.id,'date',e)} value={entry.date} className='bg-white border rounded-md overflow-hidden px-1'></input></td>
                        <td className=''><input type="number" onChange={(e) => handleEditEntry(entry.id,'amount',e)} value={entry.amount} className='bg-white border rounded-md overflow-hidden px-1'></input></td>
                        <td className=''>
                            <select onChange={(e) => handleEditEntry(entry.id,'category',e)} value={entry.category} className='bg-white border rounded-md overflow-hidden px-1'>
                            <optgroup label="Income">
                                <option value="Paycheck">Paycheck</option>
                                <option value="Other">Other</option>
                            </optgroup>
                            <optgroup label="Expenses">
                                <option value="Food">Food</option>
                                <option value="Transport">Transport</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Utilities">Utilities</option>
                                <option value="Rent">Rent</option>
                                <option value="Investments">Investments</option>
                                <option value="Other">Other</option>
                            </optgroup>
                            </select></td>
                        <td className=''><input onChange={(e) => handleEditEntry(entry.id,'note',e)} value={entry.note} className='bg-white border rounded-md overflow-hidden px-1'></input></td>
                        <td>
                            <button onClick={() => handleDeleteEntry(entry.id)} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg'>Delete</button>
                        </td>
                    </tr>
                    ))}
                    <tr className='h-full' />
                </tbody>
            </table>
        </div>
        <button onClick={() => handleAddEntry()} className='text-white bg-cyan-500 hover:bg-cyan-700 font-bold py-2 px-4 rounded-lg mt-4'>
            Add Entry
        </button>
        <div className='size-7/8 lg:size-1/3 text-black mt-4'>
            <Doughnut data={data} options={{
                plugins: {
                    title: {
                    display: true,
                    text: "Previous Month Expenses by Category",
                    }
                }}} />
        </div>
    </div>
    )
}


export default Ledger;

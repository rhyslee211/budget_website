import { useState } from 'react';
import { useLedger } from '../contexts/ledgerContext';


function Ledger() {

    const { entries, addEntry, deleteEntry , editEntry } = useLedger();

    const [counter, setCounter] = useState(0);

    const handleAddEntry = () => {
        const newEntry = {
            id: `entry-${counter}`,
            date: new Date().toLocaleDateString(),
            amount: Math.floor(Math.random() * 1000),
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
    <div className='size-full flex flex-col justify-center items-center'>
        <h1 className='text-3xl font-bold mb-4'>Ledger</h1>
        <div className='w-2/3 h-8/10 bg-white rounded-lg shadow-lg text-black overflow-y-auto'>
            <table className='w-full h-full border-collapse border border-gray-300 table-fixed'>
                <thead className='bg-gray-200'>
                    <tr className='text-center'>
                    <th>Transaction Date</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Note</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {entries.map((entry) => (
                    <tr className='h-[60px] text-center' key={entry.id}>
                        <td className=''><input onChange={(e) => handleEditEntry(entry.id,'date',e)} value={entry.date} className='bg-white border rounded-md overflow-hidden px-1'></input></td>
                        <td className=''><input onChange={(e) => handleEditEntry(entry.id,'amount',e)} value={entry.amount} className='bg-white border rounded-md overflow-hidden px-1'></input></td>
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
    </div>
    )
}


export default Ledger;

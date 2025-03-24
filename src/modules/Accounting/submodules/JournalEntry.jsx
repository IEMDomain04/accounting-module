import React, { useState } from 'react';
import '../styles/JournalEntry.css';
import '../styles/Accounting-Global-Styling.css';
import Button from '../components/Button';
import Forms from '../components/Forms';

const JournalEntry = () => {
    const [journalForm, setJournalForm] = useState({
        entryLineId: '',
        transactions: [{ type: 'debit', glAccountId: '', amount: '' }],
        description: ''
    });

    // Handle input changes dynamically
    const handleInputChange = (index, field, value) => {
        setJournalForm(prevState => ({
            ...prevState,
            transactions: prevState.transactions.map((entry, i) =>
                i === index ? { ...entry, [field]: value } : entry
            )
        }));
    };

    // Add new debit or credit entry
    const addEntry = (type) => {
        setJournalForm(prevState => ({
            ...prevState,
            transactions: [...prevState.transactions, { type, glAccountId: '', amount: '' }]
        }));
    };

    // Remove a specific entry
    const removeEntry = (index) => {
        setJournalForm(prevState => ({
            ...prevState,
            transactions: prevState.transactions.filter((_, i) => i !== index)
        }));
    };

    return (
        <div className='JournalEntry'>
            <div className='body-content-container'>
                <div className="title-subtitle-container">
                    <h1 className="subModule-title">Journal Entry</h1>
                    <h2 className="subModule-subTitle">Enter debit and credit details for transactions.</h2>
                </div>

                <div className="form-container">
                    <Forms
                        type="number"
                        formName="Entry Line ID*"
                        placeholder="Enter Entry Line ID"
                        value={journalForm.entryLineId}
                        onChange={(e) => setJournalForm({ ...journalForm, entryLineId: e.target.value })}
                    />
                    <Forms
                        type="text"
                        formName="Description*"
                        placeholder="Enter Description"
                        value={journalForm.description}
                        onChange={(e) => setJournalForm({ ...journalForm, description: e.target.value })}
                    />
                </div>

                <div className="journal-table">
                    <div className="table-header">
                        <div className="column account-column">Particulars</div>
                        <div className="column debit-column">Debit</div>
                        <div className="column credit-column">Credit</div>
                    </div>

                    {journalForm.transactions.map((entry, index) => (
                        <div key={index} className={`table-row ${entry.type === "credit" ? "credit-row" : ""}`}>
                            <div className={`column account-column ${entry.type === "credit" ? "indent" : ""}`}>
                                <Forms
                                    type="text"
                                    placeholder={entry.type === "credit" ? "To Account Name" : "Account Name"}
                                    value={entry.glAccountId}
                                    onChange={(e) => handleInputChange(index, "glAccountId", e.target.value)}
                                />
                            </div>
                            <div className="column debit-column">
                                {entry.type === "debit" && (
                                    <Forms
                                        type="number"
                                        placeholder="Enter Debit"
                                        value={entry.amount}
                                        onChange={(e) => handleInputChange(index, "amount", e.target.value)}
                                    />
                                )}
                            </div>
                            <div className="column credit-column">
                                {entry.type === "credit" && (
                                    <Forms
                                        type="number"
                                        placeholder="Enter Credit"
                                        value={entry.amount}
                                        onChange={(e) => handleInputChange(index, "amount", e.target.value)}
                                    />
                                )}
                            </div>
                            <button className="remove-btn" onClick={() => removeEntry(index)}>Remove</button>
                        </div>
                    ))}

                    <button className="add-btn" onClick={() => addEntry("debit")}>+ Add Debit</button>
                    <button className="add-btn" onClick={() => addEntry("credit")}>+ Add Credit</button>
                </div>

                <div className='buttons-container'>
                    <Button name="Save" variant="standard1" onclick={() => console.log("Saving Entry", journalForm)} />
                    <Button name="Cancel" variant="standard2" onclick={() => console.log("Cancel Entry")} />
                </div>
            </div>
        </div>
    );
};

export default JournalEntry;

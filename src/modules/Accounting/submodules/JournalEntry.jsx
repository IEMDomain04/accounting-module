import React, { useState, useEffect } from 'react';
import '../styles/JournalEntry.css';
import '../styles/Accounting-Global-Styling.css';
import Button from '../components/Button';
import Forms from '../components/Forms';

const JournalEntry = ({ journalId, journalDescription, onEntryCreated }) => {
    const [journalForm, setJournalForm] = useState({
        entryLineId: '',
        transactions: [{ type: 'debit', glAccountId: '', amount: '' }],
        description: journalDescription || '' // Pre-fill description
    });
    const [totalDebit, setTotalDebit] = useState(0);
    const [totalCredit, setTotalCredit] = useState(0);

    useEffect(() => {
        // Update description if journalDescription changes
        setJournalForm(prev => ({ ...prev, description: journalDescription || '' }));
    }, [journalDescription]);

    const handleInputChange = (index, field, value) => {
        setJournalForm(prevState => {
            const updatedTransactions = prevState.transactions.map((entry, i) =>
                i === index ? { ...entry, [field]: value } : entry
            );
            updateTotals(updatedTransactions);
            return { ...prevState, transactions: updatedTransactions };
        });
    };

    const addEntry = (type) => {
        setJournalForm(prevState => {
            const updatedTransactions = [...prevState.transactions, { type, glAccountId: '', amount: '' }];
            updateTotals(updatedTransactions);
            return { ...prevState, transactions: updatedTransactions };
        });
    };

    const removeEntry = (index) => {
        setJournalForm(prevState => {
            const updatedTransactions = prevState.transactions.filter((_, i) => i !== index);
            updateTotals(updatedTransactions);
            return { ...prevState, transactions: updatedTransactions };
        });
    };

    const updateTotals = (transactions) => {
        const debitSum = transactions
            .filter(t => t.type === 'debit')
            .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
        const creditSum = transactions
            .filter(t => t.type === 'credit')
            .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
        setTotalDebit(debitSum);
        setTotalCredit(creditSum);
    };

    const handleSubmit = async () => {
        if (!journalForm.entryLineId || !journalForm.description) {
            alert("Please fill in all required fields (Entry Line ID and Description).");
            return;
        }
        if (journalForm.transactions.length < 2) {
            alert("At least one debit and one credit entry are required.");
            return;
        }
        if (totalDebit !== totalCredit || totalDebit === 0) {
            alert("Total Debit must equal Total Credit and cannot be zero.");
            return;
        }

        const requests = journalForm.transactions.map((transaction, index) => {
            const payload = {
                journal_entry: journalId || 10001,
                gl_account: parseInt(transaction.glAccountId),
                debit_amount: transaction.type === 'debit' ? parseFloat(transaction.amount).toFixed(2) : "0.00",
                credit_amount: transaction.type === 'credit' ? parseFloat(transaction.amount).toFixed(2) : "0.00",
                description: journalForm.description
            };

            return fetch('http://127.0.0.1:8000/api/journal-entry-lines/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(JSON.stringify(data) || `HTTP Error ${response.status}`);
                    });
                }
                return response.json();
            });
        });

        try {
            await Promise.all(requests);

            // Update the parent JournalEntry with total_debit and total_credit
            const updatePayload = {
                total_debit: totalDebit.toFixed(2),
                total_credit: totalCredit.toFixed(2)
            };
            await fetch(`http://127.0.0.1:8000/api/journal-entries/${journalId || 10001}/`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatePayload)
            });

            alert("Journal entry lines created successfully!");
            setJournalForm({
                entryLineId: '',
                transactions: [{ type: 'debit', glAccountId: '', amount: '' }],
                description: journalDescription || ''
            });
            setTotalDebit(0);
            setTotalCredit(0);

            // Notify parent (Journal) to refresh data
            if (onEntryCreated) {
                onEntryCreated();
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            alert(`Error: ${error.message}`);
        }
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
                                    type="number"
                                    placeholder={entry.type === "credit" ? "To Account ID" : "Account ID"}
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

                    <div className="totals-row">
                        <div className="column account-column">Totals</div>
                        <div className="column debit-column">{totalDebit.toFixed(2)}</div>
                        <div className="column credit-column">{totalCredit.toFixed(2)}</div>
                    </div>

                    <button className="add-btn" onClick={() => addEntry("debit")}>+ Add Debit</button>
                    <button className="add-btn" onClick={() => addEntry("credit")}>+ Add Credit</button>
                </div>

                <div className='buttons-container'>
                    <Button name="Save" variant="standard1" onclick={handleSubmit} />
                    <Button name="Cancel" variant="standard2" onclick={() => setJournalForm({
                        entryLineId: '',
                        transactions: [{ type: 'debit', glAccountId: '', amount: '' }],
                        description: journalDescription || ''
                    })} />
                </div>
            </div>
        </div>
    );
};

export default JournalEntry;
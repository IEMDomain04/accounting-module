import React, { useState } from 'react';
import '../styles/JournalEntry.css';
import '../styles/Accounting-Global-Styling.css';
import Button from '../components/Button';
import Forms from '../components/Forms';

const JournalEntry = () => {
    const [journalForm, setJournalForm] = useState({
        entryLineId: '',
        debits: [{ glAccountId: '', journalId: '', debit: '' }], // Array for multiple debits
        credits: [{ glAccountId: '', journalId: '', credit: '' }], // Array for multiple credits
        description: ''
    });

    // Handle input changes dynamically
    const handleInputChange = (type, index, field, value) => {
        setJournalForm(prevState => ({
            ...prevState,
            [type]: prevState[type].map((entry, i) => 
                i === index ? { ...entry, [field]: value } : entry
            )
        }));
    };

    // Add new debit or credit entry
    const addEntry = (type) => {
        setJournalForm(prevState => ({
            ...prevState,
            [type]: [...prevState[type], { glAccountId: '', journalId: '', [type === "debits" ? "debit" : "credit"]: '' }]
        }));
    };

    // Remove a specific debit or credit entry
    const removeEntry = (type, index) => {
        setJournalForm(prevState => ({
            ...prevState,
            [type]: prevState[type].filter((_, i) => i !== index)
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
                    
                    {/* Debit Section */}
                    <div className='account-section'>
                        <h3>Debits</h3>
                        {journalForm.debits.map((entry, index) => (
                            <div key={index} className="debit-entry">
                                <Forms type="number" formName="GL Account ID*" placeholder="Enter GL Account ID" value={entry.glAccountId} onChange={(e) => handleInputChange("debits", index, "glAccountId", e.target.value)} />
                                <Forms type="number" formName="Journal ID*" placeholder="Enter Journal ID" value={entry.journalId} onChange={(e) => handleInputChange("debits", index, "journalId", e.target.value)} />
                                <Forms type="number" formName="Debit*" placeholder="Enter Debit" value={entry.debit} onChange={(e) => handleInputChange("debits", index, "debit", e.target.value)} />
                                <button className="remove-btn" onClick={() => removeEntry("debits", index)}>Remove</button>
                            </div>
                        ))}
                        <button className="add-btn" onClick={() => addEntry("debits")}>+ Add Debit</button>
                    </div>
                    
                    {/* Credit Section */}
                    <div className='account-section'>
                        <h3>Credits</h3>
                        {journalForm.credits.map((entry, index) => (
                            <div key={index} className="credit-entry">
                                <Forms type="number" formName="GL Account ID*" placeholder="Enter GL Account ID" value={entry.glAccountId} onChange={(e) => handleInputChange("credits", index, "glAccountId", e.target.value)} />
                                <Forms type="number" formName="Journal ID*" placeholder="Enter Journal ID" value={entry.journalId} onChange={(e) => handleInputChange("credits", index, "journalId", e.target.value)} />
                                <Forms type="number" formName="Credit*" placeholder="Enter Credit" value={entry.credit} onChange={(e) => handleInputChange("credits", index, "credit", e.target.value)} />
                                <button className="remove-btn" onClick={() => removeEntry("credits", index)}>Remove</button>
                            </div>
                        ))}
                        <button className="add-btn" onClick={() => addEntry("credits")}>+ Add Credit</button>
                    </div>

                    <Forms 
                        type="text" 
                        formName="Description*" 
                        placeholder="Enter Description" 
                        value={journalForm.description} 
                        onChange={(e) => setJournalForm({ ...journalForm, description: e.target.value })} 
                    />
                </div>

                <div className='buttons-container'>
                    <Button name="Save" variant="standard1" onclick={() => console.log("Saving Entry", journalForm)} />
                    <Button name="Cancel" variant="standard2" onclick={() => console.log("Cancel Entry")}/>
                </div>
            </div>
        </div>
    );
};

export default JournalEntry;

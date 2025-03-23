import React, { useState, useEffect } from 'react';
import '../styles/Journal.css';
import '../styles/Accounting-Global-Styling.css';
import { sortingChoices } from './ListOfAccounts';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import Table from '../components/Table';
import SearchBar from "../../../shared/components/SearchBar";
import Forms from '../components/Forms';

const Journal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [journalForm, setJournalForm] = useState({
        journalId: '',
        journalDate: '',
        description: '',
        currencyId: ''
    });
    const columns = ["Journal Id", "Journal Date", "Description", "Debit", "Credit", "Invoice Id", "Currency Id"];
    const [data, setData] = useState([]);

    // Reusable function to format API data
    const formatData = (result) => result.map(entry => [
        entry.journal_id || entry.id || '-',
        entry.journal_date || entry.date || '-',
        entry.description || '-',
        entry.total_debit || '-',
        entry.total_credit || '-',
        entry.invoice_id || '-',
        entry.currency_id || '-'
    ]);

    // Reusable function to fetch data
    const fetchData = () => {
        fetch('http://127.0.0.1:8000/api/journal-entries/')
            .then(response => response.json())
            .then(result => {
                console.log('API Response:', result);
                setData(formatData(result));
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleInputChange = (field, value) => {
        setJournalForm(prevState => ({ ...prevState, [field]: value }));
    };

    const handleSubmit = () => {
        fetch('http://127.0.0.1:8000/api/journal-entries/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                journal_id: journalForm.journalId,
                journal_date: journalForm.journalDate,
                description: journalForm.description,
                currency_id: journalForm.currencyId
            })
        })
            .then(response => {
                if (response.ok) {
                    fetchData(); // Reuse fetch function
                    setJournalForm({ journalId: '', journalDate: '', description: '', currencyId: '' });
                    closeModal();
                } else {
                    console.error('Error creating entry:', response.statusText);
                }
            })
            .catch(error => console.error('Error submitting data:', error));
    };

    return (
        <div className='Journal'>
            <div className='body-content-container'>
                <div className="title-subtitle-container">
                    <h1 className="subModule-title">Journal</h1>
                    <h2 className="subModule-subTitle">A record that groups transactions under a unique journal ID for accounting purposes.</h2>
                </div>

                <div className="component-container">
                    <div className="select-search-container">
                        <Dropdown options={sortingChoices} style="selection" defaultOption="Sort ID.." />
                        <SearchBar />
                    </div>

                    <div className='buttons-container'>
                        <Button name="Create Journal ID" variant="standard2" onclick={openModal} />
                    </div>
                </div>

                <Table data={data} columns={columns} />
            </div>

            {/* Pop-up Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-header">
                            <h2>Create Journal ID</h2>
                            <button className="close-btn" onClick={closeModal}>❌</button>
                        </div>
                        <div className="modal-body">
                            <Forms type="text" formName="Journal ID*" placeholder="Enter Journal ID" value={journalForm.journalId} onChange={(e) => handleInputChange("journalId", e.target.value)} />
                            <Forms type="date" formName="Journal Date*" value={journalForm.journalDate} onChange={(e) => handleInputChange("journalDate", e.target.value)} />
                            <Forms type="text" formName="Description*" placeholder="Enter Description" value={journalForm.description} onChange={(e) => handleInputChange("description", e.target.value)} />
                            <Forms type="text" formName="Currency ID*" value={journalForm.currencyId} onChange={(e) => handleInputChange("currencyId", e.target.value)} />
                        </div>
                        <div className="modal-footer">
                            <Button name="Add" variant="standard1" onclick={handleSubmit} />
                            <Button name="Cancel" variant="standard2" onclick={closeModal} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Journal;
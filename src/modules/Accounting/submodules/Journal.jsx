import React, { useState } from 'react';
import '../styles/Journal.css';
import '../styles/Accounting-Global-Styling.css';
import { sortingChoices } from './ListOfAccounts';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import Table from '../components/Table';
import SearchBar from "../../../shared/components/SearchBar";
import Forms from '../components/Forms';

const Journal = () => {
    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form state
    const [journalForm, setJournalForm] = useState({
        journalId: '',
        journalDate: '',
        description: '',
        currencyId: ''
    });

    // Define columns (header data)
    const columns = ["Journal Id", "Journal Date", "Description", "Debit", "Credit", "Invoice Id", "Currency Id"];

    // Define data (rows of table)
    const data = [
        [1001, "10/10/1000", "Bought a Mouse", 10000, 10000, 100101, "PHP"],
    ];

    // Handle opening/closing modal
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Handle input change
    const handleInputChange = (field, value) => {
        setJournalForm(prevState => ({ ...prevState, [field]: value }));
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
                        <Button name="Create ID" variant="standard2" onclick={openModal} />
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
                            <Button name="Add" variant="standard1" onclick={closeModal} />
                            <Button name="Cancel" variant="standard2" onclick={closeModal} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Journal;

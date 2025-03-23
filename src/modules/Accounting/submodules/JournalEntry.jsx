import React, { useState } from 'react';
import '../styles/JournalEntry.css';
import '../styles/Accounting-Global-Styling.css';
import { sortingChoices } from './ListOfAccounts';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import Table from '../components/Table';
import SearchBar from "../../../shared/components/SearchBar";
import Forms from '../components/Forms';

const JournalEntry = () => {
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
    const columns = ["Entry Line Id", "GL Account ID", "Journal ID", "Debit", "Credit", "Description"];

    // Define data (rows of table)
    const data = [
        [1001, 2312, 1001, 10000, 10000, "Bought a Mouse"],
    ];

    // Handle opening/closing modal
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Handle input change
    const handleInputChange = (field, value) => {
        setJournalForm(prevState => ({ ...prevState, [field]: value }));
    };

    return (
        <div className='JournalEntry'>
            <div className='body-content-container'>

                <div className="title-subtitle-container">
                    <h1 className="subModule-title">Journal Entry</h1>
                    <h2 className="subModule-subTitle">The detailed input of debit, credit, and entry line IDs for financial transactions.</h2>
                </div>

                <div className="component-container">
                    <div className="select-search-container">
                        <Dropdown options={sortingChoices} style="selection" defaultOption="Sort Entry Line ID.." />
                        <SearchBar />
                    </div>

                    <div className='buttons-container'>
                        <Button name="Enter Entry Lines" variant="standard2" onclick={openModal} />
                    </div>
                </div>

                <Table data={data} columns={columns} />
            </div>

            {/* Pop-up Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-header">
                            <h2>Entry Line</h2>
                            <button className="remove-btn" onClick={closeModal}>❌</button>
                        </div>
                        <div className="modal-body">
                            <Forms type="number" formName="Entry Line ID*" placeholder="Enter Entry Line ID" value={journalForm.journalId} onChange={(e) => handleInputChange("journalId", e.target.value)} />
                            <Forms type="number" formName="General Ledger Account ID*" placeholder="GL Account ID" value={journalForm.journalDate} onChange={(e) => handleInputChange("journalDate", e.target.value)} />
                            <Forms type="number" formName="Journal ID*" placeholder="Enter journal ID" value={journalForm.journalDate} onChange={(e) => handleInputChange("journalDate", e.target.value)} />

                            {/* Apply Logic na ma disable yung isa sa debit or credit kapag nag input.. */}
                            <Forms type="number" formName="Debit*" placeholder="Enter Debit" value={journalForm.journalDate} onChange={(e) => handleInputChange("journalDate", e.target.value)} />
                            <Forms type="number" formName="Credit*" placeholder="Enter Credit" value={journalForm.journalDate} onChange={(e) => handleInputChange("journalDate", e.target.value)} />
                            <Forms type="text" formName="Description*" value={journalForm.currencyId} onChange={(e) => handleInputChange("currencyId", e.target.value)} />
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

export default JournalEntry;

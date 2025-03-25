import React, { useState, useEffect } from "react";
import "../styles/GeneralLedger.css";
import "../styles/Accounting-Global-Styling.css";
import { accounts, subAccounts } from "./ListOfAccounts";
import Forms from "../components/Forms";
import Dropdown from "../components/Dropdown";
import Table from "../components/Table";

const BodyContent = () => {
    const [selectedAccount, setSelectedAccount] = useState("");
    const [filteredSubAccounts, setFilteredSubAccounts] = useState([]);
    const [selectedSubAccount, setSelectedSubAccount] = useState("");
    const [journalForm, setJournalForm] = useState({
        journalId: '',
        journalDate: '',
        description: '',
        currencyId: '',
        invoiceId: ''
    });
    const columns = ["Entry Line ID", "GL Account ID", "Account name", "Journal ID", "Debit", "Credit", "Description"];
    const [data, setData] = useState([]);

    // Format account keys to match the subAccounts keys
    const formatAccountKey = (account) => {
        return account
            .replace(/\s+|&/g, '') // Remove spaces and ampersands
            .replace(/\(.*?\)/g, '') // Remove parentheses and contents inside
            .replace(/-/g, '') // Remove hyphens
            .toLowerCase();
    };

    useEffect(() => {
        if (selectedAccount) {
            const key = formatAccountKey(selectedAccount);
            setFilteredSubAccounts(subAccounts[key] || []);
            setSelectedSubAccount(""); // Reset subaccount when a new account is selected
        }
    }, [selectedAccount]);

    // Fetch data
    const fetchData = () => {
        fetch('http://127.0.0.1:8000/api/journal-entries/')
            .then(response => response.json())
            .then(result => {
                console.log('API Response (fetchData):', result);
                setData(result.map(entry => ([
                    entry.journal_id || entry.id || '-',
                    entry.journal_date || entry.date || '-',
                    entry.description || '-',
                    entry.total_debit == 0 ? '-' : entry.total_debit,
                    entry.total_credit == 0 ? '-' : entry.total_credit,
                    entry.invoice_id || '-',
                    entry.currency_id || '-'
                ])));
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = () => {
        if (!journalForm.journalDate || !journalForm.description || !journalForm.currencyId) {
            alert("Please fill in all required fields.");
            return;
        }

        const payload = {
            journal_date: journalForm.journalDate,
            description: journalForm.description,
            total_debit: "0.00",
            total_credit: "0.00",
            invoice_id: journalForm.invoiceId ? parseInt(journalForm.invoiceId) : null,
            currency_id: parseInt(journalForm.currencyId)
        };
        console.log('Submitting payload:', payload);

        fetch('http://127.0.0.1:8000/api/journal-entries/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(data => {
                alert("Journal entry created successfully!");
                fetchData();
                setJournalForm({ journalId: '', journalDate: '', description: '', currencyId: '', invoiceId: '' });
                setIsModalOpen(false);
            })
            .catch(error => {
                console.error('Error submitting data:', error.message);
                alert(`Error: ${error.message}`);
            });
    };

    return (
        <div className="generalLedger">
            <div className="body-content-container">
                <div className="title-subtitle-container">
                    <h1 className="subModule-title">General Ledger</h1>
                    <h2 className="subModule-subTitle">The whole record of transactions.</h2>
                </div>

                <div className="component-container flex gap-4">
                    <Dropdown 
                        options={accounts} 
                        style="selection" 
                        defaultOption="Select account..." 
                        onChange={setSelectedAccount}
                    />
                    
                    <Dropdown 
                        options={filteredSubAccounts.length > 0 ? filteredSubAccounts : ["No subaccounts available"]} 
                        style="selection" 
                        defaultOption="Select subaccount..." 
                        onChange={setSelectedSubAccount}
                    />
                </div>

                <Table data={data} columns={columns} />
            </div>
        </div>
    );
};

export default BodyContent;

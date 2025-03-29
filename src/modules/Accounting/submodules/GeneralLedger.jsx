import React, { useState, useEffect } from "react";
import "../styles/Accounting-Global-Styling.css";
import { accounts, subAccounts } from "./ListOfAccounts";
import Forms from "../components/Forms";
import Dropdown from "../components/Dropdown";
import Table from "../components/Table";

const BodyContent = () => {
    const [selectedAccount, setSelectedAccount] = useState("");
    const [filteredSubAccounts, setFilteredSubAccounts] = useState([]);
    const [selectedSubAccount, setSelectedSubAccount] = useState("");

        
    const columns = ["Entry Line ID", "GL Account ID", "Account name", "Journal ID", "Debit", "Credit", "Description"];
    const [data, setData] = useState([]);

    const formatAccountKey = (account) => {
        return account
            .replace(/\s(.)/g, (match) => match.toUpperCase())
            .replace(/\s+|-|&/g, '')
            .replace(/\(.*?\)/g, '')
            .replace(/^[A-Z]/, (match) => match.toLowerCase());
    };

    useEffect(() => {
        if (selectedAccount) {
            const key = formatAccountKey(selectedAccount);
            setFilteredSubAccounts(subAccounts[key] || []);
            setSelectedSubAccount("");
        }
    }, [selectedAccount]);

    const fetchData = () => {
        fetch('http://127.0.0.1:8000/api/journal-entry-lines/')
            .then(response => response.json())
            .then(result => {
                console.log('API Response (fetchData):', result);
                if (result.length > 0) {
                    console.log('Keys in first entry:', Object.keys(result[0]));
                    console.log('First entry full object:', result[0]);
                    console.log('GL Account ID value:', result[0].gl_account_id);
                } else {
                    console.log('No data returned from API - Did JournalEntry save?');
                }
                setData(result.map(entry => {
                    const row = [
                        entry.entry_line_id || entry.id || '-',           // "Entry Line ID"
                        entry.gl_account_id || '-',                        // "GL Account ID"
                        entry.account_name || '-',                         // "Account name"
                        entry.journal_id || entry.journal_entry || '-',    // "Journal ID"
                        entry.debit_amount || '0.00',                      // "Debit"
                        entry.credit_amount || '0.00',                     // "Credit"
                        entry.description || '-'                           // "Description"
                    ];
                    console.log('Mapped row:', row);
                    return row;
                }));
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="generalLedger">
            <div className="body-content-container">


                <div className="title-subtitle-container">
                    <h1 className="subModule-title">General Ledger</h1>
                    <h2 className="subModule-subTitle">The whole record of transactions.</h2>
                </div>
                

                <div className="parent-component-container">

                    <div className="component-container">
                        <Forms type="text" placeholder="Search account ID..." />
                    </div>

                    <div className="component-container">
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
                </div>

                <Table data={data} columns={columns} />
            </div>
        </div>
    );
};

export default BodyContent;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ChartOfAccounts.css";
import { accounts } from "./ListOfAccounts";
import SearchBar from "../../../shared/components/SearchBar";
import Button from "../../../shared/components/Button";
import Dropdown from "../../../shared/components/Dropdown";
import Table from "../../../shared/components/Table";
import Forms from "../../../shared/components/Forms";

const BodyContent = () => {
    const columns = ["Account code", "Account name", "Account type"];

    // State for account data and form handling
    const [data, setData] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newAccount, setNewAccount] = useState({
        account_code: "",
        account_name: "",
        account_type: ""
    });

    // Fetch data from API when the component mounts (Runs only once)
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/chart-of-accounts/") // Corrected endpoint
            .then(response => {
                setData(response.data.map(acc => [acc.account_code, acc.account_name, acc.account_type]));
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    // Handle Input Change
    const handleInputChange = (field, value) => {
        setNewAccount(prev => ({ ...prev, [field]: value }));
    };

    // Handle Add Account
    const handleAddAccount = () => {
        setIsAdding(true);
    };

    // Handle Submit
    const handleSubmit = async () => {
        if (!newAccount.account_code || !newAccount.account_name || !newAccount.account_type) {
            return;
        }
        
        // Check if the account_code already exists in the current data
        const accountCodeExists = data.some(row => 
            row[0] === Number(newAccount.account_code) // Compare as numbers since account_code is an integer
        );

        if (accountCodeExists) {
            alert("Account code already exists."); // Alert user if duplicate found
            return;
        }
        
        // Submit new account data to the API when the Submit button is clicked
        try {
            console.log("Submitting data:", newAccount); // Debugging

            const response = await axios.post("http://127.0.0.1:8000/api/chart-of-accounts/", newAccount); // Corrected endpoint

            console.log("Response:", response); // Check response

            if (response.status === 201) {
                const addedAccount = response.data;
                setData(prevData => [...prevData, [addedAccount.account_code, addedAccount.account_name, addedAccount.account_type]]);
                setNewAccount({ account_code: "", account_name: "", account_type: "" });
                setIsAdding(false);
            } else {
                alert("Failed to save data. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting data:", error.response ? error.response.data : error);
            alert("An error occurred. Please check your connection.");
        }
    };

    // Render table data including the form row if adding
    const renderTableData = () => {
        if (isAdding) {
            return [
                [
                    <Forms type="number" placeholder="Enter account code" value={newAccount.account_code} onChange={(e) => handleInputChange("account_code", e.target.value)} />,
                    <Forms type="text" placeholder="Enter account name" value={newAccount.account_name} onChange={(e) => handleInputChange("account_name", e.target.value)} />,
                    <Dropdown options={accounts} style="selection" defaultOption="Select account type" value={newAccount.account_type} onChange={(value) => handleInputChange("account_type", value)} />
                ],
                ...data
            ];
        } else {
            return data;
        }
    };

    return (
        <div className="chartAccounts">
            <div className="body-content-container">
                {/* Buttons & Sorting */}
                <div className="component-container">
                    <div className="buttons-container">
                        <Button name={isAdding ? "Adding..." : "Add Account"} variant="standard2" onclick={handleAddAccount} disabled={isAdding} />
                        <Button name="Submit" variant="standard1" onclick={handleSubmit} />
                        <Button name="Archive" variant="standard2" />
                    </div>
                    <div className="select-account-dropdown">
                        <Dropdown options={accounts} style="selection" defaultOption="Sort account" />
                    </div>
                    <div className="input-field-container">
                        <SearchBar />
                    </div>
                </div>
                {/* Table Display */}
                <Table data={renderTableData()} columns={columns} enableCheckbox={false} />
            </div>
        </div>
    );
};

export default BodyContent;
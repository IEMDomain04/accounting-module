import React, { useState } from "react";
import "../styles/ChartOfAccounts.css";
import { accounts } from "./ListOfAccounts";
import SearchBar from "../../../shared/components/SearchBar";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import Table from "../components/Table";
import Forms from "../components/Forms";

const BodyContent = () => {
    // Define columns (header data)
    const columns = ["Account code", "Account name", "Account type"];

    // Define initial data (rows of table)
    const initialData = [
        [1001, "Account Receivables", "Assets"]
    ];

    const [data, setData] = useState(initialData);

    // Event handler for adding a new row
    const [isAdding, setIsAdding] = useState(false);

    const handleAddAccount = () => {
        if (isAdding) return; // Prevent multiple clicks

        setIsAdding(true); // Disable button after clicking

        const newRow = [
            <Dropdown options={accounts} style="selection" defaultOption="Select account type" />,
            <Forms type="text" placeholder="Enter account name" />,
            new Date().toLocaleString()
        ];

        setData([newRow, ...data]);
    };

    // Function to reset button state after submission
    const handleSubmit = () => {
        // Submit your form logic here
        setIsAdding(false); // Re-enable button after submission
    };



    return (
        <div className="chartAccounts">
            <div className="body-content-container">

                {/* Input Fields, Buttons, and Sorting */}
                <div className="component-container">

                    <div className="buttons-container">
                        <Button name={isAdding ? "Adding..." : "Add Account"}
                            variant="standard2"
                            onclick={handleAddAccount}
                            disabled={isAdding} />
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

                {/* Table */}
                <Table data={data} columns={columns} enableCheckbox={false} />
            </div>
        </div>
    );
};

export default BodyContent;
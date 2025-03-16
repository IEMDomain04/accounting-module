import React, { useState } from "react";
import "../styles/ChartOfAccounts.css";
import accounts from "./ListOfAccounts";
import SearchBar from "../../../shared/components/SearchBar";
import Button from "../../../shared/components/Button";
import Dropdown from "../../../shared/components/Dropdown";
import Table from "../../../shared/components/Table";
import Forms from "../../../shared/components/Forms";

const BodyContent = () => {
    // Define columns (header data)
    const columns = ["Account type", "Account name", "Date and Time"];

    // Define initial data (rows of table)
    const initialData = [
        ["John Doe", 30, "123 Main St"],
        ["Jane Smith", 25, "456 Maple Ave"],
        ["Sam Johnson", 40, "789 Oak Rd"],
        ["John Doe", 30, "123 Main St"],
        ["Jane Smith", 25, "456 Maple Ave"],
        ["Sam Johnson", 40, "789 Oak Rd"],
        ["John Doe", 30, "123 Main St"],
        ["Jane Smith", 25, "456 Maple Ave"],
        ["Sam Johnson", 40, "789 Oak Rd"],
        ["John Doe", 30, "123 Main St"],
        ["Jane Smith", 25, "456 Maple Ave"],
        ["Sam Johnson", 40, "789 Oak Rd"]
    ];

    const [data, setData] = useState(initialData);

    // Event handler for adding a new row
    const handleAddAccount = () => {
        const newRow = [
            <Dropdown options={accounts.listOfAccounts} style="selection" defaultOption="Select account type" />,
            <Forms type="text" placeholder="Enter account name" />,
            new Date().toLocaleString()
        ];
        setData([newRow, ...data]);
    };

    return (
        <div className="chartAccounts">
            <div className="body-content-container">

                {/* Input Fields, Buttons, and Sorting */}
                <div className="component-container">
                    <div className="select-account-dropdown">
                        <Dropdown options={accounts.listOfAccounts} style={"selection"} defaultOption="Sort account" />
                    </div>

                    <div className="input-field-container">
                        <SearchBar />
                    </div>

                    <div className="buttons-container">
                        <Button name={"Add account"} variant={"standard2"} onclick={handleAddAccount} />
                        <Button name={"Submit"} variant={"standard1"} />
                        <Button name={"Archive"} variant={"standard2"} />
                    </div>
                </div>

                {/* Table */}
                <Table data={data} columns={columns} />
            </div>
        </div>
    );
};

export default BodyContent;
import React from "react";
import "../styles/ChartOfAccounts.css";
import accounts from "./ListOfAccounts";
import { chartOfAccountsHeader } from "./headers";
import SearchBar from "../../../shared/components/SearchBar";
import Button from "../../../shared/components/Button";
import Dropdown from "../../../shared/components/Dropdown";
import Table from "../../../shared/components/Table";

const BodyContent = () => {

    // Define columns (header data)
    const columns = ["Name", "Age", "Address"];

    // Define data (rows of table)
    const data = [
        ["John Doe", 30, "123 Main St"],
        ["Jane Smith", 25, "456 Maple Ave"],
        ["Sam Johnson", 40, "789 Oak Rd"],
    ];

    return (
        <div className="chartAccounts">
            <div className="body-content-container">

                {/* Input Fields, Buttons, and Sorting */}
                <div className="component-container">
                    <div className="select-account-dropdown">
                        <Dropdown options={ accounts.listOfAccounts } style={ "selection" } defaultOption="Sort account"/>
                    </div>

                    <div className="input-field-container">
                        <SearchBar />
                    </div>

                    <div className="buttons-container">
                        <Button name={"Add account"} variant={"standard2"} />
                        <Button name={"Submit"} variant={"standard1"} />
                        <Button name={"Archive"} variant={"standard2"} />
                    </div>
                </div>

                {/* Table */}
                <Table data={data} columns={columns}/>
            </div>
        </div>

    );
};

export default BodyContent;

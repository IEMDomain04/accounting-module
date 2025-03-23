import React, { useState } from "react";
import "../styles/GeneralLedger.css";
import "../styles/Accounting-Global-Styling.css";
import { accounts } from "./ListOfAccounts";
import Forms from "../components/Forms";
import Dropdown from "../components/Dropdown";
import Table from "../components/Table";

const BodyContent = () => {
    // Define columns (header data)
    const columns = ["Entry Line ID", "GL Account ID", "Journal ID", "Debit", "Credit", "Description"];

    // Define data (rows of table)
    const data = [
        [110011, "John Doe01", 1001, 10000, "", "Ordered Product"], 
        [110012, "Sales Revenue", 1001, "", 10000, "Ordered Product"], 
    ];

    return (
        <div className="generalLedger">
            <div className="body-content-container">

            <div className="title-subtitle-container">
                    <h1 className="subModule-title">General Ledger</h1>
                    <h2 className="subModule-subTitle">The whole record of transactions.</h2>
                </div>

                <div className="component-container">
                        <Forms type="text" placeholder="Search account..." />
                        <Dropdown options={accounts} style="selection" defaultOption="Sort account.." />
                </div>

                {/* Table Section */}
                <Table data={data} columns={columns} />
            </div>
        </div>
    );
};

export default BodyContent;

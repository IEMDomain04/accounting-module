import React, { useState } from "react";
import "../styles/GeneralLedger.css";
import Forms from "../components/Forms";
import Table from "../components/Table";
import Button from "../components/Button";

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


                <div className="component-container">
                        <Button name="Submit" variant="standard2"/>
                        <Forms type="text" placeholder="Search account..." />

                </div>

                {/* Table Section */}
                <Table data={data} columns={columns} />
            </div>
        </div>
    );
};

export default BodyContent;

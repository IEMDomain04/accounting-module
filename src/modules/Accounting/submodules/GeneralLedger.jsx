import React, { useState } from "react";
import "../styles/GeneralLedger.css";
import Forms from "../../../shared/components/Forms";
import Table from "../../../shared/components/Table";
import Button from "../../../shared/components/Button";

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
                    <div className="sorting-components">
                        <Button name="Submit" variant="standard2"/>
                    </div>


                </div>

                {/* Table Section */}
                <Table data={data} columns={columns} />
            </div>
        </div>
    );
};

export default BodyContent;

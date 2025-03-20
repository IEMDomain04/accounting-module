import React from "react";
import "../styles/GeneralLedger.css";
import { sortByDate } from "./ListOfAccounts";
import Dropdown from "../../../shared/components/Dropdown";
import Forms from "../../../shared/components/Forms";
import Table from "../../../shared/components/Table";

const BodyContent = () => {
    // Define columns (header data)
    const columns = ["Entry Line ID", "GL Account ID", "Journal ID", "Debit", "Credit", "Description"];      

    return (
        <div className="generalLedger">

            <div className="body-content-container">

                <div className="component-container">
                    <div className="sorting-components">
                        <Dropdown options={sortByDate} style="sorting" defaultOption="Sort by date"/>
                        <Dropdown options={sortByDate} style="sorting" defaultOption="Sort by date"/>
                    </div>

                    <div className="form-components">
                        <Forms type={"number"} formName={"Uniqe ID"} placeholder={"Enter unique id"}/>
                        <Forms type={"Text"} formName={"Description"} placeholder={"Enter description"}/>
                    </div>
                </div>

                {/* Dito yung Table lalagay */}
                <Table data={data} columns={columns}/>
            </div>

        </div>

    );
};

export default BodyContent;

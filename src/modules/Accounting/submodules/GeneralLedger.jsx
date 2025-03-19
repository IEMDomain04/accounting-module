import React from "react";
import "../styles/GeneralLedger.css";
import { sortByDate } from "./ListOfAccounts";
import Dropdown from "../../../shared/components/Dropdown";
import Forms from "../../../shared/components/Forms";
import Table from "../../../shared/components/Table";

const BodyContent = () => {
    // Define columns (header data)
    const columns = ["Unique ID", "Account name", "Description", "Debit", "Credit", "Date and Time"];

    // Define data (rows of table)
    const data = [
        [23213123, "John Doe", "123 Main St", 9000, "", "10/10/1000"], // Debit first, blank for credit
        [23213123, "John Doe", "123 Main St", "", 9000, "10/10/1000"], // Credit second, blank for debit
      
        [23213124, "Jane Smith", "456 Maple Ave", 12000, "", "12/05/2021"], // Debit first, blank for credit
        [23213124, "Jane Smith", "456 Maple Ave", "", 12000, "12/05/2021"], // Credit second, blank for debit
      
        [23213125, "Sam Johnson", "789 Oak Rd", 8500, "", "05/22/2019"], // Debit first, blank for credit
        [23213125, "Sam Johnson", "789 Oak Rd", "", 8500, "05/22/2019"], // Credit second, blank for debit
      
        [23213126, "Anna Brown", "101 Pine St", 9500, "", "08/14/2020"], // Debit first, blank for credit
        [23213126, "Anna Brown", "101 Pine St", "", 9500, "08/14/2020"], // Credit second, blank for debit
      
        [23213127, "Mark Wilson", "202 Birch Blvd", 11000, "", "03/30/2018"], // Debit first, blank for credit
        [23213127, "Mark Wilson", "202 Birch Blvd", "", 11000, "03/30/2018"], // Credit second, blank for debit
      
        [23213128, "Lucy Davis", "303 Cedar Dr", 9800, "", "07/19/2022"], // Debit first, blank for credit
        [23213128, "Lucy Davis", "303 Cedar Dr", "", 9800, "07/19/2022"], // Credit second, blank for debit
      
        [23213129, "Michael Lee", "404 Elm St", 10500, "", "09/09/2015"], // Debit first, blank for credit
        [23213129, "Michael Lee", "404 Elm St", "", 10500, "09/09/2015"] // Credit second, blank for debit
      ];       

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

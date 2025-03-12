import React from "react";
import "../styles/ChartOfAccounts.css";
import accounts from "./ListOfAccounts";
import { chartOfAccountsHeader } from "./headers";
import SearchBar from "../../../shared/components/SearchBar";
import Button from "../../../shared/components/Button";
import Dropdown from "../../../shared/components/Dropdown";
import Table from "../../../shared/components/Table";

const BodyContent = () => {

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
                        <Button name={"Add account"} variant={"standard1"} />
                        <Button name={"Submit"} variant={"standard2"} />
                        <Button name={"Archive"} variant={"standard1"} />
                    </div>
                </div>

                {/* Table */}
                <Table headerData={chartOfAccountsHeader} data={chartOfAccountsHeader}/>
            </div>
        </div>

    );
};

export default BodyContent;

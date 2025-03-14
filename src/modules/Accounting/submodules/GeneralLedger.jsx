import React from "react";
import "../styles/GeneralLedger.css";
import accounts from "./ListOfAccounts";
import Dropdown from "../../../shared/components/Dropdown";
import Forms from "../../../shared/components/Forms";
import Button from "../../../shared/components/Button";

const BodyContent = () => {
    return (
        <div className="generalLedger">

            <div className="body-content-container">

                <div className="component-container">
                    <div className="sorting-components">
                        <Dropdown options={accounts.sortByDate} style={"sorting"} defaultOption={"Sort by date"}/>
                        <Dropdown options={accounts.sortByDate} style={"sorting"} defaultOption={"Sort by date"}/>
                    </div>

                    <div className="form-components">
                        <Forms type={"number"} formName={"Uniqe ID"} placeholder={"Enter unique id"}/>
                        <Forms type={"Text"} formName={"Description"} placeholder={"Enter description"}/>
                    </div>

                    <div className="button-components">
                        <Button name={"Add account"} variant={"standard1"}/>
                        <Button name={"Submit"} variant={"standard2"}/>
                    </div>
                </div>

                {/* Dito yung Table lalagay */}

            </div>

        </div>

    );
};

export default BodyContent;

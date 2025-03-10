import React from "react";
import "../styles/ChartOfAccounts.css";
import SearchBar from "../../../shared/components/SearchBar";

const BodyContent = () => {
    return (
        <div className="chartAccounts">
            <div className="body-content-container">

                {/* Input Fields, Buttons, and Sorting */}
                <div className="component-container">
                    <div className="select-account-dropdown">
                        <select className="accounts-dropdown">
                            <option value="cash-on-hand">Cash on Hand</option>
                            <option value="account-receivables">Account Receivables</option>
                            <option value="cash-in-bank">Cash in Bank</option>
                        </select>
                    </div>

                    <div className="input-field-container">
                        <SearchBar />
                    </div>

                    <div className="buttons-container">
                        <button className="Button1"> Add account </button>
                        <button className="Button2"> Submit </button>
                        <button className="Button1"> Archive </button>
                    </div>
                </div>

                {/* Table */}
                <table className="accounts-table">
                    <thead>
                        <tr>
                            <th>Account Type</th>
                            <th>Account Name</th>
                            <th>Date Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>test</td>
                            <td>test</td>
                            <td>test</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default BodyContent;

import React, { useState, useEffect } from 'react';
import './ModalInput.css';
import Forms from './Forms';
import Dropdown from './Dropdown';
import Button from '../components/Button';
import { accounts, subAccounts } from '../submodules/ListOfAccounts';

const CoaModalInput = ({ isModalOpen, closeModal, coaForm, handleInputChange, handleSubmit }) => {
    const [selectedAccount, setSelectedAccount] = useState("");
    const [selectedSubAccount, setSelectedSubAccount] = useState("");
    const [availableSubAccounts, setAvailableSubAccounts] = useState([]);

    // Function for Selecting Accounts and Sub-Accounts
    useEffect(() => {
        if (!selectedAccount) {
            setAvailableSubAccounts([]);
            return;
        }

        const key = toCamelCaseKey(selectedAccount);
        const subAccountsList = subAccounts[key] || [];

        setAvailableSubAccounts(subAccountsList);
        setSelectedSubAccount(""); // or [] based on how you store value
    }, [selectedAccount]);

    // Adapt the spacing and cases in the array for accounts and subAccounts
    const toCamelCaseKey = (str) =>
        str
            .replace(/[^a-zA-Z0-9 ]/g, "") // Remove symbols
            .replace(/\s(.)/g, (_, group1) => group1.toUpperCase()) // Capitalize after spaces
            .replace(/^(.)/, (_, group1) => group1.toLowerCase()); // Lowercase first

    return (
        <div>
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-header">
                            <h2>Creating Account</h2>
                            <img className="cursor-pointer hover:scale-110" src="./accounting/Close.svg" alt="x button" onClick={closeModal} />
                        </div>

                        <div className="modal-body">

                            <Forms
                                type="text"
                                formName="Account Name*"
                                placeholder="Enter account name"
                                value={coaForm.account_name}
                                onChange={(e) => handleInputChange("account_name", e.target.value)}
                            />

                            <Forms type="text" formName="Account Code*" placeholder="Enter account code" value={coaForm.account_code} onChange={(e) => handleInputChange("account_code", e.target.value)} />

                            <div className="flex gap-x-5 max-sm:flex-col max-sm:gap-3">
                                {/* Account Dropdown */}
                                <div className="flex flex-col gap-y-1">
                                    <label> Select Account*</label>
                                    <Dropdown
                                        options={accounts}
                                        style="selection"
                                        defaultOption="Select account..."
                                        value={selectedAccount}
                                        onChange={(value) => {
                                            const selectedAccountCode = value; // Assuming value is the account code
                                            setSelectedAccount(value);
                                            handleInputChange("account", value);
                                            handleInputChange("accountCode", selectedAccountCode); // Set account code in form data
                                        }}
                                    />
                                </div>

                                {/* Sub-Account Dropdown */}
                                <div className="flex flex-col gap-y-1">
                                    <label> Select Sub-Account*</label>
                                    <Dropdown
                                        options={availableSubAccounts}
                                        style="selection"
                                        defaultOption="Select sub-account..."
                                        value={selectedSubAccount}
                                        onChange={(value) => {
                                            setSelectedSubAccount(value);
                                            handleInputChange("subAccount", value);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <Button name="Cancel" variant="standard1" onclick={closeModal} />
                            <Button name="Add Account" variant="standard2" onclick={handleSubmit} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CoaModalInput;
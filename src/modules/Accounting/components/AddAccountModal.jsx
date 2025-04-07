import React, { useState, useEffect } from "react";
import "./ModalInput.css"; // Adjust path as needed
import Button from "./Button"; // Adjust path as needed
import Dropdown from "./Dropdown"; // Adjust path as needed
import { accounts, subAccounts } from "../submodules/ListOfAccounts"; // Adjust path as needed

const AddAccountModal = ({ isModalOpen, closeModal, handleSubmit }) => {
  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedSubAccount, setSelectedSubAccount] = useState("");
  const [availableSubAccounts, setAvailableSubAccounts] = useState([]);

  if (!isModalOpen) return null;

  // Update available sub-accounts when account changes
  useEffect(() => {
    if (!selectedAccount) {
      setAvailableSubAccounts([]);
      setSelectedSubAccount(""); // Reset sub-account when account changes
      return;
    }

    const key = toCamelCaseKey(selectedAccount);
    const subAccountsList = subAccounts[key] || [];
    setAvailableSubAccounts(subAccountsList);
    setSelectedSubAccount(""); // Reset sub-account selection
  }, [selectedAccount]);

  // Convert string to camelCase for subAccounts key
  const toCamelCaseKey = (str) =>
    str
      .replace(/[^a-zA-Z0-9 ]/g, "") // Remove symbols
      .replace(/\s(.)/g, (match, group1) => group1.toUpperCase()) // Capitalize after spaces
      .replace(/^(.)/, (match, group1) => group1.toLowerCase()); // Lowercase first

  // Handle form submission
  const onAddAccount = () => {
    if (!selectedAccount || !selectedSubAccount) {
      alert("Please select both an account and a sub-account."); // Basic validation
      return;
    }

    // Construct the account data to pass back
    const accountData = {
      glAccountId: `${toCamelCaseKey(selectedAccount)}-${toCamelCaseKey(selectedSubAccount)}`, // e.g., "cash-checking"
      accountName: `${selectedAccount} - ${selectedSubAccount}`, // e.g., "Cash - Checking"
    };

    handleSubmit(accountData); // Pass the selected account data to JournalEntry
    closeModal(); // Close the modal after submission
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Modal Header */}
        <div className="modal-header">
          <h2 className="text-lg font-semibold">Select Account</h2>
          <img
            className="cursor-pointer hover:scale-110"
            src="/accounting/Close.svg" // Adjust path as needed
            alt="Close"
            onClick={closeModal}
          />
        </div>

        {/* Modal Body */}
        <div className="modal-body mt-4">
          <div className="flex gap-x-5 max-sm:flex-col max-sm:gap-3">
            {/* Account Dropdown */}
            <div className="-mt-2">
              <Dropdown
                options={accounts}
                style="selection"
                defaultOption="Select account..."
                value={selectedAccount}
                onChange={(value) => setSelectedAccount(value)}
              />
            </div>

            {/* Sub-Account Dropdown */}
            <div className="-mt-2">
              <Dropdown
                options={availableSubAccounts}
                style="selection"
                defaultOption="Select sub-account..."
                value={selectedSubAccount}
                onChange={(value) => setSelectedSubAccount(value)}
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer mt-5 flex justify-end space-x-3">
          <Button name="Cancel" variant="standard1" onclick={closeModal} />
          <Button name="Add" variant="standard2" onclick={onAddAccount} />
        </div>
      </div>
    </div>
  );
};

export default AddAccountModal;
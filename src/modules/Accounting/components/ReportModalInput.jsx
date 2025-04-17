import React, { useState, useEffect } from "react";
import "./ModalInput.css";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import { accounts, subAccounts } from "../submodules/ListOfAccounts";
import Forms from "./Forms";

const ReportModalInput = ({ isModalOpen, closeModal, reportForm, handleInputChange, handleSubmit, }) => {
  // Use state
  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedSubAccount, setSelectedSubAccount] = useState([]);
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
      .replace(/\s(.)/g, (match, group1) => group1.toUpperCase()) // Capitalize after spaces
      .replace(/^(.)/, (match, group1) => group1.toLowerCase()); // Lowercase first

  return (
    <div className="accounting-modal">
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">


            {/* Modal Header */}
            <div className="modal-header">
              <h2 className="text-lg font-semibold">Generate Financial Report</h2>
              <img
                className="cursor-pointer hover:scale-110"
                src="/accounting/Close.svg"
                alt="Close"
                onClick={closeModal}
              />
            </div>

            {/* Modal Body */}
            <div className="modal-body mt-4">


              <div className="flex gap-x-10 max-sm:flex-col max-sm:gap-y-5 max-sm:items-end">
                {/* Start Date Input */}
                <div className="form-group">
                  <label>Start Date*</label>
                  <input
                    type="date"
                    value={reportForm.startDate || ""}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                  />
                </div>

                {/* End Date Input */}
                <div className="form-group">
                  <label>End Date*</label>
                  <input
                    type="date"
                    value={reportForm.endDate || ""}
                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                  />
                </div>
              </div>

              {/* Type of Report */}
              <Forms
                type="text"
                formName="Type of Report*"
                placeholder="Enter type of report"
                value={reportForm.typeOfReport || ""}
                onChange={(e) => handleInputChange("typeOfReport", e.target.value)}
              />

              {/* Generated by */}
              <Forms
                type="text"
                formName="Generated By*"
                placeholder="Generated by.."
                value={reportForm.generatedBy || ""}
                onChange={(e) => handleInputChange("generatedBy", e.target.value)}
              />

              <label>Select Accounts*</label>
              <div className="flex gap-10 max-sm:flex-col max-sm:gap-3">
                {/* Account Dropdown */}
                <div className="form-group">
                  <Dropdown
                    options={accounts} // Ensure account names match subAccounts keys
                    style="selection"
                    defaultOption="Select account..."
                    value={selectedAccount}
                    onChange={(value) => setSelectedAccount(value)}
                  />
                </div>

                {/* Sub-Account Dropdown */}
                <div className="form-group">
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
              <Button name="Add" variant="standard2" onclick={handleSubmit} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportModalInput;

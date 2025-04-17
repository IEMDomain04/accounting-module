import React, { useState, useEffect } from "react";
import "./ModalInput.css";
import Button from "./Button";
import Dropdown from "./Dropdown";

const AddAccountModal = ({ isModalOpen, closeModal, handleSubmit }) => {
  const [allAccounts, setAllAccounts] = useState([]);
  const [mainAccounts, setMainAccounts] = useState([]);
  const [availableSubAccounts, setAvailableSubAccounts] = useState([]);
  const [selectedMainAccount, setSelectedMainAccount] = useState("");
  const [selectedSubAccount, setSelectedSubAccount] = useState("");

  // Fetch accounts
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/general-ledger-accounts/");
        if (!response.ok) throw new Error("Failed to fetch accounts");
        const result = await response.json();
        setAllAccounts(result);

        // Extract unique GL account IDs for main accounts
        const mains = [...new Set(result.map(a => a.gl_account_id))];
        setMainAccounts(mains);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };
    if (isModalOpen) fetchAccounts();
  }, [isModalOpen]);

  // Update sub-accounts when main account changes
  useEffect(() => {
    if (!selectedMainAccount) {
      setAvailableSubAccounts([]);
      setSelectedSubAccount("");
      return;
    }

    // Filter sub-accounts based on selected GL account ID
    const subAccountsList = allAccounts
      .filter(a => a.gl_account_id === selectedMainAccount)
      .map(a => a.account_name);
    setAvailableSubAccounts(subAccountsList);
    setSelectedSubAccount("");
  }, [selectedMainAccount, allAccounts]);

  // Handle form submission
  const onAddAccount = () => {
    if (!selectedMainAccount || !selectedSubAccount) {
      alert("Please select both an account and a sub-account.");
      return;
    }

    // Find the selected account
    const selectedAccount = allAccounts.find(
      a => a.gl_account_id === selectedMainAccount && a.account_name === selectedSubAccount
    );
    const accountData = {
      glAccountId: selectedAccount.gl_account_id, // Use gl_account_id from database
      accountName: selectedAccount.account_name // Use account_name for display
    };

    handleSubmit(accountData);
    closeModal();
  };

  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="text-lg font-semibold">Select Account</h2>
          <img
            className="cursor-pointer hover:scale-110"
            src="/accounting/Close.svg"
            alt="Close"
            onClick={closeModal}
          />
        </div>

        <div className="modal-body mt-4">
          <div className="flex gap-x-5 max-sm:flex-col max-sm:gap-3">
            <div className="-mt-2">
              <Dropdown
                options={mainAccounts}
                style="selection"
                defaultOption="Select GL Account ID..."
                value={selectedMainAccount}
                onChange={(value) => setSelectedMainAccount(value)}
              />
            </div>

            <div className="-mt-2">
              <Dropdown
                options={availableSubAccounts}
                style="selection"
                defaultOption="Select Account Name..."
                value={selectedSubAccount}
                onChange={(value) => setSelectedSubAccount(value)}
              />
            </div>
          </div>
        </div>

        <div className="modal-footer mt-5 flex justify-end space-x-3">
          <Button name="Cancel" variant="standard1" onclick={closeModal} />
          <Button name="Add" variant="standard2" onclick={onAddAccount} />
        </div>
      </div>
    </div>
  );
};

export default AddAccountModal;
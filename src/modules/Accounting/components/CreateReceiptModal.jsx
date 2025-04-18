import React, { useState, useEffect } from "react";
import "./ModalInput.css";
import Button from "./Button";
import Forms from "./Forms";
import Dropdown from "./Dropdown";

const CreateReceiptModal = ({
  isModalOpen,
  closeModal,
  reportForm,
  handleInputChange,
  handleSubmit,
  setValidation,
}) => {
  const [data, setData] = useState([]);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [showBankInput, setShowBankInput] = useState(false);
  const [newBankAccount, setNewBankAccount] = useState({
    accountName: "",
    accountCode: "",
  });

  const fetchData = () => {
    fetch("http://127.0.0.1:8000/api/general-ledger-accounts/")
      .then((response) => {
        if (!response.ok)
          throw new Error(
            `Failed to fetch general ledger accounts: ${response.status}`
          );
        return response.json();
      })
      .then((result) => {
        console.log("API Response (fetchData):", result);
        console.log("Existing account statuses:", result.map((entry) => entry.status));
        setData(
          result.map((entry) => [
            entry.gl_account_id || "-",
            entry.account_name || "-",
            entry.account_code || "-",
            entry.account_id || "-",
            entry.status || "-",
            entry.created_at
              ? new Date(entry.created_at).toLocaleString()
              : "-",
          ])
        );
        // Broaden filter to include potential bank accounts
        const filtered = result.filter(
          (entry) =>
            entry.account_name?.toLowerCase().includes("bank") ||
            entry.account_type?.toLowerCase() === "bank" ||
            entry.account_category?.toLowerCase() === "bank"
        );
        setBankAccounts(filtered);
        if (filtered.length === 0) {
          console.warn("No bank accounts found.");
          setValidation({
            isOpen: true,
            type: "warning",
            title: "No Bank Accounts",
            message: "No bank accounts found. Please add a new bank account.",
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setValidation({
          isOpen: true,
          type: "error",
          title: "Fetch Error",
          message: `Unable to load bank accounts: ${error.message}. Please try again.`,
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const saveBankAccount = () => {
    if (!newBankAccount.accountName || !newBankAccount.accountCode) {
      setValidation({
        isOpen: true,
        type: "warning",
        title: "Missing Fields",
        message: "Please provide both account name and account code.",
      });
      return;
    }

    // Generate a unique gl_account_id
    const generateGLAccountID = () => {
      const prefix = "GL-BANK";
      const randomString = Math.random()
        .toString(36)
        .substring(2, 7)
        .toUpperCase();
      return `${prefix}-${randomString}`;
    };

    const payload = {
      gl_account_id: generateGLAccountID(),
      account_name: newBankAccount.accountName,
      account_code: newBankAccount.accountCode,
      account_type: "bank",
      account_category: "bank",
      status: "Active", // Fix: Changed to match status_enum value
      created_by: reportForm.createdBy || "system",
    };

    console.log("Saving bank account with payload:", payload);

    fetch("http://127.0.0.1:8000/api/general-ledger-accounts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add authentication header if required
        // "Authorization": "Bearer <token>",
      },
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
        // Check if response is JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          throw new Error(
            `Expected JSON response but received HTML or other content: ${text.slice(
              0,
              100
            )}...`
          );
        }
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(`Failed to save bank account: ${JSON.stringify(err)}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Bank account saved:", data);
        fetchData(); // Refresh bank accounts
        setNewBankAccount({ accountName: "", accountCode: "" });
        setShowBankInput(false);
        // Handle different possible response field names
        const accountName =
          data.account_name || data.name || newBankAccount.accountName;
        handleInputChange("bankAccount", accountName);
        setValidation({
          isOpen: true,
          type: "success",
          title: "Bank Account Added",
          message: `Bank account "${accountName}" has been successfully added.`,
        });
      })
      .catch((error) => {
        console.error("Error saving bank account:", error);
        let errorMessage = error.message;
        if (error.message.includes("status_enum")) {
          errorMessage =
            "Invalid status value. Please contact support to verify valid status options.";
        } else if (error.message.includes("Expected JSON response")) {
          errorMessage =
            "Server returned an unexpected response. Please check the server status or contact support.";
        }
        setValidation({
          isOpen: true,
          type: "error",
          title: "Save Error",
          message: `Unable to save the bank account: ${errorMessage}. Please try again.`,
        });
      });
  };

  if (!isModalOpen) return null;

  return (
    <div className="accounting-modal">
      <div className="modal-overlay">
        <div className="modal-container">
          <div className="modal-header">
            <h2 className="text-lg font-semibold">Create Receipt</h2>
            <img
              className="cursor-pointer hover:scale-110"
              src="/accounting/Close.svg"
              alt="Close"
              onClick={closeModal}
            />
          </div>

          <div className="modal-body mt-4">
            <div className="form-group">
              <label>Created at..*</label>
              <input
                type="date"
                value={reportForm.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
              />
            </div>

            <Forms
              type="text"
              formName="Sales Invoice ID*"
              placeholder="Enter sales invoice ID"
              value={reportForm.salesInvoiceId}
              onChange={(e) => handleInputChange("salesInvoiceId", e.target.value)}
            />

            <Forms
              type="number"
              formName="Amount Paid*"
              placeholder="Enter Amount paid"
              value={reportForm.amountPaid}
              onChange={(e) => handleInputChange("amountPaid", e.target.value)}
            />

            <div className="flex flex-col md:flex-row md:space-x-5 space-y-5 md:space-y-0">
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Select Payment Method*
                </label>
                <Dropdown
                  style="selection"
                  defaultOption="Select payment method..."
                  options={[
                    "Cash",
                    "Credit Card",
                    "Bank Transfer",
                    "Check",
                    "Mobile Payment",
                  ]}
                  value={reportForm.paymentMethod}
                  onChange={(value) => {
                    console.log("Payment method changed to:", value);
                    handleInputChange("paymentMethod", value);
                    if (value !== "Bank Transfer") {
                      handleInputChange("bankAccount", "");
                    }
                    if (value !== "Check") {
                      handleInputChange("checkNumber", "");
                    }
                    if (value !== "Mobile Payment") {
                      handleInputChange("transactionId", "");
                    }
                  }}
                />
              </div>

              {reportForm.paymentMethod === "Bank Transfer" && (
                <div className="md:w-2/3 border border-gray-300 rounded-lg p-4 bg-gray-100 space-y-4">
                  <div className="flex flex-col sm:flex-row gap-y-2 sm:gap-x-6 text-sm">
                    <label className="flex items-center gap-x-2">
                      <input
                        type="radio"
                        checked={!showBankInput}
                        onChange={() => setShowBankInput(false)}
                      />
                      <span>Bank accounts</span>
                    </label>
                    <label className="flex items-center gap-x-2">
                      <input
                        type="radio"
                        checked={showBankInput}
                        onChange={() => setShowBankInput(true)}
                      />
                      <span>Add new bank account</span>
                    </label>
                  </div>

                  {!showBankInput ? (
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Select Bank Account*
                      </label>
                      <Dropdown
                        style="selection"
                        defaultOption="Select bank account..."
                        options={bankAccounts.map((account) => account.account_name)}
                        value={reportForm.bankAccount}
                        onChange={(value) => {
                          console.log("Bank account selected:", value);
                          handleInputChange("bankAccount", value);
                        }}
                      />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Forms
                        type="text"
                        formName="Account Name*"
                        placeholder="Enter account name"
                        value={newBankAccount.accountName}
                        onChange={(e) =>
                          setNewBankAccount({
                            ...newBankAccount,
                            accountName: e.target.value,
                          })
                        }
                      />
                      <Forms
                        type="text"
                        formName="Account Code*"
                        placeholder="Enter account code"
                        value={newBankAccount.accountCode}
                        onChange={(e) =>
                          setNewBankAccount({
                            ...newBankAccount,
                            accountCode: e.target.value,
                          })
                        }
                      />
                      <Button
                        name="Save Bank Account"
                        variant="standard2"
                        onclick={saveBankAccount}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {reportForm.paymentMethod === "Check" && (
              <Forms
                type="text"
                formName="Check Number*"
                placeholder="Enter check number"
                value={reportForm.checkNumber}
                onChange={(e) => handleInputChange("checkNumber", e.target.value)}
              />
            )}

            {reportForm.paymentMethod === "Mobile Payment" && (
              <Forms
                type="text"
                formName="Transaction ID*"
                placeholder="Enter transaction ID"
                value={reportForm.transactionId}
                onChange={(e) => handleInputChange("transactionId", e.target.value)}
              />
            )}

            <Forms
              type="text"
              formName="Created By*"
              placeholder="Created by..."
              value={reportForm.createdBy}
              onChange={(e) => handleInputChange("createdBy", e.target.value)}
            />
          </div>

          <div className="modal-footer mt-5 flex justify-end space-x-3">
            <Button name="Cancel" variant="standard1" onclick={closeModal} />
            <Button name="Add" variant="standard2" onclick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateReceiptModal;
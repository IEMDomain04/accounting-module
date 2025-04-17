import React, { useState, useEffect } from 'react';
import "../styles/accounting-styling.css";
import Table from "../components/Table";
import Search from "../components/Search";
import Button from "../components/Button";
import CreateReceiptModal from "../components/CreateReceiptModal";
import NotifModal from "../components/modalNotif/NotifModal";

const OfficialReceipts = () => {
  const columns = ["OR ID", "Invoice ID", "Customer ID", "OR Date", "Settled Amount", "Remaining Amount", "Payment Method", "Reference #", "Created By"];
  const [data, setData] = useState([]);
  const [searching, setSearching] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);

  const closeModal = () => {
    setModalOpen(false);
    setReportForm({
      startDate: "",
      salesInvoiceId: "",
      amountPaid: "",
      paymentMethod: "",
      bankAccount: "",
      createdBy: "",
    });
  };

  const [reportForm, setReportForm] = useState({
    startDate: "",
    salesInvoiceId: "",
    amountPaid: "",
    paymentMethod: "",
    bankAccount: "",
    createdBy: "",
  });

  const [validation, setValidation] = useState({
    isOpen: false,
    type: "warning",
    title: "",
    message: "",
  });

  // Function to calculate the new remaining amount based on the latest remaining amount
  const calculateRemainingAmount = (invoiceId, newSettledAmount) => {
    // Filter receipts for the given invoice
    const invoiceReceipts = data.filter(row => row[1] === invoiceId);

    // Parse the new settled amount and ensure it's a valid number
    const settledAmount = parseFloat(newSettledAmount);
    if (isNaN(settledAmount) || settledAmount < 0) {
      throw new Error("Invalid settled amount. Please enter a valid positive number.");
    }

    if (invoiceReceipts.length === 0) {
      // If no previous receipts exist, fetch the invoice total amount (or set a default)
      const initialRemainingAmount = 10000; // Adjust this value or fetch from API
      const newRemaining = initialRemainingAmount - settledAmount;
      return newRemaining >= 0 ? newRemaining : 0;
    }

    // Sort receipts by OR ID to ensure the latest receipt is last
    const sortedReceipts = [...invoiceReceipts].sort((a, b) => parseInt(a[0]) - parseInt(b[0]));

    // Get the latest receipt
    const latestReceipt = sortedReceipts[sortedReceipts.length - 1];
    const latestRemaining = parseFloat(latestReceipt[5]); // Remaining Amount is at index 5

    // Validate that latestRemaining is a valid number
    if (isNaN(latestRemaining)) {
      throw new Error("Invalid remaining amount in the latest receipt.");
    }

    // Calculate new remaining amount
    const newRemaining = latestRemaining - settledAmount;
    return newRemaining >= 0 ? newRemaining : 0;
  };

  const fetchData = () => {
    fetch('http://127.0.0.1:8000/api/official-receipts/')
      .then(response => response.json())
      .then(result => {
        setData(result.map(entry => [
          entry.or_id || "-",
          entry.invoice_id || "-",
          entry.customer_id || "-",
          entry.or_date ? new Date(entry.or_date).toLocaleString() : "-",
          entry.settled_amount || "-",
          entry.remaining_amount || "-", // Ensure this matches the API field
          entry.payment_method || "-",
          entry.reference_number || "-",
          entry.created_by || "-",
        ]));
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchLatestReferenceNumber = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/official-receipts/');
      const receipts = await response.json();
      if (receipts.length > 0) {
        const lastReceipt = receipts[receipts.length - 1];
        const lastRef = lastReceipt.reference_number;

        if (lastRef && lastRef.includes('-')) {
          const parts = lastRef.split('-');
          const numericPart = parseInt(parts[1], 10);
          if (!isNaN(numericPart)) {
            const newRefNumber = numericPart + 1;
            return `REF-${newRefNumber}`;
          }
        }
      }
      return "REF-0001";
    } catch (error) {
      console.error("Error fetching latest reference number:", error);
      return "REF-0001";
    }
  };

  const generateCustomORID = () => {
    const prefix = "ACC-OFR";
    const year = new Date().getFullYear();
    const randomString = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `${prefix}-${year}-${randomString}`;
  };

  const handleInputChange = (field, value) => {
    console.log(`Updating ${field} to ${value}`);
    setReportForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log("Form data on submit:", reportForm);

    // Validate required fields
    if (
      !reportForm.startDate ||
      !reportForm.salesInvoiceId ||
      !reportForm.amountPaid ||
      !reportForm.paymentMethod ||
      !reportForm.createdBy ||
      (reportForm.paymentMethod === "Bank Transfer" && !reportForm.bankAccount)
    ) {
      setValidation({
        isOpen: true,
        type: "warning",
        title: "All Fields Required",
        message: "Please fill in all fields, including payment method and bank account (if applicable).",
      });
      return;
    }

    try {
      // Calculate the new remaining amount based on the latest remaining amount
      const newRemainingAmount = calculateRemainingAmount(reportForm.salesInvoiceId, reportForm.amountPaid);

      // Validate that the new remaining amount is not negative
      if (newRemainingAmount === 0 && parseFloat(reportForm.amountPaid) > 0) {
        setValidation({
          isOpen: true,
          type: "warning",
          title: "Invalid Payment",
          message: `The settled amount (${reportForm.amountPaid}) exceeds the remaining invoice balance.`,
        });
        return;
      }

      const referenceNumber = await fetchLatestReferenceNumber();

      const newReceipt = {
        or_id: generateCustomORID(),
        invoice_id: reportForm.salesInvoiceId,
        customer_id: "SALES-CUST-2025",
        or_date: reportForm.startDate,
        settled_amount: reportForm.amountPaid,
        remaining_amount: newRemainingAmount.toFixed(2), // Use the calculated remaining amount
        payment_method: reportForm.paymentMethod,
        reference_number: referenceNumber,
        created_by: reportForm.createdBy,
        bank_account: reportForm.paymentMethod === "Bank Transfer" ? reportForm.bankAccount : null,
      };

      console.log("Submitting receipt:", newReceipt);

      const response = await fetch('http://127.0.0.1:8000/api/official-receipts/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReceipt),
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        const createdReceipt = await response.json();
        console.log("Created receipt:", createdReceipt);
        fetchData();
        closeModal();
        setValidation({
          isOpen: true,
          type: "success",
          title: "Receipt Created",
          message: "The receipt has been successfully created.",
        });
      } else {
        const errorData = await response.json();
        console.error("Error response from server:", errorData);
        setValidation({
          isOpen: true,
          type: "error",
          title: "Failed to Create Receipt",
          message: errorData.detail || "An error occurred while creating the receipt. Please try again.",
        });
      }
    } catch (error) {
      console.error('Error creating receipt:', error);
      setValidation({
        isOpen: true,
        type: "error",
        title: "Connection Error",
        message: error.message || "Unable to connect to the server. Please check your connection.",
      });
    }
  };

  const filteredData = data.filter(row =>
    [row[0], row[1], row[2], row[6], row[7], row[8]]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(searching.toLowerCase())
  );

  return (
    <div className="officialReceipts">
      <div className="body-content-container">
        <div className="title-subtitle-container">
          <h1 className="subModule-title">Official Receipts</h1>
        </div>
        <div className="parent-component-container">
          <Search type="text" placeholder="Search Record.." value={searching} onChange={(e) => setSearching(e.target.value)} />
          <div><Button name="Create Receipt" variant="standard2" onclick={openModal} /></div>
        </div>
        <Table data={filteredData} columns={columns} enableCheckbox={false} />
      </div>
      {modalOpen && (
        <CreateReceiptModal
          isModalOpen={modalOpen}
          closeModal={closeModal}
          reportForm={reportForm}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      )}
      {validation.isOpen && (
        <NotifModal
          isOpen={validation.isOpen}
          onClose={() => setValidation({ ...validation, isOpen: false })}
          type={validation.type}
          title={validation.title}
          message={validation.message}
        />
      )}
    </div>
  );
};

export default OfficialReceipts;
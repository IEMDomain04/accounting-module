import React, { useState, useEffect } from "react";
import "../styles/accounting-styling.css";
import Table from "../components/Table";
import Search from "../components/Search";
import Button from "../components/Button";
import CreateReceiptModal from "../components/CreateReceiptModal";
import NotifModal from "../components/modalNotif/NotifModal";

const OfficialReceipts = () => {
  const columns = [
    "OR ID",
    "Invoice ID",
    "Customer ID",
    "OR Date",
    "Settled Amount",
    "Remaining Amount",
    "Payment Method",
    "Reference #",
    "Created By",
  ];
  const [data, setData] = useState([]);
  const [searching, setSearching] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [validation, setValidation] = useState({
    isOpen: false,
    type: "warning",
    title: "",
    message: "",
  });

  const openModal = () => setModalOpen(true);

  const closeModal = () => {
    setModalOpen(false);
    setReportForm({
      startDate: "",
      salesInvoiceId: "",
      amountPaid: "",
      paymentMethod: "",
      bankAccount: "",
      checkNumber: "",
      transactionId: "",
      createdBy: "",
    });
  };

  const [reportForm, setReportForm] = useState({
    startDate: "",
    salesInvoiceId: "",
    amountPaid: "",
    paymentMethod: "",
    bankAccount: "",
    checkNumber: "",
    transactionId: "",
    createdBy: "",
  });

  const calculateRemainingAmount = (invoiceId, newSettledAmount) => {
    const invoiceReceipts = data.filter((row) => row[1] === invoiceId);
    const settledAmount = parseFloat(newSettledAmount);
    if (isNaN(settledAmount) || settledAmount <= 0) {
      throw new Error(
        "Invalid settled amount. Please enter a valid positive number."
      );
    }

    if (invoiceReceipts.length === 0) {
      // Fetch initial invoice amount from API or use a default
      const initialRemainingAmount = 10000; // Replace with API call if possible
      const newRemaining = initialRemainingAmount - settledAmount;
      return newRemaining >= 0 ? newRemaining : 0;
    }

    const sortedReceipts = [...invoiceReceipts].sort(
      (a, b) => parseInt(a[0]) - parseInt(b[0])
    );
    const latestReceipt = sortedReceipts[sortedReceipts.length - 1];
    const latestRemaining = parseFloat(latestReceipt[5]);

    if (isNaN(latestRemaining)) {
      throw new Error("Invalid remaining amount in the latest receipt.");
    }

    const newRemaining = latestRemaining - settledAmount;
    return newRemaining >= 0 ? newRemaining : 0;
  };

  const fetchData = () => {
    fetch("http://127.0.0.1:8000/api/official-receipts/")
      .then((response) => {
        if (!response.ok)
          throw new Error(`Failed to fetch official receipts: ${response.status}`);
        return response.json();
      })
      .then((result) => {
        console.log("API Response (fetchData):", result);
        setData(
          result.map((entry) => [
            entry.or_id || "-",
            entry.invoice_id || "-",
            entry.customer_id || "-",
            entry.or_date ? new Date(entry.or_date).toLocaleString() : "-",
            entry.settled_amount || "-",
            entry.remaining_amount || "-",
            entry.payment_method || "-",
            entry.reference_number || "-",
            entry.created_by || "-",
          ])
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setValidation({
          isOpen: true,
          type: "error",
          title: "Fetch Error",
          message: `Unable to load receipts: ${error.message}. Please try again.`,
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const generateReferenceNumber = () => {
    const randomString = Math.random()
      .toString(36)
      .substring(2, 8)
      .toLowerCase();
    return `REF-${randomString}`;
  };

  const generateCustomORID = () => {
    const prefix = "ACC-OFR";
    const year = new Date().getFullYear();
    const randomString = Math.random()
      .toString(36)
      .substring(2, 7)
      .toUpperCase();
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
      !reportForm.createdBy
    ) {
      setValidation({
        isOpen: true,
        type: "warning",
        title: "Missing Fields",
        message: "Please fill in all required fields.",
      });
      return;
    }

    // Validate payment method-specific fields
    if (reportForm.paymentMethod === "Bank Transfer" && !reportForm.bankAccount) {
      setValidation({
        isOpen: true,
        type: "warning",
        title: "Missing Bank Account",
        message: "Please select or add a bank account for Bank Transfer.",
      });
      return;
    }
    if (reportForm.paymentMethod === "Check" && !reportForm.checkNumber) {
      setValidation({
        isOpen: true,
        type: "warning",
        title: "Missing Check Number",
        message: "Please provide a check number for Check payments.",
      });
      return;
    }
    if (
      reportForm.paymentMethod === "Mobile Payment" &&
      !reportForm.transactionId
    ) {
      setValidation({
        isOpen: true,
        type: "warning",
        title: "Missing Transaction ID",
        message: "Please provide a transaction ID for Mobile Payments.",
      });
      return;
    }

    try {
      const newRemainingAmount = calculateRemainingAmount(
        reportForm.salesInvoiceId,
        reportForm.amountPaid
      );

      if (newRemainingAmount === 0 && parseFloat(reportForm.amountPaid) > 0) {
        setValidation({
          isOpen: true,
          type: "warning",
          title: "Invalid Payment",
          message: `The settled amount (${reportForm.amountPaid}) exceeds the remaining invoice balance.`,
        });
        return;
      }

      const referenceNumber = generateReferenceNumber();
      console.log("Generated reference_number:", referenceNumber);

      // Flexible payload to accommodate different backend field names
      const newReceipt = {
        or_id: generateCustomORID(),
        invoice_id: reportForm.salesInvoiceId,
        customer_id: "SALES-CUST-2025",
        or_date: reportForm.startDate,
        settled_amount: parseFloat(reportForm.amountPaid).toFixed(2),
        remaining_amount: newRemainingAmount.toFixed(2),
        payment_method: reportForm.paymentMethod,
        reference_number: referenceNumber,
        created_by: reportForm.createdBy,
        bank_account:
          reportForm.paymentMethod === "Bank Transfer"
            ? reportForm.bankAccount
            : null,
        check_number:
          reportForm.paymentMethod === "Check" ? reportForm.checkNumber : null,
        check_no:
          reportForm.paymentMethod === "Check" ? reportForm.checkNumber : null, // Fallback
        transaction_id:
          reportForm.paymentMethod === "Mobile Payment"
            ? reportForm.transactionId
            : null,
        transaction_ref:
          reportForm.paymentMethod === "Mobile Payment"
            ? reportForm.transactionId
            : null, // Fallback
      };

      console.log("Submitting receipt:", newReceipt);

      const response = await fetch(
        "http://127.0.0.1:8000/api/official-receipts/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add authentication header if required
            // 'Authorization': 'Bearer <token>',
          },
          body: JSON.stringify(newReceipt),
        }
      );

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
          message:
            errorData.detail ||
            JSON.stringify(errorData) ||
            "An error occurred while creating the receipt. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error creating receipt:", error);
      setValidation({
        isOpen: true,
        type: "error",
        title: "Connection Error",
        message: `Unable to connect to the server: ${error.message}. Please check your connection.`,
      });
    }
  };

  const filteredData = data.filter((row) =>
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
          <Search
            type="text"
            placeholder="Search Record.."
            value={searching}
            onChange={(e) => setSearching(e.target.value)}
          />
          <div>
            <Button
              name="Create Receipt"
              variant="standard2"
              onclick={openModal}
            />
          </div>
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
          setValidation={setValidation}
        />
      )}
      {validation.isOpen && (
        <NotifModal
          isOpen={validation.isOpen}
          onClose={() =>
            setValidation({ ...validation, isOpen: false })
          }
          type={validation.type}
          title={validation.title}
          message={validation.message}
        />
      )}
    </div>
  );
};

export default OfficialReceipts;
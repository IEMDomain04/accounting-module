import React, { useState, useEffect } from "react";
import "../styles/accounting-styling.css";
import Table from "../components/Table";
import Search from "../components/Search";
import Dropdown from "../components/Dropdown";
import Button from "../components/Button";
import CreateGLAccountModal from "../components/CreateGLAccountModal";
import NotifModal from "../components/modalNotif/NotifModal";

const GeneralLedgerAccounts = () => {
  const columns = [
    "GL Account ID",
    "Account Name",
    "Account Code",
    "Account ID",
    "Status",
    "Created at",
  ];
  const [data, setData] = useState([]);
  const [searching, setSearching] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [validation, setValidation] = useState({
    isOpen: false,
    type: "warning",
    title: "",
    message: "",
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchData = () => {
    fetch("http://127.0.0.1:8000/api/general-ledger-accounts/")
      .then((response) => response.json())
      .then((result) => {
        console.log("API Response (fetchData):", result);
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
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    const sortedData = [...data].sort((a, b) => {
      return newSortOrder === "asc"
        ? a[5].localeCompare(b[5])
        : b[5].localeCompare(a[5]);
    });
    setData(sortedData);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status === "" ? "All" : status);
  };

  const handleCreateAccount = (newAccount) => {
    const requiredFields = [
      newAccount.createdAt,
      newAccount.glAccountID,
      newAccount.accountName,
      newAccount.accountID,
      newAccount.status,
      newAccount.accountCode,
    ];

    if (
      requiredFields.includes("") ||
      requiredFields.includes(undefined) ||
      requiredFields.includes(null)
    ) {
      setValidation({
        isOpen: true,
        type: "warning",
        title: "Missing Required Fields",
        message: "Please fill in all required fields.",
      });
      return;
    }

    // Prepare payload for API, excluding account and subAccount
    const payload = {
      gl_account_id: newAccount.glAccountID,
      account_name: newAccount.accountName,
      account_code: newAccount.accountCode,
      account_id: newAccount.accountID,
      status: newAccount.status,
      created_at: newAccount.createdAt,
    };

    fetch("http://127.0.0.1:8000/api/general-ledger-accounts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.detail || "Error creating account");
          });
        }
        return response.json();
      })
      .then((result) => {
        console.log("API Response (handleCreateAccount):", result);
        fetchData();
        closeModal();
        setValidation({
          isOpen: true,
          type: "success",
          title: "Account Created",
          message: "General Ledger Account created successfully!",
        });
      })
      .catch((error) => {
        console.error("Error creating account:", error);
        setValidation({
          isOpen: true,
          type: "error",
          title: "Error Creating Account",
          message: error.message || "Check your database connection.",
        });
      });
  };

  const filteredData = data.filter((row) => {
    const matchesSearch = [row[0], row[1], row[2], row[3], row[4], row[5]]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(searching.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      statusFilter === "" ||
      row[4].toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="generalLedgerAccounts">
      <div className="body-content-container">
        <div className="title-subtitle-container">
          <h1 className="subModule-title">General Ledger Accounts</h1>
        </div>

        <div className="parent-component-container">
          <div className="component-container">
            <Dropdown
              options={["Ascending", "Descending"]}
              style="selection"
              defaultOption="Sort by Date.."
              onChange={handleSort}
            />
            <Dropdown
              options={["All", "Active", "Inactive"]}
              style="selection"
              defaultOption="Filter by Status.."
              onChange={handleStatusFilter}
            />
            <Search
              type="text"
              placeholder="Search Entries.."
              value={searching}
              onChange={(e) => setSearching(e.target.value)}
            />
          </div>
          <div>
            <Button
              name="Create account"
              variant="standard2"
              onclick={openModal}
            />
          </div>
        </div>

        <Table
          data={filteredData}
          columns={columns}
          enableCheckbox={false}
        />
      </div>

      {isModalOpen && (
        <CreateGLAccountModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          handleSubmit={handleCreateAccount}
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

export default GeneralLedgerAccounts;
import React, { useState, useEffect } from "react";
import "../styles/accounting-styling.css";
import Dropdown from "../components/dropdown/Dropdown";
import Table from "../components/table/Table";
import Search from "../components/search/Search";
import NotifModal from "../components/modalNotif/NotifModal";
import ReportModalInput from "../components/ReportModalInput";
import axios from "axios";

const BodyContent = () => {
  const [activeTab, setActiveTab] = useState("General Ledger");
  const [data, setData] = useState([]);
  const [defaultSortedData, setDefaultSortedData] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [searching, setSearching] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scopedData, setScopedData] = useState(null);
  const [reportForm, setReportForm] = useState({
    startDate: "",
    endDate: "",
    journalId: "",
    description: "",
    invoiceId: "",
    currencyId: "",
  });
  const [validation, setValidation] = useState({
    isOpen: false,
    type: "warning",
    title: "",
    message: "",
  });

  const columns = [
    "Entry Line ID",
    "GL Account ID",
    "Account name",
    "Journal ID",
    "Date",
    "Debit",
    "Credit",
    "Description",
  ];

  const API_URL = import.meta.env.VITE_API_URL || "https://vyr3yqctq8.execute-api.ap-southeast-1.amazonaws.com/dev";
  const ENDPOINT = `${API_URL}/api/general-ledger-jel-view/`;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setScopedData(null);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(ENDPOINT);

      const formatted = response.data.map((entry) => ({
        entryLineId: entry.entry_line_id,
        glAccountId: entry.gl_account_id || "N/A",
        accountName: entry.account_name || "No Account",
        journalId: entry.journal_id || "-",
        date: entry.journal_date || entry.date || "-",
        debit: parseFloat(entry.debit_amount || "0.00").toFixed(2),
        credit: parseFloat(entry.credit_amount || "0.00").toFixed(2),
        description: entry.description || "-",
      }));

      return formatted;
    } catch (error) {
      console.error("Error fetching data:", error.response ? error.response.data : error);
      setValidation({
        isOpen: true,
        type: "error",
        title: "Fetch Error",
        message: "Failed to load General Ledger data.",
      });
      return [];
    }
  };

  const fetchAllData = async () => {
    setIsLoading(true);
    const generalLedger = await fetchData();
    const sortedData = [...generalLedger].sort((a, b) => new Date(b.date) - new Date(a.date));
    setData(sortedData);
    setDefaultSortedData(sortedData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const filterByActiveTab = () => {
    if (activeTab === "Accounts Payable") {
      const relevantJournalIds = new Set(
        data
          .filter(
            (entry) =>
              entry.accountName === "Accounts Payable" || entry.accountName === "Raw Material Used"
          )
          .map((entry) => entry.journalId)
      );
      return data.filter((entry) => relevantJournalIds.has(entry.journalId));
    }

    if (activeTab === "Accounts Receivable") {
      const relevantJournalIds = new Set(
        data
          .filter(
            (entry) =>
              entry.accountName === "Accounts Receivable" || entry.accountName === "Sales Revenue"
          )
          .map((entry) => entry.journalId)
      );
      return data.filter((entry) => relevantJournalIds.has(entry.journalId));
    }

    return data;
  };

  const getCurrentTabData = () => scopedData || filterByActiveTab();

  const handleSort = (selected) => {
    setSortOption(selected);
    const currentData = getCurrentTabData();

    if (selected === "Ascending" || selected === "Descending") {
      const order = selected === "Ascending" ? "asc" : "desc";
      setSortOrder(order);

      const sorted = [...currentData].sort((a, b) => {
        const totalA = (parseFloat(a.debit) || 0) + (parseFloat(a.credit) || 0);
        const totalB = (parseFloat(b.debit) || 0) + (parseFloat(b.credit) || 0);
        return order === "asc" ? totalA - totalB : totalB - totalA;
      });

      setData(sorted);
    } else {
      setData(defaultSortedData);
    }
  };

  const filteredData = getCurrentTabData().filter((item) => {
    const searchContent = [
      item.entryLineId,
      item.glAccountId,
      item.accountName,
      item.journalId,
      item.date,
      item.description,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return searchContent.includes(searching.toLowerCase());
  });

  const totalDebit = filteredData.reduce((sum, item) => sum + (parseFloat(item.debit) || 0), 0);
  const totalCredit = filteredData.reduce((sum, item) => sum + (parseFloat(item.credit) || 0), 0);

  const formatNumber = (num) => num.toLocaleString("en-US", { minimumFractionDigits: 2 });

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center p-8 mt-30">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <p className="ml-4 text-gray-600">Loading data...</p>
    </div>
  );

  return (
    <div className="generalLedger">
      <div className="body-content-container">
        <div className="title-subtitle-container">
          <h1 className="subModule-title">{activeTab}</h1>
        </div>

        <div className="parent-component-container">
          <div className="component-container">
            <Dropdown
              options={["Ascending", "Descending"]}
              style="selection"
              defaultOption="Sort Debit Credit.."
              value={sortOption}
              onChange={handleSort}
            />
            <Search
              type="text"
              placeholder="Search Entries.."
              value={searching}
              onChange={(e) => setSearching(e.target.value)}
            />
          </div>

          <div className="flex border-b-2 border-gray-400">
            {["General Ledger", "Accounts Payable", "Accounts Receivable"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors cursor-pointer duration-300 hover:text-teal-500 ${activeTab === tab
                    ? "text-teal-500"
                    : "text-gray-800 hover:text-teal-500"
                  }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute left-0 right-0 -bottom-1 h-1 bg-teal-500"></span>
                )}
              </button>
            ))}
          </div>

        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Table
              data={filteredData.map((item) => [
                item.entryLineId,
                item.glAccountId,
                item.accountName,
                item.journalId,
                item.date,
                item.debit,
                item.credit,
                item.description,
              ])}
              columns={columns}
            />

            <div className="grid grid-cols-7 gap-4 mt-4 items-center border-t pt-2 font-light text-sm">
              <div className="col-span-3"></div>
              <div className="font-bold">Total</div>
              <div>{formatNumber(totalDebit)}</div>
              <div>{formatNumber(totalCredit)}</div>
            </div>
          </>
        )}
      </div>

      <ReportModalInput
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        reportForm={reportForm}
        handleInputChange={(field, value) => setReportForm((prev) => ({ ...prev, [field]: value }))}
        handleSubmit={() => { }}
      />

      {validation.isOpen && (
        <NotifModal
          isOpen={validation.isOpen}
          onClose={() => setValidation((prev) => ({ ...prev, isOpen: false }))}
          type={validation.type}
          title={validation.title}
          message={validation.message}
        />
      )}
    </div>
  );
};

export default BodyContent;

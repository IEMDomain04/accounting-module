import React, { useState, useEffect } from "react";
import "../styles/accounting-styling.css";
import Table from "../components/Table";
import Search from "../components/Search";

const AccountsPayable = () => {
  // Use States
  const [data, setData] = useState([]);
  const [searching, setSearching] = useState("");
  const columns = [
    "Entry Line ID",
    "GL Account ID",
    "Account Name",
    "Journal ID",
    "Debit",
    "Credit",
    "Description",
  ];

  // Fetch Data
  const fetchData = () => {
    fetch("http://127.0.0.1:8000/api/general-ledger-jel-view/")
      .then((response) => response.json())
      .then((result) => {
        console.log("API Response:", result);

        // Get journal IDs for entries involving "Accounts Payable" or "Cash in Bank"
        const relevantJournalIds = new Set(
          result
            .filter(
              (entry) =>
                (entry.account_name === "Accounts Payable" ||
                  entry.account_name === "Cash in Bank") &&
                (entry.debit_amount != 0 || entry.credit_amount != 0)
            )
            .map((entry) => entry.journal_id)
        );

        // Include all entries for those journal IDs to capture both debit and credit sides
        const combinedData = result
          .filter((entry) => relevantJournalIds.has(entry.journal_id))
          .map((entry) => [
            entry.entry_line_id || "N/A",
            entry.gl_account_id || "N/A",
            entry.account_name || "No Account",
            entry.journal_id || "-",
            parseFloat(entry.debit_amount || "0.00").toFixed(2),
            parseFloat(entry.credit_amount || "0.00").toFixed(2),
            entry.description || "-",
          ]);

        console.log("Combined AP and Cash Data:", combinedData);
        setData(combinedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Calculates the total for debit and credit
  const totalDebit = data.reduce((sum, row) => sum + parseFloat(row[4] || 0), 0);
  const totalCredit = data.reduce((sum, row) => sum + parseFloat(row[5] || 0), 0);

  // Search Sorting
  const filteredData = data.filter((row) =>
    [row[0], row[1], row[2], row[3], row[6]]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(searching.toLowerCase())
  );

  // Format the money with comma
  const formatNumber = (num) =>
    num.toLocaleString("en-US", { minimumFractionDigits: 2 });
  const formattedTotalDebit = formatNumber(totalDebit);
  const formattedTotalCredit = formatNumber(totalCredit);

  // Log totals for debugging
  useEffect(() => {
    console.log("Total Debit:", totalDebit, "Total Credit:", totalCredit);
  }, [totalDebit, totalCredit]);

  return (
    <div className="accountsPayable">
      <div className="body-content-container">
        <div className="title-subtitle-container">
          <h1 className="subModule-title">Accounts Payable</h1>
        </div>
        <div className="parent-component-container">
          <Search
            type="text"
            placeholder="Search Record..."
            value={searching}
            onChange={(e) => setSearching(e.target.value)}
          />
        </div>
        <Table data={filteredData} columns={columns} enableCheckbox={false} />
        <div className="grid grid-cols-7 gap-4 mt-4 items-center border-t pt-2 font-light max-sm:text-[10px] max-sm:font-light max-md:text-[10px] max-md:font-light max-lg:text-[10px] max-lg:font-light max-xl:text-[10px] max-xl:font-light 2xl:text-[10px] 2xl:font-light">
          <div className="col-span-3"></div>
          <div className="font-bold">Total</div>
          <div>{formattedTotalDebit}</div>
          <div>{formattedTotalCredit}</div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default AccountsPayable;
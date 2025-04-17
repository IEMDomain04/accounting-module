import React, { useState, useEffect } from "react";
import "../styles/accounting-styling.css";
import Table from "../components/Table";
import Search from "../components/Search";

const FinancialReport = () => {
  const [data, setData] = useState([]);
  const [searching, setSearching] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Update columns to match FinancialReport model
  const columns = [
    "Report ID",
    "Report Type",
    "Total Cost",
    "Start Date",
    "End Date",
    "Generated By",
  ];

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/api/financial-reports/");
        if (!response.ok) {
          throw new Error(`Failed to fetch financial reports: ${response.status}`);
        }
        const apiData = await response.json();
        console.log("API Data:", apiData);

        // Map API data to array format for Table
        const rowData = apiData.map((row) => [
          row.report_id,
          row.report_type,
          row.total_cost, // Consider formatting as string if needed
          row.start_date,
          row.end_date || "N/A", // Handle null end_date
          row.generated_by,
        ]);
        console.log("Row Data:", rowData);

        setData(rowData);
      } catch (err) {
        setError(err.message);
        console.error("Error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data based on search input
  const filteredData = data.filter((row) =>
    columns.some((_, index) =>
      row[index]?.toString().toLowerCase().includes(searching.toLowerCase())
    )
  );

  // Calculate total cost from filtered data
  const totalCost = filteredData.reduce((sum, row) => sum + Number(row[2] || 0), 0); // total_cost is index 2
  const formattedTotalCost = totalCost.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  console.log("Current State:", { loading, error, data, filteredData });

  return (
    <div className="FinancialReport">
      <div className="body-content-container">
        <div className="title-subtitle-container">
          <h1 className="subModule-title">Financial Report</h1>
        </div>
        <div className="parent-component-container">
          <Search
            type="text"
            placeholder="Search by Report ID, Type, Generated By..."
            value={searching}
            onChange={(e) => setSearching(e.target.value)}
          />
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <div>
            <p>Error: {error}</p>
            <button
              onClick={() => {
                setError(null);
                fetchData();
              }}
            >
              Retry
            </button>
          </div>
        ) : filteredData.length === 0 ? (
          <p>No financial reports found</p>
        ) : (
          <>
            <Table data={filteredData} columns={columns} enableCheckbox={false} />
            <div className="grid grid-cols-7 gap-4 mt-4 items-center border-t pt-2 font-light text-sm">
              <div className="col-span-3"></div>
              <div className="font-bold">Total Cost</div>
              <div>{formattedTotalCost}</div>
              <div></div>
              <div></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FinancialReport;
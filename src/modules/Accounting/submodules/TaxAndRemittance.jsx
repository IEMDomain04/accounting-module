import React, { useState, useEffect } from "react";
import "../styles/accounting-styling.css";
import Table from "../components/table/Table";
import Search from "../components/search/Search";
import Button from "../components/button/Button";
import NotifModal from "../components/modalNotif/NotifModal";

const TaxAndRemittance = () => {
  const [data, setData] = useState([]); // State to store table data
  const [isLoading, setIsLoading] = useState(true); // State to manage loading state
  const [validation, setValidation] = useState({
    isOpen: false,
    type: "",
    title: "",
    message: "",
  });

  const columns = [
    "Remittance ID",
    "Employee ID",
    "Deduction Type",
    "Amount",
    "Payment Date",
    "Payment Method",
    "Reference Number",
    "Status",
  ];

  // API Endpoint
  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://vyr3yqctq8.execute-api.ap-southeast-1.amazonaws.com/dev";
  const TAXREMITTANCE_ENDPOINT = `${API_URL}/api/tax_and_remittances/`;

  const fetchTaxRemittanceData = async () => {
    try {
      const response = await fetch(TAXREMITTANCE_ENDPOINT);
      const result = await response.json();

      const transformedData = result.map((item) => [
        item.remittance_id,
        item.employee_id,
        item.deduction_type,
        item.amount,
        item.payment_date,
        item.payment_method,
        item.reference_number,
        item.status,
      ]);

      setData(transformedData);
    } catch (error) {
      console.error("Error fetching payroll data:", error);
      setValidation({
        isOpen: true,
        type: "error",
        title: "Error",
        message: "Failed to fetch Tax and Remittance data.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTaxRemittanceData();
  }, []);

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center p-8 mt-30">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <p className="ml-4 text-gray-600">Loading Tax and Remittance data...</p>
    </div>
  );

  return (
    <div className="accountsPayable">
      <div className="body-content-container">
        <div className="title-subtitle-container">
          <h1 className="subModule-title">Tax and Remittance</h1>
        </div>

        <div className="parent-component-container">
          <div className="component-container">
            <Search />
          </div>

          <div className="component-container">
            <Button name="Update" variant="standard2" />
          </div>
        </div>

        {/* Tax and Remittance Table */}
        <div className="title-subtitle-container">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <Table columns={columns} data={data} />
          )}
        </div>
      </div>

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

export default TaxAndRemittance;
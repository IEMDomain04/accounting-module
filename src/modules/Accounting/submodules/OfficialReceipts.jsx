import React, { useState } from 'react';
import "../styles/Accounting-Global-Styling.css";
import Forms from "../components/Forms";
import Table from "../components/Table";



const OfficialReceipts = () => {
  const columns = ["OR ID", "Invoice ID", "Customer ID", "OR Date", "Settled Amount", "Remaining Amount", "Payment Method", "Reference #", "Created By"];
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch('Change this sa API')
      .then(response => response.json())
      .then(result => {
        console.log('API Response (fetchData):', result);
        
        if (result.length > 0) {
          console.log('Keys in first entry:', Object.keys(result[0]));
          console.log('First entry full object:', result[0]);
        } else {
          console.log('No data returned from API - Did JournalEntry save?');
        }

        setData(result.map(entry => {
          const row = [
            entry.or_id || "-", // OR ID
            entry.invoice_id || "-", // Invoice ID
            entry.customer_id || "-", // Customer ID
            entry.or_date ? new Date(entry.or_date).toLocaleString() : "-", // OR Date
            entry.settled_amount || "-", // Settled Amount
            entry.remaining_amount || "-", // Remaining Amount
            entry.payment_method || "-", // Payment Method
            entry.reference_number || "-", // Reference #
            entry.created_by || "-" // Created By
          ];
          console.log('Mapped row:', row);
          return row;
        }));
      })
      .catch(error => console.error('Error fetching data:', error));
};

useEffect(() => {
    fetchData();
}, []);

  return (
    <div className="chartAccounts">
      <div className="body-content-container">

        <div className="title-subtitle-container">
          <h1 className="subModule-title">Official Receipts</h1>
          <h2 className="subModule-subTitle">List of receipts from different modules.</h2>
        </div>

        <div className="parent-component-container">
          <Forms type="text" placeholder="Search account..." />
        </div>

        <Table data={data} columns={columns} enableCheckbox={false} />

      </div>
    </div>
  )
}

export default OfficialReceipts
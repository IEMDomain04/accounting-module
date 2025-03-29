import React, { useState, useEffect } from 'react';
import '../styles/Accounting-Global-Styling.css';
import Forms from '../components/Forms';
import Table from '../components/Table';

const GeneralLedgerAccounts = () => {
  const columns = ["GL Account ID", "Account name", "Account code", "Account ID", "Status", "Created at.."];
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch('http://127.0.0.1:8000/api/general-ledger-accounts/').then(response => response.json())
  }

  return (
    <div className="generalLedger">
      <div className="body-content-container">

        <div className="title-subtitle-container">
          <h1 className="subModule-title">General Ledger Accounts</h1>
          <h2 className="subModule-subTitle">The whole record of accounts.</h2>
        </div>

        <div className="parent-component-container">
          <Forms type="text" placeholder="Search account..." />
        </div>

        <Table data={data} columns={columns} enableCheckbox={false} />

      </div>
    </div>
  );
};

export default GeneralLedgerAccounts;

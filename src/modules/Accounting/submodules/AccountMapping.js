export const accountCodeMapping = {
    "Assets": { prefix: "CA", baseNumber: 1010 },
    "Non-Current Assets": { prefix: "NC", baseNumber: 1100 },
    "Current Liabilities": { prefix: "CL", baseNumber: 2010 },
    "Non-Current Liabilities": { prefix: "NL", baseNumber: 2100 },
    "Equity": { prefix: "EQ", baseNumber: 3010 },
    "Revenue": { prefix: "RV", baseNumber: 4010 },
    "Cost of Goods Sold": { prefix: "CG", baseNumber: 5010 },
    "Administrative Expenses": { prefix: "AE", baseNumber: 6010 },
    "Selling and Distribution Expenses": { prefix: "SD", baseNumber: 6100 },
    "Other Income": { prefix: "OI", baseNumber: 7010 },
    "Other Expenses": { prefix: "OE", baseNumber: 7100 },
    "Internal Budgetary": { prefix: "IB", baseNumber: 8010 },
  };

  export const accountCodeMapping2 = {
    Assets: {
      "Cash on Hand": { prefix: "CA", baseNumber: 1010 },
      "Cash in Bank": { prefix: "CA", baseNumber: 1020 },
      "Accounts Receivable": { prefix: "CA", baseNumber: 1030 },
      "Allowance for Doubtful Accounts (Contra-Asset)": { prefix: "CA", baseNumber: 1040 },
      "Raw Materials Inventory": { prefix: "CA", baseNumber: 1050 },
      "Work-in-Process (WIP) Inventory": { prefix: "CA", baseNumber: 1060 },
      "Finished Goods Inventory": { prefix: "CA", baseNumber: 1070 },
      "Prepaid Expenses (Rent, Insurance, etc.)": { prefix: "CA", baseNumber: 1080 },
      "Supplier Advances": { prefix: "CA", baseNumber: 1090 },
    },
    "Non-Current Assets": {
      "Land & Buildings": { prefix: "NC", baseNumber: 1100 },
      "Machinery & Equipment": { prefix: "NC", baseNumber: 1110 },
      "Vehicles": { prefix: "NC", baseNumber: 1120 },
      "Office Furniture & Fixtures": { prefix: "NC", baseNumber: 1130 },
      "Computers & IT Equipment": { prefix: "NC", baseNumber: 1140 },
      "Intangible Assets (Patents, Trademarks, Software)": { prefix: "NC", baseNumber: 1150 },
      "Accumulated Depreciation (Contra-Asset)": { prefix: "NC", baseNumber: 1160 },
    },
    "Current Liabilities": {
      "Accounts Payable (Supplier Balances)": { prefix: "CL", baseNumber: 2010 },
      "Accrued Expenses (Unpaid Wages, Utilities, etc.)": { prefix: "CL", baseNumber: 2020 },
      "Taxes Payable (VAT, Income Tax, Payroll Tax)": { prefix: "CL", baseNumber: 2030 },
      "Short-Term Loans Payable": { prefix: "CL", baseNumber: 2040 },
      "Customer Deposits (Advance Payments)": { prefix: "CL", baseNumber: 2050 },
    },
    "Non-Current Liabilities": {
      "Long-Term Loans Payable": { prefix: "NL", baseNumber: 2100 },
      "Bonds Payable": { prefix: "NL", baseNumber: 2110 },
      "Lease Liabilities": { prefix: "NL", baseNumber: 2120 },
    },
    Equity: {
      "Owner’s Capital / Shareholder’s Equity": { prefix: "EQ", baseNumber: 3010 },
      "Retained Earnings": { prefix: "EQ", baseNumber: 3020 },
      "Dividends Payable": { prefix: "EQ", baseNumber: 3030 },
    },
    Revenue: {
      "Sales Revenue (Main Product Sales)": { prefix: "RV", baseNumber: 4010 },
      "Service Revenue (If Offering Custom Services)": { prefix: "RV", baseNumber: 4020 },
      "Discounts Allowed (Contra-Revenue)": { prefix: "RV", baseNumber: 4030 },
      "Sales Return": { prefix: "RV", baseNumber: 4040 },
    },
    "Cost of Goods Sold": {
      "Raw Materials Used": { prefix: "CG", baseNumber: 5010 },
      "Direct Labor (Factory Workers)": { prefix: "CG", baseNumber: 5020 },
      "Factory Overhead (Utilities, Rent, Depreciation)": { prefix: "CG", baseNumber: 5030 },
      "Work-in-Process Adjustments": { prefix: "CG", baseNumber: 5040 },
      "Cost of Finished Goods Sold": { prefix: "CG", baseNumber: 5050 },
    },
    "Administrative Expenses": {
      "Salaries & Wages (Office & Admin Staff)": { prefix: "AE", baseNumber: 6010 },
      "Office Supplies & Equipment": { prefix: "AE", baseNumber: 6020 },
      "Rent & Utilities (Office)": { prefix: "AE", baseNumber: 6030 },
      "Depreciation (Office Equipment, Computers)": { prefix: "AE", baseNumber: 6040 },
      "Software & IT Expenses": { prefix: "AE", baseNumber: 6050 },
      "Legal & Professional Fees": { prefix: "AE", baseNumber: 6060 },
    },
    "Selling and Distribution Expenses": {
      "Marketing & Advertising": { prefix: "SD", baseNumber: 6100 },
      "Sales Commissions": { prefix: "SD", baseNumber: 6110 },
      "Shipping & Freight Costs": { prefix: "SD", baseNumber: 6120 },
      "Packaging Costs": { prefix: "SD", baseNumber: 6130 },
    },
    "Other Income": {
      "Interest Income": { prefix: "OI", baseNumber: 7010 },
      "Gain on Sale of Assets": { prefix: "OI", baseNumber: 7020 },
      "Investment Income": { prefix: "OI", baseNumber: 7030 },
    },
    "Other Expenses": {
      "Interest Expense": { prefix: "OE", baseNumber: 7100 },
      "Loss on Sale of Assets": { prefix: "OE", baseNumber: 7110 },
      "Investment Losses": { prefix: "OE", baseNumber: 7120 },
    },
    "Internal Budgetary": {
      "Budgetary Control": { prefix: "IB", baseNumber: 8010 },
      "Encumbrance Control": { prefix: "IB", baseNumber: 8020 },
    },
  };
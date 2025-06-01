# 📘 Kinetiq ERP System - Accounting Module

This repository contains the **Accounting Module** of the Kinetiq ERP System.

### 👥 Team Members
- **Jason William Almendra** – Project Manager  
- **Jericho Ambrocio** – Back-end Developer  
- **Edrill Bilan** – Business Analyst  
- **Fredrick Habla** – Database Specialist  
- **Kryztine Igaya** – Quality Assurance  
- **Emman Manduriaga** – Front-end Developer  

---

### 📦 Features — 9 Submodules
- Chart of Accounts  
- Journal  
- Journal Entry  
- General Ledger  
- General Ledger Accounts  
- Official Receipts  
- Payroll Accounting  
- Tax and Remittance  
- Accounts Payable Receipts  

---

## 🚀 Getting Started

## Clone repository
```bash
git clone https://github.com/IEMDomain04/accounting-module.git
```

## Include node_modules
```bash
npm install
```

## Install backend requirements
```bash
cd backend
```
```bash
pip install -r requirements.txt
```

## Backend with UI
**Note:** Please check the **settings.py** under kinetiq-erp-accounting-backend-main and ensure that the _**database name**_ and _**password**_ match your PostgreSQL setup before proceeding.

In a separate terminal..
```bash
cd backend
```
then..
```bash
cd kinetiq-erp-accounting-backend-main
```
after that..
```bash
python manage.py runserver
```
Click on the localhost that will be displayed; it corresponds to the Django server.
Goods na yan. hahaha

## Run UI
In another terminal.. 
```bash
npm run dev
```
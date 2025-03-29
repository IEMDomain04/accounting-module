# Accounting module
This is the accounting module for the Kinetiq ERP system. [In progress..]

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
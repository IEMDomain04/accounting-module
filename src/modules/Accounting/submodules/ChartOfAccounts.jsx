import "../styles/accounting-styling.css";
import React, { useState, useEffect } from "react";
import { subAccounts } from "./ListOfAccounts";
import axios from "axios";
import Search from "../components/Search";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import Table from "../components/Table";
import CoaModalInput from "../components/CoaModalInput";
import NotifModal from "../components/modalNotif/NotifModal";

const BodyContent = () => {
    // Use states
    const columns = ["Account code", "Account name", "Account type"];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const [newAccount, setNewAccount] = useState({
        account_code: "",
        account_name: "",
        account_type: ""
    });


    // Open modal function
    const openModal = () => setIsModalOpen(true);
    
    
    // Close modal function
    const closeModal = () => setIsModalOpen(false);


    // Fetch data
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/chart-of-accounts/")
            .then(response => {
                setData(response.data.map(acc => [acc.account_code, acc.account_name, acc.account_type]));
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);


    // Handle Input Change
    const handleInputChange = (field, value) => {
        setNewAccount(prev => ({ ...prev, [field]: value }));
    };
    const [validation, setValidation] = useState({
        isOpen: false,
        type: "warning",
        title: "",
        message: "",
    });

    
    // Submit input w/ user validations
    const handleSubmit = async () => {
        if (!newAccount.account_code && !newAccount.account_name && !newAccount.account_type) {
            setValidation({
                isOpen: true,
                type: "warning",
                title: "All Fields Required",
                message: "Please fill in all the fields.",
            });
            return;
        }

        if (!newAccount.account_type) {
            setValidation({
                isOpen: true,
                type: "warning",
                title: "Missing Account Type",
                message: "Please select an account type.",
            });
            return;
        }

        if (!newAccount.account_code) {
            setValidation({
                isOpen: true,
                type: "warning",
                title: "Missing Account Code",
                message: "Please provide an account code.",
            });
            return;
        }

        if (!newAccount.account_name) {
            setValidation({
                isOpen: true,
                type: "warning",
                title: "Missing Account Name",
                message: "Please provide an account name.",
            });
            return;
        }


        // Checks if the account_code already exists
        const accountCodeExists = data.some(row => row[0] === newAccount.account_code);
        if (accountCodeExists) {
            setValidation({
                isOpen: true,
                type: "warning",
                title: "Account Already Exist",
                message: "The account you're creating is already created.",
            });
            return;
        }


        // Checks if data is successfully submitted
        try {
            console.log("Submitting data:", newAccount);

            const response = await axios.post("http://127.0.0.1:8000/api/chart-of-accounts/", newAccount);

            if (response.status === 201) {
                const addedAccount = response.data;
                setData(prevData => [...prevData, [addedAccount.account_code, addedAccount.account_name, addedAccount.account_type]]);
                setNewAccount({ account_code: "", account_name: "", account_type: "" });
                closeModal(); // ✅ Close modal after adding account
                setValidation({
                    isOpen: true,
                    type: "success",
                    title: "Account Added",
                    message: "Successfully created account",
                });
            } else {
                setValidation({
                    isOpen: true,
                    type: "error",
                    title: "Server Error: Adding Account failed",
                    message: "Creating account failed",
                });
            }
        } catch (error) {
            console.error("Error submitting data:", error.response ? error.response.data : error);
            setValidation({
                isOpen: true,
                type: "error",
                title: "Check Connection!",
                message: "Kindly check your connection to the database.",
            });
        }
    };


    // Merged all of the sub-accounts for sorting
    const mergeSubAccounts = (subAccounts) => {
        return Object.values(subAccounts).flat();
    };

    return (
        <div className="chartAccounts">
            <div className="body-content-container">

                <div className="title-subtitle-container">
                    <h1 className="subModule-title">Chart of Accounts</h1>
                </div>

                <div className="parent-component-container">
                    <div className="component-container">
                        <Dropdown options={mergeSubAccounts(subAccounts)} style="selection" defaultOption="Sort accounts.." />
                        <Search type="text" placeholder="Search account.." />
                    </div>

                    <div className="component-container">
                        <Button name={isModalOpen ? "Creating..." : "Create Account"} variant="standard2" onclick={openModal} /> {/* ✅ Fixed onClick */}
                    </div>
                </div>

                {/* Table Display */}
                <Table data={data} columns={columns} enableCheckbox={false} />
            </div>

            <CoaModalInput
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                coaForm={newAccount}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
            />

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

export default BodyContent;

import CoaModalInput from "../components/chartOfAccountsModal/CoaModalInput";
import NotifModal from "../components/modalNotif/NotifModal";
import Dropdown from "../components/dropdown/Dropdown";
import React, { useState, useEffect } from "react";
import Search from "../components/search/Search";
import Button from "../components/button/Button";
import Table from "../components/table/Table";
import "../styles/accounting-styling.css";
import axios from "axios";

const BodyContent = () => {
  const [selectedAccountType, setSelectedAccountType] = useState("");
  const columns = ["Account code", "Account name", "Account type"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accountTypes, setAccountTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searching, setSearching] = useState("");
  const [data, setData] = useState([]);
  const [newAccount, setNewAccount] = useState({
    account_code: "",
    account_name: "",
    account_type: "",
  });
  const [validation, setValidation] = useState({
    isOpen: false,
    type: "warning",
    title: "",
    message: "",
  });



  // API endpoint
  const API_URL =
    import.meta.env.VITE_API_URL || "https://vyr3yqctq8.execute-api.ap-southeast-1.amazonaws.com/dev";
  const CHART_OF_ACCOUNTS_ENDPOINT = `${API_URL}/api/chart-of-accounts/`;



  // Function: Open and Closes the Modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);



  // Fetching: Chart of Accounts data (with loading)
  useEffect(() => {
    setIsLoading(true);
    axios.get(CHART_OF_ACCOUNTS_ENDPOINT).then((response) => {
        const rawData = response.data.map((acc) => [
          acc.account_code,
          acc.account_name,
          acc.account_type,
        ]);
        setData(rawData);


        const uniqueTypes = [...new Set(response.data.map((acc) => acc.account_type))];
        setAccountTypes(uniqueTypes);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.response ? error.response.data : error);
        setValidation({
          isOpen: true,
          type: "error",
          title: "Fetch Error",
          message: "Failed to load accounts. Please check your connection.",
        });
        setIsLoading(false);
      });
  }, []);



  // Function: Updates the previous value of the modal
  const handleInputChange = (field, value) => {
    setNewAccount((prev) => ({ ...prev, [field]: value }));
  };



  // Function: For Account Modal button adding new account
  const handleSubmit = async () => {

    // User validations
    if (!newAccount.account_code && !newAccount.account_name && !newAccount.account_type) {
      setValidation({
        isOpen: true,
        type: "warning",
        title: "All Fields Required",
        message: "Please fill in all the fields.",
      });
      return;
    }

    if (!newAccount.account_name) {
      setValidation({
        isOpen: true,
        type: "warning",
        title: "Missing Accounts Name",
        message: "Please Enter Account Name Before Proceeding",
      });
      return;
    }

    if(!newAccount.account_type && !newAccount.account_code) {
      setValidation({
        isOpen: true,
        type: "warning",
        title: "Missing Account Type and Code",
        message: "Please select an account type to generate an account code.",
      });
      return;
    }


    // User validation: If the account already exists (Basis: Account code)
    const accountCodeExists = data.some((row) => row[0] === newAccount.account_code);
    if (accountCodeExists) {
      setValidation({
        isOpen: true,
        type: "warning",
        title: "Account Already Exists",
        message: "The account code is already used.",
      });
      return;
    }



    // Try Catch: If adding new account successful and not 
    try {
      console.log("Submitting data:", newAccount);
      const response = await axios.post(CHART_OF_ACCOUNTS_ENDPOINT, newAccount);

      // Added: Successful
      if (response.status === 201) {
        const addedAccount = response.data;
        setData((prevData) => [
          ...prevData,
          [addedAccount.account_code, addedAccount.account_name, addedAccount.account_type],
        ]);
        setNewAccount({ account_code: "", account_name: "", account_type: "" });
        closeModal();
        setValidation({
          isOpen: true,
          type: "success",
          title: "Account Added",
          message: "Successfully created account.",
        });
      } else {
        setValidation({
          isOpen: true,
          type: "error",
          title: "Server Error",
          message: "Creating account failed.",
        });
      }
    } catch (error) {
      console.error("Error submitting data:", error.response ? error.response.data : error);
      setValidation({
        isOpen: true,
        type: "error",
        title: "Check Connection!",
        message: error.response?.data?.detail || "Failed to connect to the server.",
      });
    }
  };



  // Search and Sorting Function: Filtering Data
  const filteredData = data.filter(([code, name, type]) => {
    const matchesSearch = [code, name, type]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(searching.trim().toLowerCase());
    const matchesType = selectedAccountType ? type === selectedAccountType : true;
    return matchesSearch && matchesType;
  });



  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center p-8 mt-30">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <p className="ml-4 text-gray-600">Loading chart of accounts data...</p>
    </div>
  );

  return (
    <div className="chartAccounts">
      <div className="body-content-container">


        {/* Title */}
        <div className="title-subtitle-container">
          <h1 className="subModule-title">Chart of Accounts</h1>
        </div>


        {/* Components  */}
        <div className="parent-component-container">

          <div className="component-container">
            <Dropdown
              options={accountTypes}
              style="selection"
              defaultOption="Sort accounts..."
              value={selectedAccountType}
              onChange={(value) => setSelectedAccountType(value)}
            />
            <Search
              type="text"
              placeholder="Search account.."
              onChange={(e) => setSearching(e.target.value)}
            />
          </div>
          <div className="component-container">
            <Button
              name={isModalOpen ? "Creating..." : "Create Account"}
              variant="standard2"
              onclick={openModal}
            />
          </div>
        </div>


        {/* Table component: With Loading */}
        {isLoading ? (<LoadingSpinner />) : (<Table data={filteredData} columns={columns} enableCheckbox={false} />)}  
      </div>


      {/* Input Modal */}
      <CoaModalInput
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        coaForm={newAccount}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />


      {/* User Validation Modal */}
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
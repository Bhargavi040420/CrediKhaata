import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CustomerDetails from "./pages/CustomerDetail";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getStoredCustomers, saveCustomers } from "./utils/localStorageUtils"; // ✅ import

function App() {
  const [customers, setCustomers] = useState(() => getStoredCustomers());


  // ✅ Load from localStorage on app load
  useEffect(() => {
    const stored = getStoredCustomers();
    setCustomers(stored);
  }, []);

  // ✅ Save to localStorage whenever customers change
  useEffect(() => {
    saveCustomers(customers);
    console.log("Dashboard Component Rendered - Customers:", customers);
  }, [customers]);

  const handleAddCustomer = (newCustomer) => {
    const id = Date.now();
    setCustomers(prev => [
      ...prev,
      { ...newCustomer, id, loans: [] }
    ]);
  };

  const handleAddLoan = (customerId, loanData) => {
    const loanId = Date.now();
    setCustomers(prev =>
      prev.map(c =>
        c.id === customerId
          ? {
              ...c,
              loans: [...(c.loans || []), { ...loanData, id: loanId, repayments: [] }]
            }
          : c
      )
    );
  };

  const handleAddRepayment = (customerId, loanId, repaymentData) => {
    setCustomers(prev =>
      prev.map(c =>
        c.id === customerId
          ? {
              ...c,
              loans: c.loans.map(loan =>
                loan.id === loanId
                  ? {
                      ...loan,
                      repayments: [...(loan.repayments || []), repaymentData]
                    }
                  : loan
              )
            }
          : c
      )
    );
  };

  return (
    <Router>
      <ToastContainer position="top-left" autoClose={3000} />
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              customers={customers}
              onAddCustomer={handleAddCustomer}
              onAddLoan={handleAddLoan}
              onAddRepayment={handleAddRepayment}
            />
          }
        />
        <Route
          path="/customer/:customerId"
          element={<CustomerDetails customers={customers} />}
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              customers={customers}
              onAddCustomer={handleAddCustomer}
            onAddLoan={handleAddLoan}
              onAddRepayment={handleAddRepayment}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;










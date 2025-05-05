// src/components/RecordRepaymentForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RecordRepaymentForm = ({ recordRepayment, customerId, loanId }) => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount <= 0 || !date) {
      setError("Amount and date are required and amount should be greater than 0");
      return;
    }

    recordRepayment(customerId, loanId, { amount, date });
    setAmount("");
    setDate("");
    setError("");
    navigate(`/customer/${customerId}`); // Navigate to the customer detail page
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold">Record Repayment</h2>
      <div>
        <label htmlFor="amount" className="block text-sm font-medium">Repayment Amount</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input"
          placeholder="Enter repayment amount"
        />
      </div>
      <div>
        <label htmlFor="date" className="block text-sm font-medium">Repayment Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input"
        />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button type="submit" className="btn">Record Repayment</button>
    </form>
  );
};

export default RecordRepaymentForm;

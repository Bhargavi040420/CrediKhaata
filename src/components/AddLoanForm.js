import React, { useState } from "react";

const AddLoanForm = ({ customers, onAddLoan }) => {
  const [customerId, setCustomerId] = useState("");
  const [item, setItem] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!customerId || !item || !loanAmount || !dueDate) {
      alert("All fields are required!");
      return;
    }

    const newLoan = {
      item,
      loanAmount: parseFloat(loanAmount),
      dueDate,
      repayments: [],
    };

    onAddLoan(parseInt(customerId), newLoan);

    // Reset fields
    setCustomerId("");
    setItem("");
    setLoanAmount("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h2 className="text-xl font-bold mb-2">💳 Add Loan</h2>
      <select value={customerId} onChange={(e) => setCustomerId(e.target.value)} className="border p-2 mr-2">
        <option value="">Select Customer</option>
        {customers.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item"
        className="border p-2 mr-2"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <input
        type="number"
        placeholder="Loan amount"
        className="border p-2 mr-2"
        value={loanAmount}
        onChange={(e) => setLoanAmount(e.target.value)}
      />
      <input
        type="date"
        className="border p-2 mr-2"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Add
      </button>
    </form>
  );
};

export default AddLoanForm;



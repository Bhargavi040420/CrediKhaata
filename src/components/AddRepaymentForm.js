import React, { useState } from "react";

const AddRepaymentForm = ({ customers, onAddRepayment }) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [selectedLoanId, setSelectedLoanId] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCustomerId || !selectedLoanId || !amount || !date) return;

    onAddRepayment(parseInt(selectedCustomerId), parseInt(selectedLoanId), {
      amount: parseFloat(amount),
      date,
    });

    setAmount("");
    setDate("");
  };

  const selectedCustomer = customers.find(
    (c) => c.id === parseInt(selectedCustomerId)
  );
  const loans = selectedCustomer?.loans || [];

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Add Repayment</h2>
      <div className="flex gap-4 mb-2">
        <select
          value={selectedCustomerId}
          onChange={(e) => {
            setSelectedCustomerId(e.target.value);
            setSelectedLoanId(""); // reset loan on customer change
          }}
          className="border p-2"
        >
          <option value="">Select Customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={selectedLoanId}
          onChange={(e) => setSelectedLoanId(e.target.value)}
          className="border p-2"
          disabled={!selectedCustomerId}
        >
          <option value="">Select Loan</option>
          {loans.map((loan) => (
            <option key={loan.id} value={loan.id}>
              ₹{loan.loanAmount} - Due {new Date(loan.dueDate).toLocaleDateString()}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-4 mb-2">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2"
        />
      </div>

      <button type="submit" className="bg-green-500 text-white px-4 py-2">
        Add Repayment
      </button>
    </form>
  );
};

export default AddRepaymentForm;



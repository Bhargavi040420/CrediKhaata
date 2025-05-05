import React, { useState } from "react";

const TransactionForm = ({ type, onSubmit }) => {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) return;
    onSubmit({ amount: parseFloat(amount), type });
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-x-2 mt-2">
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border px-2 py-1"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
        {type === "credit" ? "Add Credit" : "Add Repayment"}
      </button>
    </form>
  );
};

export default TransactionForm;


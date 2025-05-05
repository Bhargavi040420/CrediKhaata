import React, { useState } from "react";

const AddCustomerForm = ({ onAddCustomer }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      alert("Customer name cannot be empty!");
      return;
    }

    const newCustomer = {
      id: Date.now(),
      name,
      loans: [],
    };

    onAddCustomer(newCustomer);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h2 className="text-xl font-bold mb-2">➕ Add Customer</h2>
      <input
        type="text"
        placeholder="Customer name"
        className="border p-2 mr-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add
      </button>
    </form>
  );
};

export default AddCustomerForm;


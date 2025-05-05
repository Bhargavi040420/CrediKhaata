import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ import this

function AddCustomer({ addCustomer }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [balance, setBalance] = useState('');
  const [dueDate, setDueDate] = useState('');

  const navigate = useNavigate(); // ✅ get navigate function

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCustomer = {
      name,
      phone,
      balance: parseFloat(balance),
      dueDate,
    };

    addCustomer(newCustomer);

    // ✅ Navigate to dashboard after adding
    navigate('/');
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Customer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Customer Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label className="block font-medium">Phone Number</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label className="block font-medium">Initial Balance (₹)</label>
          <input type="number" value={balance} onChange={(e) => setBalance(e.target.value)} className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label className="block font-medium">Next Due Date</label>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full p-2 border rounded" required />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Customer
        </button>
      </form>
    </div>
  );
}

export default AddCustomer;





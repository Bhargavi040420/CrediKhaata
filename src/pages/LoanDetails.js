// src/pages/LoanDetails.js
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const LoanDetails = ({ customers }) => {
  const { id } = useParams(); // Get customer ID from URL
  const { isDarkMode } = useTheme();
  const customer = customers.find((c) => c.id === parseInt(id));

  if (!customer) {
    return <p>Customer not found.</p>;
  }

  const today = new Date();

  return (
    <div className={`p-6 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <h2 className="text-2xl font-bold mb-4">{customer.name}'s Loan Details</h2>

      {(!customer.loans || customer.loans.length === 0) ? (
        <p>No loans or repayments found.</p>
      ) : (
        customer.loans.map((loan) => {
          const totalRepaid = loan.repayments?.reduce((sum, rep) => sum + rep.amount, 0) || 0;
          const balance = loan.loanAmount - totalRepaid;
          const isOverdue = new Date(loan.dueDate) < today;

          return (
            <div
              key={loan.id}
              className={`border p-4 mb-4 rounded ${isOverdue ? "border-red-500 bg-red-100" : "border-green-500"}`}
            >
              <h3 className="text-lg font-semibold mb-2">Loan Information</h3>
              <p><strong>Loan Amount:</strong> ₹{loan.loanAmount}</p>
              <p><strong>Due Date:</strong> {new Date(loan.dueDate).toLocaleDateString()}</p>
              <p><strong>Outstanding Balance:</strong> ₹{balance}</p>
              <p><strong>Status:</strong> {isOverdue ? "Overdue 🔴" : "Up-to-date ✅"}</p>

              <h4 className="mt-4 font-semibold">Repayments:</h4>
              {loan.repayments && loan.repayments.length > 0 ? (
                <ul className="list-disc ml-6">
                  {loan.repayments.map((rep, index) => (
                    <li key={index}>
                      ₹{rep.amount} on {new Date(rep.date).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No repayments yet.</p>
              )}
            </div>
          );
        })
      )}

      <Link
        to="/dashboard"
        className="inline-block mt-4 text-blue-600 hover:underline"
      >
        ⬅ Back to Dashboard
      </Link>
    </div>
  );
};

export default LoanDetails;



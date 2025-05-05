import React from "react";
import AddCustomerForm from "../components/AddCustomerForm";
import AddLoanForm from "../components/AddLoanForm";
import AddRepaymentForm from "../components/AddRepaymentForm";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import Navbar from "../components/Navbar"; // ✅ Import the Navbar




const Dashboard = ({ customers = [], onAddCustomer, onAddLoan, onAddRepayment }) => {
  const { isDarkMode } = useTheme();

  const calculateOutstandingBalance = (loans) => {
    return loans.reduce((total, loan) => {
      const totalRepayments = loan.repayments?.reduce((sum, rep) => sum + rep.amount, 0) || 0;
      return total + (loan.loanAmount - totalRepayments);
    }, 0);
  };

  const getNextDueDate = (loans) => {
    const dates = loans.map((loan) => new Date(loan.dueDate)).sort((a, b) => a - b);
    return dates.length > 0 ? dates[0].toLocaleDateString() : "N/A";
  };

  const getStatus = (loans) => {
    const today = new Date();
    return loans.some((loan) => new Date(loan.dueDate) < today) ? "Overdue" : "Up-to-date";
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <Navbar /> {/* ✅ Add the Navbar here */}

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <AddCustomerForm onAddCustomer={onAddCustomer} />
        <AddLoanForm customers={customers} onAddLoan={onAddLoan} />
        <AddRepaymentForm customers={customers} onAddRepayment={onAddRepayment} />

        {customers.length === 0 ? (
          <p>No customers added yet.</p>
        ) : (
          <div className="overflow-x-auto mt-6">
            <table className="table-auto w-full border border-gray-300">
              <thead>
                <tr className={`${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                  <th className="p-2 sm:p-3 text-xs sm:text-sm border">Name</th>
                  <th className="p-2 sm:p-3 text-xs sm:text-sm border">Outstanding Balance</th>
                  <th className="p-2 sm:p-3 text-xs sm:text-sm border">Next Due Date</th>
                  <th className="p-2 sm:p-3 text-xs sm:text-sm border">Status</th>
                  <th className="p-2 sm:p-3 text-xs sm:text-sm border">View</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => {
                  const balance = calculateOutstandingBalance(customer.loans || []);
                  const dueDate = getNextDueDate(customer.loans || []);
                  const status = getStatus(customer.loans || []);

                  return (
                    <tr key={customer.id} className="text-xs sm:text-sm">
                      <td className="p-2 sm:p-3 border">{customer.name}</td>
                      <td className="p-2 sm:p-3 border">₹{balance}</td>
                      <td className="p-2 sm:p-3 border">{dueDate}</td>
                      <td
                        className={`p-2 sm:p-3 border ${
                          status === "Overdue" ? "text-red-500 font-semibold" : "text-green-600"
                        }`}
                      >
                        {status}
                      </td>
                      <td className="p-2 sm:p-3 border">
                        <Link
                          to={`/customer/${customer.id}`}
                          className="text-blue-600 hover:underline px-2 py-1 inline-block"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
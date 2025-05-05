import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { toast } from 'react-toastify'; // <-- Add this

const CustomerDetails = ({ customers }) => {
  const { customerId } = useParams();
  const navigate = useNavigate();

  // Find the customer by id
  const customer = customers.find((c) => c.id === parseInt(customerId));

  if (!customer) {
    toast.error('Customer not found'); // <-- Toast for error
    return (
      <div>
        <p>Customer not found</p>
        <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      </div>
    );
  }

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const customerName = customer.name;

    doc.setFontSize(16);
    doc.text(`Customer Statement - ${customerName}`, 14, 20);

    let finalY = 30;

    customer.loans?.forEach((loan, index) => {
      doc.setFontSize(12);
      doc.text(`Loan ${index + 1}`, 14, finalY);
      autoTable(doc, {
        startY: finalY + 5,
        head: [["Loan Amount", "Due Date"]],
        body: [[`₹${loan.loanAmount}`, loan.dueDate]],
      });
      

      finalY = doc.lastAutoTable.finalY + 5;

      if (loan.repayments?.length > 0) {
        doc.text("Repayments", 14, finalY);
        autoTable(doc, {
          startY: finalY + 5,
          head: [["Amount", "Date"]],
          body: loan.repayments.map((rep) => [`₹${rep.amount}`, rep.date]),
        });
        
        finalY = doc.lastAutoTable.finalY + 10;
      } else {
        doc.text("No repayments yet.", 14, finalY + 5);
        finalY += 15;
      }
    });

    doc.save(`${customerName}_Statement.pdf`);
    toast.success('PDF downloaded successfully!'); // <-- Toast for success
  };

  return (
    <div>
      <h2>Customer Details</h2>
      <p>Name: {customer.name}</p>
      <p>Outstanding Balance: ₹{calculateOutstandingBalance(customer.loans || [])}</p>
      <p>Next Due Date: {getNextDueDate(customer.loans || [])}</p>
      <p>Status: {getStatus(customer.loans || [])}</p>
      <button onClick={handleDownloadPDF} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded mt-4">
        Download PDF
      </button>
      <button onClick={() => navigate('/dashboard')} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mt-4 ml-4">
        Back to Dashboard
      </button>
    </div>
  );
};

// Utility functions
const calculateOutstandingBalance = (loans) => {
  return loans.reduce((total, loan) => {
    const totalRepayments = loan.repayments?.reduce((sum, rep) => sum + rep.amount, 0) || 0;
    return total + (loan.loanAmount - totalRepayments);
  }, 0);
};

const getNextDueDate = (loans) => {
  const dates = loans.map((loan) => new Date(loan.dueDate)).sort((a, b) => a - b);
  return dates.length > 0 ? dates[0].toLocaleDateString() : 'N/A';
};

const getStatus = (loans) => {
  const today = new Date();
  return loans.some((loan) => new Date(loan.dueDate) < today) ? 'Overdue' : 'Up-to-date';
};

export default CustomerDetails;

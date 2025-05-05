import React from "react";
import { useForm } from "react-hook-form";

const RepaymentForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div>
        <label className="block">Amount Paid</label>
        <input
          type="number"
          {...register("amount", { required: "Amount is required" })}
          className="w-full p-2 border rounded"
        />
        {errors.amount && <span className="text-red-500">{errors.amount.message}</span>}
      </div>

      <div>
        <label className="block">Payment Date</label>
        <input
          type="date"
          {...register("paymentDate", { required: "Payment date is required" })}
          className="w-full p-2 border rounded"
        />
        {errors.paymentDate && <span className="text-red-500">{errors.paymentDate.message}</span>}
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Record Payment</button>
    </form>
  );
};

export default RepaymentForm;

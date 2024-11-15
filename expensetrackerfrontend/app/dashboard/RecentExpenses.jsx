"use client";
import ExpensesCard from "@/components/ExpensesCard";
import LoadingButton from "@/components/LoadingButton";
import { getAllExpenses } from "@/services/expenseServices";
import React, { useEffect, useState } from "react";

const RecentExpenses = ({ addExpense }) => {
  const [userExpenses, setUserExpenses] = useState(null);
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await getAllExpenses();
        setUserExpenses(response);
        addExpense(response);
      } catch (e) {
        console.log("failed to get user expense", e);
      }
    };
    fetchExpenses();
  }, []);
  console.log("this is expense", userExpenses);
  if (userExpenses === null) {
    return <LoadingButton/>; // Show a loading message while data is being fetched
  }
  return (
    <div className=" grid grid-cols-2 gap-4 w-full">
      {userExpenses != null && (
        userExpenses.map((expense) => (
          <ExpensesCard key={expense.id} expenses={expense} />
        ))
      
      )}
    </div>
  );
};

export default RecentExpenses;

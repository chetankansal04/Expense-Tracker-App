"use client";
import { useState } from "react";
import NewExpense from "./NewExpense";
import RecentExpenses from "./RecentExpenses";
import ExpenseStatistics from "./ExpenseStatistics";
import Category from "./category/Category";
import Trends from "./trends/Trends";
const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (newExpense) => {
    setExpenses((prev) => {
      const expensesToAdd = Array.isArray(newExpense)
        ? newExpense
        : [newExpense];
      // prev represents the current state (the previous expenses)
      const expenseIds = prev.map((expense) => expense.id);
      const uniqueExpenses = expensesToAdd.filter(
        (expense) => !expenseIds.includes(expense.id)
      );

      // return the updated state (previous expenses + unique new expenses)
      return [...prev, ...uniqueExpenses];
    });
  };
  if (addExpense === null) {
    return <LoadingButton></LoadingButton>; // Show a loading message while data is being fetched
  }
  return (
    <div className="flex flex-col mt-28">
      <NewExpense addExpense={addExpense}></NewExpense>
      <div className="flex items-start justify-center">
        <div className="overflow-y-auto transition max-h-[60vh] w-1/2 pt-2  p-8">
          <RecentExpenses
            expenses={expenses}
            addExpense={addExpense}
          ></RecentExpenses>
        </div>
        {expenses.length > 1 && (
          <div className="w-fit flex h-full justify-center flex-grow items-center">
            <ExpenseStatistics expenses={expenses}></ExpenseStatistics>
          </div>
        )}
      </div>
      <Category></Category>
      <Trends></Trends>
    </div>
  );
};

export default Dashboard;

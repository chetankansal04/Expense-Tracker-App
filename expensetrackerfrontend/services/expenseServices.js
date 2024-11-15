"use client";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/public/expenses",
});

const token = localStorage.getItem("token");

api.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//CREATE expense
export const createExpense = async (newExpense) => {
  console.log("Creating expenses:", newExpense);
  try {
    const response = await api.post(`/`, newExpense);
    return response.data;
  } catch (e) {
    console.log("Error creating Expense:" + e);
  }
};

// Fetch all expenses (GET)
export const getAllExpenses = async () => {
  console.log("Fetching expenses:");
  try {
    const response = await api.get(`/`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching expense" + error.message);
  }
};

// Update an existing Expense (PUT)
export const updateExpense = async (id, updatedExpense) => {
  try {
    const response = await api.put(`${id}`, updatedExpense);
    return response;
  } catch (error) {
    console.error("Error updating Expense:", error);
    throw error;
  }
};

// Delete a Expense (DELETE)
export const deleteExpense = async (id) => {
  try {
    await api.delete(`${id}`);
  } catch (error) {
    console.error("Error deleting Expense:", error);
    throw error;
  }
};

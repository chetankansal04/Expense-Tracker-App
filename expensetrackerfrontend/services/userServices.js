"use client"
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/public",
});

export const userLogin = async (user) => {
  console.log("Sending login details:", user, {
    Headers: {
      Authorization: ``,
    },
  });
  try {
    const response = await api.post("/login", user);
    return response.data;
  } catch (error) {
    console.error("Error logging in", error);
  }
};

export const userRegister = async (user) => {
  console.log("Sending login details:", user, {
    Headers: {
      Authorization: ``,
    },
  });
  try {
    const response = await api.post("/register", user);
    return response.data;
  } catch (error) {
    console.error("Error registering", error);
  }
};

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { userLogin } from "@/services/userServices";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    e.preventDefault();
    setLoginDetails({ ...loginDetails, [e.target.id]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginResponse = await userLogin(loginDetails);
      console.log(loginResponse);
      localStorage.setItem("token", loginResponse.token);
      localStorage.setItem("username", loginResponse.username);
      router.push("/dashboard");
    } catch (error) {
      console.log("Error logging in", error);
      alert("Error logging in. Please check your credentials and try again.");
    }
  };

  return (
      <div className="mb-0 relative mt-6 space-y-4 rounded-xl p-4 shadow-lg sm:p-6 lg:p-8 w-2/3 md:w-1/3 place-self-center">
        <form
          className="flex flex-col gap-3 items-center"
          onSubmit={handleLoginSubmit}
        >
          <p className="text-center text-lg font-medium">
            Log in to your account
          </p>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={loginDetails.username}
            className="w-full rounded-lg border-gray-200 p-3 pe-12 text-base shadow-sm transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring "
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={loginDetails.password}
            className="w-full rounded-lg border-gray-200 p-3 pe-12 text-base shadow-sm transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring "
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
          >
            Login
          </button>
          <div className="flex">
            <p>Already have an account ? </p>
            <Link href="/register">
              <p className="text-base font-semibold transition hover:scale-110 focus:outline-none focus:ring ml-2">
                Sign up
              </p>
            </Link>
          </div>
        </form>
      </div>
  );
};

export default Login;

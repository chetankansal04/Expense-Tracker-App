"use client";
import { useState } from "react";
import Link from "next/link";
import { userLogin, userRegister } from "@/services/userServices";
import { useRouter } from "next/navigation";

const AuthForm = () => {
  const router = useRouter();
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const user = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const registerResponse = await userRegister(user);
      console.log("Registration successful:", registerResponse);

      // Check if registration was successful (you can also add checks based on the response structure)
      if (!registerResponse || !registerResponse.username) {
        throw new Error("Registration failed");
      }

      // Step 2: Log in the User after successful registration
      const loginResponse = await userLogin(user);
      console.log("Login successful:", loginResponse);

      // Check if login response has the token
      if (!loginResponse || !loginResponse.token) {
        throw new Error("Login failed");
      }
      router.push("/dashboard");

      // Step 3: Store the token and user details in localStorage (or sessionStorage)
      localStorage.setItem("token", loginResponse.token); // Store token
      localStorage.setItem("username", loginResponse.username); // Store username
      localStorage.setItem("email", loginResponse.email); // Store email
    } catch (e) {
      console.error("Error creating user:", e);
    }
  };

  return (
    <div className="mb-0 mt-6 space-y-4 rounded-xl p-4 shadow-lg sm:p-6 lg:p-8 w-2/3 md:w-1/3 place-self-center">
      <form
        className="flex flex-col gap-3 items-center"
        onSubmit={handleRegisterSubmit}
      >
        <p className="text-center text-lg font-medium">
          Sign in to your account
        </p>

        <input
          type="text"
          className="w-full rounded-lg border-gray-200 p-3 pe-12 text-base shadow-sm transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring "
          placeholder="username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          required
        />
        <input
          type="email"
          className="w-full rounded-lg border-gray-200 p-3 pe-12 text-base shadow-sm transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring "
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full rounded-lg border-gray-200 p-3 pe-12 text-base shadow-sm transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring "
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
        >
          Register
        </button>
        <div className="flex">
          <p>Already have an account ? </p>
          <Link href="/login">
            <p className="text-base font-semibold transition hover:scale-110 focus:outline-none focus:ring ml-2">
              Login{" "}
            </p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;

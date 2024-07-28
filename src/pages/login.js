import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [credential, setCredential] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/userLogin", credential);
      const { token } = response.data;

      login(token);

      alert("Login successful!");

      setTimeout(() => {
        router.push("/"); 
      }, 1000);
    } catch (error) {
      if (error.response) {
        setError(
          error.response.data.message || "An error occurred during login"
        );
        console.error("Error response:", error.response.data);
      } else if (error.request) {
        setError("No response received from the server. Please try again.");
      } else {
        setError("An error occurred during login. Please try again.");
      }
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 bg-black rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-white-1000">
          Login
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-white-800"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
              value={credential.email}
              placeholder="example@example.com"
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-base"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-lg font-medium text-white-800"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              value={credential.password}
              placeholder="********"
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-base"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

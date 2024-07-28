import { useRouter } from "next/router";
import React, { useState } from "react";

export default function Register() {
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/userRegister", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Registration successful
      alert("Registration successful!");
      router.push("/login"); // Redirect to login page
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-black rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          Register
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-medium text-white"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              onChange={handleChange}
              value={credential.name}
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-base"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-white"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@example.com"
              onChange={handleChange}
              value={credential.email}
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-base"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-lg font-medium text-white"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              onChange={handleChange}
              value={credential.password}
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-base"
              required
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-lg font-medium text-white"
            >
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder="123 Main St, City, Country"
              onChange={handleChange}
              value={credential.address}
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-base"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 transition duration-200"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

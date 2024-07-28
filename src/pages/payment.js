import React, { useState } from "react";
import { useRouter } from "next/router";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

export default function Payment() {
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });
  const [focus, setFocus] = useState("");
  const router = useRouter();

  const handleInputChange = (e) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocusChange = (e) => {
    setFocus(e.target.name);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    alert("Payment Successful!");
    router.push("/"); // Redirect to the home page after successful payment
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Payment Details</h2>
        <Cards
          number={cardDetails.number}
          name={cardDetails.name}
          expiry={cardDetails.expiry}
          cvc={cardDetails.cvc}
          focused={focus}
        />
        <form onSubmit={handlePayment} className="space-y-4 mt-4">
          <div>
            <label
              htmlFor="number"
              className="block text-lg font-medium text-gray-700"
            >
              Card Number
            </label>
            <input
              id="number"
              name="number"
              type="tel"
              value={cardDetails.number}
              onChange={handleInputChange}
              onFocus={handleFocusChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={cardDetails.name}
              onChange={handleInputChange}
              onFocus={handleFocusChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="expiry"
              className="block text-lg font-medium text-gray-700"
            >
              Expiry Date
            </label>
            <input
              id="expiry"
              name="expiry"
              type="text"
              value={cardDetails.expiry}
              onChange={handleInputChange}
              onFocus={handleFocusChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="cvc"
              className="block text-lg font-medium text-gray-700"
            >
              CVV
            </label>
            <input
              id="cvc"
              name="cvc"
              type="tel"
              value={cardDetails.cvc}
              onChange={handleInputChange}
              onFocus={handleFocusChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}

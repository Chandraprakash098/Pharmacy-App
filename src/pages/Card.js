import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";

function Card({ data }) {
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(data.price);
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setTotalPrice((quantity * parseFloat(data.price)).toFixed(2));
  }, [quantity, data.price]);

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleOrderClick = () => {
    if (isLoggedIn) {
      router.push("/payment"); // Redirect to the payment page
    } else {
      router.push("/login"); // Redirect to the login page
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative aspect-[4/3] w-full">
        <Image src={data.img} layout="fill" objectFit="cover" alt={data.name} />
      </div>
      <div className="p-4">
        <h2 className="font-bold mb-2 text-xl uppercase text-gray-800">
          {data.name}
        </h2>
        <p className="text-gray-600 text-sm mb-4">{data.description}</p>
        <div className="flex justify-between items-center mb-4">
          <select
            className="p-2 text-gray-700 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={quantity}
            onChange={handleQuantityChange}
          >
            {Array.from(Array(10), (e, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <p className="text-xl font-bold text-green-600">₹{totalPrice}/-</p>
        </div>
        <div className="text-sm text-gray-500 mb-4">
          Unit Price: ₹{data.price}/-
        </div>
        <button
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          onClick={handleOrderClick}
        >
          Order Now
        </button>
      </div>
    </div>
  );
}

export default Card;

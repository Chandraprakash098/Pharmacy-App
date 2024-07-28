import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logout, checkLoginStatus } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
      checkLoginStatus(); // Update the isLoggedIn state
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router, checkLoginStatus]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      router.push("/login");
    }
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-2xl font-bold">Pharmacy App</div>
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full lg:flex lg:items-center lg:w-auto`}
        >
          <div className="text-lg lg:flex-grow lg:flex lg:justify-end">
            <Link
              href="/"
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-yellow-400 transition-colors duration-300 mr-8 font-serif"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-yellow-400 transition-colors duration-300 mr-8 font-serif"
            >
              About
            </Link>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="block mt-2 lg:inline-block lg:mt-0 text-white  transition-colors duration-300 font-serif bg-red-600 border-2 border-red-700 hover:bg-red-900  rounded-lg"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/register"
                  className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-yellow-400 transition-colors duration-300 mr-8 font-serif"
                >
                  Register
                </Link>
                <Link
                  href="/login"
                  className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-yellow-400 transition-colors duration-300 font-serif"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

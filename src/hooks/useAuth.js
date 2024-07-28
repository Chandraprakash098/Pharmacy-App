import { useState, useEffect } from "react";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkLoginStatus = () => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
      };

      checkLoginStatus();
      window.addEventListener("storage", checkLoginStatus);

      return () => {
        window.removeEventListener("storage", checkLoginStatus);
      };
    }
  }, []);

  const login = (token) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    }
  };

  const checkLoginStatus = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    }
  };

  return { isLoggedIn, login, logout, checkLoginStatus };
}

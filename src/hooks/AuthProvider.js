import React, { createContext, useContext } from "react";
import { useAuth as useAuthHook } from "./useAuth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const auth = useAuthHook();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

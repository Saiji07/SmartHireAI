"use client";
import { createContext, useContext } from "react";

export const UserDetailContext = createContext(null);

// ✅ Custom hook to use user context
export const useUser = () => {
  const context = useContext(UserDetailContext);
  if (!context) {
    throw new Error("useUser must be used within a Provider");
  }
  return context;
};

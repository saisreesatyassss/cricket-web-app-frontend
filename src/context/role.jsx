"use client"
import { createContext, useContext, useState } from "react";

// Create Role Context
const RoleContext = createContext();

// Role Provider Component
export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState("user"); // Default role is 'user'

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

// Custom hook for easy access to context
export const useRole = () => useContext(RoleContext);

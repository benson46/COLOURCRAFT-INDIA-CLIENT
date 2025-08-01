import { createContext, useContext, useEffect, useState } from "react";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get from localStorage on first mount
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Save admin to localStorage when it changes
    if (admin) {
      localStorage.setItem("admin", JSON.stringify(admin));
    }
  }, [admin]);

  return (
    <AdminAuthContext.Provider value={{ admin, setAdmin, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);

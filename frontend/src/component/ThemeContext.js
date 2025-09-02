// src/component/ThemeContext.js
import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme");
    setIsDark(savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      localStorage.setItem("app-theme", !prev ? "dark" : "light");
      return !prev;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

"use client";
import { createContext, useState, useContext } from "react";

const ThemeContext = createContext<{darkMode:boolean;toggleTheme: ()=>void}|undefined>(undefined);

export default ThemeProvider = ({ children }:any) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


export const useTheme = () => useContext(ThemeContext);

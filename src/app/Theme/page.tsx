"use client";
import { createContext, useState, useContext, ReactNode } from "react";
const ThemeContext = createContext<{ darkMode: boolean; toggleTheme: () => void } | undefined>(undefined);
 function ThemePage({children}:any) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemePage");
  return context;
};
export default ThemePage;

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Appearance } from "react-native";

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const systemTheme = Appearance.getColorScheme();
    setTheme(systemTheme || "light");
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
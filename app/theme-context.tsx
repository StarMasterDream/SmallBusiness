import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "Автоматически",
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState("Автоматически");

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("theme");

        if (storedTheme) {
          if (storedTheme === "Автоматически") {
            const systemTheme = Appearance.getColorScheme();
            setTheme(systemTheme || "light");
          } else {
            setTheme(storedTheme === "Светлая" ? "light" : "dark");
          }
        } else {
          const systemTheme = Appearance.getColorScheme();
          const defaultTheme = systemTheme || "light";
          setTheme("Автоматически");
          await AsyncStorage.setItem("theme", "Автоматически");
        }
      } catch (error) {
        console.error("Не удалось загрузить тему:", error);
      }
    };

    loadTheme();

    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      AsyncStorage.getItem("theme").then((storedTheme) => {
        if (storedTheme === "Автоматически") {
          setTheme(colorScheme || "light");
        }
      });
    });

    return () => listener.remove();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem("theme", newTheme === "light" ? "Светлая" : "Тёмная");
    } catch (error) {
      console.error("Не удалось сохранить тему:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
export const useTheme = () => useContext(ThemeContext);

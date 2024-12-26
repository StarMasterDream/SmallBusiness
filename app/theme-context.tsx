import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("theme");

        if (storedTheme) {
          // Если тема сохранена в AsyncStorage
          if (storedTheme === "Automatic") {
            const systemTheme = Appearance.getColorScheme();
            setTheme(systemTheme || "light");
          } else {
            setTheme(storedTheme);
          }
        } else {
          // Если тема отсутствует в AsyncStorage, устанавливаем light
          const systemTheme = Appearance.getColorScheme();
          const defaultTheme = systemTheme || "light"; // Автоматическая тема или светлая
          setTheme(defaultTheme);

          // Сохраняем тему в AsyncStorage
          await AsyncStorage.setItem("theme", defaultTheme === "light" ? "Light" : "Dark");
        }
      } catch (error) {
        console.error("Failed to load theme:", error);
      }
    };

    loadTheme();

    // Слушаем изменения системной темы
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      AsyncStorage.getItem("theme").then((storedTheme) => {
        if (storedTheme === "Automatic") {
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
      await AsyncStorage.setItem("theme", newTheme === "light" ? "Light" : "Dark");
    } catch (error) {
      console.error("Failed to save theme:", error);
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

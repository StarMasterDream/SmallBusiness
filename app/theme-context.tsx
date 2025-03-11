import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "automatic",
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState("automatic");

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("theme");

        if (storedTheme) {
          if (storedTheme === "automatic") {
            const systemTheme = Appearance.getColorScheme();
            setTheme(systemTheme || "light");
          } else {
            setTheme(storedTheme === "light" ? "light" : "dark");
          }
        } else {
          const systemTheme = Appearance.getColorScheme();
          const defaultTheme = systemTheme || "light";
          setTheme("automatic");
          await AsyncStorage.setItem("theme", "automatic");
        }
      } catch (error) {
        console.error("Failed to load theme:", error);
      }
    };

    loadTheme();

    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      AsyncStorage.getItem("theme").then((storedTheme) => {
        if (storedTheme === "automatic") {
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
      await AsyncStorage.setItem(
        "theme",
        newTheme === "light" ? "Light" : "dark"
      );
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

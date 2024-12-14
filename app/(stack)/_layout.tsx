import { Stack } from "expo-router";
import ThemeProvider from "../theme-context";

export default function Layout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen
          name="settings"
          options={{ title: "Настройки" }}
        />
        <Stack.Screen
          name="tabs/profile" 
          options={{ title: "Профиль" }}
        />
      </Stack>
    </ThemeProvider>
  );
}

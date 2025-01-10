import { Stack } from "expo-router";
import ThemeProvider, { useTheme } from "./theme-context";

function StackLayoutContent() {
  const { theme } = useTheme();

  return (
    <Stack>
      <Stack.Screen
        name="loading"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(authorization)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: "Настройки",
          headerBackTitle: "назад",
          headerStyle: { backgroundColor: theme === "light" ? "#fff" : "#333" },
          headerTitleStyle: { color: theme === "light" ? "#000" : "#fff" },
        }}
      />
      <Stack.Screen
        name="settingsProfile"
        options={{
          title: "Настройки профиля",
          headerBackTitle: "назад",
          headerStyle: { backgroundColor: theme === "light" ? "#fff" : "#333" },
          headerTitleStyle: { color: theme === "light" ? "#000" : "#fff" },
        }}
      />
    </Stack>
  );
}

export default function StackLayout() {
  return (
    <ThemeProvider>
      <StackLayoutContent />
    </ThemeProvider>
  );
}

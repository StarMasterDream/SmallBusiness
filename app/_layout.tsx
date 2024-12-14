import { Stack } from "expo-router";
import ThemeProvider from "./theme-context";

export default function StackLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            headerBackButtonDisplayMode: "minimal"
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            title: "Настройки",
            headerBackTitle: "назад",
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}

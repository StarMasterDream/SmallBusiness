import { Stack } from "expo-router";
import ThemeProvider from "./theme-context";

export default function StackLayout() {
  return (
    <ThemeProvider>
      {/* Основной стек навигации */}
      <Stack>
        {/* Вкладки */}
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false, // Отключаем хедер на вкладках
          }}
        />
        {/* Настройки */}
        <Stack.Screen
          name="settings"
          options={{ title: "Настройки" }}
        />
      </Stack>
    </ThemeProvider>
  );
}

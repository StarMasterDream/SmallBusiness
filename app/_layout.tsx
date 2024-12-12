import { Stack } from 'expo-router';
import ThemeProvider from "./theme-context";

export default function Layout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack>
    </ThemeProvider>
  );
}


import { Stack } from "expo-router";
import ThemeProvider from "../theme-context";

export default function StackLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}

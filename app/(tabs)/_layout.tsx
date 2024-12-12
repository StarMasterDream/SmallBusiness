import { Tabs } from "expo-router";
import ThemeProvider from "../theme-context";

export default function Layout() {
  return (
    <ThemeProvider>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}

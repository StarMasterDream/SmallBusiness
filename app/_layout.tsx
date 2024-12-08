import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="top-tabs" options={{ title: "Top Tabs" }} />
    </Tabs>
  );
}
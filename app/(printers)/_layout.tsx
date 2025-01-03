import { Stack } from "expo-router";

export default function PrintersLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="discover"
        options={{ headerShown: true, title: "Discover Printers" }}
      />
      <Stack.Screen
        name="view-printer"
        options={{ headerShown: true, title: "View Printer" }}
      />
    </Stack>
  );
}

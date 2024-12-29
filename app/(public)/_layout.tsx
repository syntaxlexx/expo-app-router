import { Stack } from "expo-router";

export default function PublicLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="about"
        options={{ headerShown: true, title: "About" }}
      />

      <Stack.Screen
        name="contact"
        options={{ headerShown: true, title: "Contact Us" }}
      />
    </Stack>
  );
}

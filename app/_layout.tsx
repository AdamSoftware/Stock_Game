import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      /* I can't get the routing too work without a errorpage to take you to the
      rest of the pages */
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

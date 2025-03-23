import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="cadastrarManutencao"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}

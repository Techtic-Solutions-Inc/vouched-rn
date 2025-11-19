import { Stack } from "expo-router";

export default function MatchesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="matchesList"
        options={{
          title: "Matches",
        }}
      />
      <Stack.Screen
        name="matchesDetail"
        options={{
          title: "Event Details",
        }}
      />
    </Stack>
  );
}

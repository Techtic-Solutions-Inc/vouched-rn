import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="eventList"
        options={{
          title: "Events",
        }}
      />
      <Stack.Screen
        name="eventDetail"
        options={{
          title: "Event Details",
        }}
      />
    </Stack>
  );
}

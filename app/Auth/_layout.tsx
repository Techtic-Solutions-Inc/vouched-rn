import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
  const { isSignedIn } = useAuth();

  // If user is already signed in, redirect to home
  if (isSignedIn) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="signUp"
        options={{
          title: "Sign In",
        }}
      />
      <Stack.Screen
        name="onBoarding"
        options={{
          title: "Onboarding",
        }}
      />
    </Stack>
  );
}

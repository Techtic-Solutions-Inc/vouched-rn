import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import Constants from "expo-constants";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { ToastProvider } from "@/src/components/Toast";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const publishableKey =
  Constants.expoConfig?.extra?.clerkPublishableKey ||
  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  "";

export const unstable_settings = {
  anchor: "Auth",
};

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "Inter-Black": require("../src/assets/fonts/Inter-Black.otf"),
    "Inter-Bold": require("../src/assets/fonts/Inter-Bold.otf"),
    "Inter-ExtraBold": require("../src/assets/fonts/Inter-ExtraBold.otf"),
    "Inter-Medium": require("../src/assets/fonts/Inter-Medium.otf"),
    "Inter-Regular": require("../src/assets/fonts/Inter-Regular.otf"),
  });
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen once fonts are loaded
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Don't render the app until fonts are loaded
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <ToastProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "slide_from_right",
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="Auth" options={{ headerShown: false }} />
            <Stack.Screen name="Home" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </ToastProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
}

import { COLORS } from "@/src/constants/colors";
import { isGuestMode, isOnboardingComplete } from "@/src/utils/auth";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Index() {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const [isGuest, setIsGuest] = useState(false);
  const [checkingGuest, setCheckingGuest] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const guest = await isGuestMode();
        setIsGuest(guest);

        // Check onboarding status only if user is signed in (not guest)
        if (isSignedIn) {
          const complete = await isOnboardingComplete();
          setOnboardingComplete(complete);
        } else {
          setOnboardingComplete(false);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      } finally {
        setCheckingGuest(false);
        setCheckingOnboarding(false);
      }
    };
    checkAuthStatus();
  }, [isSignedIn]);

  // Show loading indicator while checking auth status
  if (!isLoaded || checkingGuest || checkingOnboarding) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primaryButton} />
      </View>
    );
  }

  // Redirect based on authentication status
  // Clerk's isSignedIn persists across app restarts automatically
  if (isSignedIn) {
    // If signed in, check onboarding status
    if (onboardingComplete) {
      // Onboarding complete - go to home
      return <Redirect href="/(tabs)" />;
    } else {
      // Onboarding not complete - go to onboarding
      return <Redirect href="/Auth/onBoarding" />;
    }
  }

  // Guest users go directly to home
  if (isGuest) {
    return <Redirect href="/(tabs)" />;
  }

  // Not signed in and not guest - go to sign up
  return <Redirect href="/Auth/signUp" />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
});

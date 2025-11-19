import AsyncStorage from "@react-native-async-storage/async-storage";

const GUEST_MODE_KEY = "@user_mode";
const AUTHENTICATED_KEY = "@user_authenticated";
const ONBOARDING_COMPLETE_KEY = "@onboarding_complete";

/**
 * Check if user is in guest mode
 */
export const isGuestMode = async (): Promise<boolean> => {
  try {
    const userMode = await AsyncStorage.getItem(GUEST_MODE_KEY);
    return userMode === "guest";
  } catch (error) {
    console.error("Error checking guest mode:", error);
    return false;
  }
};

/**
 * Set user as guest
 */
export const setGuestMode = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(GUEST_MODE_KEY, "guest");
  } catch (error) {
    console.error("Error setting guest mode:", error);
    throw error;
  }
};

/**
 * Clear guest mode
 */
export const clearGuestMode = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(GUEST_MODE_KEY);
  } catch (error) {
    console.error("Error clearing guest mode:", error);
    throw error;
  }
};

/**
 * Set user as authenticated
 */
export const setAuthenticated = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(AUTHENTICATED_KEY, "true");
    await AsyncStorage.removeItem(GUEST_MODE_KEY);
  } catch (error) {
    console.error("Error setting authenticated:", error);
    throw error;
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const authenticated = await AsyncStorage.getItem(AUTHENTICATED_KEY);
    return authenticated === "true";
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
};

/**
 * Set onboarding as complete
 */
export const setOnboardingComplete = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, "true");
  } catch (error) {
    console.error("Error setting onboarding complete:", error);
    throw error;
  }
};

/**
 * Check if onboarding is complete
 */
export const isOnboardingComplete = async (): Promise<boolean> => {
  try {
    const complete = await AsyncStorage.getItem(ONBOARDING_COMPLETE_KEY);
    return complete === "true";
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    return false;
  }
};

/**
 * Clear onboarding status
 */
export const clearOnboardingStatus = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(ONBOARDING_COMPLETE_KEY);
  } catch (error) {
    console.error("Error clearing onboarding status:", error);
    throw error;
  }
};

/**
 * Clear all auth data (logout)
 */
export const clearAuthData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      GUEST_MODE_KEY,
      AUTHENTICATED_KEY,
      ONBOARDING_COMPLETE_KEY,
    ]);
  } catch (error) {
    console.error("Error clearing auth data:", error);
    throw error;
  }
};

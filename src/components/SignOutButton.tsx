import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useToast } from "./Toast";
import { COLORS } from "../constants/colors";
import { fontSize } from "../constants/fontSize";
import fonts from "../constants/fonts";
import { size } from "../utils/size";

export const SignOutButton = () => {
  const { signOut } = useClerk();
  const router = useRouter();
  const { showSuccess, showError } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      showSuccess("Signed out successfully");
      // Redirect to auth page
      router.replace("/Auth/signUp");
    } catch (err: any) {
      console.error("Sign out error:", err);
      showError(err.message || "Failed to sign out. Please try again.");
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleSignOut}>
      <Text style={styles.buttonText}>Sign Out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.error,
    borderRadius: size.scale(12),
    paddingVertical: size.verticalScale(12),
    paddingHorizontal: size.moderateScale(20),
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Medium,
    color: COLORS.white,
  },
});


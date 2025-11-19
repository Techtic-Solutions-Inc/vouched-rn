import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TextInput as RNTextInput,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "../../components/Input";
import { useToast } from "../../components/Toast";
import { COLORS } from "../../constants/colors";
import { fontSize } from "../../constants/fontSize";
import fonts from "../../constants/fonts";
import { setAuthenticated, setGuestMode } from "../../utils/auth";
import { size } from "../../utils/size";

const SignInScreen = () => {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const { signUp, setActive: setActiveSignUp } = useSignUp();
  const { showSuccess, showError, showInfo } = useToast();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sign In State
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInErrors, setSignInErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  // Sign Up State
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");
  const [signUpCountryCode, setSignUpCountryCode] = useState("+1");
  const [signUpPhoneNumber, setSignUpPhoneNumber] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [pendingPhoneVerification, setPendingPhoneVerification] =
    useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [phoneVerificationCode, setPhoneVerificationCode] = useState("");
  const [verificationType, setVerificationType] = useState<"email" | "phone">(
    "email"
  );
  const [signUpErrors, setSignUpErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    phoneNumber?: string;
    code?: string;
    phoneCode?: string;
  }>({});

  const validateSignIn = (): boolean => {
    const errors: { email?: string; password?: string } = {};
    if (!signInEmail.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(signInEmail)) {
      errors.email = "Email is invalid";
    }
    if (!signInPassword) {
      errors.password = "Password is required";
    } else if (signInPassword.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    setSignInErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateSignUp = (): boolean => {
    const errors: {
      email?: string;
      password?: string;
      confirmPassword?: string;
      phoneNumber?: string;
    } = {};
    if (!signUpEmail.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(signUpEmail)) {
      errors.email = "Email is invalid";
    }
    if (!signUpPassword) {
      errors.password = "Password is required";
    } else if (signUpPassword.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    if (!signUpConfirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (signUpPassword !== signUpConfirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!signUpPhoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    } else {
      const cleanedPhone = signUpPhoneNumber.replace(/\D/g, "");
      // Validate phone number length (7-15 digits is standard, but we'll allow 10-15 for better UX)
      if (cleanedPhone.length < 10 || cleanedPhone.length > 15) {
        errors.phoneNumber = "Please enter a valid phone number (10-15 digits)";
      }
    }
    setSignUpErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignIn = async () => {
    if (!isLoaded || !signIn) return;

    if (!validateSignIn()) return;

    setIsLoading(true);
    setSignInErrors({});

    try {
      const result = await signIn.create({
        identifier: signInEmail,
        password: signInPassword,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        await setAuthenticated();
        showSuccess("Signed in successfully!");
        // Navigate directly to home screen with bottom tabs
        router.replace("/(tabs)");
      } else {
        showError("Sign in incomplete. Please try again.");
      }
    } catch (err: any) {
      console.error("Sign in error:", err);
      const newErrors: { email?: string; password?: string } = {};

      if (err.errors) {
        // Parse Clerk errors and map them to form fields
        err.errors.forEach((error: any) => {
          const errorMessage = error.message || error.longMessage || "";

          // Check if it's a password-related error
          if (
            error.meta?.fieldName === "password" ||
            errorMessage.toLowerCase().includes("password") ||
            errorMessage.toLowerCase().includes("incorrect")
          ) {
            newErrors.password = errorMessage;
          }
          // Check if it's an email-related error
          else if (
            error.meta?.fieldName === "identifier" ||
            errorMessage.toLowerCase().includes("email") ||
            errorMessage.toLowerCase().includes("not found")
          ) {
            newErrors.email = errorMessage;
          }
        });

        setSignInErrors(newErrors);

        // Only show toast if there are errors that couldn't be mapped to fields
        if (Object.keys(newErrors).length === 0) {
          const errorMessages = err.errors
            .map((e: any) => e.message || e.longMessage)
            .join(", ");
          showError(errorMessages);
        }
      } else {
        showError(err.message || "An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!isLoaded || !signUp) return;

    if (!validateSignUp()) return;

    setIsLoading(true);
    setSignUpErrors({});

    try {
      // Format phone number with country code in E.164 format
      const cleanedPhoneNumber = signUpPhoneNumber.replace(/\D/g, "");
      const formattedPhoneNumber = `${signUpCountryCode}${cleanedPhoneNumber}`;

      console.log("Phone number details:", {
        countryCode: signUpCountryCode,
        phoneNumber: signUpPhoneNumber,
        cleaned: cleanedPhoneNumber,
        formatted: formattedPhoneNumber,
      });

      const result = await signUp.create({
        emailAddress: signUpEmail,
        password: signUpPassword,
        phoneNumber: formattedPhoneNumber,
      });

      // Send email verification
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set pending verification state for email
      setPendingVerification(true);
      setVerificationType("email");
      showSuccess("Verification email sent! Please check your email.");
    } catch (err: any) {
      console.error("Sign up error:", err);
      const newErrors: {
        email?: string;
        password?: string;
        confirmPassword?: string;
        phoneNumber?: string;
      } = {};

      console.error("Sign up error details:", JSON.stringify(err, null, 2));

      if (err.errors) {
        // Parse Clerk errors and map them to form fields
        err.errors.forEach((error: any) => {
          const errorMessage = error.message || error.longMessage || "";
          const fieldName = error.meta?.fieldName || "";

          console.log("Processing error:", { fieldName, errorMessage });

          // Check if it's a password-related error
          if (
            fieldName === "password" ||
            errorMessage.toLowerCase().includes("password") ||
            errorMessage.toLowerCase().includes("data breach")
          ) {
            newErrors.password = errorMessage;
          }
          // Check if it's a phone-related error
          else if (
            fieldName === "phone_number" ||
            fieldName === "phoneNumber" ||
            errorMessage.toLowerCase().includes("phone") ||
            errorMessage.toLowerCase().includes("number") ||
            errorMessage.toLowerCase().includes("invalid phone") ||
            errorMessage.toLowerCase().includes("phone number")
          ) {
            newErrors.phoneNumber =
              errorMessage ||
              "Invalid phone number format. Please check your phone number.";
          }
          // Check if it's an email-related error
          else if (
            fieldName === "email_address" ||
            fieldName === "emailAddress" ||
            errorMessage.toLowerCase().includes("email") ||
            errorMessage.toLowerCase().includes("address")
          ) {
            newErrors.email = errorMessage;
          }
        });

        setSignUpErrors(newErrors);

        // Show toast for phone number errors specifically
        if (newErrors.phoneNumber) {
          showError(newErrors.phoneNumber);
        }
        // Only show toast if there are errors that couldn't be mapped to fields
        else if (Object.keys(newErrors).length === 0) {
          const errorMessages = err.errors
            .map((e: any) => e.message || e.longMessage)
            .join(", ");
          showError(errorMessages);
        }
      } else {
        const errorMsg = err.message || "An error occurred. Please try again.";
        showError(errorMsg);
        // If it's a phone-related error, set it in the form
        if (errorMsg.toLowerCase().includes("phone")) {
          setSignUpErrors({ phoneNumber: errorMsg });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async () => {
    if (!isLoaded || !signUp) return;

    if (!verificationCode.trim()) {
      setSignUpErrors({ code: "Verification code is required" });
      return;
    }

    if (verificationCode.length !== 6) {
      setSignUpErrors({ code: "Please enter a 6-digit code" });
      return;
    }

    setIsLoading(true);
    setSignUpErrors({});

    try {
      // Attempt to verify the email address with the code
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      console.log("Verification result status:", completeSignUp.status);
      console.log("SignUp status:", signUp.status);
      console.log(
        "Created session ID:",
        completeSignUp.createdSessionId || signUp.createdSessionId
      );

      // After email verification, check if phone verification is needed
      console.log(
        "After email verification - unverifiedFields:",
        signUp.unverifiedFields
      );

      // Check if phone number still needs verification
      if (
        signUp.unverifiedFields &&
        signUp.unverifiedFields.includes("phone_number")
      ) {
        // Phone number needs verification - send SMS code
        try {
          await signUp.preparePhoneNumberVerification({
            strategy: "phone_code",
          });
          // Clear email verification state FIRST, then switch to phone verification
          setVerificationCode("");
          setPhoneVerificationCode("");
          setSignUpErrors({});
          // Update state synchronously to ensure immediate UI change
          setPendingVerification(false);
          setPendingPhoneVerification(true);
          setVerificationType("phone");
          showSuccess("SMS verification code sent! Please check your phone.");
        } catch (phoneErr: any) {
          console.error("Phone verification preparation error:", phoneErr);
          showError("Failed to send SMS code. Please try again.");
        }
      } else if (signUp.status === "complete") {
        // All verifications complete - get session ID
        const sessionId = signUp.createdSessionId;

        if (sessionId) {
          await setActiveSignUp({ session: sessionId });
          await setAuthenticated();
          showSuccess("Verification complete!");
          // Small delay to ensure state is updated before navigation
          setTimeout(() => {
            router.replace("/(tabs)");
          }, 100);
        } else {
          showError("Session not created. Please try signing up again.");
        }
      } else if (completeSignUp.status === "complete") {
        // Fallback: check the result status
        const sessionId = completeSignUp.createdSessionId;
        if (sessionId) {
          await setActiveSignUp({ session: sessionId });
          await setAuthenticated();
          showSuccess("Verification complete!");
          // Small delay to ensure state is updated before navigation
          setTimeout(() => {
            router.replace("/(tabs)");
          }, 100);
        } else {
          showError("Session not created. Please try signing up again.");
        }
      } else {
        // Log the status for debugging
        console.log("Verification incomplete. Status:", completeSignUp.status);
        console.log("SignUp status:", signUp.status);
        console.log("SignUp object:", {
          status: signUp.status,
          createdSessionId: signUp.createdSessionId,
          unverifiedFields: signUp.unverifiedFields,
        });

        // Check if there are any missing or unverified fields
        if (signUp.unverifiedFields && signUp.unverifiedFields.length > 0) {
          // If phone_number is in unverifiedFields, prepare phone verification
          if (signUp.unverifiedFields.includes("phone_number")) {
            try {
              await signUp.preparePhoneNumberVerification({
                strategy: "phone_code",
              });
              // Clear email verification state FIRST, then switch to phone verification
              setVerificationCode("");
              setPhoneVerificationCode("");
              setSignUpErrors({});
              // Update state synchronously to ensure immediate UI change
              setPendingVerification(false);
              setPendingPhoneVerification(true);
              setVerificationType("phone");
              showSuccess(
                "SMS verification code sent! Please check your phone."
              );
            } catch (phoneErr: any) {
              console.error("Phone verification preparation error:", phoneErr);
              showError(`Please verify: ${signUp.unverifiedFields.join(", ")}`);
            }
          } else {
            showError(`Please verify: ${signUp.unverifiedFields.join(", ")}`);
          }
        } else if (
          completeSignUp.missingFields &&
          completeSignUp.missingFields.length > 0
        ) {
          showError(
            `Please complete: ${completeSignUp.missingFields.join(", ")}`
          );
        } else {
          showError(
            "Verification incomplete. Please check your code and try again."
          );
        }
      }
    } catch (err: any) {
      console.error("Verification error:", err);
      console.error("Error details:", JSON.stringify(err, null, 2));

      const newErrors: { code?: string } = {};

      if (err.errors) {
        err.errors.forEach((error: any) => {
          const errorMessage = error.message || error.longMessage || "";
          if (
            error.meta?.fieldName === "code" ||
            errorMessage.toLowerCase().includes("code") ||
            errorMessage.toLowerCase().includes("verification") ||
            errorMessage.toLowerCase().includes("expired") ||
            errorMessage.toLowerCase().includes("invalid")
          ) {
            newErrors.code = errorMessage;
          }
        });

        setSignUpErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
          const errorMessages = err.errors
            .map((e: any) => e.message || e.longMessage)
            .join(", ");
          showError(errorMessages);
        }
      } else {
        const errorMsg =
          err.message || "Invalid verification code. Please try again.";
        showError(errorMsg);
        setSignUpErrors({ code: errorMsg });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!isLoaded || !signUp) return;

    try {
      if (verificationType === "email") {
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });
        showSuccess("Verification code resent! Please check your email.");
      } else {
        await signUp.preparePhoneNumberVerification({ strategy: "phone_code" });
        showSuccess("SMS code resent! Please check your phone.");
      }
    } catch (err: any) {
      console.error("Resend code error:", err);
      showError("Failed to resend code. Please try again.");
    }
  };

  const handlePhoneVerification = async () => {
    if (!isLoaded || !signUp) return;

    if (!phoneVerificationCode.trim()) {
      setSignUpErrors({ phoneCode: "Verification code is required" });
      return;
    }

    if (phoneVerificationCode.length !== 6) {
      setSignUpErrors({ phoneCode: "Please enter a 6-digit code" });
      return;
    }

    setIsLoading(true);
    setSignUpErrors({});

    try {
      // Attempt to verify the phone number with the code
      const completeSignUp = await signUp.attemptPhoneNumberVerification({
        code: phoneVerificationCode,
      });

      console.log("Phone verification result status:", completeSignUp.status);
      console.log("SignUp status:", signUp.status);

      if (signUp.status === "complete") {
        const sessionId = signUp.createdSessionId;
        if (sessionId) {
          await setActiveSignUp({ session: sessionId });
          await setAuthenticated();
          showSuccess("Phone verified successfully!");
          // Small delay to ensure state is updated before navigation

          isSignUp
            ? router.replace("/Auth/onBoarding")
            : router.replace("/(tabs)");
        } else {
          showError("Session not created. Please try signing up again.");
        }
      } else if (completeSignUp.status === "complete") {
        const sessionId = completeSignUp.createdSessionId;
        if (sessionId) {
          await setActiveSignUp({ session: sessionId });
          await setAuthenticated();
          showSuccess("Phone verified successfully!");
          // Small delay to ensure state is updated before navigation

          isSignUp
            ? router.replace("/Auth/onBoarding")
            : router.replace("/(tabs)");
        } else {
          showError("Session not created. Please try signing up again.");
        }
      } else {
        console.log(
          "Phone verification incomplete. Status:",
          completeSignUp.status
        );
        console.log("SignUp status:", signUp.status);
        console.log("Unverified fields:", signUp.unverifiedFields);

        if (signUp.unverifiedFields && signUp.unverifiedFields.length > 0) {
          showError(`Please verify: ${signUp.unverifiedFields.join(", ")}`);
        } else {
          showError("Invalid verification code. Please try again.");
          setSignUpErrors({ phoneCode: "Invalid code" });
        }
      }
    } catch (err: any) {
      console.error("Phone verification error:", err);
      const errorMsg =
        err.message || "Invalid verification code. Please try again.";
      showError(errorMsg);
      setSignUpErrors({ phoneCode: errorMsg });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setSignInErrors({});
    setSignUpErrors({});
    setSignInEmail("");
    setSignInPassword("");
    setSignUpEmail("");
    setSignUpPassword("");
    setSignUpConfirmPassword("");
    setSignUpCountryCode("+1");
    setSignUpPhoneNumber("");
    setPendingVerification(false);
    setPendingPhoneVerification(false);
    setVerificationCode("");
    setPhoneVerificationCode("");
    setVerificationType("email");
  };

  const handleGuestLogin = async () => {
    try {
      // Store guest flag using utility function
      await setGuestMode();
      showSuccess("Continuing as guest");
      // Small delay to show toast before navigation
      setTimeout(() => {
        router.replace("/(tabs)");
      }, 500);
    } catch (error) {
      console.error("Guest login error:", error);
      showError("Failed to continue as guest. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {!pendingVerification && !pendingPhoneVerification && (
            <View style={styles.header}>
              <Text style={styles.title}>
                {isSignUp ? "Create Account" : "Welcome Back"}
              </Text>
              <Text style={styles.subtitle}>
                {isSignUp ? "Sign up to get started" : "Sign in to continue"}
              </Text>
            </View>
          )}

          <View style={styles.form}>
            {isSignUp ? (
              pendingPhoneVerification ? (
                <View
                  key="phone-verification"
                  style={styles.verificationContainer}
                >
                  <View style={styles.verificationIconContainer}>
                    <View style={styles.verificationIconCircle}>
                      <Ionicons
                        name="call-outline"
                        size={size.verticalScale(48)}
                        color={COLORS.primaryButton}
                      />
                    </View>
                  </View>

                  <View style={styles.verificationHeader}>
                    <Text style={styles.verificationTitle}>
                      Check your phone
                    </Text>
                    <Text style={styles.verificationSubtitle}>
                      We've sent a 6-digit verification code to
                    </Text>
                    <Text style={styles.emailText}>
                      {signUpCountryCode}
                      {signUpPhoneNumber}
                    </Text>
                  </View>

                  <View style={styles.codeInputContainer}>
                    <TextInput
                      key="phone-verification-code"
                      label="Verification Code"
                      value={phoneVerificationCode}
                      onChangeText={setPhoneVerificationCode}
                      placeholder="000000"
                      keyboardType="number-pad"
                      autoCapitalize="none"
                      autoCorrect={false}
                      error={signUpErrors.phoneCode}
                      required
                      maxLength={6}
                      style={styles.codeInput}
                    />
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.button,
                      (isLoading || phoneVerificationCode.length !== 6) &&
                        styles.buttonDisabled,
                      styles.verifyButton,
                    ]}
                    onPress={handlePhoneVerification}
                    disabled={isLoading || phoneVerificationCode.length !== 6}
                  >
                    {isLoading ? (
                      <ActivityIndicator size="small" color={COLORS.white} />
                    ) : (
                      <Text style={styles.buttonText}>Verify Phone</Text>
                    )}
                  </TouchableOpacity>

                  <View style={styles.verificationActions}>
                    <TouchableOpacity
                      style={styles.resendButton}
                      onPress={handleResendCode}
                      disabled={isLoading}
                    >
                      <Ionicons
                        name="refresh-outline"
                        size={size.verticalScale(18)}
                        color={COLORS.primaryButton}
                        style={styles.resendIcon}
                      />
                      <Text style={styles.resendButtonText}>Resend Code</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : pendingVerification ? (
                <View
                  key="email-verification"
                  style={styles.verificationContainer}
                >
                  <View style={styles.verificationIconContainer}>
                    <View style={styles.verificationIconCircle}>
                      <Ionicons
                        name="mail-outline"
                        size={size.verticalScale(48)}
                        color={COLORS.primaryButton}
                      />
                    </View>
                  </View>

                  <View style={styles.verificationHeader}>
                    <Text style={styles.verificationTitle}>
                      Check your email
                    </Text>
                    <Text style={styles.verificationSubtitle}>
                      We've sent a 6-digit verification code to
                    </Text>
                    <Text style={styles.emailText}>{signUpEmail}</Text>
                  </View>

                  <View style={styles.codeInputContainer}>
                    <TextInput
                      key="email-verification-code"
                      label="Verification Code"
                      value={verificationCode}
                      onChangeText={setVerificationCode}
                      placeholder="000000"
                      keyboardType="number-pad"
                      autoCapitalize="none"
                      autoCorrect={false}
                      error={signUpErrors.code}
                      required
                      maxLength={6}
                      style={styles.codeInput}
                    />
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.button,
                      (isLoading || verificationCode.length !== 6) &&
                        styles.buttonDisabled,
                      styles.verifyButton,
                    ]}
                    onPress={handleVerification}
                    disabled={isLoading || verificationCode.length !== 6}
                  >
                    {isLoading ? (
                      <ActivityIndicator size="small" color={COLORS.white} />
                    ) : (
                      <Text style={styles.buttonText}>Verify Email</Text>
                    )}
                  </TouchableOpacity>

                  <View style={styles.verificationActions}>
                    <TouchableOpacity
                      style={styles.resendButton}
                      onPress={handleResendCode}
                      disabled={isLoading}
                    >
                      <Ionicons
                        name="refresh-outline"
                        size={size.verticalScale(18)}
                        color={COLORS.primaryButton}
                        style={styles.resendIcon}
                      />
                      <Text style={styles.resendButtonText}>Resend Code</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.backButton}
                      onPress={() => {
                        setPendingVerification(false);
                        setVerificationCode("");
                        setSignUpErrors({});
                      }}
                      disabled={isLoading}
                    >
                      <Ionicons
                        name="arrow-back-outline"
                        size={size.verticalScale(18)}
                        color={COLORS.lightGray}
                        style={styles.backIcon}
                      />
                      <Text style={styles.backButtonText}>Change Email</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <>
                  <TextInput
                    label="Email"
                    value={signUpEmail}
                    onChangeText={setSignUpEmail}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    error={signUpErrors.email}
                    required
                  />

                  <View style={styles.phoneContainer}>
                    <Text style={styles.phoneLabel}>
                      Phone Number <Text style={styles.required}>*</Text>
                    </Text>
                    <View style={styles.phoneInputRow}>
                      <View style={styles.countryCodeContainer}>
                        <RNTextInput
                          value={signUpCountryCode}
                          onChangeText={(text) => {
                            // Ensure it starts with +
                            if (!text.startsWith("+")) {
                              setSignUpCountryCode(
                                "+" + text.replace(/\D/g, "")
                              );
                            } else {
                              // Only allow + and digits
                              const cleaned = "+" + text.replace(/[^0-9]/g, "");
                              setSignUpCountryCode(cleaned);
                            }
                          }}
                          placeholder="+1"
                          keyboardType="phone-pad"
                          autoCapitalize="none"
                          autoCorrect={false}
                          style={[
                            styles.countryCodeInput,
                            signUpErrors.phoneNumber && styles.phoneInputError,
                          ]}
                          placeholderTextColor={COLORS.lightGray}
                          maxLength={5}
                        />
                      </View>
                      <View style={styles.phoneNumberContainer}>
                        <RNTextInput
                          value={signUpPhoneNumber}
                          onChangeText={(text) => {
                            // Only allow digits
                            const digits = text.replace(/\D/g, "");
                            setSignUpPhoneNumber(digits);
                          }}
                          placeholder="1234567890"
                          keyboardType="phone-pad"
                          autoCapitalize="none"
                          autoCorrect={false}
                          style={[
                            styles.phoneNumberInput,
                            signUpErrors.phoneNumber && styles.phoneInputError,
                          ]}
                          placeholderTextColor={COLORS.lightGray}
                          maxLength={15}
                        />
                      </View>
                    </View>
                    {signUpErrors.phoneNumber && (
                      <Text style={styles.phoneErrorText}>
                        {signUpErrors.phoneNumber}
                      </Text>
                    )}
                  </View>

                  <TextInput
                    key="signup-password"
                    label="Password"
                    value={signUpPassword}
                    onChangeText={setSignUpPassword}
                    placeholder="Enter your password"
                    secureTextEntry
                    autoCapitalize="none"
                    error={signUpErrors.password}
                    required
                  />

                  <TextInput
                    key="signup-confirm-password"
                    label="Confirm Password"
                    value={signUpConfirmPassword}
                    onChangeText={setSignUpConfirmPassword}
                    placeholder="Confirm your password"
                    secureTextEntry
                    autoCapitalize="none"
                    error={signUpErrors.confirmPassword}
                    required
                  />

                  <TouchableOpacity
                    style={[styles.button, isLoading && styles.buttonDisabled]}
                    onPress={handleSignUp}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ActivityIndicator size="small" color={COLORS.white} />
                    ) : (
                      <Text style={styles.buttonText}>Sign Up</Text>
                    )}
                  </TouchableOpacity>
                </>
              )
            ) : (
              <>
                <TextInput
                  label="Email"
                  value={signInEmail}
                  onChangeText={setSignInEmail}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  error={signInErrors.email}
                  required
                />

                <TextInput
                  key="signin-password"
                  label="Password"
                  value={signInPassword}
                  onChangeText={setSignInPassword}
                  placeholder="Enter your password"
                  secureTextEntry
                  autoCapitalize="none"
                  error={signInErrors.password}
                  required
                />

                <TouchableOpacity
                  style={[styles.button, isLoading && styles.buttonDisabled]}
                  onPress={handleSignIn}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color={COLORS.white} />
                  ) : (
                    <Text style={styles.buttonText}>Sign In</Text>
                  )}
                </TouchableOpacity>
              </>
            )}

            {!pendingVerification && !pendingPhoneVerification && (
              <>
                <View style={styles.switchContainer}>
                  <Text style={styles.switchText}>
                    {isSignUp
                      ? "Already have an account? "
                      : "Don't have an account? "}
                  </Text>
                  <TouchableOpacity onPress={toggleMode}>
                    <Text style={styles.switchLink}>
                      {isSignUp ? "Sign In" : "Sign Up"}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.dividerContainer}>
                  <View style={styles.divider} />
                  <Text style={styles.dividerText}>OR</Text>
                  <View style={styles.divider} />
                </View>

                <TouchableOpacity
                  style={styles.guestButton}
                  onPress={handleGuestLogin}
                  disabled={isLoading}
                >
                  <Text style={styles.guestButtonText}>Continue as Guest</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: size.moderateScale(20),
  },
  header: {
    marginTop:
      Platform.OS === "ios" ? size.verticalScale(30) : size.verticalScale(20),
    marginBottom: size.verticalScale(32),
  },
  title: {
    fontSize: fontSize.extraExtraExtraHuge,
    fontFamily: fonts.Bold,
    color: COLORS.black,
    marginBottom: size.verticalScale(8),
  },
  subtitle: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Regular,
    color: COLORS.lightGray,
  },
  form: {
    flex: 1,
  },
  button: {
    backgroundColor: COLORS.primaryButton,
    borderRadius: size.scale(12),
    paddingVertical: size.verticalScale(16),
    alignItems: "center",
    justifyContent: "center",
    marginTop: size.verticalScale(8),
    marginBottom: size.verticalScale(24),
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Medium,
    color: COLORS.white,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: size.verticalScale(16),
  },
  switchText: {
    fontSize: fontSize.regular,
    fontFamily: fonts.Regular,
    color: COLORS.lightGray,
  },
  switchLink: {
    fontSize: fontSize.regular,
    fontFamily: fonts.Medium,
    color: COLORS.primaryButton,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: size.verticalScale(24),
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    marginHorizontal: size.moderateScale(16),
    fontSize: fontSize.regular,
    fontFamily: fonts.Regular,
    color: COLORS.lightGray,
  },
  guestButton: {
    borderWidth: 1.5,
    borderColor: COLORS.primaryButton,
    borderRadius: size.scale(12),
    paddingVertical: size.verticalScale(16),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: size.verticalScale(16),
  },
  guestButtonText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Medium,
    color: COLORS.primaryButton,
  },
  verificationContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: size.verticalScale(60),
  },
  verificationIconContainer: {
    marginBottom: size.verticalScale(32),
    alignItems: "center",
  },
  verificationIconCircle: {
    width: size.moderateScale(120),
    height: size.moderateScale(120),
    borderRadius: size.scale(60),
    backgroundColor: COLORS.lightBlue,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.primaryButton,
  },
  verificationHeader: {
    marginBottom: size.verticalScale(32),
    alignItems: "center",
    width: "100%",
  },
  verificationTitle: {
    fontSize: fontSize.extraExtraExtraHuge,
    fontFamily: fonts.Bold,
    color: COLORS.black,
    marginBottom: size.verticalScale(12),
    textAlign: "center",
  },
  verificationSubtitle: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Regular,
    color: COLORS.lightGray,
    textAlign: "center",
    lineHeight: size.verticalScale(22),
    marginBottom: size.verticalScale(8),
  },
  emailText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Medium,
    color: COLORS.black,
    textAlign: "center",
  },
  codeInputContainer: {
    width: "100%",
    marginBottom: size.verticalScale(24),
  },
  codeInput: {
    fontSize: fontSize.semiLarge,
    fontFamily: fonts.Bold,
    letterSpacing: size.moderateScale(8),
    textAlign: "center",
  },
  verifyButton: {
    width: "100%",
    marginBottom: size.verticalScale(24),
  },
  verificationActions: {
    width: "100%",
    alignItems: "center",
    gap: size.verticalScale(16),
  },
  resendButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: size.verticalScale(12),
    paddingHorizontal: size.moderateScale(20),
  },
  resendIcon: {
    marginRight: size.moderateScale(8),
  },
  resendButtonText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Medium,
    color: COLORS.primaryButton,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: size.verticalScale(12),
    paddingHorizontal: size.moderateScale(20),
  },
  backIcon: {
    marginRight: size.moderateScale(8),
  },
  backButtonText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Regular,
    color: COLORS.lightGray,
  },
  phoneContainer: {
    marginBottom: size.verticalScale(16),
  },
  phoneLabel: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Medium,
    color: COLORS.black,
    marginBottom: size.verticalScale(8),
  },
  required: {
    color: COLORS.error,
  },
  phoneInputRow: {
    flexDirection: "row",
    gap: size.moderateScale(12),
  },
  countryCodeContainer: {
    width: size.moderateScale(80),
  },
  countryCodeInput: {
    borderWidth: StyleSheet.hairlineWidth * 3,
    borderColor: COLORS.border,
    borderRadius: size.scale(12),
    paddingHorizontal: size.scale(12),
    paddingVertical: size.verticalScale(14),
    fontSize: fontSize.medium,
    backgroundColor: COLORS.white,
    color: COLORS.black,
    textAlign: "center",
  },
  phoneNumberContainer: {
    flex: 1,
  },
  phoneNumberInput: {
    borderWidth: StyleSheet.hairlineWidth * 3,
    borderColor: COLORS.border,
    borderRadius: size.scale(12),
    paddingHorizontal: size.scale(16),
    paddingVertical: size.verticalScale(14),
    fontSize: fontSize.medium,
    backgroundColor: COLORS.white,
    color: COLORS.black,
  },
  phoneInputError: {
    borderColor: COLORS.error,
  },
  phoneErrorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 4,
  },
});

export default SignInScreen;

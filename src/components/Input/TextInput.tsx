import { COLORS } from "@/src/constants/colors";
import { fontSize } from "@/src/constants/fontSize";
import fonts from "@/src/constants/fonts";
import { size } from "@/src/utils/size";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  TextInput as RNTextInput,
  StyleSheet,
  Text,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  required?: boolean;
}

export const TextInput: React.FC<CustomTextInputProps> = ({
  label,
  error,
  required,
  style,
  secureTextEntry,
  value,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const showPasswordToggle = secureTextEntry;

  // Reset password visibility when value is cleared (e.g., when switching between sign in/sign up)
  useEffect(() => {
    if (value === "" || value === undefined) {
      setIsPasswordVisible(false);
    }
  }, [value]);

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      <View style={styles.inputContainer}>
        <RNTextInput
          style={[
            styles.input,
            error && styles.inputError,
            showPasswordToggle && styles.inputWithIcon,
            style,
          ]}
          placeholderTextColor={COLORS.lightGray}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          {...props}
        />
        {showPasswordToggle && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
              size={size.verticalScale(20)}
              color={COLORS.lightGray}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: size.verticalScale(16),
  },
  label: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Medium,
    color: COLORS.black,
    marginBottom: size.verticalScale(8),
  },
  required: {
    color: COLORS.error,
  },
  inputContainer: {
    position: "relative",
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth * 3,
    borderColor: COLORS.border,
    borderRadius: size.scale(12),
    paddingHorizontal: size.scale(16),
    paddingVertical: size.verticalScale(14),
    fontSize: fontSize.medium,
    backgroundColor: COLORS.white,
    color: COLORS.black,
    minHeight: size.verticalScale(48),
  },
  inputWithIcon: {
    paddingRight: size.moderateScale(48),
  },
  inputError: {
    borderColor: COLORS.error,
  },
  eyeIcon: {
    position: "absolute",
    right: size.moderateScale(12),
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    width: size.moderateScale(40),
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 4,
  },
});

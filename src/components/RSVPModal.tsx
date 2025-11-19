import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../constants/colors";
import { fontSize } from "../constants/fontSize";
import fonts from "../constants/fonts";
import { size } from "../utils/size";
import { TextInput } from "./Input/TextInput";

const EVENT_CATEGORIES = [
  "Games",
  "Music",
  "Sports",
  "Food",
  "Arts",
  "Tech",
  "Social",
];

type PurposeOption = "EVENTS" | "DATING" | "BOTH";

interface RSVPModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    email: string;
    isSingle: boolean;
    purpose: PurposeOption;
    favoriteCategories: string[];
  }) => void;
  isSubmitting?: boolean;
}

export const RSVPModal: React.FC<RSVPModalProps> = ({
  visible,
  onClose,
  onSubmit,
  isSubmitting = false,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSingle, setIsSingle] = useState(false);
  const [purpose, setPurpose] = useState<PurposeOption | null>(null);
  const [favoriteCategories, setFavoriteCategories] = useState<string[]>([]);

  const handleCategoryToggle = (category: string) => {
    setFavoriteCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      return;
    }
    if (!email.trim() || !validateEmail(email)) {
      return;
    }
    if (!purpose) {
      return;
    }
    onSubmit({
      name: name.trim(),
      email: email.trim(),
      isSingle,
      purpose,
      favoriteCategories,
    });
  };

  const handleClose = () => {
    // Reset form when closing
    setName("");
    setEmail("");
    setIsSingle(false);
    setPurpose(null);
    setFavoriteCategories([]);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>RSVP</Text>
            <TouchableOpacity
              onPress={handleClose}
              style={styles.closeButton}
              disabled={isSubmitting}
            >
              <Ionicons
                name="close"
                size={size.verticalScale(24)}
                color={COLORS.black}
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Name Field */}
            <View style={[styles.section, styles.firstSection]}>
              <TextInput
                label="Name"
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
                required
                editable={!isSubmitting}
                autoCapitalize="words"
              />
            </View>

            {/* Email Field */}
            <View style={styles.section}>
              <TextInput
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                required
                editable={!isSubmitting}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Are you single? */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Are you single?</Text>
                <Switch
                  value={isSingle}
                  onValueChange={setIsSingle}
                  trackColor={{
                    false: COLORS.border,
                    true: COLORS.primaryButton,
                  }}
                  thumbColor={COLORS.white}
                  disabled={isSubmitting}
                />
              </View>
            </View>

            {/* What brings you here? */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>What brings you here?</Text>
              <View style={styles.radioGroup}>
                {(["EVENTS", "DATING", "BOTH"] as PurposeOption[]).map(
                  (option) => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.radioOption,
                        purpose === option && styles.radioOptionSelected,
                      ]}
                      onPress={() => setPurpose(option)}
                      disabled={isSubmitting}
                    >
                      <View style={styles.radioCircle}>
                        {purpose === option && (
                          <View style={styles.radioInner} />
                        )}
                      </View>
                      <Text
                        style={[
                          styles.radioText,
                          purpose === option && styles.radioTextSelected,
                        ]}
                      >
                        {option}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
            </View>

            {/* Favorite event categories */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Favorite event categories</Text>
              <View style={styles.chipsContainer}>
                {EVENT_CATEGORIES.map((category) => {
                  const isSelected = favoriteCategories.includes(category);
                  return (
                    <TouchableOpacity
                      key={category}
                      style={[styles.chip, isSelected && styles.chipSelected]}
                      onPress={() => handleCategoryToggle(category)}
                      disabled={isSubmitting}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          isSelected && styles.chipTextSelected,
                        ]}
                      >
                        {category}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </ScrollView>

          {/* Submit Button */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={[
                styles.submitButton,
                (!name.trim() ||
                  !email.trim() ||
                  !validateEmail(email) ||
                  !purpose ||
                  isSubmitting) &&
                  styles.submitButtonDisabled,
                {
                  marginBottom:
                    Platform.OS === "ios"
                      ? size.verticalScale(15)
                      : size.verticalScale(45),
                },
              ]}
              onPress={handleSubmit}
              disabled={
                !name.trim() ||
                !email.trim() ||
                !validateEmail(email) ||
                !purpose ||
                isSubmitting
              }
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color={COLORS.white} />
              ) : (
                <Text style={styles.submitButtonText}>Submit</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: size.scale(24),
    borderTopRightRadius: size.scale(24),
    maxHeight: "90%",
    minHeight: size.verticalScale(400),
    paddingBottom: size.verticalScale(12),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: size.moderateScale(20),
    paddingTop: size.verticalScale(12),
    paddingBottom: size.verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: fontSize.extraLarge,
    fontFamily: fonts.Bold,
    color: COLORS.black,
  },
  closeButton: {
    width: size.moderateScale(32),
    height: size.moderateScale(32),
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    paddingHorizontal: size.moderateScale(20),
    flexGrow: 1,
  },
  scrollViewContent: {
    paddingBottom: size.verticalScale(8),
  },
  section: {
    marginTop: size.verticalScale(12),
    marginBottom: size.verticalScale(2),
  },
  firstSection: {
    marginTop: size.verticalScale(8),
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: fontSize.semiLarge,
    fontFamily: fonts.Bold,
    color: COLORS.black,
    marginBottom: size.verticalScale(8),
  },
  radioGroup: {
    gap: size.verticalScale(8),
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: size.verticalScale(12),
    paddingHorizontal: size.moderateScale(16),
    borderRadius: size.scale(12),
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  radioOptionSelected: {
    borderColor: COLORS.primaryButton,
    backgroundColor: COLORS.lightBlue,
  },
  radioCircle: {
    width: size.moderateScale(20),
    height: size.moderateScale(20),
    borderRadius: size.scale(10),
    borderWidth: 2,
    borderColor: COLORS.border,
    marginRight: size.moderateScale(12),
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    width: size.moderateScale(10),
    height: size.moderateScale(10),
    borderRadius: size.scale(5),
    backgroundColor: COLORS.primaryButton,
  },
  radioText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Medium,
    color: COLORS.gray,
  },
  radioTextSelected: {
    color: COLORS.primaryButton,
    fontFamily: fonts.Bold,
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: size.moderateScale(8),
  },
  chip: {
    paddingHorizontal: size.moderateScale(16),
    paddingVertical: size.verticalScale(10),
    borderRadius: size.scale(20),
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  chipSelected: {
    backgroundColor: COLORS.primaryButton,
    borderColor: COLORS.primaryButton,
  },
  chipText: {
    fontSize: fontSize.regular,
    fontFamily: fonts.Medium,
    color: COLORS.gray,
  },
  chipTextSelected: {
    color: COLORS.white,
  },
  footer: {
    paddingHorizontal: size.moderateScale(20),
    paddingTop: size.verticalScale(10),
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  submitButton: {
    backgroundColor: COLORS.primaryButton,
    paddingVertical: size.verticalScale(16),
    borderRadius: size.scale(12),
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Bold,
    color: COLORS.white,
  },
});

import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../../constants/theme";
import { COLORS } from "../../constants/colors";
import { fontSize } from "../../constants/fontSize";
import fonts from "../../constants/fonts";
import { size } from "../../utils/size";

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  label?: string;
  options: DropdownOption[];
  value?: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onSelect,
  placeholder = "Select an option",
  error,
  required,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (optionValue: string) => {
    onSelect(optionValue);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      <TouchableOpacity
        style={[
          styles.dropdown,
          error && styles.dropdownError,
          disabled && styles.dropdownDisabled,
        ]}
        onPress={() => !disabled && setIsOpen(true)}
        disabled={disabled}
      >
        <Text
          style={[
            styles.dropdownText,
            !selectedOption && styles.placeholderText,
          ]}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Ionicons
          name="chevron-down"
          size={size.verticalScale(20)}
          color={COLORS.lightGray}
        />
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label || "Select"}</Text>
              <TouchableOpacity onPress={() => setIsOpen(false)}>
                <Ionicons
                  name="close"
                  size={size.verticalScale(24)}
                  color={COLORS.black}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              bounces={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom:
                  Platform.OS === "ios" ? 0 : size.verticalScale(20),
              }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    value === item.value && styles.optionSelected,
                  ]}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      value === item.value && styles.optionTextSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {value === item.value && (
                    <Ionicons
                      name="checkmark"
                      size={size.verticalScale(20)}
                      color={Colors.light.tint}
                    />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
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
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: size.verticalScale(12),
    paddingHorizontal: size.verticalScale(16),
    paddingVertical: size.verticalScale(14),
    backgroundColor: COLORS.white,
  },
  dropdownError: {
    borderColor: COLORS.error,
  },
  dropdownDisabled: {
    opacity: 0.5,
  },
  dropdownText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Regular,
    color: COLORS.black,
    flex: 1,
  },
  placeholderText: {
    color: COLORS.lightGray,
  },
  errorText: {
    color: COLORS.error,
    fontSize: fontSize.light,
    fontFamily: fonts.Regular,
    marginTop: size.verticalScale(4),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: size.verticalScale(20),
    borderTopRightRadius: size.verticalScale(20),
    maxHeight: "70%",
    paddingBottom: size.verticalScale(20),
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: size.verticalScale(20),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: fontSize.semiLarge,
    fontFamily: fonts.Medium,
    color: COLORS.black,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: size.verticalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightWhite,
  },
  optionSelected: {
    backgroundColor: COLORS.lightBlue,
  },
  optionText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Regular,
    color: COLORS.black,
  },
  optionTextSelected: {
    fontFamily: fonts.Medium,
    color: Colors.light.tint,
  },
});

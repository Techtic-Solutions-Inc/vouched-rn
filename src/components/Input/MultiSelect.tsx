import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
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

interface MultiSelectOption {
  label: string;
  value: string;
}

interface MultiSelectProps {
  label?: string;
  options: MultiSelectOption[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  error?: string;
  required?: boolean;
  maxSelections?: number;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  selectedValues,
  onSelectionChange,
  error,
  required,
  maxSelections,
}) => {
  const toggleSelection = (value: string) => {
    if (selectedValues.includes(value)) {
      onSelectionChange(selectedValues.filter((v) => v !== value));
    } else {
      if (maxSelections && selectedValues.length >= maxSelections) {
        return;
      }
      onSelectionChange([...selectedValues, value]);
    }
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
          {maxSelections && (
            <Text style={styles.hint}> (Select up to {maxSelections})</Text>
          )}
        </Text>
      )}
      <View style={styles.scrollContainer}>
        <ScrollView
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          bounces={false}
        >
          <View style={styles.optionsContainer}>
            {options.map((option) => {
              const isSelected = selectedValues.includes(option.value);
              return (
                <TouchableOpacity
                  key={option.value}
                  style={[styles.option, isSelected && styles.optionSelected]}
                  onPress={() => toggleSelection(option.value)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.optionTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                  {isSelected && (
                    <Ionicons
                      name="checkmark-circle"
                      size={size.verticalScale(15)}
                      color={Colors.light.tint}
                      style={styles.checkIcon}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
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
  hint: {
    fontSize: fontSize.regular,
    fontFamily: fonts.Regular,
    color: COLORS.lightGray,
  },
  scrollContainer: {
    borderRadius: size.verticalScale(12),
    padding: size.verticalScale(4),
    maxHeight: size.verticalScale(200), // Show more options (approximately 6-7 lines)
  },
  scrollView: {
    flexGrow: 0,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: size.verticalScale(12),
    paddingVertical: size.verticalScale(10),
    borderRadius: size.verticalScale(20),
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    marginRight: size.verticalScale(8),
    marginBottom: size.verticalScale(8),
  },
  optionSelected: {
    backgroundColor: COLORS.lightBlue,
    borderColor: Colors.light.tint,
  },
  optionText: {
    fontSize: fontSize.regular,
    fontFamily: fonts.Regular,
    color: COLORS.black,
  },
  optionTextSelected: {
    fontFamily: fonts.Medium,
    color: Colors.light.tint,
  },
  checkIcon: {
    marginLeft: size.verticalScale(6),
  },
  errorText: {
    color: COLORS.error,
    fontSize: fontSize.light,
    fontFamily: fonts.Regular,
    marginTop: size.verticalScale(4),
  },
});

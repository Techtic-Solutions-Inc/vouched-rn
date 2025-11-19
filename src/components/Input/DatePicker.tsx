import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../constants/colors";
import { fontSize } from "../../constants/fontSize";
import fonts from "../../constants/fonts";
import { size } from "../../utils/size";

interface DatePickerProps {
  label?: string;
  value: Date | null;
  onDateChange: (date: Date | null) => void;
  maximumDate?: Date;
  minimumDate?: Date;
  error?: string;
  required?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onDateChange,
  maximumDate,
  minimumDate,
  error,
  required,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
    }
    if (selectedDate) {
      onDateChange(selectedDate);
      if (Platform.OS === "ios") {
        setShowPicker(false);
      }
    }
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
        style={[styles.dateButton, error && styles.dateButtonError]}
        onPress={() => setShowPicker(true)}
      >
        <Text style={[styles.dateText, !value && styles.placeholderText]}>
          {value ? formatDate(value) : "Select date"}
        </Text>
        <Ionicons
          name="calendar-outline"
          size={size.verticalScale(20)}
          color={COLORS.lightGray}
        />
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}

      {showPicker && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
        />
      )}
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
  dateButton: {
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
  dateButtonError: {
    borderColor: COLORS.error,
  },
  dateText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Regular,
    color: COLORS.black,
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
});

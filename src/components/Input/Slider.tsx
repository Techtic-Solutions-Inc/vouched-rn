import { size } from "@/src/utils/size";
import SliderComponent from "@react-native-community/slider";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../constants/theme";
import { COLORS } from "../../constants/colors";
import { fontSize } from "../../constants/fontSize";
import fonts from "../../constants/fonts";

interface SliderProps {
  label?: string;
  value: number;
  onValueChange: (value: number) => void;
  minimumValue: number;
  maximumValue: number;
  step?: number;
  unit?: string;
  error?: string;
  required?: boolean;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  value,
  onValueChange,
  minimumValue,
  maximumValue,
  step = 1,
  unit = "",
  error,
  required,
}) => {
  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
          <Text style={styles.valueText}>
            {value} {unit}
          </Text>
        </View>
      )}
      <SliderComponent
        style={styles.slider}
        value={value}
        onValueChange={onValueChange}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        minimumTrackTintColor={Colors.light.tint}
        maximumTrackTintColor={COLORS.border}
        thumbTintColor={Colors.light.tint}
      />
      <View style={styles.rangeContainer}>
        <Text style={styles.rangeText}>
          {minimumValue} {unit}
        </Text>
        <Text style={styles.rangeText}>
          {maximumValue} {unit}
        </Text>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom:
      Platform.OS === "ios" ? size.verticalScale(16) : size.verticalScale(26),
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: size.verticalScale(8),
  },
  label: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Medium,
    color: COLORS.black,
  },
  required: {
    color: COLORS.error,
  },
  valueText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Medium,
    color: Colors.light.tint,
  },
  slider: {
    width: "100%",
    height: size.verticalScale(40),
  },
  rangeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: size.verticalScale(4),
  },
  rangeText: {
    fontSize: fontSize.light,
    fontFamily: fonts.Regular,
    color: COLORS.lightGray,
  },
  errorText: {
    color: COLORS.error,
    fontSize: fontSize.light,
    fontFamily: fonts.Regular,
    marginTop: size.verticalScale(4),
  },
});

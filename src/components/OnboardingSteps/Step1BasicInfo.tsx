import { globalStyles } from "@/src/styles/global";
import { size } from "@/src/utils/size";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import {
  GENDERS,
  LOOKING_FOR,
  PRONOUNS,
} from "../../constants/onboardingOptions";
import { Step1Data } from "../../types/onboarding";
import { DatePicker, Dropdown, MultiSelect, Slider, TextInput } from "../Input";

interface Step1Props {
  data: Step1Data;
  onChange: (data: Step1Data) => void;
  errors: Partial<Record<keyof Step1Data, string>>;
}

export const Step1BasicInfo: React.FC<Step1Props> = ({
  data,
  onChange,
  errors,
}) => {
  const updateField = <K extends keyof Step1Data>(
    field: K,
    value: Step1Data[K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  const calculateAge = (dob: Date | null): number | null => {
    if (!dob) return null;
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 100);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={globalStyles.mainTitle}>Basic Information</Text>
      <Text style={globalStyles.subTitle}>Tell us about yourself</Text>

      <TextInput
        label="First Name"
        value={data.firstName}
        onChangeText={(text) => updateField("firstName", text)}
        placeholder="Enter your first name"
        error={errors.firstName}
        required
      />

      <TextInput
        label="Last Name"
        value={data.lastName}
        onChangeText={(text) => updateField("lastName", text)}
        placeholder="Enter your last name"
        error={errors.lastName}
        required
      />

      <MultiSelect
        label="Pronouns"
        options={PRONOUNS}
        selectedValues={data.pronouns}
        onSelectionChange={(values) => updateField("pronouns", values)}
        error={errors.pronouns}
        required
      />

      <DatePicker
        label="Date of Birth"
        value={data.dateOfBirth ? new Date(data.dateOfBirth) : null}
        onDateChange={(date) =>
          updateField("dateOfBirth", date ? date.toISOString() : null)
        }
        maximumDate={maxDate}
        minimumDate={minDate}
        error={errors.dateOfBirth}
        required
      />

      <Dropdown
        label="Gender"
        options={GENDERS}
        value={data.gender}
        onSelect={(value) => updateField("gender", value)}
        placeholder="Select your gender"
        error={errors.gender}
        required
      />

      <MultiSelect
        label="Looking For"
        options={LOOKING_FOR}
        selectedValues={data.lookingFor}
        onSelectionChange={(values) => updateField("lookingFor", values)}
        error={errors.lookingFor}
        required
      />

      <TextInput
        label="City"
        value={data.city}
        onChangeText={(text) => updateField("city", text)}
        placeholder="Enter your city"
        error={errors.city}
        required
      />

      <TextInput
        label="Zip Code"
        value={data.zipCode}
        onChangeText={(text) => updateField("zipCode", text.replace(/\D/g, ""))}
        placeholder="Enter zip code"
        keyboardType="numeric"
        error={errors.zipCode}
        required
      />

      <Slider
        label="Max Distance"
        value={data.maxDistance}
        onValueChange={(value) => updateField("maxDistance", Math.round(value))}
        minimumValue={5}
        maximumValue={50}
        step={5}
        unit="miles"
        error={errors.maxDistance}
        required
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: size.scale(20),
  },
});

import { globalStyles } from "@/src/styles/global";
import { size } from "@/src/utils/size";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import {
  ADVANCE_NOTICE,
  AVAILABILITY,
  BEST_DATE_TIMES,
  DATE_DURATION,
  DATE_FREQUENCY,
} from "../../constants/onboardingOptions";
import { Step2Data } from "../../types/onboarding";
import { Dropdown, MultiSelect } from "../Input";

interface Step2Props {
  data: Step2Data;
  onChange: (data: Step2Data) => void;
  errors: Partial<Record<keyof Step2Data, string>>;
}

export const Step2Availability: React.FC<Step2Props> = ({
  data,
  onChange,
  errors,
}) => {
  const updateField = <K extends keyof Step2Data>(
    field: K,
    value: Step2Data[K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={globalStyles.mainTitle}>
        Availability & Dating Preferences
      </Text>
      <Text style={globalStyles.subTitle}>
        When and how do you like to date?
      </Text>

      <MultiSelect
        label="Availability"
        options={AVAILABILITY}
        selectedValues={data.availability}
        onSelectionChange={(values) => updateField("availability", values)}
        error={errors.availability}
        required
      />

      <Dropdown
        label="Advance Notice"
        options={ADVANCE_NOTICE}
        value={data.advanceNotice}
        onSelect={(value) => updateField("advanceNotice", value)}
        placeholder="How much notice do you prefer?"
        error={errors.advanceNotice}
        required
      />

      <Dropdown
        label="Date Frequency"
        options={DATE_FREQUENCY}
        value={data.dateFrequency}
        onSelect={(value) => updateField("dateFrequency", value)}
        placeholder="How often do you like to date?"
        error={errors.dateFrequency}
        required
      />

      <MultiSelect
        label="Best Date Times"
        options={BEST_DATE_TIMES}
        selectedValues={data.bestDateTimes}
        onSelectionChange={(values) => updateField("bestDateTimes", values)}
        error={errors.bestDateTimes}
        required
      />

      <Dropdown
        label="Date Duration"
        options={DATE_DURATION}
        value={data.dateDuration}
        onSelect={(value) => updateField("dateDuration", value)}
        placeholder="Preferred date duration"
        error={errors.dateDuration}
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

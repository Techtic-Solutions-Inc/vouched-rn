import { globalStyles } from "@/src/styles/global";
import { size } from "@/src/utils/size";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import {
  COMMUNICATION_FREQUENCY,
  COMMUNICATION_STYLES,
} from "../../constants/onboardingOptions";
import { Step4Data } from "../../types/onboarding";
import { Dropdown, MultiSelect } from "../Input";

interface Step4Props {
  data: Step4Data;
  onChange: (data: Step4Data) => void;
  errors: Partial<Record<keyof Step4Data, string>>;
}

export const Step4Communication: React.FC<Step4Props> = ({
  data,
  onChange,
  errors,
}) => {
  const updateField = <K extends keyof Step4Data>(
    field: K,
    value: Step4Data[K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={globalStyles.mainTitle}>Communication Style</Text>
      <Text style={globalStyles.subTitle}>How do you communicate?</Text>

      <MultiSelect
        label="Communication Styles"
        options={COMMUNICATION_STYLES}
        selectedValues={data.communicationStyles}
        onSelectionChange={(values) =>
          updateField("communicationStyles", values)
        }
        error={errors.communicationStyles}
        required
      />

      <Dropdown
        label="Communication Frequency"
        options={COMMUNICATION_FREQUENCY}
        value={data.communicationFrequency}
        onSelect={(value) => updateField("communicationFrequency", value)}
        placeholder="How often do you like to communicate?"
        error={errors.communicationFrequency}
        required
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: size.scale(20),
  },
});

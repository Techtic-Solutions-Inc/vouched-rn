import { globalStyles } from "@/src/styles/global";
import { size } from "@/src/utils/size";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import {
  INTIMACY_TIMELINE,
  KIDS_PREFERENCE,
  KIDS_TIMELINE,
  MARRIAGE_PREFERENCE,
  MARRIAGE_TIMELINE,
  PHYSICAL_IMPORTANCE,
  RELATIONSHIP_INTENT,
  RELATIONSHIP_STRUCTURE,
} from "../../constants/onboardingOptions";
import { Step3Data } from "../../types/onboarding";
import { Dropdown } from "../Input";

interface Step3Props {
  data: Step3Data;
  onChange: (data: Step3Data) => void;
  errors: Partial<Record<keyof Step3Data, string>>;
}

export const Step3RelationshipIntent: React.FC<Step3Props> = ({
  data,
  onChange,
  errors,
}) => {
  const updateField = <K extends keyof Step3Data>(
    field: K,
    value: Step3Data[K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  const showKidsTimeline =
    data.kidsPreference === "DEFINITELY_WANT" ||
    data.kidsPreference === "MAYBE_SOMEDAY";
  const showMarriageTimeline =
    data.marriagePreference === "YES" || data.marriagePreference === "SOMEDAY";

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={globalStyles.mainTitle}>Relationship Intent</Text>
      <Text style={globalStyles.subTitle}>
        What are you looking for in a relationship?
      </Text>

      <Dropdown
        label="Relationship Intent"
        options={RELATIONSHIP_INTENT}
        value={data.relationshipIntent}
        onSelect={(value) => updateField("relationshipIntent", value)}
        placeholder="What are you looking for?"
        error={errors.relationshipIntent}
        required
      />

      <Dropdown
        label="Relationship Structure"
        options={RELATIONSHIP_STRUCTURE}
        value={data.relationshipStructure}
        onSelect={(value) => updateField("relationshipStructure", value)}
        placeholder="Select relationship structure (optional)"
        error={errors.relationshipStructure}
      />

      <Dropdown
        label="Kids Preference"
        options={KIDS_PREFERENCE}
        value={data.kidsPreference}
        onSelect={(value) => updateField("kidsPreference", value)}
        placeholder="How do you feel about kids?"
        error={errors.kidsPreference}
        required
      />

      {showKidsTimeline && (
        <Dropdown
          label="Kids Timeline"
          options={KIDS_TIMELINE}
          value={data.kidsTimeline}
          onSelect={(value) => updateField("kidsTimeline", value)}
          placeholder="When are you thinking about kids?"
          error={errors.kidsTimeline}
        />
      )}

      <Dropdown
        label="Marriage Preference"
        options={MARRIAGE_PREFERENCE}
        value={data.marriagePreference}
        onSelect={(value) => updateField("marriagePreference", value)}
        placeholder="How do you feel about marriage?"
        error={errors.marriagePreference}
        required
      />

      {showMarriageTimeline && (
        <Dropdown
          label="Marriage Timeline"
          options={MARRIAGE_TIMELINE}
          value={data.marriageTimeline}
          onSelect={(value) => updateField("marriageTimeline", value)}
          placeholder="When are you thinking about marriage?"
          error={errors.marriageTimeline}
        />
      )}

      <Dropdown
        label="Physical Importance"
        options={PHYSICAL_IMPORTANCE}
        value={data.physicalImportance}
        onSelect={(value) => updateField("physicalImportance", value)}
        placeholder="How important is physical attraction?"
        error={errors.physicalImportance}
        required
      />

      <Dropdown
        label="Intimacy Timeline"
        options={INTIMACY_TIMELINE}
        value={data.intimacyTimeline}
        onSelect={(value) => updateField("intimacyTimeline", value)}
        placeholder="When do you prefer to be intimate?"
        error={errors.intimacyTimeline}
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

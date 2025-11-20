import { globalStyles } from "@/src/styles/global";
import { size } from "@/src/utils/size";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import {
  ATTACHMENT_STYLE,
  ATTRACTION_FACTORS,
  ATTRACTION_IMPORTANCE,
  CAREER_IMPORTANCE,
  CONFLICT_STYLE,
  DEAL_BREAKERS,
  FINANCIAL_APPROACH,
  IDEAL_FIRST_DATE,
  IDEAL_WEEKEND,
  LOVE_LANGUAGES,
  PARTNER_VALUES,
  PERSONALITY_TRAITS,
  SOCIAL_ENERGY,
  STRESS_HANDLING,
  WORST_FIRST_DATE,
} from "../../constants/onboardingOptions";
import { Step6Data } from "../../types/onboarding";
import { Dropdown, MultiSelect } from "../Input";

interface Step6Props {
  data: Step6Data;
  onChange: (data: Step6Data) => void;
  errors: Partial<Record<keyof Step6Data, string>>;
}

export const Step6Personality: React.FC<Step6Props> = ({
  data,
  onChange,
  errors,
}) => {
  const updateField = <K extends keyof Step6Data>(
    field: K,
    value: Step6Data[K]
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
      <Text style={globalStyles.mainTitle}>Personality & Values</Text>
      <Text style={globalStyles.subTitle}>What makes you, you?</Text>

      <MultiSelect
        label="Personality Traits"
        options={PERSONALITY_TRAITS}
        selectedValues={data.personalityTraits}
        onSelectionChange={(values) => updateField("personalityTraits", values)}
        error={errors.personalityTraits}
        required
      />

      <Dropdown
        label="Social Energy"
        options={SOCIAL_ENERGY}
        value={data.socialEnergy}
        onSelect={(value) => updateField("socialEnergy", value)}
        placeholder="What's your social energy level?"
        error={errors.socialEnergy}
        required
      />

      <Dropdown
        label="Ideal Weekend"
        options={IDEAL_WEEKEND}
        value={data.idealWeekend}
        onSelect={(value) => updateField("idealWeekend", value)}
        placeholder="What's your ideal weekend?"
        error={errors.idealWeekend}
        required
      />

      <MultiSelect
        label="Partner Values"
        options={PARTNER_VALUES}
        selectedValues={data.partnerValues}
        onSelectionChange={(values) => updateField("partnerValues", values)}
        error={errors.partnerValues}
        required
      />

      <MultiSelect
        label="Deal Breakers"
        options={DEAL_BREAKERS}
        selectedValues={data.dealBreakers}
        onSelectionChange={(values) => updateField("dealBreakers", values)}
        error={errors.dealBreakers}
        required
      />

      <Dropdown
        label="Ideal First Date"
        options={IDEAL_FIRST_DATE}
        value={data.idealFirstDate}
        onSelect={(value) => updateField("idealFirstDate", value)}
        placeholder="What's your ideal first date?"
        error={errors.idealFirstDate}
        required
      />

      <Dropdown
        label="Worst First Date"
        options={WORST_FIRST_DATE}
        value={data.worstFirstDate}
        onSelect={(value) => updateField("worstFirstDate", value)}
        placeholder="What's your worst first date? (optional)"
        error={errors.worstFirstDate}
      />

      <MultiSelect
        label="Attraction Factors"
        options={ATTRACTION_FACTORS}
        selectedValues={data.attractionFactors}
        onSelectionChange={(values) => updateField("attractionFactors", values)}
        error={errors.attractionFactors}
        required
      />

      <Dropdown
        label="Attraction Importance"
        options={ATTRACTION_IMPORTANCE}
        value={data.attractionImportance}
        onSelect={(value) => updateField("attractionImportance", value)}
        placeholder="How important is attraction?"
        error={errors.attractionImportance}
        required
      />

      <MultiSelect
        label="Love Languages"
        options={LOVE_LANGUAGES}
        selectedValues={data.loveLanguages}
        onSelectionChange={(values) => updateField("loveLanguages", values)}
        error={errors.loveLanguages}
        required
      />

      {data.loveLanguages.length > 0 && (
        <Dropdown
          label="Primary Love Language"
          options={LOVE_LANGUAGES.filter((lang) =>
            data.loveLanguages.includes(lang.value)
          )}
          value={data.primaryLoveLanguage}
          onSelect={(value) => updateField("primaryLoveLanguage", value)}
          placeholder="What's your primary love language?"
          error={errors.primaryLoveLanguage}
        />
      )}

      <Dropdown
        label="Conflict Style"
        options={CONFLICT_STYLE}
        value={data.conflictStyle}
        onSelect={(value) => updateField("conflictStyle", value)}
        placeholder="How do you handle conflict?"
        error={errors.conflictStyle}
        required
      />

      <Dropdown
        label="Stress Handling"
        options={STRESS_HANDLING}
        value={data.stressHandling}
        onSelect={(value) => updateField("stressHandling", value)}
        placeholder="How do you handle stress?"
        error={errors.stressHandling}
        required
      />

      <Dropdown
        label="Attachment Style"
        options={ATTACHMENT_STYLE}
        value={data.attachmentStyle}
        onSelect={(value) => updateField("attachmentStyle", value)}
        placeholder="What's your attachment style? (optional)"
        error={errors.attachmentStyle}
      />

      <Dropdown
        label="Financial Approach"
        options={FINANCIAL_APPROACH}
        value={data.financialApproach}
        onSelect={(value) => updateField("financialApproach", value)}
        placeholder="How do you approach finances?"
        error={errors.financialApproach}
        required
      />

      <Dropdown
        label="Career Importance"
        options={CAREER_IMPORTANCE}
        value={data.careerImportance}
        onSelect={(value) => updateField("careerImportance", value)}
        placeholder="How important is career?"
        error={errors.careerImportance}
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

import { globalStyles } from "@/src/styles/global";
import { size } from "@/src/utils/size";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import {
  ACTIVITY_LEVEL,
  CANNABIS_420_FRIENDLY,
  CANNABIS_USE,
  DIET_IMPORTANCE,
  DIET_PREFERENCES,
  DRINKING_FREQUENCY,
  DRINKING_STATUS,
  HOUSING_GOALS,
  LIVING_SITUATION,
  POLITICAL_ENGAGEMENT,
  POLITICAL_VIEWS,
  RELIGION,
  RELIGION_PRACTICE,
  SMOKING_STATUS,
  WORKOUT_FREQUENCY,
} from "../../constants/onboardingOptions";
import { Step5Data } from "../../types/onboarding";
import { Dropdown, MultiSelect } from "../Input";

interface Step5Props {
  data: Step5Data;
  onChange: (data: Step5Data) => void;
  errors: Partial<Record<keyof Step5Data, string>>;
}

export const Step5Lifestyle: React.FC<Step5Props> = ({
  data,
  onChange,
  errors,
}) => {
  const updateField = <K extends keyof Step5Data>(
    field: K,
    value: Step5Data[K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  const showDrinkingFrequency = data.drinkingStatus !== "NO";
  const showCannabis420 = data.cannabisUse !== "NO";

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={globalStyles.mainTitle}>Lifestyle</Text>
      <Text style={globalStyles.subTitle}>
        Tell us about your lifestyle preferences
      </Text>

      <Dropdown
        label="Living Situation"
        options={LIVING_SITUATION}
        value={data.livingSituation}
        onSelect={(value) => updateField("livingSituation", value)}
        placeholder="What's your living situation?"
        error={errors.livingSituation}
        required
      />

      <Dropdown
        label="Housing Goals"
        options={HOUSING_GOALS}
        value={data.housingGoals}
        onSelect={(value) => updateField("housingGoals", value)}
        placeholder="Housing goals (optional)"
        error={errors.housingGoals}
      />

      <Dropdown
        label="Political Views"
        options={POLITICAL_VIEWS}
        value={data.politicalViews}
        onSelect={(value) => updateField("politicalViews", value)}
        placeholder="What are your political views?"
        error={errors.politicalViews}
        required
      />

      <Dropdown
        label="Political Engagement"
        options={POLITICAL_ENGAGEMENT}
        value={data.politicalEngagement}
        onSelect={(value) => updateField("politicalEngagement", value)}
        placeholder="How engaged are you politically?"
        error={errors.politicalEngagement}
        required
      />

      <Dropdown
        label="Religion"
        options={RELIGION}
        value={data.religion}
        onSelect={(value) => updateField("religion", value)}
        placeholder="What's your religion?"
        error={errors.religion}
        required
      />

      <Dropdown
        label="Religion Practice"
        options={RELIGION_PRACTICE}
        value={data.religionPractice}
        onSelect={(value) => updateField("religionPractice", value)}
        placeholder="How often do you practice?"
        error={errors.religionPractice}
        required
      />

      <Dropdown
        label="Smoking Status"
        options={SMOKING_STATUS}
        value={data.smokingStatus}
        onSelect={(value) => updateField("smokingStatus", value)}
        placeholder="Do you smoke?"
        error={errors.smokingStatus}
        required
      />

      <Dropdown
        label="Drinking Status"
        options={DRINKING_STATUS}
        value={data.drinkingStatus}
        onSelect={(value) => updateField("drinkingStatus", value)}
        placeholder="Do you drink?"
        error={errors.drinkingStatus}
        required
      />

      {showDrinkingFrequency && (
        <Dropdown
          label="Drinking Frequency"
          options={DRINKING_FREQUENCY}
          value={data.drinkingFrequency}
          onSelect={(value) => updateField("drinkingFrequency", value)}
          placeholder="How often do you drink?"
          error={errors.drinkingFrequency}
        />
      )}

      <Dropdown
        label="Cannabis Use"
        options={CANNABIS_USE}
        value={data.cannabisUse}
        onSelect={(value) => updateField("cannabisUse", value)}
        placeholder="Do you use cannabis?"
        error={errors.cannabisUse}
        required
      />

      {showCannabis420 && (
        <Dropdown
          label="420 Friendly"
          options={CANNABIS_420_FRIENDLY}
          value={data.cannabis420Friendly}
          onSelect={(value) => updateField("cannabis420Friendly", value)}
          placeholder="Are you 420 friendly?"
          error={errors.cannabis420Friendly}
        />
      )}

      <MultiSelect
        label="Diet Preferences"
        options={DIET_PREFERENCES}
        selectedValues={data.dietPreferences}
        onSelectionChange={(values) => updateField("dietPreferences", values)}
        error={errors.dietPreferences}
        required
      />

      <Dropdown
        label="Diet Importance"
        options={DIET_IMPORTANCE}
        value={data.dietImportance}
        onSelect={(value) => updateField("dietImportance", value)}
        placeholder="How important is diet compatibility?"
        error={errors.dietImportance}
        required
      />

      <Dropdown
        label="Activity Level"
        options={ACTIVITY_LEVEL}
        value={data.activityLevel}
        onSelect={(value) => updateField("activityLevel", value)}
        placeholder="What's your activity level?"
        error={errors.activityLevel}
        required
      />

      <Dropdown
        label="Workout Frequency"
        options={WORKOUT_FREQUENCY}
        value={data.workoutFrequency}
        onSelect={(value) => updateField("workoutFrequency", value)}
        placeholder="How often do you workout?"
        error={errors.workoutFrequency}
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

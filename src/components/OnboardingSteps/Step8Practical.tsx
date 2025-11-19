import { globalStyles } from "@/src/styles/global";
import { size } from "@/src/utils/size";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import {
  DATE_BUDGET,
  DEAL_BREAKER_FLEXIBILITY,
  FEEDBACK_COMFORT,
  HOST_OR_ATTEND_EVENTS,
  MATCHING_PACE,
  PAYMENT_PHILOSOPHY,
  PET_SITUATION,
  PHONE_COMMUNICATION,
  PREFERENCE_FLEXIBILITY,
  PROFILE_VISIBILITY,
  TECHNOLOGY_USE,
  TRANSPORTATION,
  WORK_LIFE_BALANCE,
  WORK_SCHEDULE,
} from "../../constants/onboardingOptions";
import { Step8Data } from "../../types/onboarding";
import { Dropdown, MultiSelect } from "../Input";

interface Step8Props {
  data: Step8Data;
  onChange: (data: Step8Data) => void;
  errors: Partial<Record<keyof Step8Data, string>>;
}

export const Step8Practical: React.FC<Step8Props> = ({
  data,
  onChange,
  errors,
}) => {
  const updateField = <K extends keyof Step8Data>(
    field: K,
    value: Step8Data[K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={globalStyles.mainTitle}>
        Practical Matters & Final Preferences
      </Text>
      <Text style={globalStyles.subTitle}>
        Last few details to complete your profile
      </Text>

      <Dropdown
        label="Work Schedule"
        options={WORK_SCHEDULE}
        value={data.workSchedule}
        onSelect={(value) => updateField("workSchedule", value)}
        placeholder="What's your work schedule?"
        error={errors.workSchedule}
        required
      />

      <Dropdown
        label="Work-Life Balance"
        options={WORK_LIFE_BALANCE}
        value={data.workLifeBalance}
        onSelect={(value) => updateField("workLifeBalance", value)}
        placeholder="How do you balance work and life?"
        error={errors.workLifeBalance}
        required
      />

      <Dropdown
        label="Pet Situation"
        options={PET_SITUATION}
        value={data.petSituation}
        onSelect={(value) => updateField("petSituation", value)}
        placeholder="Tell us about pets"
        error={errors.petSituation}
        required
      />

      <Dropdown
        label="Transportation"
        options={TRANSPORTATION}
        value={data.transportation}
        onSelect={(value) => updateField("transportation", value)}
        placeholder="How do you get around?"
        error={errors.transportation}
        required
      />

      <Dropdown
        label="Date Budget"
        options={DATE_BUDGET}
        value={data.dateBudget}
        onSelect={(value) => updateField("dateBudget", value)}
        placeholder="What's your typical date budget?"
        error={errors.dateBudget}
        required
      />

      <Dropdown
        label="Payment Philosophy"
        options={PAYMENT_PHILOSOPHY}
        value={data.paymentPhilosophy}
        onSelect={(value) => updateField("paymentPhilosophy", value)}
        placeholder="How do you prefer to handle dates?"
        error={errors.paymentPhilosophy}
        required
      />

      <Dropdown
        label="Technology Use"
        options={TECHNOLOGY_USE}
        value={data.technologyUse}
        onSelect={(value) => updateField("technologyUse", value)}
        placeholder="How connected are you?"
        error={errors.technologyUse}
        required
      />

      <Dropdown
        label="Phone Communication"
        options={PHONE_COMMUNICATION}
        value={data.phoneCommunication}
        onSelect={(value) => updateField("phoneCommunication", value)}
        placeholder="How do you prefer to communicate?"
        error={errors.phoneCommunication}
        required
      />

      <Dropdown
        label="Matching Pace"
        options={MATCHING_PACE}
        value={data.matchingPace}
        onSelect={(value) => updateField("matchingPace", value)}
        placeholder="How many matches do you want?"
        error={errors.matchingPace}
        required
      />

      <Dropdown
        label="Preference Flexibility"
        options={PREFERENCE_FLEXIBILITY}
        value={data.preferenceFlexibility}
        onSelect={(value) => updateField("preferenceFlexibility", value)}
        placeholder="How flexible are you with preferences?"
        error={errors.preferenceFlexibility}
        required
      />

      <Dropdown
        label="Deal Breaker Flexibility"
        options={DEAL_BREAKER_FLEXIBILITY}
        value={data.dealBreakerFlexibility}
        onSelect={(value) => updateField("dealBreakerFlexibility", value)}
        placeholder="How flexible are you with deal breakers?"
        error={errors.dealBreakerFlexibility}
        required
      />

      <MultiSelect
        label="Host or Attend Events"
        options={HOST_OR_ATTEND_EVENTS}
        selectedValues={data.hostOrAttendEvents}
        onSelectionChange={(values) =>
          updateField("hostOrAttendEvents", values)
        }
        error={errors.hostOrAttendEvents}
        required
      />

      <Dropdown
        label="Feedback Comfort"
        options={FEEDBACK_COMFORT}
        value={data.feedbackComfort}
        onSelect={(value) => updateField("feedbackComfort", value)}
        placeholder="How do you feel about feedback?"
        error={errors.feedbackComfort}
        required
      />

      <Dropdown
        label="Profile Visibility"
        options={PROFILE_VISIBILITY}
        value={data.profileVisibility}
        onSelect={(value) => updateField("profileVisibility", value)}
        placeholder="Who can see your profile?"
        error={errors.profileVisibility}
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

import { COLORS } from "@/src/constants/colors";
import { fontSize } from "@/src/constants/fontSize";
import fonts from "@/src/constants/fonts";
import { globalStyles } from "@/src/styles/global";
import { size } from "@/src/utils/size";
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
import {
  ADVENTURE_LEVEL,
  EVENT_TIMING,
  INTERESTS,
  NOVELTY_PREFERENCE,
  SOCIAL_GROUP_PREFERENCE,
  TRAVEL_FREQUENCY,
} from "../../constants/onboardingOptions";
import { Step7Data } from "../../types/onboarding";
import { Dropdown, MultiSelect } from "../Input";

interface Step7Props {
  data: Step7Data;
  onChange: (data: Step7Data) => void;
  errors: Partial<Record<keyof Step7Data, string>>;
}

export const Step7Interests: React.FC<Step7Props> = ({
  data,
  onChange,
  errors,
}) => {
  const updateField = <K extends keyof Step7Data>(
    field: K,
    value: Step7Data[K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  const moveInterest = (fromIndex: number, toIndex: number) => {
    const newTop3 = [...data.top3Interests];
    const [removed] = newTop3.splice(fromIndex, 1);
    newTop3.splice(toIndex, 0, removed);
    updateField("top3Interests", newTop3);
  };

  const addToTop3 = (value: string) => {
    if (data.top3Interests.length < 3 && !data.top3Interests.includes(value)) {
      updateField("top3Interests", [...data.top3Interests, value]);
    }
  };

  const removeFromTop3 = (value: string) => {
    updateField(
      "top3Interests",
      data.top3Interests.filter((v) => v !== value)
    );
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={globalStyles.mainTitle}>Interests & Community</Text>
      <Text style={globalStyles.subTitle}>What are you passionate about?</Text>

      <MultiSelect
        label="Specific Interests"
        options={INTERESTS}
        selectedValues={data.specificInterests}
        onSelectionChange={(values) => updateField("specificInterests", values)}
        error={errors.specificInterests}
        required
      />

      <View style={styles.top3Container}>
        <Text style={styles.label}>
          Top 3 Interests (Rank them)
          <Text style={styles.required}> *</Text>
        </Text>
        <Text style={styles.hint}>
          Select your top 3 interests and rank them
        </Text>

        {data.top3Interests.length === 0 && (
          <Text style={styles.emptyText}>
            Select 3 interests from above to rank
          </Text>
        )}

        {data.top3Interests.map((interestValue, index) => {
          const interest = INTERESTS.find((i) => i.value === interestValue);
          return (
            <View key={interestValue} style={styles.rankedItem}>
              <View style={styles.rankBadge}>
                <Text style={styles.rankNumber}>{index + 1}</Text>
              </View>
              <Text style={styles.rankedText}>{interest?.label}</Text>
              <View style={styles.rankControls}>
                {index > 0 && (
                  <TouchableOpacity
                    onPress={() => moveInterest(index, index - 1)}
                    style={styles.rankButton}
                  >
                    <Ionicons
                      name="chevron-up"
                      size={20}
                      color={Colors.light.tint}
                    />
                  </TouchableOpacity>
                )}
                {index < data.top3Interests.length - 1 && (
                  <TouchableOpacity
                    onPress={() => moveInterest(index, index + 1)}
                    style={styles.rankButton}
                  >
                    <Ionicons
                      name="chevron-down"
                      size={20}
                      color={Colors.light.tint}
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => removeFromTop3(interestValue)}
                  style={styles.removeButton}
                >
                  <Ionicons name="close-circle" size={20} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}

        {data.specificInterests
          .filter((i) => !data.top3Interests.includes(i))
          .slice(0, 3 - data.top3Interests.length)
          .map((interestValue) => {
            const interest = INTERESTS.find((i) => i.value === interestValue);
            return (
              <TouchableOpacity
                key={interestValue}
                style={styles.addButton}
                onPress={() => addToTop3(interestValue)}
              >
                <Ionicons
                  name="add-circle-outline"
                  size={20}
                  color={Colors.light.tint}
                />
                <Text style={styles.addButtonText}>
                  Add {interest?.label} to top 3
                </Text>
              </TouchableOpacity>
            );
          })}
      </View>

      {errors.top3Interests && (
        <Text style={styles.errorText}>{errors.top3Interests}</Text>
      )}

      <Dropdown
        label="Novelty Preference"
        options={NOVELTY_PREFERENCE}
        value={data.noveltyPreference}
        onSelect={(value) => updateField("noveltyPreference", value)}
        placeholder="How do you feel about new experiences?"
        error={errors.noveltyPreference}
        required
      />

      <Dropdown
        label="Social Group Preference"
        options={SOCIAL_GROUP_PREFERENCE}
        value={data.socialGroupPreference}
        onSelect={(value) => updateField("socialGroupPreference", value)}
        placeholder="What size groups do you prefer?"
        error={errors.socialGroupPreference}
        required
      />

      <Dropdown
        label="Event Timing"
        options={EVENT_TIMING}
        value={data.eventTiming}
        onSelect={(value) => updateField("eventTiming", value)}
        placeholder="When do you prefer events?"
        error={errors.eventTiming}
        required
      />

      <Dropdown
        label="Travel Frequency"
        options={TRAVEL_FREQUENCY}
        value={data.travelFrequency}
        onSelect={(value) => updateField("travelFrequency", value)}
        placeholder="How often do you travel?"
        error={errors.travelFrequency}
        required
      />

      <Dropdown
        label="Adventure Level"
        options={ADVENTURE_LEVEL}
        value={data.adventureLevel}
        onSelect={(value) => updateField("adventureLevel", value)}
        placeholder="What's your adventure level?"
        error={errors.adventureLevel}
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

  top3Container: {
    marginBottom: size.verticalScale(16),
  },
  label: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Medium,
    color: COLORS.black,
    marginBottom: size.verticalScale(4),
  },
  required: {
    color: COLORS.error,
  },
  hint: {
    fontSize: fontSize.regular,
    color: COLORS.lightGray,
    marginBottom: size.verticalScale(12),
  },
  emptyText: {
    fontSize: fontSize.regular,
    color: COLORS.lightGray,
    fontFamily: fonts.Regular,
    marginBottom: size.verticalScale(12),
  },
  rankedItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightBlue,
    padding: size.scale(12),
    borderRadius: size.moderateScale(12),
    marginBottom: size.verticalScale(8),
    borderWidth: StyleSheet.hairlineWidth * 3,
    borderColor: COLORS.primary,
  },
  rankBadge: {
    width: size.moderateScale(32),
    height: size.moderateScale(32),
    borderRadius: size.moderateScale(16),
    backgroundColor: COLORS.primaryButton,
    justifyContent: "center",
    alignItems: "center",
    marginRight: size.scale(12),
  },
  rankNumber: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Bold,
    color: COLORS.white,
  },
  rankedText: {
    flex: 1,
    fontSize: fontSize.medium,
    fontFamily: fonts.Medium,
    color: COLORS.black,
  },
  rankControls: {
    flexDirection: "row",
    gap: size.scale(8),
  },
  rankButton: {
    padding: size.scale(4),
  },
  removeButton: {
    padding: size.scale(4),
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: size.scale(12),
    borderRadius: size.moderateScale(12),
    borderWidth: StyleSheet.hairlineWidth * 3,
    borderColor: COLORS.border,
    borderStyle: "dashed",
    marginBottom: size.verticalScale(8),
  },
  addButtonText: {
    marginLeft: size.scale(8),
    fontSize: fontSize.regular,
    fontFamily: fonts.Medium,
    color: COLORS.primaryButton,
  },
  errorText: {
    color: COLORS.error,
    fontSize: fontSize.light,
    fontFamily: fonts.Regular,
    marginTop: size.verticalScale(4),
    marginBottom: size.verticalScale(16),
  },
});

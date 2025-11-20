import { COLORS } from "@/src/constants/colors";
import fonts from "@/src/constants/fonts";
import { fontSize } from "@/src/constants/fontSize";
import { setAuthenticated, setOnboardingComplete } from "@/src/utils/auth";
import { size } from "@/src/utils/size";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../../constants/theme";
import { Step1BasicInfo } from "../../components/OnboardingSteps/Step1BasicInfo";
import { Step2Availability } from "../../components/OnboardingSteps/Step2Availability";
import { Step3RelationshipIntent } from "../../components/OnboardingSteps/Step3RelationshipIntent";
import { Step4Communication } from "../../components/OnboardingSteps/Step4Communication";
import { Step5Lifestyle } from "../../components/OnboardingSteps/Step5Lifestyle";
import { Step6Personality } from "../../components/OnboardingSteps/Step6Personality";
import { Step7Interests } from "../../components/OnboardingSteps/Step7Interests";
import { Step8Practical } from "../../components/OnboardingSteps/Step8Practical";
import { OnboardingData } from "../../types/onboarding";
import {
  validateStep1,
  validateStep2,
  validateStep3,
  validateStep4,
  validateStep5,
  validateStep6,
  validateStep7,
  validateStep8,
  ValidationErrors,
} from "../../utils/validation";

const STORAGE_KEY = "@onboarding_data";
const TOTAL_STEPS = 8;

const initialData: OnboardingData = {
  step1: {
    firstName: "",
    lastName: "",
    pronouns: [],
    dateOfBirth: null,
    gender: "",
    lookingFor: [],
    city: "",
    zipCode: "",
    maxDistance: 25,
  },
  step2: {
    availability: [],
    advanceNotice: "",
    dateFrequency: "",
    bestDateTimes: [],
    dateDuration: "",
  },
  step3: {
    relationshipIntent: "",
    relationshipStructure: undefined,
    kidsPreference: "",
    kidsTimeline: undefined,
    marriagePreference: "",
    marriageTimeline: undefined,
    physicalImportance: "",
    intimacyTimeline: "",
  },
  step4: {
    communicationStyles: [],
    communicationFrequency: "",
  },
  step5: {
    livingSituation: "",
    housingGoals: undefined,
    politicalViews: "",
    politicalEngagement: "",
    religion: "",
    religionPractice: "",
    smokingStatus: "",
    drinkingStatus: "",
    drinkingFrequency: undefined,
    cannabisUse: "",
    cannabis420Friendly: undefined,
    dietPreferences: [],
    dietImportance: "",
    activityLevel: "",
    workoutFrequency: "",
  },
  step6: {
    personalityTraits: [],
    socialEnergy: "",
    idealWeekend: "",
    partnerValues: [],
    dealBreakers: [],
    idealFirstDate: "",
    worstFirstDate: undefined,
    attractionFactors: [],
    attractionImportance: "",
    loveLanguages: [],
    primaryLoveLanguage: undefined,
    conflictStyle: "",
    stressHandling: "",
    attachmentStyle: undefined,
    financialApproach: "",
    careerImportance: "",
  },
  step7: {
    specificInterests: [],
    top3Interests: [],
    noveltyPreference: "",
    socialGroupPreference: "",
    eventTiming: "",
    travelFrequency: "",
    adventureLevel: "",
  },
  step8: {
    workSchedule: "",
    workLifeBalance: "",
    petSituation: "",
    transportation: "",
    dateBudget: "",
    paymentPhilosophy: "",
    technologyUse: "",
    phoneCommunication: "",
    matchingPace: "",
    preferenceFlexibility: "",
    dealBreakerFlexibility: "",
    hostOrAttendEvents: [],
    feedbackComfort: "",
    profileVisibility: "",
  },
};

const OnBoardingScreen = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>(initialData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [validatedSteps, setValidatedSteps] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadSavedData();
  }, []);

  useEffect(() => {
    saveProgress();
  }, [data, currentStep]);

  const loadSavedData = async () => {
    try {
      const savedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setData(parsed.data || initialData);
        setCurrentStep(parsed.currentStep || 1);
      }
    } catch (error) {
      console.error("Error loading saved data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveProgress = async () => {
    if (isLoading) return;
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ data, currentStep })
      );
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  const validateCurrentStep = (): boolean => {
    let stepErrors: any = {};

    switch (currentStep) {
      case 1:
        stepErrors = validateStep1(data.step1);
        break;
      case 2:
        stepErrors = validateStep2(data.step2);
        break;
      case 3:
        stepErrors = validateStep3(data.step3);
        break;
      case 4:
        stepErrors = validateStep4(data.step4);
        break;
      case 5:
        stepErrors = validateStep5(data.step5);
        break;
      case 6:
        stepErrors = validateStep6(data.step6);
        break;
      case 7:
        stepErrors = validateStep7(data.step7);
        break;
      case 8:
        stepErrors = validateStep8(data.step8);
        break;
    }

    // Mark current step as validated
    setValidatedSteps((prev) => new Set(prev).add(currentStep));

    // Update errors for current step
    const updatedErrors = {
      ...errors,
      [`step${currentStep}`]: stepErrors,
    };
    setErrors(updatedErrors);

    // Return true only if no errors
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      // Here you would typically send data to your API
      console.log("Submitting onboarding data:", data);

      // Mark onboarding as complete
      await setOnboardingComplete();
      await setAuthenticated();

      // Clear saved progress
      await AsyncStorage.removeItem(STORAGE_KEY);

      Alert.alert("Success!", "Your profile has been created successfully!", [
        {
          text: "OK",
          onPress: () => {
            // Navigate to home screen
            router.replace("/(tabs)");
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to submit. Please try again.");
      console.error("Error submitting:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const validateStepData = (stepData: any, step: number): any => {
    switch (step) {
      case 1:
        return validateStep1(stepData);
      case 2:
        return validateStep2(stepData);
      case 3:
        return validateStep3(stepData);
      case 4:
        return validateStep4(stepData);
      case 5:
        return validateStep5(stepData);
      case 6:
        return validateStep6(stepData);
      case 7:
        return validateStep7(stepData);
      case 8:
        return validateStep8(stepData);
      default:
        return {};
    }
  };

  const updateStepData = (stepData: any) => {
    const updatedData = {
      ...data,
      [`step${currentStep}`]: stepData,
    };
    setData(updatedData);

    // Only re-validate if this step has already been validated (i.e., Next was pressed)
    if (validatedSteps.has(currentStep)) {
      const stepErrors = validateStepData(stepData, currentStep);
      setErrors({
        ...errors,
        [`step${currentStep}`]: stepErrors,
      });
    }
  };

  const renderStep = () => {
    // Only show errors if this step has been validated (Next was pressed)
    const stepErrors = validatedSteps.has(currentStep)
      ? errors[`step${currentStep}` as keyof ValidationErrors] || {}
      : {};

    switch (currentStep) {
      case 1:
        return (
          <Step1BasicInfo
            data={data.step1}
            onChange={updateStepData}
            errors={stepErrors}
          />
        );
      case 2:
        return (
          <Step2Availability
            data={data.step2}
            onChange={updateStepData}
            errors={stepErrors}
          />
        );
      case 3:
        return (
          <Step3RelationshipIntent
            data={data.step3}
            onChange={updateStepData}
            errors={stepErrors}
          />
        );
      case 4:
        return (
          <Step4Communication
            data={data.step4}
            onChange={updateStepData}
            errors={stepErrors}
          />
        );
      case 5:
        return (
          <Step5Lifestyle
            data={data.step5}
            onChange={updateStepData}
            errors={stepErrors}
          />
        );
      case 6:
        return (
          <Step6Personality
            data={data.step6}
            onChange={updateStepData}
            errors={stepErrors}
          />
        );
      case 7:
        return (
          <Step7Interests
            data={data.step7}
            onChange={updateStepData}
            errors={stepErrors}
          />
        );
      case 8:
        return (
          <Step8Practical
            data={data.step8}
            onChange={updateStepData}
            errors={stepErrors}
          />
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.light.tint} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const progress = (currentStep / TOTAL_STEPS) * 100;

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          paddingTop: insets.top + 10,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
        keyboardVerticalOffset={10}
      >
        <TouchableOpacity
          onPress={handleBack}
          disabled={currentStep === 1}
          style={[
            styles.button,
            styles.backButton,
            currentStep === 1 && styles.buttonDisabled,
          ]}
        >
          <Ionicons
            name="chevron-back"
            size={20}
            color={currentStep === 1 ? COLORS.lightGray : COLORS.gray}
          />
        </TouchableOpacity>
        <View style={styles.header}>
          <View style={styles.progressContainer}>
            <View style={styles.stepIndicators}>
              {Array.from({ length: TOTAL_STEPS }, (_, index) => {
                const stepNumber = index + 1;
                const isCompleted = stepNumber < currentStep;
                const isCurrent = stepNumber === currentStep;
                const isLast = stepNumber === TOTAL_STEPS;
                return (
                  <View
                    key={stepNumber}
                    style={[
                      styles.stepPill,
                      !isLast && styles.stepPillMargin,
                      (isCompleted || isCurrent) && styles.stepPillActive,
                      !isCompleted && !isCurrent && styles.stepPillInactive,
                    ]}
                  />
                );
              })}
            </View>
          </View>
        </View>

        <View style={styles.content}>{renderStep()}</View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.nextButton,
              isSaving && styles.buttonDisabled,
            ]}
            onPress={handleNext}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
              <>
                <Text style={styles.nextButtonText}>
                  {currentStep === TOTAL_STEPS ? "Submit" : "Next"}
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={COLORS.white}
                />
              </>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  keyboardView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: size.verticalScale(12),
    fontSize: fontSize.medium,
    fontFamily: fonts.Medium,
    color: COLORS.gray,
  },
  header: {
    paddingHorizontal: size.moderateScale(20),
    paddingTop: size.verticalScale(16),
    paddingBottom: size.verticalScale(12),
    backgroundColor: COLORS.white,
  },
  progressContainer: {
    marginTop: size.verticalScale(8),
  },
  stepIndicators: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: size.verticalScale(12),
    width: "100%",
  },
  stepPill: {
    flex: 1,
    height: size.verticalScale(6),
    borderRadius: size.scale(4),
    minWidth: 0,
  },
  stepPillMargin: {
    marginRight: size.moderateScale(6),
  },
  stepPillActive: {
    backgroundColor: COLORS.primaryButton,
  },
  stepPillInactive: {
    backgroundColor: COLORS.border,
  },
  content: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: size.moderateScale(20),
    backgroundColor: COLORS.white,
    alignItems: "flex-end",
    height: size.verticalScale(55),
    paddingTop: size.verticalScale(10),
  },
  button: {
    flexDirection: "row",
    borderRadius: size.moderateScale(16),
    width: size.moderateScale(100),
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: COLORS.primaryButton,
    width: size.moderateScale(45),
    height: size.moderateScale(45),
    borderRadius: size.moderateScale(30),
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: size.moderateScale(16),
  },
  nextButton: {
    backgroundColor: COLORS.primaryButton,
    flex: 2,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Regular,
    color: COLORS.gray,
    marginLeft: 4,
  },
  buttonTextDisabled: {
    color: COLORS.gray,
  },
  nextButtonText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Regular,
    color: COLORS.white,
    marginRight: 4,
  },
});

export default OnBoardingScreen;

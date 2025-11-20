import { OnboardingData } from '@/types/onboarding';

export interface ValidationErrors {
  step1?: Partial<Record<keyof OnboardingData['step1'], string>>;
  step2?: Partial<Record<keyof OnboardingData['step2'], string>>;
  step3?: Partial<Record<keyof OnboardingData['step3'], string>>;
  step4?: Partial<Record<keyof OnboardingData['step4'], string>>;
  step5?: Partial<Record<keyof OnboardingData['step5'], string>>;
  step6?: Partial<Record<keyof OnboardingData['step6'], string>>;
  step7?: Partial<Record<keyof OnboardingData['step7'], string>>;
  step8?: Partial<Record<keyof OnboardingData['step8'], string>>;
}

export const validateStep1 = (data: OnboardingData['step1']): Partial<Record<keyof OnboardingData['step1'], string>> => {
  const errors: Partial<Record<keyof OnboardingData['step1'], string>> = {};

  if (!data.firstName?.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!data.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  }

  if (!data.pronouns || data.pronouns.length === 0) {
    errors.pronouns = 'Please select at least one pronoun';
  }

  if (!data.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required';
  } else {
    const dob = new Date(data.dateOfBirth);
    const age = new Date().getFullYear() - dob.getFullYear();
    if (age < 18) {
      errors.dateOfBirth = 'You must be at least 18 years old';
    }
  }

  if (!data.gender) {
    errors.gender = 'Gender is required';
  }

  if (!data.lookingFor || data.lookingFor.length === 0) {
    errors.lookingFor = 'Please select who you are looking for';
  }

  if (!data.city?.trim()) {
    errors.city = 'City is required';
  }

  if (!data.zipCode?.trim()) {
    errors.zipCode = 'Zip code is required';
  }

  if (!data.maxDistance || data.maxDistance < 5) {
    errors.maxDistance = 'Please select a maximum distance';
  }

  return errors;
};

export const validateStep2 = (data: OnboardingData['step2']): Partial<Record<keyof OnboardingData['step2'], string>> => {
  const errors: Partial<Record<keyof OnboardingData['step2'], string>> = {};

  if (!data.availability || data.availability.length === 0) {
    errors.availability = 'Please select your availability';
  }

  if (!data.advanceNotice) {
    errors.advanceNotice = 'Please select advance notice preference';
  }

  if (!data.dateFrequency) {
    errors.dateFrequency = 'Please select date frequency';
  }

  if (!data.bestDateTimes || data.bestDateTimes.length === 0) {
    errors.bestDateTimes = 'Please select at least one preferred date time';
  }

  if (!data.dateDuration) {
    errors.dateDuration = 'Please select date duration';
  }

  return errors;
};

export const validateStep3 = (data: OnboardingData['step3']): Partial<Record<keyof OnboardingData['step3'], string>> => {
  const errors: Partial<Record<keyof OnboardingData['step3'], string>> = {};

  if (!data.relationshipIntent) {
    errors.relationshipIntent = 'Please select relationship intent';
  }

  if (!data.kidsPreference) {
    errors.kidsPreference = 'Please select kids preference';
  }

  if (!data.marriagePreference) {
    errors.marriagePreference = 'Please select marriage preference';
  }

  if (!data.physicalImportance) {
    errors.physicalImportance = 'Please select physical importance';
  }

  if (!data.intimacyTimeline) {
    errors.intimacyTimeline = 'Please select intimacy timeline';
  }

  return errors;
};

export const validateStep4 = (data: OnboardingData['step4']): Partial<Record<keyof OnboardingData['step4'], string>> => {
  const errors: Partial<Record<keyof OnboardingData['step4'], string>> = {};

  if (!data.communicationStyles || data.communicationStyles.length === 0) {
    errors.communicationStyles = 'Please select at least one communication style';
  }

  if (!data.communicationFrequency) {
    errors.communicationFrequency = 'Please select communication frequency';
  }

  return errors;
};

export const validateStep5 = (data: OnboardingData['step5']): Partial<Record<keyof OnboardingData['step5'], string>> => {
  const errors: Partial<Record<keyof OnboardingData['step5'], string>> = {};

  if (!data.livingSituation) {
    errors.livingSituation = 'Please select living situation';
  }

  if (!data.politicalViews) {
    errors.politicalViews = 'Please select political views';
  }

  if (!data.politicalEngagement) {
    errors.politicalEngagement = 'Please select political engagement';
  }

  if (!data.religion) {
    errors.religion = 'Please select religion';
  }

  if (!data.religionPractice) {
    errors.religionPractice = 'Please select religion practice';
  }

  if (!data.smokingStatus) {
    errors.smokingStatus = 'Please select smoking status';
  }

  if (!data.drinkingStatus) {
    errors.drinkingStatus = 'Please select drinking status';
  }

  if (!data.cannabisUse) {
    errors.cannabisUse = 'Please select cannabis use';
  }

  if (!data.dietPreferences || data.dietPreferences.length === 0) {
    errors.dietPreferences = 'Please select at least one diet preference';
  }

  if (!data.dietImportance) {
    errors.dietImportance = 'Please select diet importance';
  }

  if (!data.activityLevel) {
    errors.activityLevel = 'Please select activity level';
  }

  if (!data.workoutFrequency) {
    errors.workoutFrequency = 'Please select workout frequency';
  }

  return errors;
};

export const validateStep6 = (data: OnboardingData['step6']): Partial<Record<keyof OnboardingData['step6'], string>> => {
  const errors: Partial<Record<keyof OnboardingData['step6'], string>> = {};

  if (!data.personalityTraits || data.personalityTraits.length === 0) {
    errors.personalityTraits = 'Please select at least one personality trait';
  }

  if (!data.socialEnergy) {
    errors.socialEnergy = 'Please select social energy';
  }

  if (!data.idealWeekend) {
    errors.idealWeekend = 'Please select ideal weekend';
  }

  if (!data.partnerValues || data.partnerValues.length === 0) {
    errors.partnerValues = 'Please select at least one partner value';
  }

  if (!data.dealBreakers || data.dealBreakers.length === 0) {
    errors.dealBreakers = 'Please select at least one deal breaker';
  }

  if (!data.idealFirstDate) {
    errors.idealFirstDate = 'Please select ideal first date';
  }

  if (!data.attractionFactors || data.attractionFactors.length === 0) {
    errors.attractionFactors = 'Please select at least one attraction factor';
  }

  if (!data.attractionImportance) {
    errors.attractionImportance = 'Please select attraction importance';
  }

  if (!data.loveLanguages || data.loveLanguages.length === 0) {
    errors.loveLanguages = 'Please select at least one love language';
  }

  if (!data.conflictStyle) {
    errors.conflictStyle = 'Please select conflict style';
  }

  if (!data.stressHandling) {
    errors.stressHandling = 'Please select stress handling';
  }

  if (!data.financialApproach) {
    errors.financialApproach = 'Please select financial approach';
  }

  if (!data.careerImportance) {
    errors.careerImportance = 'Please select career importance';
  }

  return errors;
};

export const validateStep7 = (data: OnboardingData['step7']): Partial<Record<keyof OnboardingData['step7'], string>> => {
  const errors: Partial<Record<keyof OnboardingData['step7'], string>> = {};

  if (!data.specificInterests || data.specificInterests.length === 0) {
    errors.specificInterests = 'Please select at least one interest';
  }

  if (!data.top3Interests || data.top3Interests.length !== 3) {
    errors.top3Interests = 'Please select and rank exactly 3 top interests';
  }

  if (!data.noveltyPreference) {
    errors.noveltyPreference = 'Please select novelty preference';
  }

  if (!data.socialGroupPreference) {
    errors.socialGroupPreference = 'Please select social group preference';
  }

  if (!data.eventTiming) {
    errors.eventTiming = 'Please select event timing';
  }

  if (!data.travelFrequency) {
    errors.travelFrequency = 'Please select travel frequency';
  }

  if (!data.adventureLevel) {
    errors.adventureLevel = 'Please select adventure level';
  }

  return errors;
};

export const validateStep8 = (data: OnboardingData['step8']): Partial<Record<keyof OnboardingData['step8'], string>> => {
  const errors: Partial<Record<keyof OnboardingData['step8'], string>> = {};

  if (!data.workSchedule) {
    errors.workSchedule = 'Please select work schedule';
  }

  if (!data.workLifeBalance) {
    errors.workLifeBalance = 'Please select work-life balance';
  }

  if (!data.petSituation) {
    errors.petSituation = 'Please select pet situation';
  }

  if (!data.transportation) {
    errors.transportation = 'Please select transportation';
  }

  if (!data.dateBudget) {
    errors.dateBudget = 'Please select date budget';
  }

  if (!data.paymentPhilosophy) {
    errors.paymentPhilosophy = 'Please select payment philosophy';
  }

  if (!data.technologyUse) {
    errors.technologyUse = 'Please select technology use';
  }

  if (!data.phoneCommunication) {
    errors.phoneCommunication = 'Please select phone communication';
  }

  if (!data.matchingPace) {
    errors.matchingPace = 'Please select matching pace';
  }

  if (!data.preferenceFlexibility) {
    errors.preferenceFlexibility = 'Please select preference flexibility';
  }

  if (!data.dealBreakerFlexibility) {
    errors.dealBreakerFlexibility = 'Please select deal breaker flexibility';
  }

  if (!data.hostOrAttendEvents || data.hostOrAttendEvents.length === 0) {
    errors.hostOrAttendEvents = 'Please select event participation';
  }

  if (!data.feedbackComfort) {
    errors.feedbackComfort = 'Please select feedback comfort';
  }

  if (!data.profileVisibility) {
    errors.profileVisibility = 'Please select profile visibility';
  }

  return errors;
};

export const validateAllSteps = (data: OnboardingData): ValidationErrors => {
  return {
    step1: validateStep1(data.step1),
    step2: validateStep2(data.step2),
    step3: validateStep3(data.step3),
    step4: validateStep4(data.step4),
    step5: validateStep5(data.step5),
    step6: validateStep6(data.step6),
    step7: validateStep7(data.step7),
    step8: validateStep8(data.step8),
  };
};


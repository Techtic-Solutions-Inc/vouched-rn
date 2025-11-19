// Onboarding Types

export interface OnboardingData {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
  step4: Step4Data;
  step5: Step5Data;
  step6: Step6Data;
  step7: Step7Data;
  step8: Step8Data;
}

// Step 1: Basic Information
export interface Step1Data {
  firstName: string;
  lastName: string;
  pronouns: string[];
  dateOfBirth: string | null;
  gender: string;
  lookingFor: string[];
  city: string;
  zipCode: string;
  maxDistance: number;
}

// Step 2: Availability & Dating Preferences
export interface Step2Data {
  availability: string[];
  advanceNotice: string;
  dateFrequency: string;
  bestDateTimes: string[];
  dateDuration: string;
}

// Step 3: Relationship Intent
export interface Step3Data {
  relationshipIntent: string;
  relationshipStructure?: string;
  kidsPreference: string;
  kidsTimeline?: string;
  marriagePreference: string;
  marriageTimeline?: string;
  physicalImportance: string;
  intimacyTimeline: string;
}

// Step 4: Communication Style
export interface Step4Data {
  communicationStyles: string[];
  communicationFrequency: string;
}

// Step 5: Lifestyle
export interface Step5Data {
  livingSituation: string;
  housingGoals?: string;
  politicalViews: string;
  politicalEngagement: string;
  religion: string;
  religionPractice: string;
  smokingStatus: string;
  drinkingStatus: string;
  drinkingFrequency?: string;
  cannabisUse: string;
  cannabis420Friendly?: string;
  dietPreferences: string[];
  dietImportance: string;
  activityLevel: string;
  workoutFrequency: string;
}

// Step 6: Personality & Values
export interface Step6Data {
  personalityTraits: string[];
  socialEnergy: string;
  idealWeekend: string;
  partnerValues: string[];
  dealBreakers: string[];
  idealFirstDate: string;
  worstFirstDate?: string;
  attractionFactors: string[];
  attractionImportance: string;
  loveLanguages: string[];
  primaryLoveLanguage?: string;
  conflictStyle: string;
  stressHandling: string;
  attachmentStyle?: string;
  financialApproach: string;
  careerImportance: string;
}

// Step 7: Interests & Community
export interface Step7Data {
  specificInterests: string[];
  top3Interests: string[];
  noveltyPreference: string;
  socialGroupPreference: string;
  eventTiming: string;
  travelFrequency: string;
  adventureLevel: string;
}

// Step 8: Practical Matters & Final Preferences
export interface Step8Data {
  workSchedule: string;
  workLifeBalance: string;
  petSituation: string;
  transportation: string;
  dateBudget: string;
  paymentPhilosophy: string;
  technologyUse: string;
  phoneCommunication: string;
  matchingPace: string;
  preferenceFlexibility: string;
  dealBreakerFlexibility: string;
  hostOrAttendEvents: string[];
  feedbackComfort: string;
  profileVisibility: string;
}

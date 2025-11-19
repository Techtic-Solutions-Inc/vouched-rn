// All option constants for onboarding steps

export const PRONOUNS = [
  { label: 'She/Her', value: 'SHE_HER' },
  { label: 'He/Him', value: 'HE_HIM' },
  { label: 'They/Them', value: 'THEY_THEM' },
  { label: 'She/They', value: 'SHE_THEY' },
  { label: 'He/They', value: 'HE_THEY' },
  { label: 'Prefer not to say', value: 'PREFER_NOT_TO_SAY' },
  { label: 'Custom', value: 'CUSTOM' },
];

export const GENDERS = [
  { label: 'Woman', value: 'WOMAN' },
  { label: 'Man', value: 'MAN' },
  { label: 'Non-binary', value: 'NONBINARY' },
  { label: 'Trans woman', value: 'TRANS_WOMAN' },
  { label: 'Trans man', value: 'TRANS_MAN' },
  { label: 'Genderfluid', value: 'GENDERFLUID' },
  { label: 'Questioning', value: 'QUESTIONING' },
  { label: 'Other', value: 'OTHER' },
  { label: 'Prefer not to say', value: 'PREFER_NOT_TO_SAY' },
];

export const LOOKING_FOR = [
  { label: 'Women', value: 'WOMEN' },
  { label: 'Men', value: 'MEN' },
  { label: 'Open to all', value: 'OPEN_TO_ALL' },
];

export const AVAILABILITY = [
  { label: 'Weeknights', value: 'WEEKNIGHTS' },
  { label: 'Weekend mornings', value: 'WEEKEND_MORNINGS' },
  { label: 'Weekend afternoons', value: 'WEEKEND_AFTERNOONS' },
  { label: 'Weekend evenings', value: 'WEEKEND_EVENINGS' },
  { label: 'Weekday mornings', value: 'WEEKDAY_MORNINGS' },
  { label: 'Weekday afternoons', value: 'WEEKDAY_AFTERNOONS' },
  { label: 'Varies week to week', value: 'VARIES_WEEK_TO_WEEK' },
];

export const ADVANCE_NOTICE = [
  { label: 'Spontaneous (same day)', value: 'SPONTANEOUS_SAME_DAY' },
  { label: '1-2 days', value: 'ONE_TO_TWO_DAYS' },
  { label: '3-5 days', value: 'THREE_TO_FIVE_DAYS' },
  { label: '1 week+', value: 'ONE_WEEK_PLUS' },
  { label: 'Very flexible', value: 'VERY_FLEXIBLE' },
];

export const DATE_FREQUENCY = [
  { label: 'Multiple times per week', value: 'MULTIPLE_TIMES_PER_WEEK' },
  { label: 'Weekly', value: 'WEEKLY' },
  { label: 'Bi-weekly', value: 'BI_WEEKLY' },
  { label: 'Monthly', value: 'MONTHLY' },
  { label: 'When it feels right', value: 'WHEN_IT_FEELS_RIGHT' },
];

export const BEST_DATE_TIMES = [
  { label: 'Morning coffee', value: 'MORNING_COFFEE' },
  { label: 'Lunch', value: 'LUNCH' },
  { label: 'Happy hour', value: 'HAPPY_HOUR' },
  { label: 'Dinner', value: 'DINNER' },
  { label: 'Evening activity', value: 'EVENING_ACTIVITY' },
  { label: 'Weekend afternoon', value: 'WEEKEND_AFTERNOON' },
];

export const DATE_DURATION = [
  { label: '30-60 minutes', value: 'THIRTY_TO_SIXTY_MINUTES' },
  { label: '1-2 hours', value: 'ONE_TO_TWO_HOURS' },
  { label: '2-3 hours', value: 'TWO_TO_THREE_HOURS' },
  { label: 'Open-ended', value: 'OPEN_ENDED' },
  { label: 'Depends on connection', value: 'DEPENDS_ON_CONNECTION' },
];

export const RELATIONSHIP_INTENT = [
  { label: 'Serious relationship', value: 'SERIOUS_RELATIONSHIP' },
  { label: 'Something casual', value: 'SOMETHING_CASUAL' },
  { label: 'New friends', value: 'NEW_FRIENDS' },
  { label: 'Just exploring', value: 'JUST_EXPLORING' },
  { label: 'Not sure yet', value: 'NOT_SURE_YET' },
];

export const RELATIONSHIP_STRUCTURE = [
  { label: 'Monogamous only', value: 'MONOGAMOUS_ONLY' },
  { label: 'Open to ENM', value: 'OPEN_TO_ENM' },
  { label: 'Polyamorous', value: 'POLYAMOROUS' },
  { label: 'Still exploring', value: 'STILL_EXPLORING' },
  { label: 'Depends on connection', value: 'DEPENDS_ON_CONNECTION' },
];

export const KIDS_PREFERENCE = [
  { label: 'Definitely want', value: 'DEFINITELY_WANT' },
  { label: 'Maybe someday', value: 'MAYBE_SOMEDAY' },
  { label: "Don't want", value: 'DONT_WANT' },
  { label: 'Already have', value: 'ALREADY_HAVE' },
  { label: 'Open to partners with', value: 'OPEN_TO_PARTNERS_WITH' },
];

export const KIDS_TIMELINE = [
  { label: 'Within 2 years', value: 'WITHIN_TWO_YEARS' },
  { label: '2-5 years', value: 'TWO_TO_FIVE_YEARS' },
  { label: '5+ years', value: 'FIVE_PLUS_YEARS' },
  { label: 'Already trying', value: 'ALREADY_TRYING' },
  { label: 'Flexible timeline', value: 'FLEXIBLE_TIMELINE' },
];

export const MARRIAGE_PREFERENCE = [
  { label: 'Yes', value: 'YES' },
  { label: 'Someday', value: 'SOMEDAY' },
  { label: 'Not sure', value: 'NOT_SURE' },
  { label: 'No', value: 'NO' },
];

export const MARRIAGE_TIMELINE = [
  { label: 'Within 2 years', value: 'WITHIN_TWO_YEARS' },
  { label: '2-5 years', value: 'TWO_TO_FIVE_YEARS' },
  { label: '5+ years', value: 'FIVE_PLUS_YEARS' },
  { label: 'No rush', value: 'NO_RUSH' },
  { label: 'Flexible', value: 'FLEXIBLE' },
];

export const PHYSICAL_IMPORTANCE = [
  { label: 'Very important', value: 'VERY_IMPORTANT' },
  { label: 'Somewhat important', value: 'SOMEWHAT_IMPORTANT' },
  { label: 'Not very important', value: 'NOT_VERY_IMPORTANT' },
  { label: 'Not sure', value: 'NOT_SURE' },
];

export const INTIMACY_TIMELINE = [
  { label: 'Right away', value: 'RIGHT_AWAY' },
  { label: 'After few dates', value: 'AFTER_FEW_DATES' },
  { label: 'After commitment', value: 'AFTER_COMMITMENT' },
  { label: 'After marriage', value: 'AFTER_MARRIAGE' },
  { label: 'Varies by connection', value: 'VARIES_BY_CONNECTION' },
];

export const COMMUNICATION_STYLES = [
  { label: 'Direct', value: 'DIRECT' },
  { label: 'Reserved', value: 'RESERVED' },
  { label: 'Playful', value: 'PLAYFUL' },
  { label: 'Thoughtful', value: 'THOUGHTFUL' },
  { label: 'Dry humor', value: 'DRY_HUMOR' },
  { label: 'Emotionally open', value: 'EMOTIONALLY_OPEN' },
  { label: 'Figuring it out', value: 'FIGURING_IT_OUT' },
];

export const COMMUNICATION_FREQUENCY = [
  { label: 'Text throughout day', value: 'TEXT_THROUGHOUT_DAY' },
  { label: 'Evening check-ins', value: 'EVENING_CHECK_INS' },
  { label: 'Every few days', value: 'EVERY_FEW_DAYS' },
  { label: 'When planning dates', value: 'WHEN_PLANNING_DATES' },
  { label: 'Let it flow naturally', value: 'LET_IT_FLOW_NATURALLY' },
];

export const LIVING_SITUATION = [
  { label: 'Live alone', value: 'LIVE_ALONE' },
  { label: 'Live with roommates', value: 'LIVE_WITH_ROOMMATES' },
  { label: 'Live with partner', value: 'LIVE_WITH_PARTNER' },
  { label: 'Live with family', value: 'LIVE_WITH_FAMILY' },
  { label: 'Prefer not to say', value: 'PREFER_NOT_TO_SAY' },
];

export const HOUSING_GOALS = [
  { label: 'Happy renting', value: 'HAPPY_RENTING' },
  { label: 'Want to buy soon', value: 'WANT_TO_BUY_SOON' },
  { label: 'Already own', value: 'ALREADY_OWN' },
  { label: 'Prefer roommates', value: 'PREFER_ROOMMATES' },
  { label: 'Want to live alone', value: 'WANT_TO_LIVE_ALONE' },
];

export const POLITICAL_VIEWS = [
  { label: 'Very progressive', value: 'VERY_PROGRESSIVE' },
  { label: 'Progressive', value: 'PROGRESSIVE' },
  { label: 'Moderate', value: 'MODERATE' },
  { label: 'Conservative', value: 'CONSERVATIVE' },
  { label: 'Very conservative', value: 'VERY_CONSERVATIVE' },
  { label: 'Apolitical', value: 'APOLITICAL' },
  { label: 'Prefer not to say', value: 'PREFER_NOT_TO_SAY' },
];

export const POLITICAL_ENGAGEMENT = [
  { label: 'Very active', value: 'VERY_ACTIVE' },
  { label: 'Occasionally engaged', value: 'OCCASIONALLY_ENGAGED' },
  { label: 'Follow but don\'t engage', value: 'FOLLOW_BUT_DONT_ENGAGE' },
  { label: 'Not interested', value: 'NOT_INTERESTED' },
  { label: 'Prefer not to discuss', value: 'PREFER_NOT_TO_DISCUSS' },
];

export const RELIGION = [
  { label: 'Agnostic', value: 'AGNOSTIC' },
  { label: 'Atheist', value: 'ATHEIST' },
  { label: 'Christian', value: 'CHRISTIAN' },
  { label: 'Jewish', value: 'JEWISH' },
  { label: 'Muslim', value: 'MUSLIM' },
  { label: 'Hindu', value: 'HINDU' },
  { label: 'Buddhist', value: 'BUDDHIST' },
  { label: 'Spiritual not religious', value: 'SPIRITUAL_NOT_RELIGIOUS' },
  { label: 'Other', value: 'OTHER' },
  { label: 'Prefer not to say', value: 'PREFER_NOT_TO_SAY' },
];

export const RELIGION_PRACTICE = [
  { label: 'Daily', value: 'DAILY' },
  { label: 'Weekly', value: 'WEEKLY' },
  { label: 'Holidays only', value: 'HOLIDAYS_ONLY' },
  { label: 'Rarely', value: 'RARELY' },
  { label: 'Never', value: 'NEVER' },
  { label: 'Cultural connection only', value: 'CULTURAL_CONNECTION_ONLY' },
];

export const SMOKING_STATUS = [
  { label: 'No', value: 'NO' },
  { label: 'Occasionally', value: 'OCCASIONALLY' },
  { label: 'Socially', value: 'SOCIALLY' },
  { label: 'Yes', value: 'YES' },
];

export const DRINKING_STATUS = [
  { label: 'No', value: 'NO' },
  { label: 'Occasionally', value: 'OCCASIONALLY' },
  { label: 'Socially', value: 'SOCIALLY' },
  { label: 'Regularly', value: 'REGULARLY' },
];

export const DRINKING_FREQUENCY = [
  { label: 'Never', value: 'NEVER' },
  { label: 'Monthly or less', value: 'MONTHLY_OR_LESS' },
  { label: '2-4 times per month', value: 'TWO_TO_FOUR_TIMES_PER_MONTH' },
  { label: '2-3 times per week', value: 'TWO_TO_THREE_TIMES_PER_WEEK' },
  { label: '4+ times per week', value: 'FOUR_PLUS_TIMES_PER_WEEK' },
];

export const CANNABIS_USE = [
  { label: 'No', value: 'NO' },
  { label: 'Occasionally', value: 'OCCASIONALLY' },
  { label: 'Socially', value: 'SOCIALLY' },
  { label: 'Regularly', value: 'REGULARLY' },
];

export const CANNABIS_420_FRIENDLY = [
  { label: 'Yes', value: 'YES' },
  { label: 'No', value: 'NO' },
  { label: 'Neutral', value: 'NEUTRAL' },
];

export const DIET_PREFERENCES = [
  { label: 'Omnivore', value: 'OMNIVORE' },
  { label: 'Vegetarian', value: 'VEGETARIAN' },
  { label: 'Vegan', value: 'VEGAN' },
  { label: 'Pescatarian', value: 'PESCATARIAN' },
  { label: 'Gluten-free', value: 'GLUTEN_FREE' },
  { label: 'Dairy-free', value: 'DAIRY_FREE' },
  { label: 'Kosher', value: 'KOSHER' },
  { label: 'Halal', value: 'HALAL' },
  { label: 'Other', value: 'OTHER' },
];

export const DIET_IMPORTANCE = [
  { label: 'Must match exactly', value: 'MUST_MATCH_EXACTLY' },
  { label: 'Prefer similar', value: 'PREFER_SIMILAR' },
  { label: 'Open to different', value: 'OPEN_TO_DIFFERENT' },
  { label: "Doesn't matter", value: 'DOESNT_MATTER' },
];

export const ACTIVITY_LEVEL = [
  { label: 'Very active', value: 'VERY_ACTIVE' },
  { label: 'Somewhat active', value: 'SOMEWHAT_ACTIVE' },
  { label: 'Not very active', value: 'NOT_VERY_ACTIVE' },
  { label: 'Prefer not to say', value: 'PREFER_NOT_TO_SAY' },
];

export const WORKOUT_FREQUENCY = [
  { label: 'Daily', value: 'DAILY' },
  { label: '4-6 times/week', value: 'FOUR_TO_SIX_TIMES_WEEK' },
  { label: '2-3 times/week', value: 'TWO_TO_THREE_TIMES_WEEK' },
  { label: 'Weekly', value: 'WEEKLY' },
  { label: 'Occasionally', value: 'OCCASIONALLY' },
  { label: 'Rarely', value: 'RARELY' },
];

export const PERSONALITY_TRAITS = [
  { label: 'Kind', value: 'KIND' },
  { label: 'Funny', value: 'FUNNY' },
  { label: 'Grounded', value: 'GROUNDED' },
  { label: 'Ambitious', value: 'AMBITIOUS' },
  { label: 'Curious', value: 'CURIOUS' },
  { label: 'Adventurous', value: 'ADVENTUROUS' },
  { label: 'Empathetic', value: 'EMPATHETIC' },
  { label: 'Loyal', value: 'LOYAL' },
  { label: 'Confident', value: 'CONFIDENT' },
  { label: 'Calm', value: 'CALM' },
  { label: 'Driven', value: 'DRIVEN' },
  { label: 'Creative', value: 'CREATIVE' },
  { label: 'Spontaneous', value: 'SPONTANEOUS' },
  { label: 'Organized', value: 'ORGANIZED' },
  { label: 'Social', value: 'SOCIAL' },
  { label: 'Introverted', value: 'INTROVERTED' },
];

export const SOCIAL_ENERGY = [
  { label: 'Major extrovert', value: 'MAJOR_EXTROVERT' },
  { label: 'Social extrovert', value: 'SOCIAL_EXTROVERT' },
  { label: 'Ambivert', value: 'AMBIVERT' },
  { label: 'Social introvert', value: 'SOCIAL_INTROVERT' },
  { label: 'Major introvert', value: 'MAJOR_INTROVERT' },
];

export const IDEAL_WEEKEND = [
  { label: 'Big social gathering', value: 'BIG_SOCIAL_GATHERING' },
  { label: 'Small dinner party', value: 'SMALL_DINNER_PARTY' },
  { label: 'One-on-one time', value: 'ONE_ON_ONE_TIME' },
  { label: 'Mix of social and alone', value: 'MIX_OF_SOCIAL_AND_ALONE' },
  { label: 'Solo activities', value: 'SOLO_ACTIVITIES' },
  { label: 'Spontaneous adventure', value: 'SPONTANEOUS_ADVENTURE' },
];

export const PARTNER_VALUES = [
  { label: 'Integrity', value: 'INTEGRITY' },
  { label: 'Humor', value: 'HUMOR' },
  { label: 'Ambition', value: 'AMBITION' },
  { label: 'Emotional availability', value: 'EMOTIONAL_AVAILABILITY' },
  { label: 'Stability', value: 'STABILITY' },
  { label: 'Spontaneity', value: 'SPONTANEITY' },
  { label: 'Family values', value: 'FAMILY_VALUES' },
  { label: 'Independence', value: 'INDEPENDENCE' },
  { label: 'Intellectual curiosity', value: 'INTELLECTUAL_CURIOSITY' },
  { label: 'Financial responsibility', value: 'FINANCIAL_RESPONSIBILITY' },
  { label: 'Social justice', value: 'SOCIAL_JUSTICE' },
  { label: 'Creativity', value: 'CREATIVITY' },
  { label: 'Loyalty', value: 'LOYALTY' },
];

export const DEAL_BREAKERS = [
  { label: 'Dishonesty', value: 'DISHONESTY' },
  { label: 'Lack of ambition', value: 'LACK_OF_AMBITION' },
  { label: 'Poor communication', value: 'POOR_COMMUNICATION' },
  { label: 'Different political views', value: 'DIFFERENT_POLITICAL_VIEWS' },
  { label: 'Different religious views', value: 'DIFFERENT_RELIGIOUS_VIEWS' },
  { label: 'Substance abuse', value: 'SUBSTANCE_ABUSE' },
  { label: 'Infidelity', value: 'INFIDELITY' },
  { label: 'Jealousy', value: 'JEALOUSY' },
  { label: 'Poor hygiene', value: 'POOR_HYGIENE' },
  { label: 'Financial irresponsibility', value: 'FINANCIAL_IRRESPONSIBILITY' },
];

export const IDEAL_FIRST_DATE = [
  { label: 'Coffee or tea', value: 'COFFEE_OR_TEA' },
  { label: 'Drinks at bar', value: 'DRINKS_AT_BAR' },
  { label: 'Walk in park', value: 'WALK_IN_PARK' },
  { label: 'Shared hobby activity', value: 'SHARED_HOBBY_ACTIVITY' },
  { label: 'Museum or gallery', value: 'MUSEUM_OR_GALLERY' },
  { label: 'Live music or show', value: 'LIVE_MUSIC_OR_SHOW' },
  { label: 'Dinner', value: 'DINNER' },
  { label: 'Something adventurous', value: 'SOMETHING_ADVENTUROUS' },
  { label: 'Not sure', value: 'NOT_SURE' },
];

export const WORST_FIRST_DATE = [
  { label: 'Loud bars', value: 'LOUD_BARS' },
  { label: 'Expensive dinners', value: 'EXPENSIVE_DINNERS' },
  { label: 'Physical activities', value: 'PHYSICAL_ACTIVITIES' },
  { label: 'Crowded places', value: 'CROWDED_PLACES' },
  { label: 'Intimate settings', value: 'INTIMATE_SETTINGS' },
  { label: 'Long commitments', value: 'LONG_COMMITMENTS' },
  { label: 'Anything competitive', value: 'ANYTHING_COMPETITIVE' },
];

export const ATTRACTION_FACTORS = [
  { label: 'Humor', value: 'HUMOR' },
  { label: 'Kindness', value: 'KINDNESS' },
  { label: 'Intelligence', value: 'INTELLIGENCE' },
  { label: 'Confidence', value: 'CONFIDENCE' },
  { label: 'Physical fitness', value: 'PHYSICAL_FITNESS' },
  { label: 'Emotional depth', value: 'EMOTIONAL_DEPTH' },
  { label: 'Curiosity', value: 'CURIOSITY' },
  { label: 'Creativity', value: 'CREATIVITY' },
  { label: 'Style', value: 'STYLE' },
  { label: 'Ambition', value: 'AMBITION' },
  { label: 'Stability', value: 'STABILITY' },
  { label: 'Spontaneity', value: 'SPONTANEITY' },
];

export const ATTRACTION_IMPORTANCE = [
  { label: 'Very important', value: 'VERY_IMPORTANT' },
  { label: 'Somewhat important', value: 'SOMEWHAT_IMPORTANT' },
  { label: 'Not very important', value: 'NOT_VERY_IMPORTANT' },
  { label: 'Grows with connection', value: 'GROWS_WITH_CONNECTION' },
];

export const LOVE_LANGUAGES = [
  { label: 'Words of affirmation', value: 'WORDS_OF_AFFIRMATION' },
  { label: 'Acts of service', value: 'ACTS_OF_SERVICE' },
  { label: 'Receiving gifts', value: 'RECEIVING_GIFTS' },
  { label: 'Quality time', value: 'QUALITY_TIME' },
  { label: 'Physical touch', value: 'PHYSICAL_TOUCH' },
];

export const CONFLICT_STYLE = [
  { label: 'Talk things out', value: 'TALK_THINGS_OUT' },
  { label: 'Take space then talk', value: 'TAKE_SPACE_THEN_TALK' },
  { label: 'Avoid conflict', value: 'AVOID_CONFLICT' },
  { label: 'Not sure', value: 'NOT_SURE' },
];

export const STRESS_HANDLING = [
  { label: 'Talk to friends/family', value: 'TALK_TO_FRIENDS_FAMILY' },
  { label: 'Exercise', value: 'EXERCISE' },
  { label: 'Solo reflection', value: 'SOLO_REFLECTION' },
  { label: 'Creative outlets', value: 'CREATIVE_OUTLETS' },
  { label: 'Professional help', value: 'PROFESSIONAL_HELP' },
  { label: 'Avoid/distract', value: 'AVOID_DISTRACT' },
];

export const ATTACHMENT_STYLE = [
  { label: 'Secure', value: 'SECURE' },
  { label: 'Anxious', value: 'ANXIOUS' },
  { label: 'Avoidant', value: 'AVOIDANT' },
  { label: 'Fearful avoidant', value: 'FEARFUL_AVOIDANT' },
  { label: 'Not sure', value: 'NOT_SURE' },
];

export const FINANCIAL_APPROACH = [
  { label: 'Very budget conscious', value: 'VERY_BUDGET_CONSCIOUS' },
  { label: 'Moderate spender', value: 'MODERATE_SPENDER' },
  { label: 'Enjoy treating myself', value: 'ENJOY_TREATING_MYSELF' },
  { label: "Money isn't concern", value: 'MONEY_ISNT_CONCERN' },
  { label: 'Prefer not to say', value: 'PREFER_NOT_TO_SAY' },
];

export const CAREER_IMPORTANCE = [
  { label: 'Work to live', value: 'WORK_TO_LIVE' },
  { label: 'Balance is key', value: 'BALANCE_IS_KEY' },
  { label: 'Career focused', value: 'CAREER_FOCUSED' },
  { label: 'Extremely ambitious', value: 'EXTREMELY_AMBITIOUS' },
  { label: 'Still figuring out', value: 'STILL_FIGURING_OUT' },
];

export const INTERESTS = [
  // Fitness & Wellness
  { label: 'Running', value: 'RUNNING', category: 'Fitness & Wellness' },
  { label: 'Yoga', value: 'YOGA', category: 'Fitness & Wellness' },
  { label: 'Weightlifting', value: 'WEIGHTLIFTING', category: 'Fitness & Wellness' },
  { label: 'Cycling', value: 'CYCLING', category: 'Fitness & Wellness' },
  { label: 'Swimming', value: 'SWIMMING', category: 'Fitness & Wellness' },
  { label: 'Hiking', value: 'HIKING', category: 'Fitness & Wellness' },
  { label: 'Meditation', value: 'MEDITATION', category: 'Fitness & Wellness' },
  { label: 'Pilates', value: 'PILATES', category: 'Fitness & Wellness' },
  
  // Arts & Culture
  { label: 'Painting', value: 'PAINTING', category: 'Arts & Culture' },
  { label: 'Photography', value: 'PHOTOGRAPHY', category: 'Arts & Culture' },
  { label: 'Writing', value: 'WRITING', category: 'Arts & Culture' },
  { label: 'Theater', value: 'THEATER', category: 'Arts & Culture' },
  { label: 'Dance', value: 'DANCE', category: 'Arts & Culture' },
  { label: 'Museums', value: 'MUSEUMS', category: 'Arts & Culture' },
  { label: 'Art galleries', value: 'ART_GALLERIES', category: 'Arts & Culture' },
  
  // Music & Entertainment
  { label: 'Live music', value: 'LIVE_MUSIC', category: 'Music & Entertainment' },
  { label: 'Concerts', value: 'CONCERTS', category: 'Music & Entertainment' },
  { label: 'DJing', value: 'DJJING', category: 'Music & Entertainment' },
  { label: 'Podcasts', value: 'PODCASTS', category: 'Music & Entertainment' },
  { label: 'Movies', value: 'MOVIES', category: 'Music & Entertainment' },
  { label: 'TV shows', value: 'TV_SHOWS', category: 'Music & Entertainment' },
  
  // Food & Drink
  { label: 'Cooking', value: 'COOKING', category: 'Food & Drink' },
  { label: 'Wine tasting', value: 'WINE_TASTING', category: 'Food & Drink' },
  { label: 'Craft beer', value: 'CRAFT_BEER', category: 'Food & Drink' },
  { label: 'Foodie', value: 'FOODIE', category: 'Food & Drink' },
  { label: 'Coffee', value: 'COFFEE', category: 'Food & Drink' },
  { label: 'Baking', value: 'BAKING', category: 'Food & Drink' },
  
  // Outdoor Activities
  { label: 'Camping', value: 'CAMPING', category: 'Outdoor Activities' },
  { label: 'Rock climbing', value: 'ROCK_CLIMBING', category: 'Outdoor Activities' },
  { label: 'Surfing', value: 'SURFING', category: 'Outdoor Activities' },
  { label: 'Skiing', value: 'SKIING', category: 'Outdoor Activities' },
  { label: 'Kayaking', value: 'KAYAKING', category: 'Outdoor Activities' },
  { label: 'Gardening', value: 'GARDENING', category: 'Outdoor Activities' },
  
  // Intellectual
  { label: 'Reading', value: 'READING', category: 'Intellectual' },
  { label: 'Philosophy', value: 'PHILOSOPHY', category: 'Intellectual' },
  { label: 'Science', value: 'SCIENCE', category: 'Intellectual' },
  { label: 'History', value: 'HISTORY', category: 'Intellectual' },
  { label: 'Learning languages', value: 'LEARNING_LANGUAGES', category: 'Intellectual' },
  
  // Technology
  { label: 'Coding', value: 'CODING', category: 'Technology' },
  { label: 'Gaming', value: 'GAMING', category: 'Technology' },
  { label: 'Tech gadgets', value: 'TECH_GADGETS', category: 'Technology' },
  
  // Games & Puzzles
  { label: 'Board games', value: 'BOARD_GAMES', category: 'Games & Puzzles' },
  { label: 'Chess', value: 'CHESS', category: 'Games & Puzzles' },
  { label: 'Puzzles', value: 'PUZZLES', category: 'Games & Puzzles' },
  { label: 'Card games', value: 'CARD_GAMES', category: 'Games & Puzzles' },
  
  // Social Causes
  { label: 'Volunteering', value: 'VOLUNTEERING', category: 'Social Causes' },
  { label: 'Activism', value: 'ACTIVISM', category: 'Social Causes' },
  { label: 'Community organizing', value: 'COMMUNITY_ORGANIZING', category: 'Social Causes' },
  
  // Travel & Culture
  { label: 'Travel', value: 'TRAVEL', category: 'Travel & Culture' },
  { label: 'Exploring new places', value: 'EXPLORING_NEW_PLACES', category: 'Travel & Culture' },
  { label: 'Cultural events', value: 'CULTURAL_EVENTS', category: 'Travel & Culture' },
  
  // Spiritual & Wellness
  { label: 'Spirituality', value: 'SPIRITUALITY', category: 'Spiritual & Wellness' },
  { label: 'Mindfulness', value: 'MINDFULNESS', category: 'Spiritual & Wellness' },
  
  // Creative Making
  { label: 'Crafting', value: 'CRAFTING', category: 'Creative Making' },
  { label: 'Sewing', value: 'SEWING', category: 'Creative Making' },
  { label: 'Woodworking', value: 'WOODWORKING', category: 'Creative Making' },
  { label: 'Pottery', value: 'POTTERY', category: 'Creative Making' },
  
  // Family & Community
  { label: 'Family time', value: 'FAMILY_TIME', category: 'Family & Community' },
  { label: 'Community events', value: 'COMMUNITY_EVENTS', category: 'Family & Community' },
  
  // Professional
  { label: 'Networking', value: 'NETWORKING', category: 'Professional' },
  { label: 'Entrepreneurship', value: 'ENTREPRENEURSHIP', category: 'Professional' },
];

export const NOVELTY_PREFERENCE = [
  { label: 'Always up for new experiences', value: 'ALWAYS_UP_FOR_NEW_EXPERIENCES' },
  { label: 'Weekly new activities', value: 'WEEKLY_NEW_ACTIVITIES' },
  { label: 'Monthly adventures', value: 'MONTHLY_ADVENTURES' },
  { label: 'Occasionally', value: 'OCCASIONALLY' },
  { label: 'Prefer familiar activities', value: 'PREFER_FAMILIAR_ACTIVITIES' },
];

export const SOCIAL_GROUP_PREFERENCE = [
  { label: 'Large groups (10+)', value: 'LARGE_GROUPS_TEN_PLUS' },
  { label: 'Medium groups (5-10)', value: 'MEDIUM_GROUPS_FIVE_TO_TEN' },
  { label: 'Small groups (3-5)', value: 'SMALL_GROUPS_THREE_TO_FIVE' },
  { label: 'One-on-one', value: 'ONE_ON_ONE' },
  { label: 'Mix depending on activity', value: 'MIX_DEPENDING_ON_ACTIVITY' },
];

export const EVENT_TIMING = [
  { label: 'Weeknight events', value: 'WEEKNIGHT_EVENTS' },
  { label: 'Weekend afternoon', value: 'WEEKEND_AFTERNOON' },
  { label: 'Weekend evening', value: 'WEEKEND_EVENING' },
  { label: 'Sunday activities', value: 'SUNDAY_ACTIVITIES' },
  { label: 'Flexible', value: 'FLEXIBLE' },
];

export const TRAVEL_FREQUENCY = [
  { label: 'Multiple times per month', value: 'MULTIPLE_TIMES_PER_MONTH' },
  { label: 'Monthly', value: 'MONTHLY' },
  { label: 'Few times per year', value: 'FEW_TIMES_PER_YEAR' },
  { label: 'Annually', value: 'ANNUALLY' },
  { label: 'Rarely', value: 'RARELY' },
  { label: 'Never', value: 'NEVER' },
];

export const ADVENTURE_LEVEL = [
  { label: 'Extreme sports', value: 'EXTREME_SPORTS' },
  { label: 'Moderate adventure', value: 'MODERATE_ADVENTURE' },
  { label: 'Low-key exploration', value: 'LOW_KEY_EXPLORATION' },
  { label: 'Prefer familiar', value: 'PREFER_FAMILIAR' },
  { label: 'Homebody', value: 'HOMEBODY' },
];

export const WORK_SCHEDULE = [
  { label: 'Standard 9-5', value: 'STANDARD_NINE_TO_FIVE' },
  { label: 'Flexible hours', value: 'FLEXIBLE_HOURS' },
  { label: 'Shift work', value: 'SHIFT_WORK' },
  { label: 'Freelance/contract', value: 'FREELANCE_CONTRACT' },
  { label: 'Student', value: 'STUDENT' },
  { label: 'Retired', value: 'RETIRED' },
  { label: 'Between jobs', value: 'BETWEEN_JOBS' },
];

export const WORK_LIFE_BALANCE = [
  { label: 'Work dominates', value: 'WORK_DOMINATES' },
  { label: 'Lean toward work', value: 'LEAN_TOWARD_WORK' },
  { label: 'Balanced', value: 'BALANCED' },
  { label: 'Lean toward life', value: 'LEAN_TOWARD_LIFE' },
  { label: 'Life dominates', value: 'LIFE_DOMINATES' },
];

export const PET_SITUATION = [
  { label: 'Have dogs', value: 'HAVE_DOGS' },
  { label: 'Have cats', value: 'HAVE_CATS' },
  { label: 'Have other pets', value: 'HAVE_OTHER_PETS' },
  { label: 'No pets but love them', value: 'NO_PETS_BUT_LOVE_THEM' },
  { label: 'No pets and allergic', value: 'NO_PETS_AND_ALLERGIC' },
  { label: "Don't like pets", value: 'DONT_LIKE_PETS' },
];

export const TRANSPORTATION = [
  { label: 'Own car', value: 'OWN_CAR' },
  { label: 'Public transit', value: 'PUBLIC_TRANSIT' },
  { label: 'Bike/walk', value: 'BIKE_WALK' },
  { label: 'Rideshare', value: 'RIDESHARE' },
  { label: 'Mix of options', value: 'MIX_OF_OPTIONS' },
];

export const DATE_BUDGET = [
  { label: 'Free activities', value: 'FREE_ACTIVITIES' },
  { label: 'Under $25', value: 'UNDER_TWENTY_FIVE' },
  { label: '$25-$50', value: 'TWENTY_FIVE_TO_FIFTY' },
  { label: '$50-$100', value: 'FIFTY_TO_ONE_HUNDRED' },
  { label: '$100+', value: 'ONE_HUNDRED_PLUS' },
  { label: "Cost doesn't matter", value: 'COST_DOESNT_MATTER' },
];

export const PAYMENT_PHILOSOPHY = [
  { label: 'I always pay', value: 'I_ALWAYS_PAY' },
  { label: 'Split evenly', value: 'SPLIT_EVENLY' },
  { label: 'Whoever initiated', value: 'WHOEVER_INITIATED' },
  { label: 'Higher earner pays', value: 'HIGHER_EARNER_PAYS' },
  { label: 'Flexible/discuss', value: 'FLEXIBLE_DISCUSS' },
];

export const TECHNOLOGY_USE = [
  { label: 'Very connected', value: 'VERY_CONNECTED' },
  { label: 'Moderate use', value: 'MODERATE_USE' },
  { label: 'Minimal use', value: 'MINIMAL_USE' },
  { label: 'Digital detox focused', value: 'DIGITAL_DETOX_FOCUSED' },
];

export const PHONE_COMMUNICATION = [
  { label: 'Love phone calls', value: 'LOVE_PHONE_CALLS' },
  { label: 'Text only', value: 'TEXT_ONLY' },
  { label: 'Video calls preferred', value: 'VIDEO_CALLS_PREFERRED' },
  { label: 'In person only', value: 'IN_PERSON_ONLY' },
  { label: 'Whatever works', value: 'WHATEVER_WORKS' },
];

export const MATCHING_PACE = [
  { label: 'Show me everyone compatible', value: 'SHOW_ME_EVERYONE_COMPATIBLE' },
  { label: '3-5 matches per day', value: 'THREE_TO_FIVE_MATCHES_PER_DAY' },
  { label: '1-2 matches per day', value: 'ONE_TO_TWO_MATCHES_PER_DAY' },
  { label: 'Weekly batch', value: 'WEEKLY_BATCH' },
  { label: "I'll browse when ready", value: 'ILL_BROWSE_WHEN_READY' },
];

export const PREFERENCE_FLEXIBILITY = [
  { label: 'Stick to my criteria', value: 'STICK_TO_MY_CRITERIA' },
  { label: '10% flexibility', value: 'TEN_PERCENT_FLEXIBILITY' },
  { label: '25% flexibility', value: 'TWENTY_FIVE_PERCENT_FLEXIBILITY' },
  { label: '50% flexibility', value: 'FIFTY_PERCENT_FLEXIBILITY' },
  { label: 'Surprise me', value: 'SURPRISE_ME' },
];

export const DEAL_BREAKER_FLEXIBILITY = [
  { label: 'Never compromise on dealbreakers', value: 'NEVER_COMPROMISE_ON_DEALBREAKERS' },
  { label: 'Rare exceptions', value: 'RARE_EXCEPTIONS' },
  { label: 'Case by case', value: 'CASE_BY_CASE' },
  { label: 'Pretty flexible', value: 'PRETTY_FLEXIBLE' },
];

export const HOST_OR_ATTEND_EVENTS = [
  { label: 'Host events', value: 'HOST_EVENTS' },
  { label: 'Attend events', value: 'ATTEND_EVENTS' },
  { label: 'Both', value: 'BOTH' },
];

export const FEEDBACK_COMFORT = [
  { label: 'Love feedback', value: 'LOVE_FEEDBACK' },
  { label: 'Constructive feedback okay', value: 'CONSTRUCTIVE_FEEDBACK_OKAY' },
  { label: 'Gentle feedback only', value: 'GENTLE_FEEDBACK_ONLY' },
  { label: 'Prefer no feedback', value: 'PREFER_NO_FEEDBACK' },
];

export const PROFILE_VISIBILITY = [
  { label: 'Visible to everyone', value: 'VISIBLE_TO_EVERYONE' },
  { label: 'Vouched users first', value: 'VOUCHED_USERS_FIRST' },
  { label: 'Matches only', value: 'MATCHES_ONLY' },
  { label: 'Very private', value: 'VERY_PRIVATE' },
];


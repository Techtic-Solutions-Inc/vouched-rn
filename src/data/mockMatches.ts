import { Match } from "../components/MatchCard";

export const MOCK_MATCHES: Match[] = [
  {
    id: "1",
    name: "Sarah",
    age: 28,
    photos: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60",
    ],
    compatibilityScore: 92,
    matchReasons: [
      "Both love hiking and outdoor adventures",
      "Similar taste in music and events",
      "Looking for meaningful connections",
    ],
    distance: 2.5,
    location: "St. Petersburg",
    compatibilityBreakdown: {
      interestOverlap: 88,
      socialProximity: 85,
      trustBonus: 10,
    },
    nonMatchReasons: [
      "Different work schedules (she works nights)",
      "She prefers smaller gatherings, you like large events",
    ],
    isLiked: false,
    isMutualMatch: false,
  },
  {
    id: "2",
    name: "Emily",
    age: 26,
    photos: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60",
    ],
    compatibilityScore: 85,
    matchReasons: [
      "Shared interest in tech meetups",
      "Both enjoy board games",
      "Similar lifestyle values",
    ],
    distance: 5.2,
    location: "Tampa",
    compatibilityBreakdown: {
      interestOverlap: 82,
      socialProximity: 78,
    },
    nonMatchReasons: [
      "She's more introverted, you're more extroverted",
    ],
    isLiked: true,
    isMutualMatch: true,
  },
  {
    id: "3",
    name: "Jessica",
    age: 30,
    photos: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60",
    ],
    compatibilityScore: 78,
    matchReasons: [
      "Both passionate about food and cooking",
      "Enjoy attending food festivals",
      "Similar sense of humor",
    ],
    distance: 3.8,
    location: "St. Petersburg",
    compatibilityBreakdown: {
      interestOverlap: 75,
      socialProximity: 70,
    },
    isLiked: false,
    isMutualMatch: false,
  },
  {
    id: "4",
    name: "Amanda",
    age: 29,
    photos: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&auto=format&fit=crop&q=60",
    ],
    compatibilityScore: 88,
    matchReasons: [
      "Love live music and concerts",
      "Both into fitness and wellness",
      "Looking for someone to explore events with",
    ],
    distance: 1.2,
    location: "Downtown Tampa",
    compatibilityBreakdown: {
      interestOverlap: 85,
      socialProximity: 82,
      trustBonus: 5,
    },
    isLiked: false,
    isMutualMatch: false,
  },
  {
    id: "5",
    name: "Rachel",
    age: 27,
    photos: [
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&auto=format&fit=crop&q=60",
    ],
    compatibilityScore: 95,
    matchReasons: [
      "Perfect match for gaming events",
      "Both love Magic: The Gathering",
      "Similar social interests",
    ],
    distance: 4.5,
    location: "Clearwater",
    compatibilityBreakdown: {
      interestOverlap: 95,
      socialProximity: 90,
      trustBonus: 15,
    },
    isLiked: true,
    isMutualMatch: true,
  },
];

// Helper function to get match by ID
export const getMatchById = (id: string): Match | undefined => {
  return MOCK_MATCHES.find((match) => match.id === id);
};


import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../constants/colors";
import { fontSize } from "../../constants/fontSize";
import fonts from "../../constants/fonts";
import { size } from "../../utils/size";

export interface Match {
  id: string;
  name: string;
  age: number;
  photos: (string | ImageSourcePropType)[];
  compatibilityScore: number; // 0-100
  matchReasons: string[]; // 2-3 reasons why they matched
  distance: number; // in miles/km
  location?: string; // city/area
  // Detailed compatibility breakdown
  compatibilityBreakdown?: {
    interestOverlap: number; // 0-100
    socialProximity: number; // 0-100
    trustBonus?: number; // 0-100 (optional)
  };
  nonMatchReasons?: string[]; // What's different
  isLiked?: boolean; // If user has liked this match
  isMutualMatch?: boolean; // If it's a mutual match
}

interface MatchCardProps {
  match: Match;
  onPress?: () => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, onPress }) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      // Navigate to match detail screen
      router.push({
        pathname: "/(tabs)/matchDetail",
        params: { id: match.id },
      });
    }
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 80) return "#4CAF50"; // Green
    if (score >= 60) return "#FF9800"; // Orange
    return "#F44336"; // Red
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      {/* Photo Container */}
      <View style={styles.photoContainer}>
        {match.photos && match.photos.length > 0 ? (
          <Image
            source={
              typeof match.photos[0] === "string"
                ? { uri: match.photos[0] }
                : match.photos[0]
            }
            style={styles.photo}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderPhoto}>
            <Ionicons
              name="person"
              size={size.verticalScale(60)}
              color={COLORS.lightGray}
            />
          </View>
        )}

        {/* Compatibility Score Badge - Top Right */}
        <View
          style={[
            styles.compatibilityBadge,
            { backgroundColor: getCompatibilityColor(match.compatibilityScore) },
          ]}
        >
          <Text style={styles.compatibilityScore}>
            {match.compatibilityScore}%
          </Text>
          <Text style={styles.compatibilityLabel}>Match</Text>
        </View>

        {/* Multiple Photos Indicator */}
        {match.photos && match.photos.length > 1 && (
          <View style={styles.photoCountBadge}>
            <Ionicons
              name="images"
              size={size.verticalScale(14)}
              color={COLORS.white}
            />
            <Text style={styles.photoCountText}>{match.photos.length}</Text>
          </View>
        )}
      </View>

      {/* Match Details */}
      <View style={styles.detailsContainer}>
        {/* Name and Age */}
        <View style={styles.nameRow}>
          <Text style={styles.name}>
            {match.name}, {match.age}
          </Text>
        </View>

        {/* Why You Matched */}
        {match.matchReasons && match.matchReasons.length > 0 && (
          <View style={styles.matchReasonsContainer}>
            <Text style={styles.matchReasonsTitle}>Why you matched:</Text>
            {match.matchReasons.slice(0, 3).map((reason, index) => (
              <View key={index} style={styles.reasonItem}>
                <Ionicons
                  name="checkmark-circle"
                  size={size.verticalScale(14)}
                  color={COLORS.primaryButton}
                  style={styles.reasonIcon}
                />
                <Text style={styles.reasonText}>{reason}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Location Distance */}
        <View style={styles.locationRow}>
          <Ionicons
            name="location-outline"
            size={size.verticalScale(16)}
            color={COLORS.lightGray}
            style={styles.locationIcon}
          />
          <Text style={styles.locationText}>
            {match.distance.toFixed(1)} miles away
            {match.location && ` • ${match.location}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: size.scale(16),
    marginHorizontal: size.moderateScale(20),
    marginBottom: size.verticalScale(20),
    overflow: "hidden",
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  photoContainer: {
    position: "relative",
    width: "100%",
    height: size.verticalScale(280),
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  placeholderPhoto: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.lightWhite,
    justifyContent: "center",
    alignItems: "center",
  },
  compatibilityBadge: {
    position: "absolute",
    top: size.verticalScale(12),
    right: size.moderateScale(12),
    paddingHorizontal: size.moderateScale(12),
    paddingVertical: size.verticalScale(8),
    borderRadius: size.scale(12),
    alignItems: "center",
    minWidth: size.moderateScale(60),
  },
  compatibilityScore: {
    fontSize: fontSize.semiLarge,
    fontFamily: fonts.Bold,
    color: COLORS.white,
    lineHeight: size.verticalScale(20),
  },
  compatibilityLabel: {
    fontSize: fontSize.semiRegular,
    fontFamily: fonts.Medium,
    color: COLORS.white,
    marginTop: size.verticalScale(-2),
  },
  photoCountBadge: {
    position: "absolute",
    bottom: size.verticalScale(12),
    right: size.moderateScale(12),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: size.moderateScale(10),
    paddingVertical: size.verticalScale(6),
    borderRadius: size.scale(16),
    gap: size.moderateScale(4),
  },
  photoCountText: {
    fontSize: fontSize.semiRegular,
    fontFamily: fonts.Medium,
    color: COLORS.white,
  },
  detailsContainer: {
    padding: size.moderateScale(16),
    backgroundColor: COLORS.white,
  },
  nameRow: {
    marginBottom: size.verticalScale(12),
  },
  name: {
    fontSize: fontSize.extraLarge,
    fontFamily: fonts.Bold,
    color: COLORS.black,
  },
  matchReasonsContainer: {
    marginBottom: size.verticalScale(12),
    paddingTop: size.verticalScale(8),
    paddingBottom: size.verticalScale(8),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  matchReasonsTitle: {
    fontSize: fontSize.regular,
    fontFamily: fonts.Medium,
    color: COLORS.gray,
    marginBottom: size.verticalScale(8),
  },
  reasonItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: size.verticalScale(6),
  },
  reasonIcon: {
    marginRight: size.moderateScale(8),
  },
  reasonText: {
    flex: 1,
    fontSize: fontSize.regular,
    fontFamily: fonts.Regular,
    color: COLORS.black,
    lineHeight: size.verticalScale(20),
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    marginRight: size.moderateScale(8),
  },
  locationText: {
    flex: 1,
    fontSize: fontSize.regular,
    fontFamily: fonts.Regular,
    color: COLORS.lightGray,
  },
});


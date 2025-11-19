import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Match } from "../../components/MatchCard";
import { SkeletonEventDetails } from "../../components/Skeleton";
import { useToast } from "../../components/Toast";
import { COLORS } from "../../constants/colors";
import { fontSize } from "../../constants/fontSize";
import fonts from "../../constants/fonts";
import { getMatchById } from "../../data/mockMatches";
import { size } from "../../utils/size";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const MatchesDetailsScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { showSuccess, showError } = useToast();
  const [match, setMatch] = useState<Match | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isLiking, setIsLiking] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    loadMatch();
  }, [params.id]);

  const loadMatch = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const matchId = params.id as string;
      const matchData = getMatchById(matchId);

      if (matchData) {
        setMatch(matchData);
      } else {
        showError("Match not found");
        setMatch(null);
      }
    } catch (error) {
      console.error("Error loading match:", error);
      showError("Failed to load match details");
      setMatch(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / SCREEN_WIDTH);
    setCurrentPhotoIndex(index);
  };

  const handleLike = async () => {
    if (!match) return;

    setIsLiking(true);
    try {
      // TODO: Implement like API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      setMatch({
        ...match,
        isLiked: !match.isLiked,
      });
      showSuccess(match.isLiked ? "Removed from likes" : "Added to likes!");
    } catch (error) {
      showError("Failed to update like status");
    } finally {
      setIsLiking(false);
    }
  };

  const handleViewProfile = () => {
    // TODO: Navigate to profile screen
    showSuccess("Profile feature coming soon!");
  };

  const handleMessage = () => {
    // TODO: Navigate to message screen
    showSuccess("Messaging feature coming soon!");
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 80) return "#4CAF50"; // Green
    if (score >= 60) return "#FF9800"; // Orange
    return "#F44336"; // Red
  };

  if (isLoading) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <SkeletonEventDetails />
      </SafeAreaView>
    );
  }

  if (!match) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons
            name="alert-circle-outline"
            size={size.verticalScale(64)}
            color={COLORS.error}
          />
          <Text style={styles.errorTitle}>Match not found</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backIconButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons
            name="arrow-back"
            size={size.verticalScale(24)}
            color={COLORS.black}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Photo Gallery */}
        <View style={styles.photoGalleryContainer}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handlePhotoScroll}
            style={styles.photoScrollView}
          >
            {match.photos && match.photos.length > 0 ? (
              match.photos.map((photo, index) => (
                <Image
                  key={index}
                  source={typeof photo === "string" ? { uri: photo } : photo}
                  style={styles.photo}
                  resizeMode="cover"
                />
              ))
            ) : (
              <View style={styles.placeholderPhoto}>
                <Ionicons
                  name="person"
                  size={size.verticalScale(80)}
                  color={COLORS.lightGray}
                />
              </View>
            )}
          </ScrollView>

          {/* Photo Indicators */}
          {match.photos && match.photos.length > 1 && (
            <View style={styles.photoIndicators}>
              {match.photos.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicator,
                    currentPhotoIndex === index && styles.indicatorActive,
                  ]}
                />
              ))}
            </View>
          )}

          {/* Compatibility Score Badge - Top Right */}
          <View
            style={[
              styles.compatibilityBadge,
              {
                backgroundColor: getCompatibilityColor(
                  match.compatibilityScore
                ),
              },
            ]}
          >
            <Text style={styles.compatibilityScore}>
              {match.compatibilityScore}%
            </Text>
            <Text style={styles.compatibilityLabel}>Match</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Name, Age, Location */}
          <View style={styles.nameSection}>
            <Text style={styles.name}>
              {match.name}, {match.age}
            </Text>
            <View style={styles.locationRow}>
              <Ionicons
                name="location-outline"
                size={size.verticalScale(18)}
                color={COLORS.lightGray}
                style={styles.locationIcon}
              />
              <Text style={styles.locationText}>
                {match.distance.toFixed(1)} miles away
                {match.location && ` • ${match.location}`}
              </Text>
            </View>
          </View>

          {/* Compatibility Breakdown */}
          {match.compatibilityBreakdown && (
            <View style={styles.compatibilitySection}>
              <Text style={styles.sectionTitle}>Compatibility Breakdown</Text>

              {/* Overall Score */}
              <View style={styles.overallScoreContainer}>
                <Text style={styles.overallScoreLabel}>
                  Overall Compatibility
                </Text>
                <View
                  style={[
                    styles.overallScoreCircle,
                    {
                      borderColor: getCompatibilityColor(
                        match.compatibilityScore
                      ),
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.overallScoreValue,
                      {
                        color: getCompatibilityColor(match.compatibilityScore),
                      },
                    ]}
                  >
                    {match.compatibilityScore}%
                  </Text>
                </View>
              </View>

              {/* Breakdown Items */}
              <View style={styles.breakdownContainer}>
                <View style={styles.breakdownItem}>
                  <View style={styles.breakdownHeader}>
                    <Ionicons
                      name="heart"
                      size={size.verticalScale(20)}
                      color={COLORS.primaryButton}
                    />
                    <Text style={styles.breakdownLabel}>Interest Overlap</Text>
                  </View>
                  <View style={styles.breakdownBarContainer}>
                    <View
                      style={[
                        styles.breakdownBar,
                        {
                          width: `${match.compatibilityBreakdown.interestOverlap}%`,
                          backgroundColor: COLORS.primaryButton,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.breakdownValue}>
                    {match.compatibilityBreakdown.interestOverlap}%
                  </Text>
                </View>

                <View style={styles.breakdownItem}>
                  <View style={styles.breakdownHeader}>
                    <Ionicons
                      name="people"
                      size={size.verticalScale(20)}
                      color={COLORS.primaryButton}
                    />
                    <Text style={styles.breakdownLabel}>Social Proximity</Text>
                  </View>
                  <View style={styles.breakdownBarContainer}>
                    <View
                      style={[
                        styles.breakdownBar,
                        {
                          width: `${match.compatibilityBreakdown.socialProximity}%`,
                          backgroundColor: COLORS.primaryButton,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.breakdownValue}>
                    {match.compatibilityBreakdown.socialProximity}%
                  </Text>
                </View>

                {match.compatibilityBreakdown.trustBonus && (
                  <View style={styles.breakdownItem}>
                    <View style={styles.breakdownHeader}>
                      <Ionicons
                        name="shield-checkmark"
                        size={size.verticalScale(20)}
                        color="#4CAF50"
                      />
                      <Text style={styles.breakdownLabel}>Trust Bonus</Text>
                    </View>
                    <View style={styles.breakdownBarContainer}>
                      <View
                        style={[
                          styles.breakdownBar,
                          {
                            width: `${match.compatibilityBreakdown.trustBonus}%`,
                            backgroundColor: "#4CAF50",
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.breakdownValue}>
                      +{match.compatibilityBreakdown.trustBonus}%
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Why You Matched */}
          {match.matchReasons && match.matchReasons.length > 0 && (
            <View style={styles.matchReasonsSection}>
              <Text style={styles.sectionTitle}>Why you matched</Text>
              {match.matchReasons.map((reason, index) => (
                <View key={index} style={styles.reasonItem}>
                  <Ionicons
                    name="checkmark-circle"
                    size={size.verticalScale(20)}
                    color={COLORS.primaryButton}
                    style={styles.reasonIcon}
                  />
                  <Text style={styles.reasonText}>{reason}</Text>
                </View>
              ))}
            </View>
          )}

          {/* What's Different */}
          {match.nonMatchReasons && match.nonMatchReasons.length > 0 && (
            <View style={styles.differencesSection}>
              <Text style={styles.sectionTitle}>What's different</Text>
              {match.nonMatchReasons.map((reason, index) => (
                <View key={index} style={styles.differenceItem}>
                  <Ionicons
                    name="information-circle-outline"
                    size={size.verticalScale(20)}
                    color={COLORS.lightGray}
                    style={styles.differenceIcon}
                  />
                  <Text style={styles.differenceText}>{reason}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
        {/* Bottom Action Bar */}
        <View
          style={[
            styles.bottomBar,
            {
              paddingBottom:
                Platform.OS === "android"
                  ? insets.bottom + size.verticalScale(16)
                  : size.verticalScale(16),
            },
          ]}
        >
          {!match.isMutualMatch ? (
            // Not a mutual match - show Like button
            <TouchableOpacity
              style={[
                styles.likeButton,
                match.isLiked && styles.likeButtonLiked,
                isLiking && styles.likeButtonDisabled,
              ]}
              onPress={handleLike}
              disabled={isLiking}
              activeOpacity={0.8}
            >
              {isLiking ? (
                <ActivityIndicator size="small" color={COLORS.white} />
              ) : (
                <>
                  <Ionicons
                    name={match.isLiked ? "heart" : "heart-outline"}
                    size={size.verticalScale(20)}
                    color={COLORS.white}
                  />
                  <Text style={styles.likeButtonText}>
                    {match.isLiked ? "Liked" : "Like"}
                  </Text>
                </>
              )}
            </TouchableOpacity>
          ) : (
            // Mutual match - show View Profile and Message buttons
            <View style={styles.mutualMatchButtons}>
              <TouchableOpacity
                style={styles.viewProfileButton}
                onPress={handleViewProfile}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="person-outline"
                  size={size.verticalScale(20)}
                  color={COLORS.primaryButton}
                />
                <Text style={styles.viewProfileButtonText}>View Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.messageButton}
                onPress={handleMessage}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="chatbubble-outline"
                  size={size.verticalScale(20)}
                  color={COLORS.white}
                />
                <Text style={styles.messageButtonText}>Message</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    overflow: "visible",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: size.moderateScale(20),
  },
  errorTitle: {
    fontSize: fontSize.semiLarge,
    fontFamily: fonts.Bold,
    color: COLORS.black,
    marginTop: size.verticalScale(16),
    marginBottom: size.verticalScale(24),
  },
  backButton: {
    backgroundColor: COLORS.primaryButton,
    paddingHorizontal: size.moderateScale(24),
    paddingVertical: size.verticalScale(12),
    borderRadius: size.scale(12),
  },
  backButtonText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Medium,
    color: COLORS.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: size.moderateScale(20),
    paddingVertical: size.verticalScale(12),
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backIconButton: {
    width: size.moderateScale(40),
    height: size.moderateScale(40),
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
    marginBottom: 0,
  },
  photoGalleryContainer: {
    position: "relative",
    width: "100%",
    height: size.verticalScale(400),
  },
  photoScrollView: {
    width: SCREEN_WIDTH,
    height: size.verticalScale(400),
  },
  photo: {
    width: SCREEN_WIDTH,
    height: size.verticalScale(400),
  },
  placeholderPhoto: {
    width: SCREEN_WIDTH,
    height: size.verticalScale(400),
    backgroundColor: COLORS.lightWhite,
    justifyContent: "center",
    alignItems: "center",
  },
  photoIndicators: {
    position: "absolute",
    bottom: size.verticalScale(16),
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: size.moderateScale(6),
  },
  indicator: {
    width: size.moderateScale(8),
    height: size.moderateScale(8),
    borderRadius: size.scale(4),
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  indicatorActive: {
    backgroundColor: COLORS.white,
    width: size.moderateScale(24),
  },
  compatibilityBadge: {
    position: "absolute",
    top: size.verticalScale(16),
    right: size.moderateScale(16),
    paddingHorizontal: size.moderateScale(16),
    paddingVertical: size.verticalScale(12),
    borderRadius: size.scale(16),
    alignItems: "center",
    minWidth: size.moderateScale(70),
  },
  compatibilityScore: {
    fontSize: fontSize.extraLarge,
    fontFamily: fonts.Bold,
    color: COLORS.white,
    lineHeight: size.verticalScale(28),
  },
  compatibilityLabel: {
    fontSize: fontSize.regular,
    fontFamily: fonts.Medium,
    color: COLORS.white,
    marginTop: size.verticalScale(-2),
  },
  content: {
    padding: size.moderateScale(20),
  },
  nameSection: {
    marginBottom: size.verticalScale(24),
  },
  name: {
    fontSize: fontSize.extraLarge,
    fontFamily: fonts.Bold,
    color: COLORS.black,
    marginBottom: size.verticalScale(8),
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    marginRight: size.moderateScale(8),
  },
  locationText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Regular,
    color: COLORS.lightGray,
  },
  compatibilitySection: {
    marginBottom: size.verticalScale(24),
    paddingBottom: size.verticalScale(20),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: fontSize.semiLarge,
    fontFamily: fonts.Bold,
    color: COLORS.black,
    marginBottom: size.verticalScale(16),
  },
  overallScoreContainer: {
    alignItems: "center",
    marginBottom: size.verticalScale(24),
    paddingVertical: size.verticalScale(20),
    backgroundColor: COLORS.lightBlue,
    borderRadius: size.scale(16),
  },
  overallScoreLabel: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Medium,
    color: COLORS.gray,
    marginBottom: size.verticalScale(12),
  },
  overallScoreCircle: {
    width: size.moderateScale(120),
    height: size.moderateScale(120),
    borderRadius: size.scale(60),
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  overallScoreValue: {
    fontSize: fontSize.extraExtraHuge,
    fontFamily: fonts.Bold,
  },
  breakdownContainer: {
    gap: size.verticalScale(16),
  },
  breakdownItem: {
    marginBottom: size.verticalScale(8),
  },
  breakdownHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: size.verticalScale(8),
    gap: size.moderateScale(8),
  },
  breakdownLabel: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Medium,
    color: COLORS.black,
  },
  breakdownBarContainer: {
    height: size.verticalScale(8),
    backgroundColor: COLORS.lightWhite,
    borderRadius: size.scale(4),
    marginBottom: size.verticalScale(4),
    overflow: "hidden",
  },
  breakdownBar: {
    height: "100%",
    borderRadius: size.scale(4),
  },
  breakdownValue: {
    fontSize: fontSize.regular,
    fontFamily: fonts.Bold,
    color: COLORS.primaryButton,
  },
  matchReasonsSection: {
    marginBottom: size.verticalScale(24),
    paddingBottom: size.verticalScale(20),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  reasonItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: size.verticalScale(12),
  },
  reasonIcon: {
    marginRight: size.moderateScale(12),
    marginTop: size.verticalScale(2),
  },
  reasonText: {
    flex: 1,
    fontSize: fontSize.medium,
    fontFamily: fonts.Regular,
    color: COLORS.black,
    lineHeight: size.verticalScale(22),
  },
  differencesSection: {
    marginBottom: size.verticalScale(24),
  },
  differenceItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: size.verticalScale(12),
    padding: size.moderateScale(12),
    backgroundColor: COLORS.lightWhite,
    borderRadius: size.scale(12),
  },
  differenceIcon: {
    marginRight: size.moderateScale(12),
    marginTop: size.verticalScale(2),
  },
  differenceText: {
    flex: 1,
    fontSize: fontSize.medium,
    fontFamily: fonts.Regular,
    color: COLORS.gray,
    lineHeight: size.verticalScale(22),
  },
  bottomSpacer: {
    height: size.verticalScale(20),
  },
  bottomBar: {
    paddingHorizontal: size.moderateScale(20),
    paddingTop: size.verticalScale(16),
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 10,
  },
  likeButton: {
    backgroundColor: COLORS.primaryButton,
    paddingVertical: size.verticalScale(16),
    borderRadius: size.scale(12),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: size.moderateScale(8),
  },
  likeButtonLiked: {
    backgroundColor: "#4CAF50",
  },
  likeButtonDisabled: {
    opacity: 0.6,
  },
  likeButtonText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Bold,
    color: COLORS.white,
  },
  mutualMatchButtons: {
    flexDirection: "row",
    gap: size.moderateScale(12),
  },
  viewProfileButton: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: size.verticalScale(16),
    borderRadius: size.scale(12),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: size.moderateScale(8),
    borderWidth: 1,
    borderColor: COLORS.primaryButton,
  },
  viewProfileButtonText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Bold,
    color: COLORS.primaryButton,
  },
  messageButton: {
    flex: 1,
    backgroundColor: COLORS.primaryButton,
    paddingVertical: size.verticalScale(16),
    borderRadius: size.scale(12),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: size.moderateScale(8),
  },
  messageButtonText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Bold,
    color: COLORS.white,
  },
});

export default MatchesDetailsScreen;

import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View, ViewStyle } from "react-native";
import { COLORS } from "../../constants/colors";
import { size } from "../../utils/size";

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = 20,
  borderRadius = 8,
  style,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius: size.scale(borderRadius),
          backgroundColor: COLORS.border,
          opacity,
        },
        style,
      ]}
    />
  );
};

interface SkeletonEventCardProps {
  style?: ViewStyle;
}

export const SkeletonEventCard: React.FC<SkeletonEventCardProps> = ({
  style,
}) => {
  return (
    <View style={[styles.cardContainer, style]}>
      {/* Image Skeleton */}
      <Skeleton
        width="100%"
        height={size.verticalScale(200)}
        borderRadius={0}
        style={styles.imageSkeleton}
      />

      {/* Content Skeleton */}
      <View style={styles.contentContainer}>
        {/* Title */}
        <Skeleton
          width="80%"
          height={size.verticalScale(20)}
          borderRadius={4}
          style={styles.titleSkeleton}
        />

        {/* Description */}
        <Skeleton
          width="100%"
          height={size.verticalScale(16)}
          borderRadius={4}
          style={styles.descriptionSkeleton}
        />
        <Skeleton
          width="70%"
          height={size.verticalScale(16)}
          borderRadius={4}
          style={styles.descriptionSkeleton}
        />

        {/* Info Rows */}
        <Skeleton
          width="60%"
          height={size.verticalScale(14)}
          borderRadius={4}
          style={styles.infoSkeleton}
        />
        <Skeleton
          width="50%"
          height={size.verticalScale(14)}
          borderRadius={4}
          style={styles.infoSkeleton}
        />

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <Skeleton
            width="48%"
            height={size.verticalScale(44)}
            borderRadius={12}
          />
          <Skeleton
            width="48%"
            height={size.verticalScale(44)}
            borderRadius={12}
          />
        </View>
      </View>
    </View>
  );
};

interface SkeletonEventDetailsProps {
  style?: ViewStyle;
}

export const SkeletonEventDetails: React.FC<SkeletonEventDetailsProps> = ({
  style,
}) => {
  return (
    <View style={[styles.detailsContainer, style]}>
      {/* Header Skeleton */}
      <View style={styles.headerSkeleton}>
        <Skeleton width={40} height={40} borderRadius={20} />
        <Skeleton width={40} height={40} borderRadius={20} />
      </View>

      {/* Cover Image Skeleton */}
      <Skeleton
        width="100%"
        height={size.verticalScale(300)}
        borderRadius={0}
      />

      {/* Content Skeleton */}
      <View style={styles.detailsContent}>
        {/* Title */}
        <Skeleton
          width="90%"
          height={size.verticalScale(28)}
          borderRadius={4}
          style={styles.titleSkeleton}
        />

        {/* RSVP Badge */}
        <Skeleton
          width={120}
          height={size.verticalScale(32)}
          borderRadius={20}
          style={styles.badgeSkeleton}
        />

        {/* Price */}
        <Skeleton
          width={100}
          height={size.verticalScale(20)}
          borderRadius={4}
          style={styles.priceSkeleton}
        />

        {/* Info Sections */}
        {[1, 2, 3].map((item) => (
          <View key={item} style={styles.infoSectionSkeleton}>
            <Skeleton width={22} height={22} borderRadius={11} />
            <View style={styles.infoTextSkeleton}>
              <Skeleton
                width={80}
                height={size.verticalScale(14)}
                borderRadius={4}
                style={styles.infoLabelSkeleton}
              />
              <Skeleton
                width="100%"
                height={size.verticalScale(16)}
                borderRadius={4}
                style={styles.infoTextLineSkeleton}
              />
              <Skeleton
                width="70%"
                height={size.verticalScale(16)}
                borderRadius={4}
                style={styles.infoTextLineSkeleton}
              />
            </View>
          </View>
        ))}

        {/* Description Section */}
        <View style={styles.descriptionSectionSkeleton}>
          <Skeleton
            width={150}
            height={size.verticalScale(20)}
            borderRadius={4}
            style={styles.sectionTitleSkeleton}
          />
          <Skeleton
            width="100%"
            height={size.verticalScale(16)}
            borderRadius={4}
            style={styles.descriptionLineSkeleton}
          />
          <Skeleton
            width="100%"
            height={size.verticalScale(16)}
            borderRadius={4}
            style={styles.descriptionLineSkeleton}
          />
          <Skeleton
            width="85%"
            height={size.verticalScale(16)}
            borderRadius={4}
            style={styles.descriptionLineSkeleton}
          />
        </View>

        {/* Interests Tags */}
        <View style={styles.tagsSkeleton}>
          <Skeleton
            width={100}
            height={size.verticalScale(20)}
            borderRadius={4}
            style={styles.sectionTitleSkeleton}
          />
          <View style={styles.tagsContainerSkeleton}>
            {[1, 2, 3, 4].map((tag) => (
              <Skeleton
                key={tag}
                width={80}
                height={size.verticalScale(28)}
                borderRadius={16}
              />
            ))}
          </View>
        </View>
      </View>

      {/* Bottom Button Skeleton */}
      <View style={styles.bottomButtonSkeleton}>
        <Skeleton
          width="100%"
          height={size.verticalScale(56)}
          borderRadius={12}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.lightWhite,
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
  },
  imageSkeleton: {
    marginBottom: 0,
  },
  contentContainer: {
    padding: size.moderateScale(16),
    backgroundColor: COLORS.lightWhite,
  },
  titleSkeleton: {
    marginBottom: size.verticalScale(6),
  },
  descriptionSkeleton: {
    marginBottom: size.verticalScale(6),
  },
  infoSkeleton: {
    marginBottom: size.verticalScale(8),
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: size.verticalScale(8),
    gap: size.moderateScale(12),
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerSkeleton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: size.moderateScale(20),
    paddingVertical: size.verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  detailsContent: {
    padding: size.moderateScale(20),
  },
  badgeSkeleton: {
    marginTop: size.verticalScale(12),
    marginBottom: size.verticalScale(16),
  },
  priceSkeleton: {
    marginBottom: size.verticalScale(20),
  },
  infoSectionSkeleton: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: size.verticalScale(24),
    paddingBottom: size.verticalScale(20),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoTextSkeleton: {
    flex: 1,
    marginLeft: size.moderateScale(16),
  },
  infoLabelSkeleton: {
    marginBottom: size.verticalScale(4),
  },
  infoTextLineSkeleton: {
    marginBottom: size.verticalScale(4),
  },
  descriptionSectionSkeleton: {
    marginBottom: size.verticalScale(24),
  },
  sectionTitleSkeleton: {
    marginBottom: size.verticalScale(12),
  },
  descriptionLineSkeleton: {
    marginBottom: size.verticalScale(8),
  },
  tagsSkeleton: {
    marginBottom: size.verticalScale(24),
  },
  tagsContainerSkeleton: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: size.moderateScale(8),
  },
  bottomButtonSkeleton: {
    paddingHorizontal: size.moderateScale(20),
    paddingVertical: size.verticalScale(16),
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  matchCardContainer: {
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
  matchImageSkeleton: {
    marginBottom: 0,
  },
  matchContentContainer: {
    padding: size.moderateScale(16),
    backgroundColor: COLORS.white,
  },
  matchTitleSkeleton: {
    marginBottom: size.verticalScale(12),
  },
  matchReasonsSkeleton: {
    marginBottom: size.verticalScale(12),
    paddingTop: size.verticalScale(8),
    paddingBottom: size.verticalScale(8),
  },
  matchReasonsTitleSkeleton: {
    marginBottom: size.verticalScale(8),
  },
  matchReasonItemSkeleton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: size.verticalScale(6),
    gap: size.moderateScale(8),
  },
  matchReasonTextSkeleton: {
    flex: 1,
  },
  matchLocationSkeleton: {
    marginTop: size.verticalScale(4),
  },
});

interface SkeletonProfileProps {
  style?: ViewStyle;
}

export const SkeletonProfile: React.FC<SkeletonProfileProps> = ({ style }) => {
  return (
    <View style={[profileStyles.profileContainer, style]}>
      {/* Header Skeleton */}
      <View style={profileStyles.profileHeaderSkeleton}>
        <Skeleton
          width="40%"
          height={size.verticalScale(32)}
          borderRadius={4}
        />
      </View>

      {/* Photos Section Skeleton */}
      <View style={profileStyles.profileSectionSkeleton}>
        <View style={profileStyles.profileSectionHeaderSkeleton}>
          <Skeleton width={80} height={size.verticalScale(20)} borderRadius={4} />
          <Skeleton width={50} height={size.verticalScale(18)} borderRadius={4} />
        </View>
        <View style={profileStyles.profilePhotosSkeleton}>
          {[1, 2, 3].map((item) => (
            <Skeleton
              key={item}
              width={size.moderateScale(120)}
              height={size.verticalScale(160)}
              borderRadius={12}
            />
          ))}
        </View>
      </View>

      {/* Basic Info Section Skeleton */}
      <View style={profileStyles.profileSectionSkeleton}>
        <View style={profileStyles.profileSectionHeaderSkeleton}>
          <Skeleton width={150} height={size.verticalScale(20)} borderRadius={4} />
          <Skeleton width={50} height={size.verticalScale(18)} borderRadius={4} />
        </View>
        <View style={profileStyles.profileInfoSkeleton}>
          {[1, 2].map((item) => (
            <View key={item} style={profileStyles.profileInfoRowSkeleton}>
              <Skeleton width={20} height={20} borderRadius={10} />
              <View style={profileStyles.profileInfoContentSkeleton}>
                <Skeleton
                  width={60}
                  height={size.verticalScale(14)}
                  borderRadius={4}
                  style={profileStyles.profileInfoLabelSkeleton}
                />
                <Skeleton
                  width="80%"
                  height={size.verticalScale(18)}
                  borderRadius={4}
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Onboarding Status Skeleton */}
      <View style={profileStyles.profileSectionSkeleton}>
        <Skeleton width={150} height={size.verticalScale(20)} borderRadius={4} />
        <View style={profileStyles.profileProgressSkeleton}>
          <Skeleton
            width="60%"
            height={size.verticalScale(16)}
            borderRadius={4}
            style={profileStyles.profileProgressTextSkeleton}
          />
          <Skeleton
            width="100%"
            height={size.verticalScale(8)}
            borderRadius={4}
          />
        </View>
      </View>

      {/* Trust Score Skeleton */}
      <View style={profileStyles.profileSectionSkeleton}>
        <Skeleton width={120} height={size.verticalScale(20)} borderRadius={4} />
        <View style={profileStyles.profileTrustSkeleton}>
          <Skeleton
            width={size.moderateScale(100)}
            height={size.moderateScale(100)}
            borderRadius={50}
          />
          <View style={profileStyles.profileTrustContentSkeleton}>
            <Skeleton
              width={100}
              height={size.verticalScale(24)}
              borderRadius={16}
            />
            <Skeleton
              width="100%"
              height={size.verticalScale(16)}
              borderRadius={4}
              style={profileStyles.profileTrustDescriptionSkeleton}
            />
            <Skeleton
              width="90%"
              height={size.verticalScale(16)}
              borderRadius={4}
            />
          </View>
        </View>
      </View>

      {/* Settings Section Skeleton */}
      <View style={profileStyles.profileSectionSkeleton}>
        <Skeleton width={100} height={size.verticalScale(20)} borderRadius={4} />
        {[1, 2, 3, 4].map((item) => (
          <View key={item} style={profileStyles.profileSettingItemSkeleton}>
            <View style={profileStyles.profileSettingLeftSkeleton}>
              <Skeleton width={22} height={22} borderRadius={11} />
              <Skeleton
                width={150}
                height={size.verticalScale(18)}
                borderRadius={4}
              />
            </View>
            <Skeleton width={50} height={30} borderRadius={15} />
          </View>
        ))}
      </View>
    </View>
  );
};

const profileStyles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  profileHeaderSkeleton: {
    paddingHorizontal: size.moderateScale(20),
    paddingVertical: size.verticalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  profileSectionSkeleton: {
    paddingHorizontal: size.moderateScale(20),
    paddingVertical: size.verticalScale(20),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  profileSectionHeaderSkeleton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: size.verticalScale(16),
  },
  profilePhotosSkeleton: {
    flexDirection: "row",
    gap: size.moderateScale(12),
  },
  profileInfoSkeleton: {
    gap: size.verticalScale(16),
  },
  profileInfoRowSkeleton: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileInfoContentSkeleton: {
    flex: 1,
    marginLeft: size.moderateScale(12),
  },
  profileInfoLabelSkeleton: {
    marginBottom: size.verticalScale(4),
  },
  profileProgressSkeleton: {
    gap: size.verticalScale(12),
  },
  profileProgressTextSkeleton: {
    marginBottom: size.verticalScale(4),
  },
  profileTrustSkeleton: {
    flexDirection: "row",
    gap: size.moderateScale(20),
    alignItems: "center",
  },
  profileTrustContentSkeleton: {
    flex: 1,
    gap: size.verticalScale(8),
  },
  profileTrustDescriptionSkeleton: {
    marginTop: size.verticalScale(4),
  },
  profileSettingItemSkeleton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: size.verticalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  profileSettingLeftSkeleton: {
    flexDirection: "row",
    alignItems: "center",
    gap: size.moderateScale(12),
    flex: 1,
  },
});

interface SkeletonMatchCardProps {
  style?: ViewStyle;
}

export const SkeletonMatchCard: React.FC<SkeletonMatchCardProps> = ({
  style,
}) => {
  return (
    <View style={[styles.matchCardContainer, style]}>
      {/* Photo Skeleton */}
      <Skeleton
        width="100%"
        height={size.verticalScale(280)}
        borderRadius={0}
        style={styles.matchImageSkeleton}
      />

      {/* Content Skeleton */}
      <View style={styles.matchContentContainer}>
        {/* Name and Age */}
        <Skeleton
          width="60%"
          height={size.verticalScale(24)}
          borderRadius={4}
          style={styles.matchTitleSkeleton}
        />

        {/* Match Reasons Section */}
        <View style={styles.matchReasonsSkeleton}>
          <Skeleton
            width="50%"
            height={size.verticalScale(16)}
            borderRadius={4}
            style={styles.matchReasonsTitleSkeleton}
          />
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.matchReasonItemSkeleton}>
              <Skeleton width={14} height={14} borderRadius={7} />
              <Skeleton
                width="80%"
                height={size.verticalScale(16)}
                borderRadius={4}
                style={styles.matchReasonTextSkeleton}
              />
            </View>
          ))}
        </View>

        {/* Location */}
        <Skeleton
          width="40%"
          height={size.verticalScale(16)}
          borderRadius={4}
          style={styles.matchLocationSkeleton}
        />
      </View>
    </View>
  );
};



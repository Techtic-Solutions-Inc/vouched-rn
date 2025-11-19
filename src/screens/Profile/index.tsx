import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SkeletonProfile } from "../../components/Skeleton";
import { useToast } from "../../components/Toast";
import { COLORS } from "../../constants/colors";
import { fontSize } from "../../constants/fontSize";
import fonts from "../../constants/fonts";
import { isGuestMode } from "../../utils/auth";
import { size } from "../../utils/size";

interface UserProfile {
  name: string;
  age: number;
  location: string;
  photos: string[];
  trustScore: number;
  trustLevel: string;
  onboardingComplete: number; // 0-100 percentage
}

const MOCK_PROFILE: UserProfile = {
  name: "John Doe",
  age: 28,
  location: "San Francisco, CA",
  photos: [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60",
  ],
  trustScore: 85,
  trustLevel: "Verified",
  onboardingComplete: 75,
};

const ProfileMainScreen = () => {
  const router = useRouter();
  const { signOut, userId, isSignedIn } = useAuth();
  const insets = useSafeAreaInsets();
  const { showSuccess, showError } = useToast();
  const [profile, setProfile] = useState<UserProfile>(MOCK_PROFILE);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [checkingGuest, setCheckingGuest] = useState(true);

  const checkGuestStatus = useCallback(async () => {
    try {
      const guest = await isGuestMode();
      setIsGuest(guest);
      if (guest) {
        setShowGuestModal(true);
      }
      setCheckingGuest(false);
    } catch (error) {
      console.error("Error checking guest mode:", error);
      setCheckingGuest(false);
    }
  }, []);

  // Check guest status on mount
  useEffect(() => {
    checkGuestStatus();
  }, [checkGuestStatus]);

  // Check guest status every time screen is focused
  useFocusEffect(
    useCallback(() => {
      checkGuestStatus();
    }, [checkGuestStatus])
  );

  const handleSignUp = () => {
    setShowGuestModal(false);
    router.push("/Auth/signUp");
  };

  const handleCancel = () => {
    setShowGuestModal(false);
    router.back();
  };

  const getTrustLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "verified":
        return "#4CAF50";
      case "trusted":
        return "#2196F3";
      case "new":
        return "#FF9800";
      default:
        return COLORS.primaryButton;
    }
  };

  const handleEditPhotos = () => {
    // TODO: Implement photo editing
    showSuccess("Photo editing coming soon!");
  };

  const handleEditProfile = () => {
    // TODO: Navigate to edit profile screen
    showSuccess("Edit profile coming soon!");
  };

  const handleNotificationToggle = (value: boolean) => {
    setNotificationsEnabled(value);
    showSuccess(value ? "Notifications enabled" : "Notifications disabled");
  };

  const handlePrivacyToggle = (value: boolean) => {
    setPrivacyMode(value);
    showSuccess(value ? "Privacy mode enabled" : "Privacy mode disabled");
  };

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut();
            router.dismissTo("/Auth/signUp");
          } catch (error) {
            console.error("Error signing out:", error);
            showError("Failed to log out");
          }
        },
      },
    ]);
  };

  if (checkingGuest) {
    return null;
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
      {/* Guest Access Modal */}
      <Modal
        visible={showGuestModal}
        transparent
        animationType="fade"
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIconContainer}>
              <Ionicons
                name="lock-closed"
                size={size.verticalScale(64)}
                color={COLORS.primaryButton}
              />
            </View>
            <Text style={styles.modalTitle}>Guest Access Restricted</Text>
            <Text style={styles.modalMessage}>
              Profile access is not available for guest users. Please sign in to
              access your profile and manage your account settings.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleCancel}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.signUpButton]}
                onPress={handleSignUp}
                activeOpacity={0.8}
              >
                <Text style={styles.signUpButtonText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Show skeleton when guest modal is open, otherwise show profile content */}
      {showGuestModal ? (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingBottom:
                size.verticalScale(20) +
                insets.bottom +
                (Platform.OS === "android" ? size.verticalScale(20) : 0) +
                size.verticalScale(60), // Tab bar height
            },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <SkeletonProfile />
        </ScrollView>
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingBottom:
                size.verticalScale(20) +
                insets.bottom +
                (Platform.OS === "android" ? size.verticalScale(20) : 0) +
                size.verticalScale(60), // Tab bar height
            },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Profile</Text>
          </View>

          {/* User Photos Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Photos</Text>
              <TouchableOpacity
                onPress={handleEditPhotos}
                style={styles.editButton}
              >
                <Ionicons
                  name="pencil-outline"
                  size={size.verticalScale(18)}
                  color={COLORS.primaryButton}
                />
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.photosContainer}
            >
              {profile.photos.map((photo, index) => (
                <View key={index} style={styles.photoWrapper}>
                  <Image source={{ uri: photo }} style={styles.photo} />
                  {index === 0 && (
                    <View style={styles.primaryBadge}>
                      <Text style={styles.primaryBadgeText}>Primary</Text>
                    </View>
                  )}
                </View>
              ))}
              <TouchableOpacity
                style={styles.addPhotoButton}
                onPress={handleEditPhotos}
              >
                <Ionicons
                  name="add"
                  size={size.verticalScale(32)}
                  color={COLORS.lightGray}
                />
                <Text style={styles.addPhotoText}>Add Photo</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Basic Info Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Basic Information</Text>
              <TouchableOpacity
                onPress={handleEditProfile}
                style={styles.editButton}
              >
                <Ionicons
                  name="pencil-outline"
                  size={size.verticalScale(18)}
                  color={COLORS.primaryButton}
                />
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.infoRow}>
                <Ionicons
                  name="person-outline"
                  size={size.verticalScale(20)}
                  color={COLORS.lightGray}
                  style={styles.infoIcon}
                />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Name</Text>
                  <Text style={styles.infoValue}>
                    {profile.name}, {profile.age}
                  </Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <Ionicons
                  name="location-outline"
                  size={size.verticalScale(20)}
                  color={COLORS.lightGray}
                  style={styles.infoIcon}
                />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Location</Text>
                  <Text style={styles.infoValue}>{profile.location}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Onboarding Status Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Onboarding Status</Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressText}>
                  {profile.onboardingComplete}% Complete
                </Text>
                <Text style={styles.progressSubtext}>
                  {profile.onboardingComplete < 100
                    ? "Complete your profile to get better matches"
                    : "Profile complete!"}
                </Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${profile.onboardingComplete}%`,
                      backgroundColor: COLORS.primaryButton,
                    },
                  ]}
                />
              </View>
            </View>
          </View>

          {/* Trust Score Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trust Score</Text>
            <View style={styles.trustContainer}>
              <View style={styles.trustScoreCircle}>
                <Text style={styles.trustScoreValue}>{profile.trustScore}</Text>
                <Text style={styles.trustScoreLabel}>Score</Text>
              </View>
              <View style={styles.trustLevelContainer}>
                <View
                  style={[
                    styles.trustLevelBadge,
                    {
                      backgroundColor: getTrustLevelColor(profile.trustLevel),
                    },
                  ]}
                >
                  <Ionicons
                    name="shield-checkmark"
                    size={size.verticalScale(16)}
                    color={COLORS.white}
                  />
                  <Text style={styles.trustLevelText}>
                    {profile.trustLevel}
                  </Text>
                </View>
                <Text style={styles.trustDescription}>
                  Your trust score is based on profile completeness,
                  verification, and community interactions.
                </Text>
              </View>
            </View>
          </View>

          {/* Settings Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Settings</Text>

            {/* Edit Profile */}
            <TouchableOpacity
              style={styles.settingItem}
              onPress={handleEditProfile}
            >
              <View style={styles.settingLeft}>
                <Ionicons
                  name="create-outline"
                  size={size.verticalScale(22)}
                  color={COLORS.primaryButton}
                />
                <Text style={styles.settingText}>Edit Profile</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={size.verticalScale(20)}
                color={COLORS.lightGray}
              />
            </TouchableOpacity>

            {/* Notification Preferences */}
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Ionicons
                  name="notifications-outline"
                  size={size.verticalScale(22)}
                  color={COLORS.primaryButton}
                />
                <Text style={styles.settingText}>Notification Preferences</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={handleNotificationToggle}
                trackColor={{
                  false: COLORS.border,
                  true: COLORS.primaryButton,
                }}
                thumbColor={COLORS.white}
              />
            </View>

            {/* Privacy Settings */}
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Ionicons
                  name="lock-closed-outline"
                  size={size.verticalScale(22)}
                  color={COLORS.primaryButton}
                />
                <Text style={styles.settingText}>Privacy Settings</Text>
              </View>
              <Switch
                value={privacyMode}
                onValueChange={handlePrivacyToggle}
                trackColor={{
                  false: COLORS.border,
                  true: COLORS.primaryButton,
                }}
                thumbColor={COLORS.white}
              />
            </View>

            {/* Log Out */}
            <TouchableOpacity
              style={[styles.settingItem, styles.logoutItem]}
              onPress={handleLogout}
            >
              <View style={styles.settingLeft}>
                <Ionicons
                  name="log-out-outline"
                  size={size.verticalScale(22)}
                  color={COLORS.error}
                />
                <Text style={[styles.settingText, styles.logoutText]}>
                  Log Out
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={size.verticalScale(20)}
                color={COLORS.lightGray}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: size.verticalScale(20),
  },
  header: {
    paddingHorizontal: size.moderateScale(20),
    paddingVertical: size.verticalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: fontSize.extraExtraExtraHuge,
    fontFamily: fonts.Bold,
    color: COLORS.black,
  },
  section: {
    paddingHorizontal: size.moderateScale(20),
    paddingVertical: size.verticalScale(20),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: size.verticalScale(16),
  },
  sectionTitle: {
    fontSize: fontSize.semiLarge,
    fontFamily: fonts.Bold,
    color: COLORS.black,
    marginBottom: size.verticalScale(16),
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: size.moderateScale(4),
  },
  editButtonText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Medium,
    color: COLORS.primaryButton,
  },
  photosContainer: {
    gap: size.moderateScale(12),
    paddingRight: size.moderateScale(20),
  },
  photoWrapper: {
    position: "relative",
    marginRight: size.moderateScale(12),
  },
  photo: {
    width: size.moderateScale(120),
    height: size.verticalScale(160),
    borderRadius: size.scale(12),
    backgroundColor: COLORS.lightWhite,
  },
  primaryBadge: {
    position: "absolute",
    top: size.verticalScale(8),
    left: size.moderateScale(8),
    backgroundColor: COLORS.primaryButton,
    paddingHorizontal: size.moderateScale(8),
    paddingVertical: size.verticalScale(4),
    borderRadius: size.scale(12),
  },
  primaryBadgeText: {
    fontSize: fontSize.regular,
    fontFamily: fonts.Medium,
    color: COLORS.white,
  },
  addPhotoButton: {
    width: size.moderateScale(120),
    height: size.verticalScale(160),
    borderRadius: size.scale(12),
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightWhite,
  },
  addPhotoText: {
    fontSize: fontSize.regular,
    fontFamily: fonts.Medium,
    color: COLORS.lightGray,
    marginTop: size.verticalScale(8),
  },
  infoContainer: {
    gap: size.verticalScale(16),
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoIcon: {
    marginRight: size.moderateScale(12),
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: fontSize.regular,
    fontFamily: fonts.Regular,
    color: COLORS.lightGray,
    marginBottom: size.verticalScale(4),
  },
  infoValue: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Medium,
    color: COLORS.black,
  },
  progressContainer: {
    gap: size.verticalScale(12),
  },
  progressHeader: {
    gap: size.verticalScale(4),
  },
  progressText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Bold,
    color: COLORS.black,
  },
  progressSubtext: {
    fontSize: fontSize.regular,
    fontFamily: fonts.Regular,
    color: COLORS.lightGray,
  },
  progressBarContainer: {
    height: size.verticalScale(8),
    backgroundColor: COLORS.lightWhite,
    borderRadius: size.scale(4),
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: size.scale(4),
  },
  trustContainer: {
    flexDirection: "row",
    gap: size.moderateScale(20),
    alignItems: "center",
  },
  trustScoreCircle: {
    width: size.moderateScale(100),
    height: size.moderateScale(100),
    borderRadius: size.scale(50),
    backgroundColor: COLORS.lightBlue,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: COLORS.primaryButton,
  },
  trustScoreValue: {
    fontSize: fontSize.extraExtraHuge,
    fontFamily: fonts.Bold,
    color: COLORS.primaryButton,
  },
  trustScoreLabel: {
    fontSize: fontSize.regular,
    fontFamily: fonts.Medium,
    color: COLORS.gray,
    marginTop: size.verticalScale(-4),
  },
  trustLevelContainer: {
    flex: 1,
    gap: size.verticalScale(8),
  },
  trustLevelBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: size.moderateScale(12),
    paddingVertical: size.verticalScale(6),
    borderRadius: size.scale(16),
    gap: size.moderateScale(6),
  },
  trustLevelText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Bold,
    color: COLORS.white,
  },
  trustDescription: {
    fontSize: fontSize.regular,
    fontFamily: fonts.Regular,
    color: COLORS.lightGray,
    lineHeight: size.verticalScale(20),
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: size.verticalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  logoutItem: {
    borderBottomWidth: 0,
    marginTop: size.verticalScale(8),
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: size.moderateScale(12),
    flex: 1,
  },
  settingText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Medium,
    color: COLORS.black,
  },
  logoutText: {
    color: COLORS.error,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: size.moderateScale(20),
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: size.scale(20),
    padding: size.moderateScale(24),
    width: "100%",
    maxWidth: size.moderateScale(400),
    alignItems: "center",
  },
  modalIconContainer: {
    width: size.moderateScale(120),
    height: size.moderateScale(120),
    borderRadius: size.scale(60),
    backgroundColor: COLORS.lightBlue,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: size.verticalScale(20),
  },
  modalTitle: {
    fontSize: fontSize.extraLarge,
    fontFamily: fonts.Bold,
    color: COLORS.black,
    marginBottom: size.verticalScale(12),
    textAlign: "center",
  },
  modalMessage: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Regular,
    color: COLORS.lightGray,
    textAlign: "center",
    lineHeight: size.verticalScale(22),
    marginBottom: size.verticalScale(24),
  },
  modalButtons: {
    flexDirection: "row",
    gap: size.moderateScale(12),
    width: "100%",
  },
  modalButton: {
    flex: 1,
    paddingVertical: size.verticalScale(16),
    borderRadius: size.scale(12),
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cancelButtonText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Bold,
    color: COLORS.black,
  },
  signUpButton: {
    backgroundColor: COLORS.primaryButton,
  },
  signUpButtonText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Bold,
    color: COLORS.white,
  },
});

export default ProfileMainScreen;

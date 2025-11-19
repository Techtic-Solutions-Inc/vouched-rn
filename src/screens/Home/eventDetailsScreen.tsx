import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Event } from "../../components/EventCard";
import { RSVPConfirmationModal } from "../../components/RSVPConfirmationModal";
import { RSVPModal } from "../../components/RSVPModal";
import { SkeletonEventDetails } from "../../components/Skeleton";
import { useToast } from "../../components/Toast";
import { COLORS } from "../../constants/colors";
import { fontSize } from "../../constants/fontSize";
import fonts from "../../constants/fonts";
import { getEventById } from "../../data/mockEvents";
import { isGuestMode } from "../../utils/auth";
import { size } from "../../utils/size";

const EventDetailsScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { showSuccess, showError } = useToast();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRSVPing, setIsRSVPing] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    loadEvent();
    checkGuestMode();
  }, [params.id]);

  const checkGuestMode = async () => {
    const guest = await isGuestMode();
    setIsGuest(guest);
  };

  const loadEvent = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with API call
      // const eventData = await fetchEventById(params.id);
      // For now, use mock data
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const eventId = params.id as string;
      const eventData = getEventById(eventId);

      if (eventData) {
        setEvent(eventData);
      } else {
        showError("Event not found");
        setEvent(null);
      }
    } catch (error) {
      console.error("Error loading event:", error);
      showError("Failed to load event details");
      setEvent(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRSVP = () => {
    if (!event) return;
    setShowRSVPModal(true);
  };

  const handleRSVPSubmit = async (data: {
    name: string;
    email: string;
    isSingle: boolean;
    purpose: "EVENTS" | "DATING" | "BOTH";
    favoriteCategories: string[];
  }) => {
    if (!event) return;

    setIsRSVPing(true);
    try {
      // TODO: Implement RSVP API call with form data
      console.log("RSVP Data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Close RSVP modal and show confirmation
      setShowRSVPModal(false);
      setShowConfirmationModal(true);

      // Update local state
      setEvent({
        ...event,
        rsvpCount: event.rsvpCount + 1,
      });
    } catch (error) {
      showError("Failed to RSVP. Please try again.");
    } finally {
      setIsRSVPing(false);
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmationModal(false);
  };

  const handleOpenRegistration = () => {
    if (event?.registrationLink) {
      Linking.openURL(event.registrationLink).catch(() => {
        showError("Could not open registration link");
      });
    }
  };

  const handleShare = async () => {
    if (!event) return;

    try {
      const fullAddress = `${event.location.address}, ${event.location.city}${
        event.location.state ? `, ${event.location.state}` : ""
      }${event.location.zipCode ? ` ${event.location.zipCode}` : ""}`;

      const shareMessage = `${event.title}

${event.description}

📅 ${formatDate(event.date)} at ${event.time}${
        event.timezone ? ` ${event.timezone}` : ""
      }
📍 ${event.location.venue}
${fullAddress}

${
  event.price !== undefined
    ? event.isFree
      ? "💰 Free Event"
      : `💰 $${event.price.toFixed(2)}`
    : ""
}

Check out this event on Vouched!`;

      const shareOptions = {
        message: shareMessage,
        title: event.title,
        // On iOS, you can add URL if you have a deep link
        // url: `https://www.vouched-tampa.com/events/${event.id}`,
      };

      const result = await Share.share(shareOptions);

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type of result.activityType
          showSuccess("Event shared successfully!");
        } else {
          // Shared
          showSuccess("Event shared successfully!");
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed - user cancelled share
      }
    } catch (error: any) {
      console.error("Error sharing event:", error);
      showError(error.message || "Failed to share event");
    }
  };

  const handleOpenMap = () => {
    if (event?.location.coordinates) {
      const { latitude, longitude } = event.location.coordinates;
      const url = `https://maps.google.com/?q=${latitude},${longitude}`;
      Linking.openURL(url).catch(() => {
        showError("Could not open map");
      });
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return date.toLocaleDateString("en-US", options);
    } catch {
      return dateString;
    }
  };

  const getEventTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      Games: "#FF69B4",
      Music: "#9B59B6",
      Sports: "#3498DB",
      Food: "#E67E22",
      Arts: "#E74C3C",
      Tech: "#16A085",
      Social: "#F39C12",
      Default: COLORS.primaryButton,
    };
    return colors[type] || colors.Default;
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

  if (!event) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons
            name="alert-circle-outline"
            size={size.verticalScale(64)}
            color={COLORS.error}
          />
          <Text style={styles.errorTitle}>Event not found</Text>
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

  const fullAddress = `${event.location.address}, ${event.location.city}${
    event.location.state ? `, ${event.location.state}` : ""
  }${event.location.zipCode ? ` ${event.location.zipCode}` : ""}`;

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
        <TouchableOpacity
          style={styles.shareButton}
          onPress={handleShare}
          activeOpacity={0.7}
        >
          <Ionicons
            name="share-outline"
            size={size.verticalScale(24)}
            color={COLORS.black}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Cover Image */}
        <View style={styles.imageContainer}>
          <Image
            source={
              typeof event.coverImage === "string"
                ? { uri: event.coverImage }
                : event.coverImage
            }
            style={styles.coverImage}
            resizeMode="cover"
          />
          {/* Event Type Badge */}
          <View
            style={[
              styles.eventTypeBadge,
              { backgroundColor: getEventTypeColor(event.eventType) },
            ]}
          >
            <Text style={styles.eventTypeText}>{event.eventType}</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title */}
          <Text style={styles.title}>{event.title}</Text>

          {/* RSVP Count & Capacity */}
          <View style={styles.rsvpInfo}>
            <View style={styles.rsvpBadge}>
              <Ionicons
                name="people"
                size={size.verticalScale(16)}
                color={COLORS.gray}
                style={styles.rsvpIcon}
              />
              <Text style={styles.rsvpCount}>
                {event.rsvpCount}
                {event.capacity ? ` / ${event.capacity}` : ""} attending
              </Text>
            </View>
          </View>

          {/* Price */}
          {event.price !== undefined && (
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>
                {event.isFree ? "Free Event" : `$${event.price.toFixed(2)}`}
              </Text>
            </View>
          )}

          {/* Date & Time */}
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Ionicons
                name="calendar-outline"
                size={size.verticalScale(22)}
                color={COLORS.primaryButton}
              />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Date & Time</Text>
                <Text style={styles.infoText}>{formatDate(event.date)}</Text>
                <Text style={styles.infoText}>
                  {event.time}
                  {event.timezone ? ` ${event.timezone}` : ""}
                </Text>
              </View>
            </View>
          </View>

          {/* Location */}
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Ionicons
                name="location-outline"
                size={size.verticalScale(22)}
                color={COLORS.primaryButton}
              />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Location</Text>
                <Text style={styles.infoText}>{event.location.venue}</Text>
                <Text style={styles.infoText}>{fullAddress}</Text>
                {event.location.coordinates && (
                  <TouchableOpacity
                    style={styles.mapButton}
                    onPress={handleOpenMap}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name="map-outline"
                      size={size.verticalScale(16)}
                      color={COLORS.primaryButton}
                    />
                    <Text style={styles.mapButtonText}>Open in Maps</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>

          {/* Host Info */}
          {event.host && (
            <View style={styles.infoSection}>
              <View style={styles.infoRow}>
                <View style={styles.hostAvatar}>
                  {event.host.avatar ? (
                    <Image
                      source={
                        typeof event.host.avatar === "string"
                          ? { uri: event.host.avatar }
                          : event.host.avatar
                      }
                      style={styles.avatarImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <Ionicons
                      name="person"
                      size={size.verticalScale(24)}
                      color={COLORS.gray}
                    />
                  )}
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Host</Text>
                  <Text style={styles.infoText}>{event.host.name}</Text>
                  {event.host.bio && (
                    <Text style={styles.hostBio}>{event.host.bio}</Text>
                  )}
                </View>
              </View>
            </View>
          )}

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>About This Event</Text>
            <Text style={styles.description}>
              {event.fullDescription || event.description}
            </Text>
          </View>

          {/* Interests Tags */}
          {event.interests && event.interests.length > 0 && (
            <View style={styles.interestsSection}>
              <Text style={styles.sectionTitle}>Interests</Text>
              <View style={styles.tagsContainer}>
                {event.interests.map((interest, index) => (
                  <View key={index} style={styles.interestTag}>
                    <Text style={styles.interestTagText}>{interest}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Registration Link */}
          {event.registrationLink && (
            <TouchableOpacity
              style={styles.registrationLink}
              onPress={handleOpenRegistration}
              activeOpacity={0.7}
            >
              <Ionicons
                name="link-outline"
                size={size.verticalScale(20)}
                color={COLORS.primaryButton}
              />
              <Text style={styles.registrationLinkText}>
                Register on External Site
              </Text>
              <Ionicons
                name="chevron-forward"
                size={size.verticalScale(20)}
                color={COLORS.primaryButton}
              />
            </TouchableOpacity>
          )}

          {/* Spacer for bottom button */}
          <View style={styles.bottomSpacer} />
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        {isGuest ? (
          // Guest users only see RSVP button
          <TouchableOpacity
            style={[
              styles.rsvpButton,
              (isRSVPing || showRSVPModal) && styles.rsvpButtonDisabled,
            ]}
            onPress={handleRSVP}
            disabled={isRSVPing || showRSVPModal}
            activeOpacity={0.8}
          >
            {isRSVPing ? (
              <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
              <>
                <Text style={styles.rsvpButtonText}>RSVP</Text>
                {event.capacity && event.rsvpCount >= event.capacity && (
                  <Text style={styles.rsvpButtonSubtext}>Waitlist</Text>
                )}
              </>
            )}
          </TouchableOpacity>
        ) : // Authenticated users see registration or RSVP button
        event.registrationLink ? (
          <TouchableOpacity
            style={styles.registrationButton}
            onPress={handleOpenRegistration}
            activeOpacity={0.8}
          >
            <Text style={styles.registrationButtonText}>Register Now</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.rsvpButton,
              (isRSVPing || showRSVPModal) && styles.rsvpButtonDisabled,
            ]}
            onPress={handleRSVP}
            disabled={isRSVPing || showRSVPModal}
            activeOpacity={0.8}
          >
            {isRSVPing ? (
              <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
              <>
                <Text style={styles.rsvpButtonText}>RSVP</Text>
                {event.capacity && event.rsvpCount >= event.capacity && (
                  <Text style={styles.rsvpButtonSubtext}>Waitlist</Text>
                )}
              </>
            )}
          </TouchableOpacity>
        )}
      </View>

      {/* RSVP Modal */}
      <RSVPModal
        visible={showRSVPModal}
        onClose={() => setShowRSVPModal(false)}
        onSubmit={handleRSVPSubmit}
        isSubmitting={isRSVPing}
      />

      {/* RSVP Confirmation Modal */}
      <RSVPConfirmationModal
        visible={showConfirmationModal}
        onClose={handleCloseConfirmation}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: size.verticalScale(12),
    fontSize: fontSize.medium,
    fontFamily: fonts.Regular,
    color: COLORS.lightGray,
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
  shareButton: {
    width: size.moderateScale(40),
    height: size.moderateScale(40),
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: size.verticalScale(300),
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  eventTypeBadge: {
    position: "absolute",
    top: size.verticalScale(16),
    left: size.moderateScale(20),
    paddingHorizontal: size.moderateScale(16),
    paddingVertical: size.verticalScale(8),
    borderRadius: size.scale(20),
  },
  eventTypeText: {
    fontSize: fontSize.regular,
    fontFamily: fonts.Medium,
    color: COLORS.white,
  },
  content: {
    padding: size.moderateScale(20),
  },
  title: {
    fontSize: fontSize.extraLarge,
    fontFamily: fonts.Bold,
    color: COLORS.black,
    marginBottom: size.verticalScale(12),
  },
  rsvpInfo: {
    marginBottom: size.verticalScale(16),
  },
  rsvpBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: COLORS.lightWhite,
    paddingHorizontal: size.moderateScale(12),
    paddingVertical: size.verticalScale(8),
    borderRadius: size.scale(20),
  },
  rsvpIcon: {
    marginRight: size.moderateScale(6),
  },
  rsvpCount: {
    fontSize: fontSize.regular,
    fontFamily: fonts.Medium,
    color: COLORS.gray,
  },
  priceContainer: {
    marginBottom: size.verticalScale(20),
  },
  priceText: {
    fontSize: fontSize.semiLarge,
    fontFamily: fonts.Bold,
    color: COLORS.primaryButton,
  },
  infoSection: {
    marginBottom: size.verticalScale(24),
    paddingBottom: size.verticalScale(20),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  infoTextContainer: {
    flex: 1,
    marginLeft: size.moderateScale(16),
  },
  infoLabel: {
    fontSize: fontSize.semiRegular,
    fontFamily: fonts.Medium,
    color: COLORS.lightGray,
    marginBottom: size.verticalScale(4),
  },
  infoText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Regular,
    color: COLORS.black,
    marginBottom: size.verticalScale(4),
  },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: size.verticalScale(8),
  },
  mapButtonText: {
    fontSize: fontSize.regular,
    fontFamily: fonts.Medium,
    color: COLORS.primaryButton,
    marginLeft: size.moderateScale(6),
  },
  hostAvatar: {
    width: size.moderateScale(48),
    height: size.moderateScale(48),
    borderRadius: size.scale(24),
    backgroundColor: COLORS.lightWhite,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  hostBio: {
    fontSize: fontSize.regular,
    fontFamily: fonts.Regular,
    color: COLORS.lightGray,
    marginTop: size.verticalScale(4),
  },
  descriptionSection: {
    marginBottom: size.verticalScale(24),
  },
  sectionTitle: {
    fontSize: fontSize.semiLarge,
    fontFamily: fonts.Bold,
    color: COLORS.black,
    marginBottom: size.verticalScale(12),
  },
  description: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Regular,
    color: COLORS.gray,
    lineHeight: size.verticalScale(24),
  },
  interestsSection: {
    marginBottom: size.verticalScale(24),
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: size.moderateScale(8),
  },
  interestTag: {
    backgroundColor: COLORS.lightBlue,
    paddingHorizontal: size.moderateScale(12),
    paddingVertical: size.verticalScale(6),
    borderRadius: size.scale(16),
    borderWidth: 1,
    borderColor: COLORS.primaryButton,
  },
  interestTagText: {
    fontSize: fontSize.regular,
    fontFamily: fonts.Medium,
    color: COLORS.primaryButton,
  },
  registrationLink: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightWhite,
    padding: size.moderateScale(16),
    borderRadius: size.scale(12),
    marginBottom: size.verticalScale(24),
  },
  registrationLinkText: {
    flex: 1,
    fontSize: fontSize.medium,
    fontFamily: fonts.Medium,
    color: COLORS.primaryButton,
    marginLeft: size.moderateScale(12),
  },
  bottomSpacer: {
    height: size.verticalScale(20),
  },
  bottomBar: {
    paddingHorizontal: size.moderateScale(20),
    paddingVertical: size.verticalScale(16),
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
  },
  rsvpButton: {
    backgroundColor: COLORS.primaryButton,
    paddingVertical: size.verticalScale(16),
    borderRadius: size.scale(12),
    alignItems: "center",
    justifyContent: "center",
  },
  rsvpButtonDisabled: {
    opacity: 0.6,
  },
  rsvpButtonText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Bold,
    color: COLORS.white,
  },
  rsvpButtonSubtext: {
    fontSize: fontSize.semiRegular,
    fontFamily: fonts.Regular,
    color: COLORS.white,
    marginTop: size.verticalScale(2),
  },
  registrationButton: {
    backgroundColor: "#FF69B4",
    paddingVertical: size.verticalScale(16),
    borderRadius: size.scale(12),
    alignItems: "center",
    justifyContent: "center",
  },
  registrationButtonText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Bold,
    color: COLORS.white,
  },
});

export default EventDetailsScreen;

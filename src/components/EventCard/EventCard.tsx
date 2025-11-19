import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../constants/colors";
import { fontSize } from "../../constants/fontSize";
import fonts from "../../constants/fonts";
import { size } from "../../utils/size";

export interface Event {
  id: string;
  title: string;
  description: string;
  fullDescription?: string; // Full detailed description for details screen
  coverImage: string | ImageSourcePropType;
  date: string; // ISO date string or formatted string
  time: string;
  timezone?: string;
  location: {
    venue: string;
    address: string;
    city: string;
    state?: string;
    zipCode?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  eventType: string;
  interests?: string[]; // Array of interest tags
  host?: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  rsvpCount: number;
  capacity?: number;
  price?: number;
  isFree?: boolean;
  registrationLink?: string; // External registration URL if any
}

interface EventCardProps {
  event: Event;
  onPress?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onPress }) => {
  const router = useRouter();
  console.log(event);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      // Navigate to event detail screen
      router.push({
        pathname: "/Home/eventDetail",
        params: { id: event.id },
      });
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return `${months[date.getMonth()]} ${date.getDate()}`;
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

  const handleShare = async (e: any) => {
    e.stopPropagation();
    try {
      const fullAddress = `${event.location.address}, ${event.location.city}`;
      const shareMessage = `${event.title}

${event.description}

📅 ${formatDate(event.date)} at ${event.time}
📍 ${event.location.venue}, ${event.location.city}

${
  event.price !== undefined
    ? event.isFree
      ? "💰 Free Event"
      : `💰 $${event.price.toFixed(2)}`
    : ""
}

Check out this event on Vouched!`;

      await Share.share({
        message: shareMessage,
        title: event.title,
      });
    } catch (error: any) {
      console.error("Error sharing event:", error);
    }
  };

  return (
    console.log(event.coverImage),
    (
      <TouchableOpacity
        style={styles.container}
        onPress={(e) => {
          e.stopPropagation();
          // Details button navigates to details screen
          router.push({
            pathname: "/Home/eventDetail",
            params: { id: event.id },
          });
        }}
        activeOpacity={0.9}
      >
        {/* Cover Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: event.coverImage as string }}
            style={styles.coverImage}
            resizeMode="cover"
          />

          {/* Event Type Badge - Top Left */}
          <View
            style={[
              styles.eventTypeBadge,
              { backgroundColor: getEventTypeColor(event.eventType) },
            ]}
          >
            <Text style={styles.eventTypeText}>{event.eventType}</Text>
          </View>

          {/* Action Badges - Top Right */}
          <View style={styles.topActionsContainer}>
            {/* <TouchableOpacity
            style={styles.shareIconButton}
            onPress={handleShare}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name="share-outline"
              size={size.verticalScale(18)}
              color={COLORS.white}
            />
          </TouchableOpacity> */}
            <View style={styles.rsvpBadge}>
              <Ionicons
                name="people"
                size={size.verticalScale(14)}
                color={COLORS.gray}
                style={styles.rsvpIcon}
              />
              <Text style={styles.rsvpCount}>
                {event.rsvpCount}
                {event.capacity ? `/${event.capacity}` : ""}
              </Text>
            </View>
          </View>
        </View>

        {/* Event Details */}
        <View style={styles.detailsContainer}>
          {/* Title */}
          <Text style={styles.title} numberOfLines={1}>
            {event.title}
          </Text>

          {/* Description */}
          <Text style={styles.description} numberOfLines={2}>
            {event.description}
          </Text>

          {/* Date & Time */}
          <View style={styles.infoRow}>
            <Ionicons
              name="calendar-outline"
              size={size.verticalScale(16)}
              color={COLORS.lightGray}
              style={styles.infoIcon}
            />
            <Text style={styles.infoText}>
              {formatDate(event.date)}, {event.time}
            </Text>
          </View>

          {/* Location */}
          <View style={styles.infoRow}>
            <Ionicons
              name="location-outline"
              size={size.verticalScale(16)}
              color={COLORS.lightGray}
              style={styles.infoIcon}
            />
            <Text style={styles.infoText} numberOfLines={1}>
              {event.location.venue}, {event.location.city}
            </Text>
          </View>

          {/* Price (if available) */}
          {event.price !== undefined && (
            <View style={styles.priceRow}>
              <Text style={styles.priceText}>
                {event.isFree ? "Free" : `$${event.price.toFixed(2)}`}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    )
  );
};

const styles = StyleSheet.create({
  container: {
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
  imageContainer: {
    position: "relative",
    width: "100%",
    height: size.verticalScale(200),
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  eventTypeBadge: {
    position: "absolute",
    top: size.verticalScale(12),
    left: size.moderateScale(12),
    paddingHorizontal: size.moderateScale(12),
    paddingVertical: size.verticalScale(6),
    borderRadius: size.scale(16),
  },
  eventTypeText: {
    fontSize: fontSize.semiRegular,
    fontFamily: fonts.Medium,
    color: COLORS.white,
  },
  topActionsContainer: {
    position: "absolute",
    top: size.verticalScale(12),
    right: size.moderateScale(12),
    flexDirection: "row",
    alignItems: "center",
    gap: size.moderateScale(8),
  },
  shareIconButton: {
    width: size.moderateScale(32),
    height: size.moderateScale(32),
    borderRadius: size.scale(16),
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  rsvpBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingHorizontal: size.moderateScale(10),
    paddingVertical: size.verticalScale(6),
    borderRadius: size.scale(16),
  },
  rsvpIcon: {
    marginRight: size.moderateScale(4),
  },
  rsvpCount: {
    fontSize: fontSize.semiRegular,
    fontFamily: fonts.Medium,
    color: COLORS.gray,
  },
  detailsContainer: {
    padding: size.moderateScale(16),
    backgroundColor: COLORS.lightWhite,
  },
  title: {
    fontSize: fontSize.semiLarge,
    fontFamily: fonts.Bold,
    color: COLORS.black,
    marginBottom: size.verticalScale(6),
  },
  description: {
    fontSize: fontSize.regular,
    fontFamily: fonts.Regular,
    color: COLORS.lightGray,
    marginBottom: size.verticalScale(12),
    lineHeight: size.verticalScale(20),
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: size.verticalScale(8),
  },
  infoIcon: {
    marginRight: size.moderateScale(8),
  },
  infoText: {
    flex: 1,
    fontSize: fontSize.regular,
    fontFamily: fonts.Regular,
    color: COLORS.gray,
  },
  priceRow: {
    marginTop: size.verticalScale(4),
    //  marginBottom: size.verticalScale(12),
  },
  priceText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Bold,
    color: COLORS.primaryButton,
  },
  actionsContainer: {
    flexDirection: "row",
    marginTop: size.verticalScale(8),
    gap: size.moderateScale(12),
  },
  rsvpButton: {
    flex: 1,
    borderRadius: size.scale(12),
    overflow: "hidden",
  },
  gradientButton: {
    backgroundColor: "#FF69B4",
    paddingVertical: size.verticalScale(14),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: size.scale(12),
  },
  rsvpButtonText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Bold,
    color: COLORS.white,
  },
  detailsButton: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
    paddingVertical: size.verticalScale(14),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: size.scale(12),
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  detailsButtonText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Medium,
    color: COLORS.gray,
  },
});

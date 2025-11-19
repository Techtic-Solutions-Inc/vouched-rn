import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Event, EventCard } from "../../components/EventCard";
import { SkeletonEventCard } from "../../components/Skeleton";
import { COLORS } from "../../constants/colors";
import { fontSize } from "../../constants/fontSize";
import fonts from "../../constants/fonts";
import { MOCK_EVENTS } from "../../data/mockEvents";
import { size } from "../../utils/size";

const EVENT_TYPES = [
  "All",
  "Games",
  "Music",
  "Sports",
  "Food",
  "Arts",
  "Tech",
  "Social",
];

const EventListScreen = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const insets = useSafeAreaInsets();
  const { signOut, userId, isSignedIn } = useAuth();
  const router = useRouter();

  // Load events on mount
  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setEvents(MOCK_EVENTS);
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadEvents();
  }, []);

  // Filter and search events
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Filter by event type
      const matchesType =
        selectedType === "All" || event.eventType === selectedType;

      // Filter by search query (title, location, venue)
      const matchesSearch =
        searchQuery === "" ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.venue
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        event.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesType && matchesSearch;
    });
  }, [events, selectedType, searchQuery]);

  // Pull to refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // In real app, fetch events from API here
    } catch (error) {
      console.error("Error refreshing events:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  // Handle event card press
  const handleEventPress = (event: Event) => {
    console.log("Event pressed:", event.id);
    // Navigation will be handled by EventCard component
  };

  // Render event type filter chips - memoized to prevent re-renders
  const renderFilterChip = useCallback(
    (type: string) => {
      const isSelected = selectedType === type;
      return (
        <TouchableOpacity
          key={type}
          style={[styles.filterChip, isSelected && styles.filterChipSelected]}
          onPress={() => setSelectedType(type)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.filterChipText,
              isSelected && styles.filterChipTextSelected,
            ]}
          >
            {type}
          </Text>
        </TouchableOpacity>
      );
    },
    [selectedType]
  );

  // Render empty state
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons
        name="calendar-outline"
        size={size.verticalScale(64)}
        color={COLORS.lightGray}
      />
      <Text style={styles.emptyTitle}>No events found</Text>
      <Text style={styles.emptyText}>
        {searchQuery || selectedType !== "All"
          ? "Try adjusting your search or filters"
          : "Check back later for new events"}
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          paddingTop: insets.top + 10,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.titleContainer}>
          <View style={styles.titleHeader}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>Events</Text>
              <Text style={styles.subtitle}>
                Discover amazing events near you
              </Text>
            </View>
          </View>
        </View>

        {/* Sticky Search Bar and Filters */}
        <View style={styles.stickyHeader}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons
              name="search-outline"
              size={size.verticalScale(20)}
              color={COLORS.lightGray}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search events, location, venue..."
              placeholderTextColor={COLORS.lightGray}
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchQuery("")}
                style={styles.clearButton}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="close-circle"
                  size={size.verticalScale(20)}
                  color={COLORS.lightGray}
                />
              </TouchableOpacity>
            )}
          </View>

          {/* Filter Chips */}
          <View style={styles.filtersHeaderContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filtersContainer}
              style={styles.filtersScrollView}
            >
              {EVENT_TYPES.map(renderFilterChip)}
            </ScrollView>
          </View>
        </View>

        {/* Events List */}
        {isLoading ? (
          <FlatList
            data={[1, 2, 3, 4]}
            renderItem={() => <SkeletonEventCard />}
            keyExtractor={(item) => item.toString()}
            contentContainerStyle={[
              styles.listContainer,
              {
                paddingBottom:
                  size.verticalScale(0) +
                  insets.bottom +
                  (Platform.OS === "android" ? size.verticalScale(20) : 0) +
                  size.verticalScale(20), // Extra padding for spacing
              },
            ]}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <FlatList
            data={filteredEvents}
            renderItem={({ item }) => (
              <EventCard event={item} onPress={() => handleEventPress(item)} />
            )}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={renderEmptyState}
            contentContainerStyle={[
              filteredEvents.length === 0
                ? styles.emptyListContainer
                : styles.listContainer,
              {
                paddingBottom:
                  size.verticalScale(0) +
                  insets.bottom +
                  (Platform.OS === "android" ? size.verticalScale(20) : 0) +
                  size.verticalScale(20), // Extra padding for spacing
              },
            ]}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={COLORS.primaryButton}
                colors={[COLORS.primaryButton]}
              />
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
  },
  titleContainer: {
    paddingHorizontal: size.moderateScale(20),
    paddingTop: size.verticalScale(16),
    paddingBottom: size.verticalScale(12),
    backgroundColor: COLORS.white,
  },
  titleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleSection: {
    flex: 1,
  },
  title: {
    fontSize: fontSize.extraExtraExtraHuge,
    fontFamily: fonts.Bold,
    color: COLORS.black,
    marginBottom: size.verticalScale(4),
  },
  profileButton: {
    width: size.moderateScale(50),
    height: size.moderateScale(50),
  },
  subtitle: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Regular,
    color: COLORS.lightGray,
  },
  headerContainer: {
    backgroundColor: COLORS.white,
    paddingBottom: size.verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  stickyHeader: {
    backgroundColor: COLORS.white,
    zIndex: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: size.scale(12),
    marginHorizontal: size.moderateScale(20),
    marginTop: size.verticalScale(12),
    marginBottom: size.verticalScale(8),
    paddingHorizontal: size.moderateScale(16),
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filtersHeaderContainer: {
    backgroundColor: COLORS.white,
    paddingBottom: size.verticalScale(12),
  },
  searchIcon: {
    marginRight: size.moderateScale(12),
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.medium,
    fontFamily: fonts.Regular,
    color: COLORS.black,
    paddingVertical: size.verticalScale(12),
  },
  clearButton: {
    padding: size.moderateScale(4),
  },
  filtersScrollView: {
    maxHeight: size.verticalScale(50),
  },
  filtersContainer: {
    paddingHorizontal: size.moderateScale(20),
    paddingVertical: size.verticalScale(8),
    gap: size.moderateScale(8),
  },
  filterChip: {
    paddingHorizontal: size.moderateScale(16),
    paddingVertical: size.verticalScale(8),
    borderRadius: size.scale(20),
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: size.moderateScale(8),
  },
  filterChipSelected: {
    backgroundColor: COLORS.primaryButton,
    borderColor: COLORS.primaryButton,
  },
  filterChipText: {
    fontSize: fontSize.regular,
    fontFamily: fonts.Medium,
    color: COLORS.gray,
  },
  filterChipTextSelected: {
    color: COLORS.white,
  },
  listContainer: {
    paddingTop: size.verticalScale(20),
    // paddingBottom is set dynamically in contentContainerStyle
  },
  emptyListContainer: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: size.verticalScale(60),
  },
  emptyTitle: {
    fontSize: fontSize.semiLarge,
    fontFamily: fonts.Bold,
    color: COLORS.black,
    marginTop: size.verticalScale(16),
    marginBottom: size.verticalScale(8),
  },
  emptyText: {
    fontSize: fontSize.regular,
    fontFamily: fonts.Regular,
    color: COLORS.lightGray,
    textAlign: "center",
    paddingHorizontal: size.moderateScale(40),
  },
});

export default EventListScreen;

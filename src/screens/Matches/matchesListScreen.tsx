import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Platform,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Match, MatchCard } from "../../components/MatchCard";
import { SkeletonMatchCard } from "../../components/Skeleton";
import { COLORS } from "../../constants/colors";
import { fontSize } from "../../constants/fontSize";
import fonts from "../../constants/fonts";
import { MOCK_MATCHES } from "../../data/mockMatches";
import { size } from "../../utils/size";

const MatchesListScreen = () => {
  const router = useRouter();
  const [matches, setMatches] = useState<Match[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const insets = useSafeAreaInsets();

  // Load matches on mount
  useEffect(() => {
    const loadMatches = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setMatches(MOCK_MATCHES);
      } catch (error) {
        console.error("Error loading matches:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadMatches();
  }, []);

  // Pull to refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // In real app, fetch matches from API here
      // const fetchedMatches = await fetchMatches();
      // setMatches(fetchedMatches);
    } catch (error) {
      console.error("Error refreshing matches:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  // Handle match card press - navigate to match detail screen
  const handleMatchPress = (match: Match) => {
    router.push({
      pathname: "/Matches/matchDetail",
      params: { id: match.id },
    });
  };

  // Render empty state
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons
        name="heart-outline"
        size={size.verticalScale(64)}
        color={COLORS.lightGray}
      />
      <Text style={styles.emptyTitle}>No matches yet</Text>
      <Text style={styles.emptyText}>
        Keep exploring events to find your perfect match!
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
              <Text style={styles.title}>Matches</Text>
              <Text style={styles.subtitle}>
                People you've connected with at events
              </Text>
            </View>
          </View>
        </View>

        {/* Matches List */}
        {isLoading ? (
          <FlatList
            data={[1, 2, 3, 4]}
            renderItem={() => <SkeletonMatchCard />}
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
            data={matches}
            renderItem={({ item }) => (
              <MatchCard match={item} onPress={() => handleMatchPress(item)} />
            )}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={renderEmptyState}
            contentContainerStyle={[
              matches.length === 0
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
  subtitle: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Regular,
    color: COLORS.lightGray,
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

export default MatchesListScreen;

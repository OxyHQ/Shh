import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { View, Text, FlatList, StyleSheet, Image, Switch, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useTranslation } from "react-i18next";

const notifications = [
  {
    id: "1",
    type: "like",
    user: {
      name: "Jane Smith",
      avatar: "https://via.placeholder.com/50",
    },
    content: "liked your Post",
    timestamp: "2h ago",
    read: false,
  },
  {
    id: "2",
    type: "repost",
    user: {
      name: "Bob Johnson",
      avatar: "https://via.placeholder.com/50",
    },
    content: "reposted your Post",
    timestamp: "4h ago",
    read: true,
  },
  // Add more notifications
];

type Notification = {
  id: string;
  type: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  read: boolean;
};

const NotificationItem = ({ notification }: { notification: Notification }) => (
  <View style={[styles.notificationContainer, !notification.read && styles.unreadNotification]}>
    <Image source={{ uri: notification.user.avatar }} style={styles.avatar} />
    <View style={styles.notificationContent}>
      <ThemedText style={styles.notificationText}>
        <ThemedText style={styles.userName}>
          {notification.user.name}
        </ThemedText>{" "}
        {notification.content}
      </ThemedText>
      <ThemedText style={styles.timestamp}>{notification.timestamp}</ThemedText>
    </View>
    {notification.type === "like" && (
      <Ionicons name="heart" size={20} color="#E0245E" style={styles.icon} />
    )}
    {notification.type === "repost" && (
      <Ionicons name="repeat" size={20} color="#17BF63" style={styles.icon} />
    )}
  </View>
);

export default function NotificationsScreen() {
  const { t } = useTranslation();
  const [unreadCount, setUnreadCount] = useState(
    notifications.filter((notification) => !notification.read).length
  );
  const [filters, setFilters] = useState({
    showLikes: true,
    showReposts: true,
  });

  const handleFilterChange = (filter: keyof typeof filters, value: boolean) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filter]: value }));
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (!filters.showLikes && notification.type === "like") return false;
    if (!filters.showReposts && notification.type === "repost") return false;
    return true;
  });

  return (
    <>
      <Stack.Screen options={{ title: `${t("Notifications")} (${unreadCount})` }} />
      <ThemedView style={styles.container}>
        <View style={styles.filtersContainer}>
          <ThemedText>{t("Filters")}</ThemedText>
          <View style={styles.filterItem}>
            <ThemedText>{t("Show Likes")}</ThemedText>
            <Switch
              value={filters.showLikes}
              onValueChange={(value) => handleFilterChange("showLikes", value)}
            />
          </View>
          <View style={styles.filterItem}>
            <ThemedText>{t("Show Reposts")}</ThemedText>
            <Switch
              value={filters.showReposts}
              onValueChange={(value) => handleFilterChange("showReposts", value)}
            />
          </View>
        </View>
        <FlatList
          data={filteredNotifications}
          renderItem={({ item }) => <NotificationItem notification={item} />}
          keyExtractor={(item) => item.id}
        />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  notificationContainer: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e8ed",
  },
  unreadNotification: {
    backgroundColor: "#f0f8ff",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 16,
  },
  userName: {
    fontWeight: "bold",
  },
  timestamp: {
    color: "gray",
    marginTop: 5,
  },
  icon: {
    marginLeft: 10,
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filterItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
});

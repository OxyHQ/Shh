import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

const notifications = [
  {
    id: "1",
    type: "like",
    user: {
      name: "Jane Smith",
      avatar: "https://via.placeholder.com/50",
    },
    content: "liked your Tweet",
    timestamp: "2h ago",
  },
  {
    id: "2",
    type: "retweet",
    user: {
      name: "Bob Johnson",
      avatar: "https://via.placeholder.com/50",
    },
    content: "retweeted your Tweet",
    timestamp: "4h ago",
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
};

const NotificationItem = ({ notification }: { notification: Notification }) => (
  <View style={styles.notificationContainer}>
    <Image source={{ uri: notification.user.avatar }} style={styles.avatar} />
    <View style={styles.notificationContent}>
      <ThemedText style={styles.notificationText}>
        <ThemedText style={styles.userName}>{notification.user.name}</ThemedText>{" "}
        {notification.content}
      </ThemedText>
      <ThemedText style={styles.timestamp}>{notification.timestamp}</ThemedText>
    </View>
    {notification.type === "like" && (
      <Ionicons name="heart" size={20} color="#E0245E" style={styles.icon} />
    )}
    {notification.type === "retweet" && (
      <Ionicons name="repeat" size={20} color="#17BF63" style={styles.icon} />
    )}
  </View>
);

export default function NotificationsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerTitle}>Notifications</ThemedText>
      </ThemedView>
      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationItem notification={item} />}
        keyExtractor={(item) => item.id}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e8ed",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  notificationContainer: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e8ed",
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
});

import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image } from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";

const sleepStories = [
  {
    id: "1",
    title: "Calm Night",
    description: "A soothing story to help you sleep.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    title: "Peaceful Dreams",
    description: "A gentle story to guide you to peaceful dreams.",
    image: "https://via.placeholder.com/150",
  },
  // Add more sleep stories
];

const SleepItem = ({ story }) => (
  <TouchableOpacity style={styles.sleepItem}>
    <Image source={{ uri: story.image }} style={styles.sleepImage} />
    <View style={styles.sleepContent}>
      <Text style={styles.sleepTitle}>{story.title}</Text>
      <Text style={styles.sleepDescription}>{story.description}</Text>
    </View>
  </TouchableOpacity>
);

export default function SleepScreen() {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);

  const handleProgress = () => {
    setProgress(progress + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{t("Sleep")}</Text>
      <FlatList
        data={sleepStories}
        renderItem={({ item }) => <SleepItem story={item} />}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>{t("Progress")}: {progress}</Text>
        <TouchableOpacity style={styles.progressButton} onPress={handleProgress}>
          <Ionicons name="add-circle-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sleepItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e8ed",
  },
  sleepImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  sleepContent: {
    flex: 1,
  },
  sleepTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sleepDescription: {
    fontSize: 14,
    color: "#657786",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e1e8ed",
  },
  progressText: {
    fontSize: 16,
  },
  progressButton: {
    backgroundColor: "#1DA1F2",
    padding: 8,
    borderRadius: 9999,
  },
});

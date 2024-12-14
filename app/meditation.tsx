import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image } from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";

const meditations = [
  {
    id: "1",
    title: "Morning Meditation",
    description: "Start your day with a calm mind.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    title: "Evening Meditation",
    description: "Wind down and relax before bed.",
    image: "https://via.placeholder.com/150",
  },
  // Add more meditations
];

const MeditationItem = ({ meditation }) => (
  <TouchableOpacity style={styles.meditationItem}>
    <Image source={{ uri: meditation.image }} style={styles.meditationImage} />
    <View style={styles.meditationContent}>
      <Text style={styles.meditationTitle}>{meditation.title}</Text>
      <Text style={styles.meditationDescription}>{meditation.description}</Text>
    </View>
  </TouchableOpacity>
);

export default function MeditationScreen() {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);

  const handleProgress = () => {
    setProgress(progress + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{t("Meditation")}</Text>
      <FlatList
        data={meditations}
        renderItem={({ item }) => <MeditationItem meditation={item} />}
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
  meditationItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e8ed",
  },
  meditationImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  meditationContent: {
    flex: 1,
  },
  meditationTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  meditationDescription: {
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

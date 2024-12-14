import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image } from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";

const mindfulnessExercises = [
  {
    id: "1",
    title: "Breathing Exercise",
    description: "Focus on your breath to calm your mind.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    title: "Body Scan",
    description: "Bring awareness to different parts of your body.",
    image: "https://via.placeholder.com/150",
  },
  // Add more mindfulness exercises
];

const MindfulnessItem = ({ exercise }) => (
  <TouchableOpacity style={styles.mindfulnessItem}>
    <Image source={{ uri: exercise.image }} style={styles.mindfulnessImage} />
    <View style={styles.mindfulnessContent}>
      <Text style={styles.mindfulnessTitle}>{exercise.title}</Text>
      <Text style={styles.mindfulnessDescription}>{exercise.description}</Text>
    </View>
  </TouchableOpacity>
);

export default function MindfulnessScreen() {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);

  const handleProgress = () => {
    setProgress(progress + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{t("Mindfulness")}</Text>
      <FlatList
        data={mindfulnessExercises}
        renderItem={({ item }) => <MindfulnessItem exercise={item} />}
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
  mindfulnessItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e8ed",
  },
  mindfulnessImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  mindfulnessContent: {
    flex: 1,
  },
  mindfulnessTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  mindfulnessDescription: {
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

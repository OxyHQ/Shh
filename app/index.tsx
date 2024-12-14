import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Stack, useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import { fetchData } from "@/utils/api";
import { storeData, getData } from "@/utils/storage";
import { useTranslation } from "react-i18next";
import { BottomBar } from "@/components/BottomBar";

type Content = {
  id: string;
  title: string;
  description: string;
  type: "meditation" | "sleep" | "mindfulness";
  image: string;
};

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [content, setContent] = useState<Content[]>([]);
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const retrieveContentFromAPI = async () => {
    try {
      const response = await fetchData("content");
      const content = response.content.map((item: Content) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        type: item.type,
        image: item.image,
      }));
      await storeData("content", content);
      setContent(content);
    } catch (error) {
      console.error("Error retrieving content from API:", error);
    }
  };

  useEffect(() => {
    const fetchContent = async () => {
      const storedContent = await getData("content");
      if (storedContent) {
        setContent(storedContent);
      } else {
        retrieveContentFromAPI();
      }
    };

    fetchContent();
  }, []);

  const renderContentItem = ({ item }: { item: Content }) => (
    <TouchableOpacity style={styles.contentItem}>
      <Image source={{ uri: item.image }} style={styles.contentImage} />
      <View style={styles.contentTextContainer}>
        <ThemedText style={styles.contentTitle}>{item.title}</ThemedText>
        <ThemedText style={styles.contentDescription}>
          {item.description}
        </ThemedText>
        <ThemedText style={styles.contentType}>{item.type}</ThemedText>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen options={{ title: t("Home"), headerBackVisible: false }} />
      <ThemedView style={styles.container}>
        <FlatList
          data={content}
          renderItem={renderContentItem}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
        <TouchableOpacity
          style={styles.fab}
          onPress={() => router.push("/compose")}
        >
          <Ionicons name="create-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <BottomBar />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  fab: {
    position: "fixed",
    bottom: 65,
    right: 16,
    backgroundColor: "#1DA1F2",
    padding: 16,
    borderRadius: 9999,
    elevation: 4,
  },
  contentItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e8ed",
    flexDirection: "row",
    alignItems: "center",
  },
  contentImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  contentTextContainer: {
    flex: 1,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  contentDescription: {
    fontSize: 14,
    color: "#657786",
  },
  contentType: {
    fontSize: 12,
    color: "#1DA1F2",
  },
});

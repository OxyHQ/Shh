import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import { Stack, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { createNotification } from "@/utils/notifications";
import * as ImagePicker from "expo-image-picker";
import DraggableFlatList from "react-native-draggable-flatlist";
import * as Location from "expo-location";

export default function ComposeScreen() {
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, content: "", images: [], location: "" },
  ]);
  const maxLength = 280;

  const handlePost = async () => {
    const validPosts = posts.filter((post) => post.content.trim().length > 0);
    if (validPosts.length > 0) {
      for (const post of validPosts) {
        await createNotification(
          "Post Created",
          `Your post: "${post.content}" has been successfully created.`
        );
      }
      router.back();
    }
  };

  interface Post {
    id: number;
    content: string;
    images: string[];
    location: string;
  }

  const handleContentChange = (id: number, content: string) => {
    setPosts(
      posts.map((post: Post) => (post.id === id ? { ...post, content } : post))
    );
  };

  const addNewPost = () => {
    setPosts([
      ...posts,
      { id: posts.length + 1, content: "", images: [], location: "" },
    ]);
  };

  const pickImages = async (id: number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPosts(
        posts.map((post: Post) =>
          post.id === id
            ? { ...post, images: result.assets.map((asset) => asset.uri) }
            : post
        )
      );
    }
  };

  const pickLocation = async (id: number) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const locationString = `${location.coords.latitude}, ${location.coords.longitude}`;
    setPosts(
      posts.map((post: Post) =>
        post.id === id ? { ...post, location: locationString } : post
      )
    );
  };

  const renderPost = ({
    item,
    drag,
    isActive,
  }: {
    item: Post;
    drag: () => void;
    isActive: boolean;
  }) => {
    const characterCount = item.content.length;
    const isOverLimit = characterCount > maxLength;
    return (
      <View style={styles.postContainer}>
        <View style={styles.content}>
          <Image
            source={{ uri: "https://via.placeholder.com/40" }}
            style={styles.avatar}
          />
          <TextInput
            style={styles.input}
            placeholder="What's happening?"
            placeholderTextColor="#657786"
            multiline
            maxLength={maxLength}
            value={item.content}
            onChangeText={(text) => handleContentChange(item.id, text)}
            autoFocus
          />
        </View>
        <ScrollView horizontal>
          {item.images.map((imageUri, index) => (
            <Image
              key={index}
              source={{ uri: imageUri }}
              style={styles.previewImage}
            />
          ))}
        </ScrollView>
        {item.location ? (
          <ThemedText style={styles.locationText}>
            Location: {item.location}
          </ThemedText>
        ) : null}
        <View style={styles.footer}>
          <View style={styles.toolbar}>
            <TouchableOpacity
              style={styles.mediaButton}
              onPress={() => pickImages(item.id)}
            >
              <Ionicons name="image-outline" size={24} color="#1DA1F2" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.mediaButton}>
              <Ionicons name="camera-outline" size={24} color="#1DA1F2" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.mediaButton}>
              <Ionicons name="videocam-outline" size={24} color="#1DA1F2" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.mediaButton}
              onPress={() => pickLocation(item.id)}
            >
              <Ionicons name="location-outline" size={24} color="#1DA1F2" />
            </TouchableOpacity>
          </View>
          <View style={styles.characterCount}>
            <ThemedText
              style={[
                styles.characterCountText,
                isOverLimit && styles.characterCountOverLimit,
              ]}
            >
              {characterCount}/{maxLength}
            </ThemedText>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "New Posts",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#1DA1F2" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={handlePost}
              disabled={
                posts.every((post) => post.content.trim().length === 0) ||
                posts.some((post) => post.content.length > maxLength)
              }
              style={[
                styles.postButton,
                (posts.every((post) => post.content.trim().length === 0) ||
                  posts.some((post) => post.content.length > maxLength)) &&
                  styles.postButtonDisabled,
              ]}
            >
              <ThemedText style={styles.postButtonText}>Post</ThemedText>
            </TouchableOpacity>
          ),
        }}
      />
      <ThemedView style={styles.container}>
        <DraggableFlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPost}
          onDragEnd={({ data }) => setPosts(data)}
        />
        <TouchableOpacity onPress={addNewPost} style={styles.addButton}>
          <ThemedText style={styles.addButtonText}>Add New Post</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#E1E8ED",
    paddingBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 18,
    lineHeight: 24,
    minHeight: 100,
    color: "#14171A",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E1E8ED",
    paddingTop: 12,
    marginTop: 12,
  },
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
  },
  mediaButton: {
    padding: 8,
    marginRight: 8,
  },
  characterCount: {
    padding: 8,
  },
  characterCountText: {
    fontSize: 14,
    color: "#657786",
  },
  characterCountOverLimit: {
    color: "#E0245E",
  },
  postButton: {
    backgroundColor: "#1DA1F2",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  postButtonDisabled: {
    opacity: 0.5,
  },
  postButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  backButton: {
    paddingHorizontal: 16,
  },
  postContainer: {
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: "#1DA1F2",
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 16,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  previewImage: {
    width: 100,
    height: 100,
    marginRight: 5,
    borderRadius: 35,
  },
  locationText: {
    fontSize: 14,
    color: "#657786",
    marginTop: 8,
  },
});

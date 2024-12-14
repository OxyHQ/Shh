import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Slider } from "react-native";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

export default function AudioPlayerScreen() {
  const { t } = useTranslation();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1.0);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/audio/sample.mp3")
    );
    setSound(sound);
    await sound.playAsync();
    setIsPlaying(true);
  };

  const pauseSound = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  const skipForward = async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        const newPosition = Math.min(status.positionMillis + 15000, status.durationMillis);
        await sound.setPositionAsync(newPosition);
        setPosition(newPosition);
      }
    }
  };

  const skipBackward = async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        const newPosition = Math.max(status.positionMillis - 15000, 0);
        await sound.setPositionAsync(newPosition);
        setPosition(newPosition);
      }
    }
  };

  const handleVolumeChange = async (value: number) => {
    if (sound) {
      await sound.setVolumeAsync(value);
      setVolume(value);
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    const updatePosition = async () => {
      if (sound) {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          setPosition(status.positionMillis);
          setDuration(status.durationMillis);
        }
      }
    };

    const interval = setInterval(updatePosition, 1000);
    return () => clearInterval(interval);
  }, [sound]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{t("Audio Player")}</Text>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={skipBackward}>
          <Ionicons name="play-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={isPlaying ? pauseSound : playSound}
        >
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={24}
            color="#FFFFFF"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={skipForward}>
          <Ionicons name="play-forward" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onValueChange={(value) => setPosition(value)}
        onSlidingComplete={async (value) => {
          if (sound) {
            await sound.setPositionAsync(value);
          }
        }}
      />
      <Slider
        style={styles.volumeSlider}
        minimumValue={0}
        maximumValue={1}
        value={volume}
        onValueChange={handleVolumeChange}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#1DA1F2",
    padding: 16,
    borderRadius: 9999,
    elevation: 4,
  },
  slider: {
    width: "80%",
    height: 40,
  },
  volumeSlider: {
    width: "80%",
    height: 40,
    marginTop: 16,
  },
});

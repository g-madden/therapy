import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import Settings from "./settings";
import { Practitioner } from "./types";
import { profiles } from "./data/profiles";
import { useApp } from "./context/AppContext";
import ProfileView from "./profileView";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

interface SavedProfilesListProps {
  showSettings: boolean;
  onSettingsPress: () => void;
  onSettingsClose: () => void;
  onProfileViewChange: (isShowing: boolean) => void;
  slideAnim: Animated.Value;
}

const SavedProfilesList: React.FC<SavedProfilesListProps> = ({ 
  showSettings, 
  onSettingsPress, 
  onSettingsClose,
  onProfileViewChange,
  slideAnim
}) => {
  const { savedProfiles, removeSavedProfile } = useApp();
  const [selectedProfile, setSelectedProfile] = useState<Practitioner | null>(null);
  const swipeableRefs = useRef<{ [key: string]: Swipeable | null }>({});

  useEffect(() => {
    onProfileViewChange(selectedProfile !== null);
  }, [selectedProfile, onProfileViewChange]);

  const renderRightActions = (progress: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>, item: Practitioner) => {
    const scale = dragX.interpolate({
      inputRange: [-100, -50],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          swipeableRefs.current[item.id]?.close();
          removeSavedProfile(item.id);
        }}
      >
        <Animated.View style={{ transform: [{ scale }] }}>
          <Ionicons name="trash-outline" size={24} color="white" />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }: { item: Practitioner }) => {
    return (
      <Swipeable
        ref={(ref) => (swipeableRefs.current[item.id] = ref)}
        renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item)}
        rightThreshold={40}
        overshootRight={false}
      >
        <TouchableOpacity 
          style={styles.itemContainer}
          onPress={() => setSelectedProfile(item)}
        >
          <Image source={item.image} style={styles.profileImage} />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.date}>Registered Clinical Counsellor</Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  if (showSettings) {
    return <Settings onClose={onSettingsClose} />;
  }

  if (selectedProfile) {
    return (
      <View style={styles.fullScreen}>
        <ProfileView 
          profile={selectedProfile} 
          onBack={() => setSelectedProfile(null)} 
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={onSettingsPress}
          style={styles.settingsButton}
        >
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={savedProfiles}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No saved profiles yet</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // padding: 20,
  },
  fullScreen: {
    flex: 1,
    backgroundColor: "#383838",
  },
  header: {
    flexDirection: "row",
    // justifyContent: "flex-end",
    // marginBottom: 20,
    backgroundColor: "#383838",
    width: "100%",
    // height: 50,
    paddingTop: 150,
  },
  settingsButton: {
    padding: 8,
    zIndex: 30,
    position: "absolute",
    right: 20,
    top: 75,
  },
  emptyText: {
    color: "rgba(0, 0, 0, 0.5)",
    textAlign: "center",
    marginTop: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "white",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  date: {
    fontSize: 14,
    color: "gray",
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
    marginTop: 1,
  },
});

export default SavedProfilesList;

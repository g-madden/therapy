import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Settings from "./settings";
import { Practitioner } from "./types";
import { profiles } from "./data/profiles";
import { useApp } from "./context/AppContext";

interface SavedProfilesListProps {
  showSettings: boolean;
  onSettingsPress: () => void;
  onSettingsClose: () => void;
}

const SavedProfilesList: React.FC<SavedProfilesListProps> = ({ 
  showSettings, 
  onSettingsPress, 
  onSettingsClose 
}) => {
  const { savedProfiles, removeSavedProfile } = useApp();

  const renderItem = ({ item }: { item: Practitioner }) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={item.image} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.date}>Registered Clinical Counsellor</Text>
        </View>
        <TouchableOpacity onPress={() => removeSavedProfile(item.id)}>
          <Text style={styles.menuDots}>⋮</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (showSettings) {
    return <Settings onClose={onSettingsClose} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={onSettingsPress}
          style={styles.settingsButton}
        >
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Saved Profiles</Text>
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
    padding: 20,
    paddingTop: 75,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  settingsButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
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
    backgroundColor: "transparent",
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
  menuDots: {
    fontSize: 24,
    paddingHorizontal: 10,
    color: "black",
  },
});

export default SavedProfilesList;

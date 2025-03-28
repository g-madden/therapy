import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useApp } from "./context/AppContext";
import { Practitioner } from "./types";
import { PanGestureHandler } from "react-native-gesture-handler";

const { height } = Dimensions.get("window");

interface ProfileViewProps {
  profile: Practitioner;
  onBack: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ profile, onBack }) => {
  const { removeSavedProfile } = useApp();

  const handleGestureEvent = (event: any) => {
    if (event.nativeEvent.translationX > 50) {
      onBack();
    }
  };

  const handleRemove = () => {
    removeSavedProfile(profile.id);
    onBack();
  };

  return (
    <PanGestureHandler
      onGestureEvent={handleGestureEvent}
      activeOffsetX={[-20, 20]}
    >
      <View style={styles.mainContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={onBack}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <ScrollView>
        <View style={styles.itemContainer}>
          <View style={styles.imageContainer}>
            <Image source={profile.image} style={styles.backgroundImage} />
            <View style={styles.transparent}>
              <Text style={styles.name}>{profile.name}</Text>
              <Text style={styles.byline}>Registered Clinical Counsellor</Text>
              <Text style={styles.byline}>10 years</Text>
            </View>
            <LinearGradient
              colors={["transparent", "rgba(56, 56, 56, 0.8)"]}
              style={styles.gradient}
            />
          </View>
          <View style={styles.overlay}>
            <View style={styles.tagsContainer}>
            <Text style={styles.bio}>
              {profile.bio}
            </Text>
              <Text style={styles.reason}>Matched for you because</Text>
              {profile.tags.map((tag, index) => (
                <Text key={index} style={styles.tag}>
                  {tag}
                </Text>
              ))}
              
            </View>
            
          </View>
        </View>
        </ScrollView>
      </View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    // backgroundColor: "#383838",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 2,
    padding: 8,
  },
  itemContainer: {
    width: "100%",
    // height: height,
    alignItems: "center",
    // justifyContent: "flex-start",
    // marginTop: "75%",
  },
  imageContainer: {
    width: "100%",
   
  },
  backgroundImage: {
    width: "100%",
    // height: "100%",
    position: "absolute",
  },
  transparent: {
    backgroundColor: "transparent",
    width: "100%",
    // position: "absolute",
    // bottom: 10,
    paddingHorizontal: 24,
    zIndex: 1,
    marginBottom: 30,
     marginTop: "100%",
  },
  byline: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    marginBottom: 4,
  },
  bio: {
    color: "#bbb",
    fontSize: 16,
    marginBottom: 40,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 150,
  },
  overlay: {
    backgroundColor: "#383838",
    width: "100%",
    padding: 24,
    paddingHorizontal: 24,
    // position: "absolute",
    // bottom: 0,
  },
  name: {
    color: "white",
    fontSize: 40,
    marginBottom: 10,
  },
  reason: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 12,
    marginBottom: 10,
    textTransform: "uppercase",
    width: "100%",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  tag: {
    color: "#bbb",
    fontSize: 16,
    marginRight: 10,
    backgroundColor: "transparent",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#bbb",
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: "white",
    paddingVertical: 16,
    borderRadius: 100,
    width: 170,
  },
});

export default ProfileView; 
import SmileyIcon from "@/assets/icons/smiley";
import UsersIcon from "@/assets/icons/users";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

// Dummy SVG Icons (Replace with actual SVGs if needed)
const TherapistsIcon = () => <Text style={styles.icon}>👥</Text>;
// const YouIcon = () => <SmileyIcon />;

const { width } = Dimensions.get("window");
const TOGGLE_WIDTH = 162; // Adjust size as needed
const TOGGLE_HEIGHT = 52;
const TOGGLE_PADDING = 10;
const BUTTON_WIDTH = (TOGGLE_WIDTH - TOGGLE_PADDING * 2) / 2;

const GlassToggle = ({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (option: string) => void;
}) => {
  // const [selected, setSelected] = useState(isFeed);
  const translateX = useSharedValue(0);

  const handleToggle = (option: "therapists" | "you") => {
    setSelected(option);
    translateX.value = withTiming(option === "therapists" ? 0 : BUTTON_WIDTH);
  };

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.toggleBackground}>
        {/* Left Button */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => handleToggle("therapists")}
        >
          <UsersIcon color={selected === "you" ? "rgba(0,0,0,.5)" : "white"} />
          <Text
            style={selected === "therapists" ? styles.activeText : styles.text}
          >
            Therapists
          </Text>
        </TouchableOpacity>

        {/* Right Button */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => handleToggle("you")}
        >
          <SmileyIcon
            color={selected === "therapists" ? "rgba(0,0,0,.5)" : "white"}
          />
          <Text style={selected === "you" ? styles.activeText : styles.text}>
            You
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  toggleBackground: {
    width: TOGGLE_WIDTH,
    height: TOGGLE_HEIGHT,
    backgroundColor: "rgba(255, 255, 255, .5)",
    borderRadius: TOGGLE_HEIGHT / 2,
    flexDirection: "row",
    alignItems: "center",
    padding: TOGGLE_PADDING,
    position: "relative",
    backdropFilter: "blur(10px)", // For web
    // For React Native, use the following:
    // backgroundColor: "rgba(255, 255, 255, 0.5)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    // blurRadius: 10,
  },
  toggleButton: {
    position: "absolute",
    width: BUTTON_WIDTH,
    height: TOGGLE_HEIGHT - TOGGLE_PADDING * 2,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: (TOGGLE_HEIGHT - TOGGLE_PADDING * 2) / 2,
    elevation: 2, // Shadow effect for Android
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  option: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    zIndex: 1, // Keeps text/icons above the moving button
  },
  text: {
    fontSize: 12,
    color: "rgba(0,0,0,.5)",
    fontWeight: "500",
  },
  activeText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
  },
  icon: {
    marginBottom: 2,
  },
});

export default GlassToggle;

import React, { useState, useRef } from "react";
import { View, StatusBar, StyleSheet, Platform, Animated, Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppProvider } from "./context/AppContext";
import { profiles } from "./data/profiles";
import Feed from "./feed";
import SavedProfilesList from "./savedProfiles";
import NavToggle from "./navToggle";

const { width } = Dimensions.get("window");

export default function Index() {
  const [selected, setSelected] = useState("therapists");
  const [showSettings, setShowSettings] = useState(false);
  const [showProfileView, setShowProfileView] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handleNavigateToProfiles = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      setSelected("you");
      slideAnim.setValue(0);
      opacityAnim.setValue(1);
    });
  };

  const handleNavigateToFeed = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      setSelected("therapists");
    });
  };

  const handleNavToggle = (newSelected: string) => {
    if (newSelected === "you" && selected === "therapists") {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -width,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start(() => {
        setSelected(newSelected);
        slideAnim.setValue(0);
        opacityAnim.setValue(1);
      });
    } else if (newSelected === "therapists" && selected === "you") {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start(() => {
        setSelected(newSelected);
      });
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <Animated.View 
            style={[
              styles.savedProfilesContainer,
              {
                opacity: selected === "you" ? 1 : 0
              }
            ]}
          >
            <SavedProfilesList
              showSettings={showSettings}
              onSettingsPress={() => setShowSettings(true)}
              onSettingsClose={() => setShowSettings(false)}
              onProfileViewChange={setShowProfileView}
              slideAnim={slideAnim}
            />
          </Animated.View>
          <Animated.View 
            style={[
              styles.feedContainer,
              {
                transform: [{ translateX: slideAnim }],
                opacity: opacityAnim
              }
            ]}
          >
            <Feed onNavigateToProfiles={handleNavigateToProfiles} slideAnim={slideAnim} />
          </Animated.View>
          {(selected === "therapists" || selected === "you") && !showSettings && !showProfileView && (
            <View style={styles.toggleContainer}>
              <NavToggle selected={selected} setSelected={handleNavToggle} />
            </View>
          )}
        </View>
      </AppProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#383838",
  },
  savedProfilesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#383838",
    zIndex: 1,
  },
  feedContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#383838",
    zIndex: 0,
  },
  toggleContainer: {
    position: "absolute",
    top: 75,
    width: "100%",
    alignItems: "center",
    zIndex: 2,
  },
});

import React, { useState } from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import Feed from "./feed";
import SavedProfilesList from "./savedProfiles";
import NavToggle from "./navToggle";
import Questionaire from "./questionaire";
import { AppProvider, useApp } from "./context/AppContext";

function IndexContent() {
  const [selected, setSelected] = useState("questionaire");
  const [showSettings, setShowSettings] = useState(false);
  const { questionnaireCompleted } = useApp();

  // If questionnaire is completed, show therapists view
  React.useEffect(() => {
    if (questionnaireCompleted) {
      setSelected("therapists");
    }
  }, [questionnaireCompleted]);

  const handleSettingsPress = () => {
    setShowSettings(true);
  };

  const handleSettingsClose = () => {
    setShowSettings(false);
  };

  const Component: Record<string, JSX.Element> = {
    therapists: <Feed />,
    you: (
      <SavedProfilesList
        showSettings={showSettings}
        onSettingsPress={handleSettingsPress}
        onSettingsClose={handleSettingsClose}
      />
    ),
    questionaire: <Questionaire setSelected={setSelected} />,
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      {selected !== "questionaire" && !showSettings && (
        <View style={styles.toggle}>
          <NavToggle {...{ selected, setSelected }} />
        </View>
      )}
      <View style={styles.content}>
        {Component[selected]}
      </View>
    </View>
  );
}

export default function Index() {
  return (
    <AppProvider>
      <IndexContent />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#383838",
  },
  content: {
    flex: 1,
  },
  toggle: {
    position: "absolute",
    top: 75,
    width: "100%",
    alignItems: "center",
    zIndex: 1,
  },
});

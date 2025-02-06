import { View, StatusBar, StyleSheet } from "react-native";
import Profile from "./profile";
import SavedProfilesList from "./listView";
import NavToggle from "./navToggle";
import { useState } from "react";
import Questionaire from "./questionaire";

export default function Index() {
  const [selected, setSelected] = useState("questionaire");

  const Component: Record<string, JSX.Element> = {
    therapists: <Profile />,
    you: <SavedProfilesList />,
    questionaire: <Questionaire />,
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <View style={styles.toggle}>
        <NavToggle {...{ selected, setSelected }} />
      </View>
      {Component[selected]}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#383838",
  },
  toggle: {
    position: "absolute",
    top: 75,
    width: "100%",
    alignItems: "center",
    // backgroundColor: "#000",
    zIndex: 1,
  },
});

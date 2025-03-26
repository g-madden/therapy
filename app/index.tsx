import React, { useState, useEffect } from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import Profile from "./profile";
import SavedProfilesList from "./listView";
import NavToggle from "./navToggle";
import Questionaire from "./questionaire";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QuestionnaireData, QuestionnaireAnswers } from "./types";

const QUESTIONNAIRE_KEY = "@therapy_questionnaire_data";

export default function Index() {
  const [selected, setSelected] = useState("questionaire");
  const [isLoading, setIsLoading] = useState(true);
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    checkQuestionnaireStatus();
  }, []);

  const checkQuestionnaireStatus = async () => {
    try {
      const data = await AsyncStorage.getItem(QUESTIONNAIRE_KEY);
      if (data) {
        const parsedData: QuestionnaireData = JSON.parse(data);
        setQuestionnaireData(parsedData);
        if (parsedData.completed) {
          setSelected("therapists");
        }
      }
    } catch (error) {
      console.error("Error checking questionnaire status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionnaireComplete = async (answers: QuestionnaireAnswers) => {
    try {
      const data: QuestionnaireData = {
        completed: true,
        answers,
      };
      await AsyncStorage.setItem(QUESTIONNAIRE_KEY, JSON.stringify(data));
      setQuestionnaireData(data);
      setSelected("therapists");
    } catch (error) {
      console.error("Error saving questionnaire data:", error);
    }
  };

  const handleSettingsPress = () => {
    setShowSettings(true);
  };

  const handleSettingsClose = () => {
    setShowSettings(false);
  };

  const Component: Record<string, JSX.Element> = {
    therapists: <Profile />,
    you: (
      <SavedProfilesList
        showSettings={showSettings}
        onSettingsPress={handleSettingsPress}
        onSettingsClose={handleSettingsClose}
      />
    ),
    questionaire: <Questionaire setSelected={handleQuestionnaireComplete} />,
  };

  if (isLoading) {
    return null; // Or a loading spinner
  }

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

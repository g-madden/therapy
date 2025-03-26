import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QuestionnaireAnswers, QuestionnaireData } from "./types";
import { questions } from "./data/questions";

const QUESTIONNAIRE_KEY = "@therapy_questionnaire_data";

interface SettingsProps {
  onClose: () => void;
}

export default function Settings({ onClose }: SettingsProps) {
  const [answers, setAnswers] = useState<QuestionnaireAnswers>({
    gender: "",
    therapist: "",
  });

  useEffect(() => {
    loadAnswers();
  }, []);

  const loadAnswers = async () => {
    try {
      const data = await AsyncStorage.getItem(QUESTIONNAIRE_KEY);
      if (data) {
        const parsedData: QuestionnaireData = JSON.parse(data);
        setAnswers(parsedData.answers);
      }
    } catch (error) {
      console.error("Error loading answers:", error);
    }
  };

  const handleSelect = async (key: keyof QuestionnaireAnswers, value: string) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);

    try {
      const data: QuestionnaireData = {
        completed: true,
        answers: newAnswers,
      };
      await AsyncStorage.setItem(QUESTIONNAIRE_KEY, JSON.stringify(data));
      Alert.alert("Success", "Your preferences have been updated");
    } catch (error) {
      console.error("Error saving answers:", error);
      Alert.alert("Error", "Failed to save your preferences");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>

      <Text style={styles.sectionTitle}>Your Preferences</Text>
      {questions.map((question) => (
        <View key={question.key} style={styles.questionContainer}>
          <Text style={styles.questionText}>{question.question}</Text>
          <FlatList
            data={question.options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.option,
                  answers[question.key] === item && styles.selectedOption,
                ]}
                onPress={() => handleSelect(question.key, item)}
              >
                <Text>{item}</Text>
                {answers[question.key] === item && (
                  <TouchableOpacity
                    onPress={() => handleSelect(question.key, "")}
                  >
                    <Ionicons name="close-circle" size={20} color="gray" />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 50,
  },
  closeButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 30,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: "#e6f7ff",
    borderColor: "#007AFF",
  },
}); 
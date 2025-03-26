import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useApp } from "./context/AppContext";
import { QuestionnaireAnswers } from "./types";
import { questions } from "./data/questions";

interface QuestionaireProps {
  setSelected: (view: string) => void;
}

const Questionaire: React.FC<QuestionaireProps> = ({ setSelected }) => {
  const { completeQuestionnaire } = useApp();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuestionnaireAnswers>({
    age: "",
    gender: "",
    issues: [],
    preferences: [],
    therapistGender: "",
  });

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSelect = (key: keyof QuestionnaireAnswers, value: string) => {
    setAnswers({ ...answers, [key]: value });
    
    setTimeout(() => {
      if (step < questions.length - 1) {
        setStep(step + 1);
      } else {
        // navigate to profile page with answers
        completeQuestionnaire(answers);
        setSelected("therapists");
      }
    }, 500); // 500ms delay for better UX
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Welcome to Therapy</Text>
        <Text style={styles.subtitle}>
          Please answer a few questions to help us find the right therapist for you.
        </Text>

        {step > 0 && (
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text>Back</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.title}>{questions[step].question}</Text>
        {questions[step].options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.option,
              answers[questions[step].key as keyof QuestionnaireAnswers] === option && styles.selectedOption,
            ]}
            onPress={() => handleSelect(questions[step].key as keyof QuestionnaireAnswers, option)}
          >
            <Text>{option}</Text>
            {answers[questions[step].key as keyof QuestionnaireAnswers] === option && (
              <TouchableOpacity
                onPress={() => handleSelect(questions[step].key as keyof QuestionnaireAnswers, "")}
              >
                <Ionicons name="close-circle" size={20} color="gray" />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.button} onPress={() => handleSelect(questions[step].key as keyof QuestionnaireAnswers, "")}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#383838",
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 30,
  },
  backButton: {
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginBottom: 20,
    alignSelf: "flex-start",
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
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Questionaire;

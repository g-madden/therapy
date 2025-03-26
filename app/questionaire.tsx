import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { QuestionnaireAnswers } from "./types";
import { questions } from "./data/questions";

const MultiStepForm = ({ 
  setSelected 
}: { 
  setSelected: (answers: QuestionnaireAnswers) => void 
}) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<QuestionnaireAnswers>({
    gender: "",
    therapist: "",
  });

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSelect = (key: keyof QuestionnaireAnswers, value: string) => {
    setForm({ ...form, [key]: value });
    
    setTimeout(() => {
      if (step < questions.length - 1) {
        setStep(step + 1);
      } else {
        // navigate to profile page with answers
        setSelected(form);
      }
    }, 500); // 500ms delay for better UX
  };

  return (
    <View style={styles.container}>
      {step > 0 && (
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text>Back</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.title}>{questions[step].question}</Text>
      <FlatList
        data={questions[step].options}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.option,
              form[questions[step].key] === item && styles.selectedOption,
            ]}
            onPress={() => handleSelect(questions[step].key, item)}
          >
            <Text>{item}</Text>
            {form[questions[step].key] === item && (
              <TouchableOpacity
                onPress={() => handleSelect(questions[step].key, "")}
              >
                <Ionicons name="close-circle" size={20} color="gray" />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 20,
    backgroundColor: "white",
    height: "100%",
    paddingTop: 150,
  },
  backButton: {
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
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
  }
});

export default MultiStepForm;

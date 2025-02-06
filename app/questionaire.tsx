import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const questions = [
  {
    key: "gender",
    question: "What gender do you identify as?",
    options: [
      "Male",
      "Female",
      "Transgender Male",
      "Transgender Non-Binary",
      "Non-Binary",
      "Gender Queer",
      "Two-Spirit",
    ],
  },
  {
    key: "therapist",
    question: "What about your therapist?",
    options: ["Same gender as me", "Different gender", "Doesn't matter"],
  },
];

const MultiStepForm = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<{ [key: string]: string }>({});

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // navigate to profile page
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSelect = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
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

      <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
        <Ionicons name="arrow-forward" size={24} color="white" />
      </TouchableOpacity>
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
  },
  nextButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "black",
    padding: 15,
    borderRadius: 50,
  },
});

export default MultiStepForm;

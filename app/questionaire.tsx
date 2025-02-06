import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const genderOptions = [
  "Male",
  "Female",
  "Transgender Male",
  "Transgender Non-Binary",
  "Non-Binary",
  "Gender Queer",
  "Two-Spirit",
];

const therapistOptions = [
  "Same gender as me",
  "Different gender",
  "Doesn't matter",
];

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedTherapist, setSelectedTherapist] = useState<string | null>(
    null
  );

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Text>Back</Text>
      </TouchableOpacity>

      {step === 1 && (
        <>
          <Text style={styles.title}>What gender do you identify as?</Text>
          <FlatList
            data={genderOptions}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.option,
                  selectedGender === item && styles.selectedOption,
                ]}
                onPress={() => setSelectedGender(item)}
              >
                <Text>{item}</Text>
                {selectedGender === item && (
                  <TouchableOpacity onPress={() => setSelectedGender(null)}>
                    <Ionicons name="close-circle" size={20} color="gray" />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            )}
          />
        </>
      )}

      {step === 2 && (
        <>
          <Text style={styles.title}>What about your therapist?</Text>
          <FlatList
            data={therapistOptions}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.option,
                  selectedTherapist === item && styles.selectedOption,
                ]}
                onPress={() => setSelectedTherapist(item)}
              >
                <Text>{item}</Text>
                {selectedTherapist === item && (
                  <TouchableOpacity onPress={() => setSelectedTherapist(null)}>
                    <Ionicons name="close-circle" size={20} color="gray" />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            )}
          />
        </>
      )}

      <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
        <Ionicons name="arrow-forward" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 20,
    backgroundColor: "white",
    height: "100%",
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

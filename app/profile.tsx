import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

interface Profile {
  id: string;
  name: string;
  image: any;
  tags: string[];
}

const profiles: Profile[] = [
  {
    id: "1",
    name: "April Wilson",
    image: require("../assets/images/headshot.jpg"),
    tags: ["Muslim", "Spiritual", "Age match", "Gender match"],
  },
  {
    id: "2",
    name: "Jane Smith",
    image: require("../assets/images/profile2.png"),
    tags: ["Spiritual", "Ethnicity match", "Virtual Sessions", "Age match"],
  },
  {
    id: "3",
    name: "Alex Johnson",
    image: require("../assets/images/profile1.png"),
    tags: ["Spiritual", "Ethnicity match", "Virtual Sessions", "Age match"],
  },
];

const { height } = Dimensions.get("window");

const Profile = () => {
  const addToList = () => {
    console.log("Added to list");
  };

  const [data, setData] = useState(profiles);

  const renderItem = ({ item }: { item: Profile }) => (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.backgroundImage} />
        <View style={styles.transparent}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.byline}>Registered Clinical Counsellor</Text>
          <Text style={styles.byline}>10 years</Text>
        </View>
        <LinearGradient
          colors={["transparent", "rgba(56, 56, 56, 0.8)"]}
          style={styles.gradient}
        />
      </View>
      <View style={styles.overlay}>
        <View style={styles.tagsContainer}>
          <Text style={styles.reason}>Matched for you because</Text>
          {item.tags.map((tag, index) => (
            <Text key={index} style={styles.tag}>
              {tag}
            </Text>
          ))}
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add to my list</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      snapToAlignment="start"
      decelerationRate="fast"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: height, // Each item takes full screen height
    alignItems: "center",
    justifyContent: "flex-start",
  },
  backgroundImage: {
    // position: "absolute",
    // top: 0,
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: "100%",
    height: "75%",
    // position: "absolute",
    // top: 0,
  },
  transparent: {
    backgroundColor: "transparent",
    width: "100%",
    // height: "100%",
    position: "absolute",
    bottom: 10,
    paddingHorizontal: 24,
    zIndex: 1,
    marginBottom: 30,
    // justifyContent: "flex-end",
  },
  byline: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    marginBottom: 4,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 150,
  },
  overlay: {
    backgroundColor: "#383838",
    width: "100%",
    padding: 24,
    paddingHorizontal: 24,
    position: "absolute",
    bottom: 0,
  },
  name: {
    color: "white",
    fontSize: 40,
    marginBottom: 10,
  },
  reason: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 12,
    marginBottom: 10,
    textTransform: "uppercase",
    width: "100%",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  tag: {
    color: "#bbb",
    fontSize: 16,
    marginRight: 10,
    backgroundColor: "transparent",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#bbb",
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: "white",
    paddingVertical: 16,
    borderRadius: 100,
    width: 170,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    // paddingHorizontal: 24,
    // paddingVertical: 0,
  },
});

export default Profile;

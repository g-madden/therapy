import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, TouchableOpacity, Image, Text, Dimensions, StyleSheet } from 'react-native';
import { Practitioner } from './types';

const ProfileItem = ({item, addToList}: {item: Practitioner, addToList: (item: Practitioner) => void}) => {
    return (
    <View style={styles.itemContainer}>
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
        <TouchableOpacity 
          style={styles.button}
          onPress={() => addToList(item)}
        >
          <Text style={styles.buttonText}>Add to my list</Text>
        </TouchableOpacity>
      </View>
    </View>);
};

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: "#383838",
    },
    list: {
      flex: 1,
    },
    itemContainer: {
      width: "100%",
      height: height,
      alignItems: "center",
      justifyContent: "flex-start",
    },
    imageContainer: {
      width: "100%",
      height: "75%",
    },
    backgroundImage: {
      width: "100%",
      height: "100%",
    },
    transparent: {
      backgroundColor: "transparent",
      width: "100%",
      position: "absolute",
      bottom: 10,
      paddingHorizontal: 24,
      zIndex: 1,
      marginBottom: 30,
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
    },
    
  });

export default ProfileItem;
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import { Practitioner } from "./types";
import { profiles } from "./data/profiles";
import { useApp } from "./context/AppContext";

const { height } = Dimensions.get("window");

const Feed = () => {
  const { saveProfile, dismissProfile, feedIndex, setFeedIndex, savedProfiles } = useApp();
  const [data, setData] = useState<Practitioner[]>(profiles);
  const [showSuccess, setShowSuccess] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const flatListRef = React.useRef<FlatList>(null);

  // Only filter saved profiles when component mounts
  useEffect(() => {
    const filteredProfiles = profiles.filter(
      profile => !savedProfiles.some(saved => saved.id === profile.id)
    );
    setData(filteredProfiles);
  }, []); // Empty dependency array means this only runs on mount

  // Reset scroll position when returning to feed
  useEffect(() => {
    if (flatListRef.current && data.length > 0) {
      const safeIndex = Math.min(feedIndex, data.length - 1);
      flatListRef.current.scrollToOffset({
        offset: safeIndex * height,
        animated: false
      });
    }
  }, [feedIndex, data.length]);

  const showSuccessMessage = () => {
    setShowSuccess(true);
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setShowSuccess(false));
  };

  const addToList = (profile: Practitioner) => {
    saveProfile(profile);
    showSuccessMessage();
  };

  const handleScrollEnd = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const newIndex = Math.floor(offsetY / height);
    if (newIndex >= 0 && newIndex < data.length) {
      setFeedIndex(newIndex);
    }
  };

  const getItemLayout = (data: any, index: number) => ({
    length: height,
    offset: height * index,
    index,
  });

  const renderItem = ({ item }: { item: Practitioner }) => (
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
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate="fast"
        style={styles.list}
        onMomentumScrollEnd={handleScrollEnd}
        getItemLayout={getItemLayout}
      />
      {showSuccess && (
        <Animated.View 
          style={[
            styles.successToast,
            {
              opacity: fadeAnim,
              transform: [{
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0]
                })
              }]
            }
          ]}
        >
          <Text style={styles.successText}>Added to your list!</Text>
        </Animated.View>
      )}
    </View>
  );
};

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
  successToast: {
    position: "absolute",
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  successText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Feed;

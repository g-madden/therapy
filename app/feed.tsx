import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import { Practitioner } from "./types";
import { profiles } from "./data/profiles";
import { useApp } from "./context/AppContext";
import { PanGestureHandler } from "react-native-gesture-handler";
import ProfileItem from "./profileItem";

const { height, width } = Dimensions.get("window");

interface FeedProps {
  onNavigateToProfiles: () => void;
  slideAnim: Animated.Value;
}

const Feed: React.FC<FeedProps> = ({ onNavigateToProfiles, slideAnim }) => {
  const { saveProfile, feedIndex, setFeedIndex, savedProfiles } = useApp();
  const [data, setData] = useState<Practitioner[]>(profiles);
  const [showSuccess, setShowSuccess] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const flatListRef = React.useRef<FlatList>(null);

  const handleGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: slideAnim } }],
    { useNativeDriver: true }
  );

  const handleGestureEnd = (event: any) => {
    if (event.nativeEvent.translationX < -50) {
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        onNavigateToProfiles();
        slideAnim.setValue(0);
      });
    } else {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  // Filter profiles whenever savedProfiles changes
  useEffect(() => {
    const filteredProfiles = profiles.filter(
      profile => !savedProfiles.some(saved => saved.id === profile.id)
    );
    setData(filteredProfiles);
  }, [savedProfiles]); // Add savedProfiles as a dependency

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
    <ProfileItem item={item} addToList={addToList} />
  );

  return (
    <PanGestureHandler
      onGestureEvent={handleGestureEvent}
      onEnded={handleGestureEnd}
      activeOffsetX={[-20, 20]}
      simultaneousHandlers={flatListRef}
    >
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
    </PanGestureHandler>
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

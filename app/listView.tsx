import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
// import { Menu, Provider } from "react-native-paper";

interface Profile {
  id: string;
  name: string;
  image: any;
  dateAdded: string;
}

const savedProfiles: Profile[] = [
  {
    id: "1",
    name: "John Doe",
    image: require("../assets/images/profile1.png"),
    dateAdded: "Jan 5, 2025",
  },
  {
    id: "2",
    name: "Jane Smith",
    image: require("../assets/images/profile2.png"),
    dateAdded: "Jan 10, 2025",
  },
  {
    id: "3",
    name: "Alex Johnson",
    image: require("../assets/images/headshot.jpg"),
    dateAdded: "Jan 15, 2025",
  },
];

const SavedProfilesList: React.FC = () => {
  const [visibleMenu, setVisibleMenu] = useState<string | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>(savedProfiles);
  /*
   const openMenu = (id: string) => setVisibleMenu(id);
  const closeMenu = () => setVisibleMenu(null);

  const deleteProfile = (id: string) => {
    setProfiles(profiles.filter((profile) => profile.id !== id));
    closeMenu(); 
  };*/
  // console.log(profiles);
  const renderItem = ({ item }: { item: Profile }) => {
    // console.log("test");
    return (
      <View style={styles.itemContainer}>
        <Image source={item.image} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.date}>{item.dateAdded}</Text>
        </View>
        {/* <Menu
          visible={visibleMenu === item.id}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={() => openMenu(item.id)}>
              <Text style={styles.menuDots}>⋮</Text>
            </TouchableOpacity>
          }
        >
          <Menu.Item onPress={() => deleteProfile(item.id)} title="Delete" />
        </Menu> */}
        <Text style={styles.menuDots}>⋮</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Saved Profiles</Text>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1, // Ensures the container expands to fill the screen
    backgroundColor: "#fff",
    // using flex make this 150px from the top
    marginTop: 150,
  },
  header: {
    fontSize: 24,
    padding: 15,
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "transparent",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "gray",
  },
  menuDots: {
    fontSize: 24,
    paddingHorizontal: 10,
  },
});

export default SavedProfilesList;

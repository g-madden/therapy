import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ProfileView from "./feed";
import SavedProfilesList from "./savedProfiles";

const Stack = createStackNavigator();

const Navigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ProfileView"
          component={ProfileView}
          options={{ title: "Profile" }}
        />
        <Stack.Screen
          name="SavedProfiles"
          component={SavedProfilesList}
          options={{ title: "Saved Profiles" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

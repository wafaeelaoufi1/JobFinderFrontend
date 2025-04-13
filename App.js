import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";
import UploadResume from "./components/UploadResume";
import Home from "./components/Home";
import JobOffers from "./components/JobOffers";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="UploadResume" component={UploadResume} />
        <Stack.Screen name="JobOffers" component={JobOffers} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

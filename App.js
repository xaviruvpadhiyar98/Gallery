import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { StyleSheet } from "react-native";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Photo from "./screens/Photo";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer style={styles.header}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Photo"
          component={Photo}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1e1e1e",
    flex: 1,
  },
});

export default App;

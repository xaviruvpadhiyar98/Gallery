import React, { useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";

// Create an async function that takes in a string and returns a promise
const PostSecret = async (secret) => {
  const response = await fetch("http://192.168.0.106:8000/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      secret: secret,
    }),
  })
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => error);

  return response;
};

// Home Screen - The first screen that the user sees
export default function Login({ navigation }) {
  // The text input that the user types into
  const [text, onChangeText] = useState("");

  async function check_response(text) {
    onChangeText(text);
    if (text.length > 5) {
      console.log("Posting secret: " + text);
      const response = await PostSecret(text);
      console.log("Response: " + response.message);

      // If the response is "yes", navigate to the next screen
      if (response.message === "yes") {
        navigation.navigate("Details");
      }
    }
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => check_response(text)}
          value={text}
          maxLength={10}
          placeholder="Enter Secret Text here"
          placeholderTextColor="white"
          textAlign="center"
          spellCheck={false}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    alignItems: "center",
    justifyContent: "center",
  },
  // Style the input text box with most of the styling from the react-native docs
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
    color: "#fff",
  },
});

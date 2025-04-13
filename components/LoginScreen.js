import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Image } from "react-native";
import job from "../assets/job.png"; // Assurez-vous que le chemin est correct

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Login successful!");
      // Navigate to Home screen after successful login
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Login failed", error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Image
        source={job}
        style={{
          width: "100%",
          height: 200,
          alignSelf: "center",
          marginBottom: 20,
        }}
      />

      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email"
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />

      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text
        onPress={() => navigation.navigate("Signup")}
        style={styles.signupText}
      >
        Don't have an account? Sign up
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  signupText: {
    marginTop: 10,
    color: "#235f96", // Couleur du texte
  },
  button: {
    backgroundColor: "#235f96", // Couleur du fond
    padding: 10,
    borderRadius: 5,
    alignItems: "center", // Centrer le texte
    marginTop: 10,
  },
  buttonText: {
    color: "white", // Couleur du texte
    fontSize: 16,
  },
});

export default LoginScreen;

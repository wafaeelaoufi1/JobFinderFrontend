import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import job from "../assets/job.png"; // Assurez-vous que le chemin est correct

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User created:", userCredential.user);
      Alert.alert("Signup successful!");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("Signup failed", error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      {/* Ajout de l'image */}
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

      {/* Bouton personnalisé */}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Texte pour navigation vers le login */}
      <Text
        onPress={() => navigation.navigate("Login")}
        style={styles.signupText}
      >
        Already have an account? Log in
      </Text>
    </View>
  );
};

// Styles
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

export default SignupScreen;

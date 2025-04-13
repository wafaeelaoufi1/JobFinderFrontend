import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

const UploadResume = ({ navigation }) => {
  const [cvImage, setCvImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission required",
        "We need access to your media library to upload your CV."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setCvImage(result.assets[0]);
    }
  };

  const uploadImage = async () => {
    if (!cvImage) {
      Alert.alert("No CV selected", "Please select your CV first.");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", {
      uri: cvImage.uri,
      name: cvImage.fileName || "cv.jpg",
      type: cvImage.type || "image/jpeg",
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/process",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert(
        "Upload Failed",
        error.response?.data?.message ||
          "Could not upload your CV. Please try again."
      );
    } finally {
      setIsUploading(false);
      navigation.navigate("JobOffers"); // Navigate to JobOffers screen after upload
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#235f96" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Upload Your CV</Text>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          <Text style={styles.instructionText}>
            Upload a clear image of your CV/resume to find matching job
            opportunities
          </Text>

          {cvImage ? (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: cvImage.uri }}
                style={styles.cvImage}
                resizeMode="contain"
              />
              <TouchableOpacity onPress={pickImage} style={styles.changeButton}>
                <Text style={styles.changeButtonText}>Change Image</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={pickImage}
              style={styles.uploadPlaceholder}
            >
              <Ionicons name="cloud-upload" size={48} color="#235f96" />
              <Text style={styles.uploadText}>Select CV Image</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={uploadImage}
            style={[
              styles.uploadButton,
              isUploading && styles.uploadButtonDisabled,
            ]}
            disabled={!cvImage || isUploading}
          >
            <Text style={styles.uploadButtonText}>
              {isUploading ? "Processing..." : "Find Matching Jobs"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Our Activities Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nos Services</Text>
            <View style={styles.sectionDivider} />
          </View>

          <View style={styles.activityCard}>
            <Text style={styles.activityTitle}>🤖 Matching Intelligent</Text>
            <Text style={styles.activityText}>
              Notre algorithme analyse compétences, expériences et aspirations
              pour des recommandations précises.
            </Text>
          </View>

          <View style={styles.activityCard}>
            <Text style={styles.activityTitle}>🔍 Offres Exclusives</Text>
            <Text style={styles.activityText}>
              Accès à des opportunités chez des startups vérifiées avant
              qu'elles ne soient publiques.
            </Text>
          </View>

          <View style={styles.activityCard}>
            <Text style={styles.activityTitle}>⚡ Process Rapide</Text>
            <Text style={styles.activityText}>
              Réponse sous 48h pour 90% des candidatures grâce à notre
              automatisation.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#235f96",
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  instructionText: {
    fontSize: 16,
    color: "#4b5563",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },
  uploadPlaceholder: {
    width: "70%",
    height: 100,
    borderWidth: 2,
    borderColor: "#235f96",
    borderStyle: "dashed",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f7ff",
    marginBottom: 25,
  },
  uploadText: {
    marginTop: 10,
    fontSize: 16,
    color: "#235f96",
    fontWeight: "500",
  },
  imageContainer: {
    width: "100%",
    marginBottom: 25,
    alignItems: "center",
  },
  cvImage: {
    width: "70%",
    height: 100,
    borderRadius: 8,
    marginBottom: 15,
  },
  changeButton: {
    padding: 8,
  },
  changeButtonText: {
    color: "#235f96",
    fontWeight: "500",
  },
  uploadButton: {
    backgroundColor: "#235f96",
    width: "100%",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
  },
  uploadButtonDisabled: {
    backgroundColor: "#9ca3af",
  },
  uploadButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#235f96", // Couleur principale
    marginBottom: 8,
    lineHeight: 32,
  },
  heroSubtitle: {
    fontSize: 15,
    color: "#4b5563",
    lineHeight: 22,
  },
  primaryButton: {
    backgroundColor: "#235f96",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
    elevation: 3,
    shadowColor: "#235f96",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#235f96",
    marginBottom: 8,
  },
  sectionDivider: {
    height: 3,
    width: 50,
    backgroundColor: "#235f96",
    borderRadius: 2,
  },
  sectionText: {
    fontSize: 15,
    color: "#4b5563",
    lineHeight: 24,
  },
  activityCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#235f96",
    elevation: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#235f96",
    marginBottom: 8,
  },
  activityText: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 22,
  },
  bottomButton: {
    marginTop: 10,
    marginBottom: 50,
  },
});

export default UploadResume;

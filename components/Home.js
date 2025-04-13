import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>Find your dream job here</Text>
            <Text>
              The smart platform that matches your profile with innovative
              startups.
            </Text>
          </View>
          <Image
            source={{
              uri: "https://csicompanies.com/wp-content/uploads/elementor/thumbs/Job-Seeker-FAQs--r3rqa71z5xneqaiddpddwx4aa5qc5vd7ly1f3ejqw0.png",
            }}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </View>

        {/* Get Started Button */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("UploadResume")}
        >
          <Text style={styles.primaryButtonText}>Get started</Text>
        </TouchableOpacity>

        {/* About Us Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>About Us</Text>
            <View style={styles.sectionDivider} />
          </View>
          <Text style={styles.sectionText}>
            Our revolutionary platform uses AI to analyze your resume and
            recommend the best opportunities in high-growth startups.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    paddingHorizontal: 24,
    marginLeft: 10,
    marginRight: 10,
  },
  heroContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },
  heroTextContainer: {
    flex: 1,
    marginRight: 20,
  },
  heroImage: {
    width: 200,
    height: 200,
    marginLeft: 20,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#235f96",
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

export default HomeScreen;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
  Platform,
} from "react-native";
import axios from "axios";

const JobOffers = () => {
  const [jobOffers, setJobOffers] = useState([]);
  const [offerCount, setOfferCount] = useState(0); // NEW
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const API_URL = "http://localhost:5000/results";

  const fetchJobOffers = async () => {
    try {
      const response = await axios.get(API_URL);
      const data = response.data;

      if (data && Array.isArray(data.results)) {
        setOfferCount(data.count || data.results.length); // NEW
        const transformedData = data.results.map((item, index) => ({
          id: index.toString(),
          title: item.extracted_text?.job_title || "Title not specified",
          company: item.extracted_text?.company || "Company not specified",
          description:
            item.extracted_text?.description || "No description available",
          education:
            item.extracted_text?.education || "Education level not specified",
          experience:
            item.extracted_text?.experience || "Experience not specified",
          contract:
            item.extracted_text?.contract_type || "Contract type not specified",
          location: item.extracted_text?.location || "Location not specified",
          skills: item.skills?.join(" - ") || "Skills not specified",
          date:
            new Date(item.uploaded_at).toLocaleDateString() ||
            "Date not available",
        }));
        setJobOffers(transformedData);
      } else {
        Alert.alert("Warning", "Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching job offers:", error);
      Alert.alert("Error", "Failed to load job offers");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchJobOffers();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchJobOffers();
  };

  const JobCard = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.company}>{item.company}</Text>
      <Text style={styles.description}>{item.description}</Text>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Education:</Text>
        <Text style={styles.detailValue}>{item.education}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Experience:</Text>
        <Text style={styles.detailValue}>{item.experience}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Contract:</Text>
        <Text style={[styles.detailValue, styles.contract]}>
          {item.contract}
        </Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Location:</Text>
        <Text style={styles.detailValue}>{item.location}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Skills:</Text>
        <Text style={styles.detailValue}>{item.skills}</Text>
      </View>

      <Text style={styles.date}>Posted: {item.date}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#235f96" />
        <Text style={styles.loadingText}>Loading job offers...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Job Opportunities</Text>
      <Text style={styles.subHeader}>
        {offerCount} job offer{offerCount !== 1 ? "s" : ""} found
      </Text>
      <FlatList
        data={jobOffers}
        renderItem={({ item }) => <JobCard item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#235f96"]}
            tintColor="#235f96"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No job opportunities available</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#235f96",
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    color: "#235f96",
    fontSize: 16,
    textAlign: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#235f96",
    marginBottom: 5,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#235f96",
    marginBottom: 5,
  },
  company: {
    fontSize: 16,
    color: "#235f96",
    marginBottom: 5,
    fontStyle: "italic",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#235f96",
    width: 120,
  },
  detailValue: {
    fontSize: 14,
    color: "#555",
    flex: 1,
  },
  contract: {
    fontWeight: "bold",
    color: "#235f96",
  },
  date: {
    fontSize: 12,
    color: "#888",
    marginTop: 10,
    textAlign: "right",
  },
});

export default JobOffers;

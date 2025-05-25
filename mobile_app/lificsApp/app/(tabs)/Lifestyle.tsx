import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Lifestyle = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.topNav}>
        <Text style={styles.navTitle}>Lifestyle Dashboard</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Analytics Overview Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Analytics Overview</Text>
            <View style={styles.iconRow}>
              <TouchableOpacity style={styles.icon}>
                <FontAwesome name="share" size={20} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon}>
                <FontAwesome name="bullseye" size={20} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon}>
                <FontAwesome name="download" size={20} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon}>
                <FontAwesome name="expand" size={20} color="#333" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.cardBody}>
            <Text style={styles.placeholderText}>[Insert lifestyle insights or charts here]</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Lifestyle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  topNav: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  navTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  iconRow: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 6,
  },
  cardBody: {
    marginTop: 16,
  },
  placeholderText: {
    color: '#aaa',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

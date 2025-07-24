import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  FontAwesome5,
  Feather,
  MaterialIcons,
  Ionicons,
} from '@expo/vector-icons';

const CareerScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Analytics Overview</Text>
        <View style={styles.actions}>
          <TouchableOpacity>
            <Feather name="share-2" size={20} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome5 name="bullseye" size={20} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="download" size={20} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="fullscreen" size={20} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* You can place your chart or analytics cards here */}
      <View style={styles.body}>
        <Text style={styles.placeholder}>Analytics content goes here...</Text>
      </View>
    </View>
  );
};

export default CareerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fc',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: 15,
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 3,
  },
  placeholder: {
    fontSize: 16,
    color: '#666',
  },
});

import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  Feather,
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

// Use explicit route paths valid for your app's folder structure
const routeMap = {
  Health: '/health',
  Career: '/(tabs)/career',  // Updated to valid route
  Lifestyle: '/Lifestyle',
  Learning: '/Learning',
} as const;

const Topbar = () => {
  const router = useRouter();
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <View style={styles.topbarContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[
          { label: 'Dashboard', icon: <Feather name="layout" size={20} color="#333" />, route: '/dashboard' },
          { label: 'Health', icon: <Feather name="activity" size={20} color="#333" />, route: '/health' },
          { label: 'Finance', icon: <FontAwesome5 name="money-bill-wave" size={20} color="#333" />, route: '/' },
          { label: 'Career', icon: <FontAwesome5 name="book" size={20} color="#333" />, route: '/(tabs)/career' },  // ✅ updated route
          { label: 'Lifestyle', icon: <MaterialIcons name="directions-run" size={20} color="#333" />, route: '/Lifestyle' },
          { label: 'Learning', icon: <MaterialCommunityIcons name="school" size={20} color="#333" />, route: '/Learning' },
        ].map(({ label, icon, route }) => (
          <TouchableOpacity
            key={label}
            style={styles.navItem}
            onPress={() => router.push(route as any)} // 👈 safely push known route strings
          >
            {icon}
            <Text style={styles.label}>{label}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            setIsAnalyticsOpen(!isAnalyticsOpen);
            setIsSettingsOpen(false);
          }}>
          <Feather name="bar-chart-2" size={20} color="#333" />
          <Text style={styles.label}>Analytics</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            setIsSettingsOpen(!isSettingsOpen);
            setIsAnalyticsOpen(false);
          }}>
          <Feather name="settings" size={20} color="#333" />
          <Text style={styles.label}>Settings</Text>
        </TouchableOpacity>
      </ScrollView>

      {isAnalyticsOpen && (
        <View style={styles.dropdown}>
          {Object.keys(routeMap).map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => {
                router.push(routeMap[item as keyof typeof routeMap]);
                setIsAnalyticsOpen(false);
              }}>
              <Text style={styles.dropdownItem}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {isSettingsOpen && (
        <View style={styles.dropdown}>
          {['General', 'Domains', 'Integrations', 'Billing', 'Payouts'].map((item) => (
            <TouchableOpacity key={item} onPress={() => console.log(item)}>
              <Text style={styles.dropdownItem}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default Topbar;

const styles = StyleSheet.create({
  topbarContainer: {
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 10,
    elevation: 4,
  },
  navItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 20,
  },
  label: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
  },
  dropdown: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginTop: 5,
  },
  dropdownItem: {
    fontSize: 14,
    paddingVertical: 4,
    color: '#333',
  },
});

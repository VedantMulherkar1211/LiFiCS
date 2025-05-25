// components/Topbar.tsx
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

type AllowedRoutes = '/health' | '/career' | '/Lifestyle' | '/Learning';

const routeMap: Record<string, AllowedRoutes> = {
  Health: '/health',
  Career: '/career',
  Lifestyle: '/Lifestyle',
  Learning: '/Learning',
};

const Topbar = () => {
  const router = useRouter();
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <View style={styles.topbarContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/dashboard')}>
          <Feather name="layout" size={20} color="#333" />
          <Text style={styles.label}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/health')}>
          <Feather name="activity" size={20} color="#333" />
          <Text style={styles.label}>Health</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/')}>
          <FontAwesome5 name="money-bill-wave" size={20} color="#333" />
          <Text style={styles.label}>Finance</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/')}>
          <FontAwesome5 name="book" size={20} color="#333" />
          <Text style={styles.label}>Career</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/Lifestyle')}>
          <MaterialIcons name="directions-run" size={20} color="#333" />
          <Text style={styles.label}>Lifestyle</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/Learning')}>
          <MaterialCommunityIcons name="school" size={20} color="#333" />
          <Text style={styles.label}>Learning</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            setIsAnalyticsOpen(!isAnalyticsOpen);
            setIsSettingsOpen(false);
          }}
        >
          <Feather name="bar-chart-2" size={20} color="#333" />
          <Text style={styles.label}>Analytics</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            setIsSettingsOpen(!isSettingsOpen);
            setIsAnalyticsOpen(false);
          }}
        >
          <Feather name="settings" size={20} color="#333" />
          <Text style={styles.label}>Settings</Text>
        </TouchableOpacity>
      </ScrollView>

      {isAnalyticsOpen && (
        <View style={styles.dropdown}>
          {['Health', 'Lifestyle', 'Learning'].map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => {
                router.push(routeMap[item] as typeof routeMap[keyof typeof routeMap]);
                setIsAnalyticsOpen(false);
              }}
            >
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

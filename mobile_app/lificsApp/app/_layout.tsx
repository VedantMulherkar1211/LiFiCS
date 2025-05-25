import React from 'react';
import { Stack } from 'expo-router';
import Topbar from '../app/(tabs)/topbar'; // Corrected path
import { SafeAreaView, View } from 'react-native';

export default function RootLayout() {
  return (
   <SafeAreaView>
  <Topbar />
  <Stack />
</SafeAreaView>

  );
}

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// Conditionally import Victory components
const VictoryModule = Platform.OS === 'web'
  ? require('victory')
  : require('victory-native');
const { VictoryPie, VictoryBar } = VictoryModule;

// Type for chart data from API
type ChartDataItem = {
  name: string;
  value: number;
};

type VictoryFormattedData = {
  x: string;
  y: number;
};

const DashboardScreen = () => {
  const [pieChartData, setPieChartData] = useState<VictoryFormattedData[]>([]);
  const [barChartData] = useState<VictoryFormattedData[]>([
    { x: 'Jan', y: 400 },
    { x: 'Feb', y: 300 },
    { x: 'Mar', y: 200 },
    { x: 'Apr', y: 500 },
  ]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://mocki.io/v1/9cc14d64-f727-49df-83b2-0e82748cce6d'
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data: ChartDataItem[] = await response.json();

        const transformed: VictoryFormattedData[] = data.map((item: ChartDataItem) => ({
          x: item.name,
          y: item.value,
        }));

        setPieChartData(transformed);
        setLoading(false);
      } catch (err: any) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.title}>{error ? 'Error' : 'Loading...'}</Text>
        <Text>
          {error
            ? `Error fetching data: ${error.message}`
            : 'Loading pie chart data...'}
        </Text>
        <ActivityIndicator size="large" color="#8884d8" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Analytics Overview</Text>

      <View style={styles.actions}>
        <FontAwesome name="share" size={20} style={styles.icon} />
        <FontAwesome name="bullseye" size={20} style={styles.icon} />
        <FontAwesome name="download" size={20} style={styles.icon} />
        <FontAwesome name="expand" size={20} style={styles.icon} />
      </View>

      <VictoryPie
        data={pieChartData}
        colorScale={COLORS}
        innerRadius={50}
        labelRadius={({ innerRadius }: any) => innerRadius + 20}
        style={{
          labels: { fontSize: 14, fill: '#000' },
        }}
        height={300}
      />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Card 1</Text>
        <VictoryBar
          data={barChartData}
          style={{ data: { fill: '#8884d8' } }}
          height={200}
        />
        <View style={styles.list}>
          <Text>• Item 1: Value A</Text>
          <Text>• Item 2: Value B</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Card 2</Text>
        <Text>Total: 120</Text>
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'flex-start',
    gap: 10,
  },
  icon: {
    marginHorizontal: 8,
    color: '#8884d8',
  },
  card: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#fafafa',
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: '600',
  },
  list: {
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
});

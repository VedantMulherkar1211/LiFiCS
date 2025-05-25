import React from 'react';
import { Platform } from 'react-native';


const VictoryChartModule = Platform.OS === 'web'
  ? require('victory') // For web
  : require('victory-native'); // For iOS/Android


const { VictoryBar, VictoryChart, VictoryTheme } = VictoryChartModule;

const MyChartComponent = () => (
  <VictoryChart theme={VictoryTheme.material}>
    <VictoryBar data={[{ x: 'A', y: 1 }, { x: 'B', y: 3 }]} />
  </VictoryChart>
);

export default MyChartComponent;

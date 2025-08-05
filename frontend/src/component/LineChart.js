import React, { useState, useEffect } from 'react';
import ApexChart from 'react-apexcharts';
import { generateMinuteWiseTimeSeries, getRandom } from '../component/utils';

const LineChart = () => {
  const baseTime = new Date('12/12/2016 00:20:00').getTime();
  const [series, setSeries] = useState([
    {
      name: 'Running',
      data: generateMinuteWiseTimeSeries(baseTime, 12, { min: 30, max: 110 }),
    },
    {
      name: 'Waiting',
      data: generateMinuteWiseTimeSeries(baseTime, 12, { min: 30, max: 110 }),
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const lastX = series[0].data[series[0].data.length - 1][0];
      const updatedSeries = series.map((s) => ({
        ...s,
        data: [...s.data.slice(1), [lastX + 300000, getRandom(1)]],
      }));
      setSeries(updatedSeries);
    }, 3000);

    return () => clearInterval(interval);
  }, [series]);

  const options = {
    chart: {
      height: 350,
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: { speed: 1000 },
      },
    },
    xaxis: { type: 'datetime', range: 2700000 },
    stroke: { curve: 'straight', width: 5 },
    dataLabels: { enabled: false },
    title: {
      text: 'Processes',
      align: 'left',
      style: { fontSize: '12px' },
    },
    subtitle: {
      text: '20',
      floating: true,
      align: 'right',
      style: { fontSize: '22px' },
    },
    legend: {
      show: true,
      floating: true,
      horizontalAlign: 'left',
      position: 'top',
    },
  };

  return <ApexChart options={options} series={series} type="line" height={350} />;
};

export default LineChart;
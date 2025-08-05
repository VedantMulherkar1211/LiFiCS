import React, { useEffect, useState } from 'react';
import ApexChart from 'react-apexcharts';
import { generateMinuteWiseTimeSeries, getRangeRandom, getRandom } from '../component/utils';

const ColumnChart = () => {
  const baseTime = new Date('12/12/2016 00:20:00').getTime();
  const [series, setSeries] = useState([
    {
      name: 'Load Average',
      data: generateMinuteWiseTimeSeries(baseTime, 12, { min: 10, max: 110 }),
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const lastX = series[0].data[series[0].data.length - 1][0];
      const newSeries = [
        {
          name: 'Load Average',
          data: [...series[0].data.slice(1), [lastX + 300000, getRandom(1)]],
        },
      ];
      setSeries(newSeries);
    }, 3000);

    return () => clearInterval(interval);
  }, [series]);

  const options = {
    chart: {
      height: 350,
      type: 'bar',
      toolbar: { show: false },
      animations: { enabled: false },
    },
    xaxis: {
      type: 'datetime',
      range: 2700000,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.5,
        opacityFrom: 1,
        opacityTo: 0.8,
        stops: [0, 100],
      },
    },
    dataLabels: { enabled: false },
    stroke: { width: 0 },
    title: {
      text: 'Load Average',
      align: 'left',
      style: { fontSize: '12px' },
    },
    subtitle: {
      text: '20%',
      floating: true,
      align: 'right',
      style: { fontSize: '22px' },
    },
  };

  return <ApexChart options={options} series={series} type="bar" height={350} />;
};

export default ColumnChart;
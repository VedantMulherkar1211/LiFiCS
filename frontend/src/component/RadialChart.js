import React, { useEffect, useState } from 'react';
import ApexChart from 'react-apexcharts';
import { getRangeRandom } from '../component/utils';

const RadialChart = () => {
  const [series, setSeries] = useState([71, 63]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeries([getRangeRandom(10, 100), getRangeRandom(10, 100)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const options = {
    chart: { type: 'radialBar', height: 250 },
    plotOptions: {
      radialBar: {
        hollow: { size: '48%' },
        track: { background: '#40475D', strokeWidth: '10%' },
      },
    },
    labels: ['Device 1', 'Device 2'],
    legend: {
      show: true,
      formatter: (val, opts) => `${val} - ${opts.w.globals.series[opts.seriesIndex]}%`,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        stops: [0, 100],
      },
    },
  };

  return <ApexChart options={options} series={series} type="radialBar" height={250} />;
};

export default RadialChart;
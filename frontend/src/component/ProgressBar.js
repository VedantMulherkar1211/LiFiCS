// src/component/ProgressBar.js
import React, { useEffect, useState } from 'react';
import ApexChart from 'react-apexcharts';
import { getRangeRandom } from './utils';

const ProgressBar = ({ label, value, title, color = '#FCCF31' }) => {
  // support either label OR title as the text shown
  const text = label || title || 'Process';
  // if parent passed value, use it; otherwise use a random value (legacy behavior)
  const [val, setVal] = useState(typeof value === 'number' ? value : getRangeRandom(10, 100));

  useEffect(() => {
    // only run random updates if parent didn't provide a static 'value'
    if (typeof value !== 'number') {
      const interval = setInterval(() => {
        setVal(getRangeRandom(10, 100));
      }, 3000);
      return () => clearInterval(interval);
    } else {
      // if parent provides value prop, keep val in sync
      setVal(value);
    }
  }, [value]);

  const options = {
    chart: {
      type: 'bar',
      height: 70,
      stacked: true,
      sparkline: { enabled: true },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '20%',
        colors: {
          backgroundBarColors: ['#40475D'],
        },
      },
    },
    title: {
      floating: true,
      text: text,
      offsetX: -10,
      offsetY: 5,
    },
    subtitle: {
      floating: true,
      align: 'right',
      text: `${val}%`,
      style: { fontSize: '20px' },
    },
    xaxis: { categories: [text] },
    yaxis: { max: 100 },
    colors: [color],
  };

  const series = [{ name: text, data: [val] }];

  return <ApexChart options={options} series={series} type="bar" height={70} />;
};

export default ProgressBar;

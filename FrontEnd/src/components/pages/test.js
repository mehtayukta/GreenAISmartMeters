import React from 'react';
import { Chart } from 'react-google-charts';

function TestComponent() {
  const chartData = [
    ["Month_Year", "Week Number", "Device", "Value"],
    ["Jan-2014 - Week 1", '1', 'Dev10', 15],
    ["Jan-2014 - Week 2", '2', 'Dev12', 18],
    ["Feb-2014 - Week 1", '1', 'Dev10', 14],
    ["Feb-2014 - Week 2", '2', 'Dev12', 20],
    // Add more data as needed
  ];

  const chartOptions = {
    title: 'Grouped Categories with 2 Series',
    hAxis: {
      title: 'Month-Week',
      slantedText: true,
      slantedTextAngle: 45,
    },
    vAxis: {
      title: 'Values',
    },
    chartArea: { width: '70%' },
  };

  return (
    <Chart
      width={'100%'}
      height={'400px'}
      chartType="ColumnChart"
      loader={<div>Loading Chart...</div>}
      data={chartData}
      options={chartOptions}
    />
  );
}

export default TestComponent;

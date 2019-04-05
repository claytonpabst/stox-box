import React, { useState } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import Tab from './Tab';
import './StockChart.css';

const StockChart = ({
  currentDayStocks,
  threeMonthStocks,
  oneYearStocks,
  activeTabChanged,
}) => {
  const [activeTab, setActiveTab] = useState('Current Day');

  const setActiveTabFn = (label) => {
    setActiveTab(label);
    activeTabChanged(label);
  };

  const buildChartLines = (graphData) => {
    if (graphData.length) {
      let lines = [];
      const stock = graphData[0];
      for (const key in stock) {
        if (key !== 'name' && key !== 'color') {
          lines.push(
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              strokeWidth={3}
              stroke={getRandomColor()}
            />
          );
        }
      }
      return lines;
    }
  };

  const graphData = (() => {
    switch (activeTab) {
      case 'Current Day':
        return currentDayStocks;
      case '3 Months':
        return threeMonthStocks;
      case '1 Year':
        return oneYearStocks;
      default:
        return currentDayStocks;
    }
  })();

  return (
    <>
      <div className="graph-tabs-wrapper">
        <Tab
          activeTab={activeTab}
          setActiveTab={setActiveTabFn}
          label="Current Day"
        />
        <Tab
          activeTab={activeTab}
          setActiveTab={setActiveTabFn}
          label="3 Months"
        />
        <Tab
          activeTab={activeTab}
          setActiveTab={setActiveTabFn}
          label="1 Year"
        />
      </div>
      <ResponsiveContainer className="stocks-graph" width="100%" height={600}>
        <LineChart data={graphData}>
          <XAxis dataKey="name" />
          <YAxis domain={['dataMin', 'dataMax']} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          {buildChartLines(graphData)}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default StockChart;

function getRandomColor() {
  let f_position = getRandomNumber(1, 3);
  let x = getRandomNumber(1, 9).toString();
  let y = getRandomNumber(1, 9).toString();
  let color;
  switch (f_position) {
    case 1:
      color = '#f' + x + y;
      break;
    case 2:
      color = '#' + x + 'f' + y;
      break;
    case 3:
      color = '#' + x + y + 'f';
      break;
    default:
      return '#f' + x + y;
  }
  return color;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

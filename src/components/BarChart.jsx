import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement } from "chart.js/auto";

// ChartJS.register(BarElement);

const BarChart = ({ chartData }) => {
  const options = {
    responsive: true,
  };
  return <Bar data={chartData} options={options} />;
};

export default BarChart;

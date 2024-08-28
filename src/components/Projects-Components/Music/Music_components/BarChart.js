
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  // Sample data for the horizontal bar chart
  const data = {
    labels: ['Guitar', 'Piano', 'Bongo', 'Vocals'], // Example labels
    datasets: [
      {
        data: [8, 1.5, 10, 10.5], // Values for each label
        backgroundColor: [
          '#1E96FC',
          '#FFFCF9',
          '#EF476F',
          '#FFD166',
        ]
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    indexAxis: 'x', // This makes the chart horizontal
    plugins: {
      legend: {
        display: false, // This hides the legend
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label || 'Data'}: ${context.raw}`, // Optional: fallback label if needed
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='height-of-music-bar-graph'>
      <h3>Years of Experience</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;

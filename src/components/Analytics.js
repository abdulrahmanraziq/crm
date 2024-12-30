import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import axios from 'axios';
import "./Analytics.css";
import { Sidebar } from './Sidebar';

// Import necessary Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [customerData, setCustomerData] = useState(null);
  const [feedbackData, setFeedbackData] = useState(null);

  useEffect(() => {
    const fetchCustomerAnalytics = async () => {
      const res = await axios.get('https://crm-4-nojq.onrender.com/api/analytics/customers');
      setCustomerData(res.data);
    };

    const fetchFeedbackAnalytics = async () => {
      const res = await axios.get('https://crm-4-nojq.onrender.com/api/analytics/feedback');
      setFeedbackData(res.data);
    };

    fetchCustomerAnalytics();
    fetchFeedbackAnalytics();
  }, []);

  if (!customerData || !feedbackData) return <p>Loading...</p>;

  // Prepare data for customer purchase trends chart
  const purchaseTrendsData = {
    labels: customerData.purchaseTrends.map((item) => `${item._id.month}/${item._id.year}`),
    datasets: [
      {
        label: 'Total Purchases',
        data: customerData.purchaseTrends.map((item) => item.totalPurchases),
        backgroundColor: '#42A5F5'
      }
    ]
  };

  // Prepare data for feedback trends chart
  const feedbackTrendsData = {
    labels: feedbackData.feedbackTrends.map((item) => `${item._id.month}/${item._id.year}`),
    datasets: [
      {
        label: 'Feedback Count',
        data: feedbackData.feedbackTrends.map((item) => item.count),
        backgroundColor: '#66BB6A'
      }
    ]
  };

  return (
    <div className="analytics-container">
       <Sidebar />
      <h2 className='mt-3'>Customer Analytics</h2>

      <div className="chart">
        <h3>Total Customers: {customerData.totalCustomers}</h3>
        <h4>Popular Fabric Preferences:</h4>
        <ul>
          {customerData.popularPreferences.map((item) => (
            <li key={item._id}>
              {item._id} - {item.count} customers
            </li>
          ))}
        </ul>
      </div>

      <div className="chart">
        <h3>Purchase Trends</h3>
        <Line data={purchaseTrendsData} options={{ maintainAspectRatio: false }} />
      </div>

      <h2>Feedback Analytics</h2>

      <div className="chart">
        <h3>Total Feedback Submissions: {feedbackData.totalFeedback}</h3>
        <h3>Feedback Trends</h3>
        <Bar data={feedbackTrendsData} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default Analytics;

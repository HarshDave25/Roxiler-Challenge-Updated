import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "./BarChart.css";

const BarChart = () => {
  const [month, setMonth] = useState(3);
  const [range, setRange] = useState({});

  const months = useMemo(() => [
    "January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"
  ].map((name, index) => ({ name, number: index + 1 })), []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/bar-chart/${month}`);
        const updatedRanges = data.reduce((acc, item) => {
          const price = item._id;
          const rangeKey = Object.keys(acc).find(key => {
            const [min, max] = key.split('-').map(Number);
            return price >= min && price <= (max || Infinity);
          }) || "901-more";
          acc[rangeKey] += item.count;
          return acc;
        }, {
          "0-100": 0, "101-200": 0, "201-300": 0, "301-400": 0,
          "401-500": 0, "501-600": 0, "601-700": 0, "701-800": 0,
          "801-900": 0, "901-more": 0
        });
        setRange(updatedRanges);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [month]);

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h4>Statistics for</h4>
        <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
          {months.map(({ name, number }) => (
            <option key={number} value={number}>{name}</option>
          ))}
        </select>
      </div>
      <div className="chart">
        <Bar data={{ labels: Object.keys(range), datasets: [{ label: "Items", data: Object.values(range), backgroundColor: "rgba(75, 192, 192, 0.6)", borderColor: "#4bc0c0", borderWidth: 1 }] }} />
      </div>
    </div>
  );
};
export default BarChart;
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import ChartsHeader from '../../components/ChartsHeader';
import axios from "axios";
import { baseUrl } from "../../../constants/base_urls";
import moment from "moment";

const Area = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(`${baseUrl}user/users`);
      setUsers(response?.data?.users);
    };

    fetchUsers();
  }, []);

  const countsByDay = users.reduce((acc, user) => {
    const dayKey = moment(user.createdAt).format('ddd_MMM-YYYY');
    acc[dayKey] = (acc[dayKey] || 0) + 1;
    return acc;
  }, {});

  const par = Object.entries(countsByDay).map(([day, count]) => ({
    day,
    count,
  }));

  const options = {
    chart: {
      id: "day"
    },
    xaxis: {
      categories: par?.map((res) => res.day),
    },
    fill: {
      colors: ['#F44336'],
    },
    stroke: {
      show: true,
      curve: 'smooth',
      lineCap: 'butt',
      colors: ['#F44336'],
      width: 2,
      dashArray: 0,
    },
    tooltip: {
      enabled: true,
      enabledOnSeries: undefined,
      shared: true,
      followCursor: false,
      intersect: false,
      inverseOrder: false,
      custom: undefined,
      fillSeriesColor: false,
      theme: false,
      style: {
        fontSize: '12px',

      },
      onDatasetHover: {
        highlightDataSeries: false,
      },
      marker: {
        show: true,
      },
      fixed: {
        enabled: false,
        position: 'topRight',
        offsetX: 0,
        offsetY: 0,
      },
    },
    grid: {
      show: false,
    },
  };
  const series = [
    {
      name: "count",
      data: par?.map((res) => res.count),
    },
  ];

  return (
    <div className="p-10 rounded-3xl">
      <ChartsHeader category="Users" title="Total users count and day registered" />
      <Chart
          options={options}
          series={series}
          type="area"
          width="500"
        />
    </div>
  );
};

export default Area;

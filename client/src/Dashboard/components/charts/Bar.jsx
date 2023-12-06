import React, { Component } from "react";
import Chart from "react-apexcharts";
import ChartsHeader from '../../components/ChartsHeader';

const Bar = () => {
  const options = {
    chart: {
      type: 'bar'
    },
    plotOptions: {
      bar: {
        horizontal: false
      }
    },
    series: [{
      data: [{
        x: 'category A',
        y: 10
      }, {
        x: 'category B',
        y: 18
      }, {
        x: 'category C',
        y: 13
      }]
    }]
  }


  return (
    <div className="p-10 rounded-3xl">
      <ChartsHeader category="Bar" title="Inflation Rate in percentage" />
      <Chart
          options={options}
          series={options.series}
          type={options.chart.type}
          width="500"
        />
    </div>
  );
};

export default Bar;

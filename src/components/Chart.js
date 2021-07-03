import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

export const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {

  const [dailyData, setDailyData] = useState([]);
  useEffect(() => {
    async function fetchDailyData() {
      const response = await fetch('https://covid19.mathdro.id/api/daily')
      const d_Data = await response.json();

      const modifiedData = d_Data.map((data) => ({
        confirmed: data.confirmed.total,
        deaths: data.deaths.total,
        date: data.reportDate,

      }))

      setDailyData(modifiedData);
    }
    fetchDailyData();
  }, [])

  const options = {
    scales: {
      yAxes: [{
        gridLines: {
          display: false,
          color: "#FFFFFF"
        }
      }],
      xAxes: [{
        gridLines: {
          display: false,
          color: "#FFFFFF"
        }
      }]
    }
  };

  const LineChart = (
    dailyData.length !== 0 ? (

      <Line

        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [{
            data: dailyData.map(({ confirmed }) => confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            pointBackgroundColor: 'black',
            fill: true,
          }, {
            data: dailyData.map(({ deaths }) => deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgraoundColor: 'rgba(255, 0, 0, 0.5)',
            pointBackgroundColor: 'black',
            fill: true,
          }],

        }}
        options={options}
      />
    ) : null
  );

  const barChart = (
    confirmed ? (
      <Bar
        data={{
          labels: ['confirmed Cases', 'Recovered', 'Deaths'],
          datasets: [{
            label: 'Peoples',
            backgroundColor: ['blue', 'green', 'red'],
            data: [confirmed.value, recovered.value, deaths.value]
          }],

        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `current state in ${country}` }
        }}
      />
    ) : null
  )

  return (
    <div>
      {country ? barChart : LineChart}
    </div>
  )
}

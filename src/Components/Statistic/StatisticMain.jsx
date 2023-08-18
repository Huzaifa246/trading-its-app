import React from 'react';
import { Link } from 'react-router-dom';
import StaticChart from './Chart/StaticChart';
// import './statistic.css';';
import StatisticTable from './MainTable/StatisticTable';
import FixedBar from './../FixedBar/index';

export const StatisticMain = () => {
  return (
    <>
      <div style={{ marginTop: "1rem" }}></div>
      <div className="col-12">
        <h2
          style={{
            textAlign: "center",
            color: "white",
            fontSize: "24px"
          }}
        >
          Statistic</h2>
      </div>
      <StaticChart />
      <StatisticTable />
      <FixedBar />
    </>
  )
}

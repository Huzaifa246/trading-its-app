import React from 'react';
import { Link } from 'react-router-dom';
import StaticChart from './Chart/StaticChart';
// import './statistic.css';';
import StatisticTable from './MainTable/StatisticTable';
import FixedBar from './../FixedBar/index';

export const StatisticMain = () => {
  const data = [
    {
        id: 1,
        name: "Binance coin",
        abbr: "BNB",
        icon: "https://s3.cointelegraph.com/storage/uploads/view/f90d3fbc91f706a937b53ce93894b6d3.png",
        value: "$363.23",
        increment: "+5.67%"
    }
]
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
      <div style={{
        padding: ".5rem 1rem .5rem"
      }}>
        <div style={{
          padding: ".5rem",
        }}>
          {data?.map(item => (
            <div key={item.id} style={{
              display: "flex",
              alignItems: "center",
              color: "white",
              gap: "1rem",
              marginBottom: "1rem",
              justifyContent: "space-between"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <img src={item?.icon} alt={item?.name} style={{ width: "11vw", height: "11vw", objectFit: "cover" }} />
                <div>
                  <h2 style={{ fontSize: "4vw", fontWeight: 600 }}>{item?.name}</h2>
                  <span style={{ color: "#a8a8a8", fontSize: "3.7vw" }}>{item?.value}</span>
                </div>
              </div>
              <div>
                <h2 style={{ fontSize: "4vw", fontWeight: 700 }}>{`$${item?.value}`}</h2>
                <span style={{ color: "#21c8d7", fontSize: "3vw" }}>{item?.increment}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <Stateheader /> */}
      <StaticChart />
      <StatisticTable />
      <FixedBar />
    </>
  )
}

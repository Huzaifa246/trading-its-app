import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import StaticChart from './Chart/StaticChart';
import StatisticTable from './MainTable/StatisticTable';
import FixedBar from './../FixedBar/index';

export const StatisticMain = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get("name");
    const graphValuesString = searchParams.get("graphValues");
    const graphValues = JSON.parse(graphValuesString);
    const optionId = searchParams.get("optionId");

    return (
        <>
            <div className="padding-top"></div>
            <div style={{ marginTop: "1rem", height: "80vh" }}>
                <StaticChart name={name} graphValues={graphValues} />
                <StatisticTable optionId={optionId} />
            </div>
        </>
    );
};

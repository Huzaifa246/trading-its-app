import React, { useState, useEffect } from 'react';
import styles from "./index.module.css";
import { useSelector } from "react-redux";
import Loader from './../Loader/index';
import { formatDateTime } from '../../helpers/DataFormat/DateFormat';
import fetchAllInvestment from './../../helpers/getApis/getAllInvestment';

function AllInvestment() {
    const userDetails = useSelector((state) => state.userInfoStore.userDetails);
    const userId = userDetails?.data?._id;
    const [selectedOption, setSelectedOption] = useState(""); // Store the selected option
    const [investmentData, setInvestmentData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const fetchInvestmentData = async (investtype) => {
        try {
            const response = await fetchAllInvestment(userId, investtype);
            console.log(response.data, "Investment Data");
            setInvestmentData(response.data);
        } catch (error) {
            console.error("Error fetching investment data:", error);
        }
    };

    const handleOptionClick = (optionId, investtype) => {
        setSelectedOption(optionId); // Set the selected option
        fetchInvestmentData(investtype);
    };

    return (
        <>
            <div>
                <div className={styles.container}>
                    <div
                        className={`${styles.item} ${selectedOption === "current" ? styles.selected : ''}`}
                        onClick={() => handleOptionClick("current", "current")}
                        style={{
                            border: "5px solid #037782",
                            borderRadius: "20px",
                        }}
                    >
                        <span>Current Data</span>
                    </div>
                    <div
                        className={`${styles.item} ${selectedOption === "past" ? styles.selected : ''}`}
                        onClick={() => handleOptionClick("past", "past")}
                        style={{
                            border: "5px solid #037782",
                            borderRadius: "20px",
                        }}
                    >
                        <span>Past Data</span>
                    </div>
                </div >

                <div style={{
                    padding: ".5rem 1rem .5rem"
                }}>
                    <div style={{ padding: ".5rem" }}>
                        {investmentData?.length > 0 ? (
                            investmentData.map(item => (
                                <div
                                    key={item._id}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        color: "white",
                                        gap: "1rem",
                                        marginBottom: "1rem",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                        <img
                                            src={"https://s3.cointelegraph.com/storage/uploads/view/f90d3fbc91f706a937b53ce93894b6d3.png"}
                                            alt={item?.investment_name?.name}
                                            style={{ width: "11vw", height: "11vw", objectFit: "cover" }}
                                        />
                                        <div>
                                            <h2 style={{ fontSize: "4vw", fontWeight: 600 }}>
                                                {item?.investment_name?.name}
                                            </h2>
                                            <span style={{ color: "#a8a8a8", fontSize: "3.7vw" }}>
                                                {formatDateTime(item?.invesAt)}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 style={{ fontSize: "4vw", fontWeight: 700 }}>{`$${item?.payment}`}</h2>
                                        <span style={{ color: "#21c8d7", fontSize: "3vw" }}>
                                            {item?.profitPercentage.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={{ color: "white", textAlign: 'center' }}>Click button to get its data</p>
                        )}
                    </div>
                </div>
            </div >
        </>
    )
}

export default AllInvestment

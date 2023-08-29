import React, { useState, useEffect } from 'react';
import styles from "./index.module.css";
import { useSelector } from "react-redux";
import Loader from './../Loader/index';
import { formatDateTime } from '../../helpers/DataFormat/DateFormat';
import fetchAllInvestment from './../../helpers/getApis/getAllInvestment';
import fetchAllTradeOption from '../../helpers/getApis/getAllOptions';

function AllInvestment() {
    const userDetails = useSelector((state) => state.userInfoStore.userDetails);
    const userId = userDetails?.data?._id;
    const [selectedTimeOption, setSelectedTimeOption] = useState("current"); // Store the selected time option
    const [selectedTradeOption, setSelectedTradeOption] = useState("");
    const [investmentData, setInvestmentData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [showAll, setShowAll] = useState(true);
    const [tradeOptions, setTradeOptions] = useState([]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true); // Set loading to true when fetching data
            try {
                const decryptedData = await fetchAllTradeOption();
                setTradeOptions(decryptedData.data);
                fetchInvestmentData(selectedTimeOption, selectedTradeOption);
            } catch (error) {
                console.error("Error fetching trade options:", error);
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        }
        fetchData();
    }, [userId]);
    useEffect(() => {
        fetchInvestmentData(selectedTimeOption, selectedTradeOption);
    }, [selectedTimeOption, selectedTradeOption]);

    const fetchInvestmentData = async (timeOption, tradeOption) => {
        try {
            let response;

            if ((timeOption === "current" || timeOption === "past") && tradeOption !== "") {
                response = await fetchAllInvestment(userId, timeOption, tradeOption);
            } else if (timeOption === "current" || timeOption === "past") {
                response = await fetchAllInvestment(userId, timeOption);
            } else if (tradeOption !== "" && (timeOption === "current" || timeOption === "past")) {
                response = await fetchAllInvestment(userId, timeOption, tradeOption);
            } else {
                return
            }

            setInvestmentData(response.data);
        } catch (error) {
            console.error("Error fetching investment data:", error);
        } finally {
            setLoading(false); // Set loading to false after data is fetched or if there's an error
        }
    };

    const handleTimeOptionClick = (timeOption) => {
        setSelectedTimeOption(timeOption);
        setSelectedTradeOption("");
        setShowAll(false);
        setLoading(true);
    };

    const handleTradeOptionClick = (tradeOption) => {
        setSelectedTradeOption(tradeOption);
        setLoading(true);
    };

    const handleShowAllClick = () => {
        setSelectedTimeOption("");
        setSelectedTradeOption("");
        setShowAll(true);
        setLoading(true);
    };


    return (
        <>
            <div style={{ marginBottom: "100px" }}>
                <h1 className='txt-center-white'>
                    All Investment
                </h1>
                <div className={styles.container}>
                    <div
                        className={`${styles.item} ${selectedTimeOption === "current" ? styles.selected : ''}`}
                        onClick={() => handleTimeOptionClick("current")}
                        style={{
                            border: "5px solid #037782",
                            borderRadius: "20px",
                        }}
                    >
                        <span>Current Data</span>
                    </div>
                    <div
                        className={`${styles.item} ${selectedTimeOption === "past" ? styles.selected : ''}`}
                        onClick={() => handleTimeOptionClick("past")}
                        style={{
                            border: "5px solid #037782",
                            borderRadius: "20px",
                        }}
                    >
                        <span>Past Data</span>
                    </div>
                </div >
                <div className={styles.container}>
                    <div
                        // className={`${styles.item} ${(selectedTimeOption === "current" || selectedTimeOption === "past" || showAll) ? styles.selected : ''}`}
                        className={`${styles.item} ${((selectedTimeOption === "current" || selectedTimeOption === "past") && !selectedTradeOption) || showAll ? styles.selected : ''}`}
                        onClick={handleShowAllClick}
                        style={{ borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px" }}
                    >
                        <span>All</span>
                    </div>
                    {tradeOptions?.map(item => (
                        <div
                            key={item?._id}
                            className={`${styles.item} ${selectedTradeOption === item?._id ? styles.selected : ''}`}
                            onClick={() => handleTradeOptionClick(item?._id)}
                            disabled={showAll}
                        >
                            <span>{item?.name.toUpperCase()}</span>
                        </div>
                    ))}
                </div>


                <div style={{
                    padding: ".5rem 1rem .5rem"
                }}>
                    <div style={{ padding: ".5rem" }}>
                        {isLoading ? (
                            <Loader />
                        ) : (
                            investmentData?.length > 0 ? (
                                investmentData?.map(item => (
                                    (selectedTradeOption === "" || item.investment_name._id === selectedTradeOption) && (
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
                                    )
                                ))
                            ) : (
                                <p className='txt-center-white'>Click button to get its data</p>
                            )
                        )}
                    </div>
                </div>
            </div >
        </>
    )
}

export default AllInvestment

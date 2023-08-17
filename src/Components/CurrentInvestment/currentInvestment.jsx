import React, { useState, useEffect, useRef } from 'react';
import { savedDataString } from '../../helpers/UserDetails/UserDetails';
import styles from "./index.module.css";
import fetchAllTradeOption from '../../helpers/getApis/getAllOptions';
import FixedBar from '../FixedBar';
import { formatDateTime } from './../../helpers/DataFormat/DateFormat';
import fetchAllInvestment from '../../helpers/getApis/getAllInvestment';


const CurrentInvest = () => {
    const fixedBarRef = useRef(null);
    const savedDataProfile = JSON.parse(savedDataString);
    const userId = savedDataProfile?.data?._id;

    const [tradeOptions, setTradeOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState("64cbebc3087e64a53520e596");
    const [investmentData, setInvestmentData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const decryptedData = await fetchAllTradeOption();
            setTradeOptions(decryptedData.data);
            // console.log(decryptedData.data, "Trade Options");
            fetchInvestmentData(selectedOption);
        }
        fetchData();
    }, [selectedOption]);

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const investtype = 'current';
    //             const response = await fetchAllInvestment(userId, investtype, "");
    //             console.log(response.data);
    //             setInvestmentData(response.data);
    //         } catch (error) {
    //             console.error("Error fetching investment data:", error);
    //         }
    //     }

    //     fetchData();
    // }, []);
    const fetchInvestmentData = async (selectedOptionId) => {
        setSelectedOption(selectedOptionId);
        try {
            const investtype = 'current';
            const response = await fetchAllInvestment(userId, investtype, selectedOptionId);
            // console.log(response.data, "Investment Data");
            if (response.data) {
                setInvestmentData(response.data);
                // setSelectedOption(selectedOptionId);
            }
        } catch (error) {
            console.error("Error fetching investment data:", error);
        }
    };

    // useEffect(() => {
    //     console.log(investmentData, "Investment Data Updated"); // Debug
    // }, [investmentData]);

    return (
        <>
            <div className={styles.container}>
                {tradeOptions?.map(item => (
                    <div
                        key={item?._id}
                        className={`${styles.item} ${selectedOption === item?._id ? styles.selected : ''}`}
                        onClick={() => fetchInvestmentData(item?._id)}
                    >
                        <span>{item?.name.toUpperCase()}</span>
                    </div>
                ))}

            </div>
            <div style={{
                padding: ".5rem 1rem .5rem"
            }}>
                <div style={{
                    padding: ".5rem",
                }}>
                    {investmentData?.length > 0 ? (
                        investmentData.map(item => {
                            if (selectedOption === "" || item.investment_name._id === selectedOption) {
                                return (
                                    <div key={item._id} style={{
                                        display: "flex",
                                        alignItems: "center",
                                        color: "white",
                                        gap: "1rem",
                                        marginBottom: "1rem",
                                        justifyContent: "space-between"
                                    }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                            <img src={"https://s3.cointelegraph.com/storage/uploads/view/f90d3fbc91f706a937b53ce93894b6d3.png"} alt={item?.investment_name?.name} style={{ width: "11vw", height: "11vw", objectFit: "cover" }} />
                                            <div>
                                                <h2 style={{ fontSize: "4vw", fontWeight: 600 }}>{item?.investment_name?.name}</h2>
                                                <span style={{ color: "#a8a8a8", fontSize: "3.7vw" }}>{formatDateTime(item?.invesAt)}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h2 style={{ fontSize: "4vw", fontWeight: 700 }}>{`$${item?.payment}`}</h2>
                                            <span style={{ color: "#21c8d7", fontSize: "3vw" }}>{item?.status}</span>
                                        </div>
                                    </div>
                                );
                            } else {
                                <p style={{color: "white"}}>No data found</p>
                                return;
                            }
                        })
                    ) : (
                        <p style={{color: "white"}}>No data found</p>
                    )}
                </div>
            </div>
            <FixedBar fixedBarRef={fixedBarRef} />
        </>
    )
}

export default CurrentInvest;
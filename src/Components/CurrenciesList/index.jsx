import React, { useState, useEffect } from 'react';
import { formatDateTime } from "../../helpers/DataFormat/DateFormat";
import fetchAllInvestment from "../../helpers/getApis/getAllInvestment";
import { useSelector } from "react-redux";
import Loader from '../Loader';

const CurrenciesList = () => {

    const userDetails = useSelector((state) => state.userInfoStore.userDetails);
    const userId = userDetails?.data?._id;
    const [investmentData, setInvestmentData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const investtype = 'current';
                const response = await fetchAllInvestment(userId, investtype);
                setInvestmentData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching investment data:", error);
            }
        }
        fetchData();
    }, [userId]);
    const firstThreeInvestments = investmentData?.slice(0, 3);

    return (
        <>
            <div style={{
                padding: ".5rem 1rem .5rem"
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: ".4rem"
                }}>
                    <h6 style={{ color: "white", fontSize: "4vw", fontWeight: 600 }}>Current Investments</h6>
                    <a href="/allInvestment">
                        <h6 style={{ color: "white", fontSize: "4vw", fontWeight: 500 }}>See All</h6>
                    </a>
                </div>
                <div style={{
                    padding: ".5rem",
                    position: "relative",
                    minHeight: "100px"
                }}>
                    {isLoading ? (
                        <Loader />
                    ) : investmentData?.length > 0 ? (
                        firstThreeInvestments?.map(item => (
                            <div key={item.id} style={{
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
                                        <h2 style={{ fontSize: "3.7vw", fontWeight: 600 }}>{item?.investment_name?.name}</h2>
                                        <span style={{ color: "#a8a8a8", fontSize: "3.4vw" }}>{formatDateTime(item?.invesAt)}</span>
                                    </div>
                                </div>
                                <div>
                                    <h2 style={{ fontSize: "3.7vw", fontWeight: 700 }}>{`$${item?.payment}`}</h2>
                                    {/* <span style={{ color: "#21c8d7", fontSize: "3vw" }}>{item?.status}</span> */}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='txt-center-white'>No Data Found</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default CurrenciesList
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Chart from "react-apexcharts"
import { FaArrowTrendUp } from 'react-icons/fa6';
import fetchAllTradeOption from './../../helpers/getApis/getAllOptions';
import React, { useState, useEffect, useRef } from 'react';
import fetchCharUserTrade from '../../helpers/getApis/pastALLinvest';
import { Link } from 'react-router-dom';
import Loader from '../Loader';

const Portfolio = () => {
    const [tradeOptions, setTradeOptions] = useState([]);
    const [pastUserTradeData, setPastUserTradeData] = useState([]);
    const [isChartLoading, setIsChartLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const decryptedData = await fetchAllTradeOption();
                setTradeOptions(decryptedData.data);
            } catch (error) {
                console.error("Error fetching trade options:", error);
            } finally {
                setIsChartLoading(false); // Set loading to false whether fetching succeeds or fails
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                setIsChartLoading(true)
                let startDate = new Date();
                let endDate = new Date();
                startDate.setDate(startDate.getDate() - 7);

                // Convert dates to ISO string format
                startDate = startDate.toISOString().split('T')[0];
                endDate = endDate.toISOString().split('T')[0];

                const fetchedData = [];

                // Fetch past user trade data for each trade option
                for (const tradeOption of tradeOptions) {
                    const tradeId = tradeOption._id;
                    const response = await fetchCharUserTrade(tradeId, startDate, endDate);
                    // console.log(response, "res from cur file for trade option");

                    if (response?.data) {
                        const groupedPayments = {};

                        // Group payments by date and sum them up
                        for (const paymentData of response?.data) {
                            const date = paymentData.invesAt.split('T')[0];
                            if (groupedPayments[date]) {
                                groupedPayments[date] += paymentData.payment;
                            } else {
                                groupedPayments[date] = paymentData.payment;
                            }
                        }

                        fetchedData.push({ tradeOption, groupedPayments });
                    } else {
                        console.log(`No data found for trade option ${tradeOption.name}`);
                    }
                }
                setPastUserTradeData(fetchedData);
            } catch (error) {
                console.error("Error fetching past user trade data:", error);
            } finally {
                setIsChartLoading(false)
            }
        }

        if (tradeOptions?.length > 0) {
            fetchData();
        }
    }, [tradeOptions]);

    // if (isChartLoading) {
    //     return <Loader />;
    // }

    if (pastUserTradeData.length <= 0) {
        return null; // Don't render anything if there is no data
    }
    return (

        <>

            <>
                <h6 style={{ color: "white", fontSize: "4vw", fontWeight: 600, padding: ".2rem 1rem 0" }}>Portfolio</h6>
                <Swiper
                    slidesPerView={"auto"}
                    spaceBetween={10}
                    className="mySwiper"
                    style={{
                        padding: ".5rem 1rem",
                        position: "relative"
                    }}
                >

                    {isChartLoading ? (
                        <Loader />
                    ) :
                        pastUserTradeData?.map((item, index) => {

                            const tradeOption = item?.tradeOption;
                            const paymentData = item?.groupedPayments;

                            const investAtDates = Object.keys(paymentData);
                            // Sort investAtDates in ascending order
                            const sortedInvestAtDates = investAtDates.sort((a, b) => new Date(a) - new Date(b));

                            const correspondingTradeData = pastUserTradeData.find(data => data.tradeOption._id === tradeOption._id);
                            const paymentValues = investAtDates.map(date => correspondingTradeData.groupedPayments[date] || 0);

                            const option = tradeOptions.find(item => item?._id === tradeOption?._id);

                            const Currentlysale = {
                                series: [
                                    {
                                        name: "investments",
                                        data: paymentValues || [6, 10],
                                    },
                                ],
                                options: {
                                    chart: {
                                        opacity: 1,
                                        type: "area",
                                        toolbar: {
                                            show: false,
                                        },
                                    },
                                    dataLabels: {
                                        enabled: false,
                                    },
                                    stroke: {
                                        width: [3, 3],
                                        curve: "smooth",
                                    },
                                    xaxis: {
                                        offsetX: 0,
                                        offsetY: 0,
                                        categories: sortedInvestAtDates,
                                        labels: {
                                            low: 0,
                                            offsetX: 0,
                                            show: false,
                                        },
                                        axisBorder: {
                                            low: 0,
                                            offsetX: 0,
                                            show: false,
                                        },
                                        axisTicks: {
                                            show: false,
                                        },
                                    },

                                    yaxis: {
                                        show: false,
                                    },
                                    grid: {
                                        show: false,
                                    },
                                    colors: [tradeOption.color || "#f39900" || "#637feb" || "#26a17b"],
                                    fill: {
                                        opacity: [0.5, 0.25, 1],
                                    },

                                    legend: {
                                        show: false,
                                    },
                                    tooltip: {
                                        x: {
                                            format: "MM",
                                        },
                                    },
                                },
                            };
                            return (
                                <>
                                    <SwiperSlide key={tradeOption._id} style={{
                                        background: "#181f2d",
                                        boxShadow: "0 0 20px rgba(8, 21, 66, 0.05)",
                                        borderRadius: "16px",
                                        padding: 0,
                                        overflow: "hidden",
                                        cursor: "pointer",
                                        width: "35vw",
                                        transition: "250ms",
                                        // position: "relative"
                                    }}
                                    >
                                        {/* {isChartLoading ? (
                                        <Loader />
                                    ) : ( */}
                                        <>
                                            <div style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: ".5rem",
                                                padding: ".5rem .75rem 0"
                                            }}>
                                                <Link
                                                    to={`/statistic?name=${encodeURIComponent(option?.name)}&graphValues=${encodeURIComponent(JSON.stringify(paymentValues))}&optionId=${option?._id}`}
                                                    style={{
                                                        textDecoration: 'none', display: "flex",
                                                        alignIxtems: "center", gap: "1rem"
                                                    }}
                                                >
                                                    < img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png" alt={option?.value} style={{ width: "7vw" }} />
                                                    <h5 style={{ fontSize: "3.9vw", fontWeight: "900", marginBottom: "0", color: "white" }}>{option?.name}</h5>
                                                </Link>
                                            </div>
                                            <div style={{
                                                color: "white",
                                                marginTop: "0rem",
                                                padding: ".6rem 1rem",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                gap: "1rem"
                                            }}>
                                                <h4 style={{ fontSize: "4vw" }}>$8,322</h4>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        color: "#21c8d7",
                                                        fontSize: "2.2vw",
                                                        alignItems: "center",
                                                        gap: ".2rem"
                                                    }}>
                                                    <span>+5.23%</span>
                                                    <FaArrowTrendUp />
                                                </div>
                                            </div>
                                            <div style={{
                                                color: "white",
                                                display: "flex",
                                                alignItems: "center",
                                                fontSize: "2.8vw",
                                                padding: "0 1rem",
                                                gap: ".5rem"
                                            }}>
                                                <div style={{
                                                    padding: ".25rem .5rem",
                                                    borderRadius: "20px",
                                                    background: "rgba(33, 200, 215, 0.21)",
                                                    color: "#21c8d7"
                                                }}>$233</div>
                                                <span style={{ color: "#a8a8a8" }}>since 24h</span>
                                            </div>
                                            <div style={{ width: "100%", marginTop: "-4.5rem" }}>
                                                <Chart
                                                    // id="chart-currently"
                                                    id={`chart-${tradeOption._id}`}
                                                    options={Currentlysale.options} series={Currentlysale.series} type="area" height={"140px"} width={"118%"} style={{
                                                        transform: "translateX(-8%) translateY(44px)",
                                                    }} />
                                            </div>
                                        </>
                                        {/* )} */}
                                    </SwiperSlide>
                                </>
                            )
                        })}
                </Swiper>
            </>
        </>
    )
}

export default Portfolio;
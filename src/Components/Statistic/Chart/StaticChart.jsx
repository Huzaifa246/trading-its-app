import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Chart from "react-apexcharts"
import { MdArrowBackIosNew } from 'react-icons/md';
import "./StaticChart.css";
const StaticChart = ({ name, graphValues }) => {

    const currenciesData = [
        {
            name: "Ethereum",
            img: "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Ethereum-ETH-icon.png",
            value: "eth",
            color: "#27cae1",
            graph_values: [15, 12, 13, 10, 12, 14, 16, 16, 8]
        },
    ]

    return (
        <>
            <div className="row">
                <div className="col-2 d-flex align-items-center justify-content-center" style={{ color: "white" }}>
                    <a href="/">
                        <MdArrowBackIosNew />
                    </a>
                </div>
                <div className="col-8">
                    <h2 style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: "24px"
                    }}>
                        {name}
                    </h2>
                </div>
            </div>

            <div style={{ marginTop: "1rem" }}>
                <Swiper
                    // slidesPerView={"3"}
                    // spaceBetween={0}
                    className="mySwiper"
                >
                    {currenciesData.map(item => {

                        const Currentlysale = {
                            series: [
                                {
                                    name: "investment",
                                    data: graphValues || item.graph_values,
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
                                    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
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
                                colors: [item.color],
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
                            <SwiperSlide key={item.value} style={{
                                // background: "#181f2d",
                                // boxShadow: "0 0 20px rgba(8, 21, 66, 0.05)",
                                padding: 0,
                                overflow: "hidden",
                                cursor: "pointer",
                                width: "100%",
                                transition: "250ms"
                            }}>
                                <div style={{ width: "100%", marginTop: "-4.5rem" }}>
                                    <Chart id="chart-currently" options={Currentlysale.options} series={Currentlysale.series} type="area" minHeight={"200px"} height={"250px"} width={"118%"} style={{
                                        transform: "translateX(-8%) translateY(26px)",
                                    }} />
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </>
    )
}

export default StaticChart;
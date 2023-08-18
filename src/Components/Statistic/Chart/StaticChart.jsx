import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Chart from "react-apexcharts"
import { FaArrowTrendUp } from 'react-icons/fa6';

const StaticChart = () => {
    const currenciesData = [
        // {
        //     name: "Bitcoin",
        //     img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png",
        //     value: "btc",
        //     color: "#f39900",
        //     graph_values: [13, 15, 25, 20, 30, 26, 24, 15, 16, 20]
        // },
        {
            name: "Ethereum",
            img: "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Ethereum-ETH-icon.png",
            value: "eth",
            color: "#27cae1",
            graph_values: [15, 12, 13, 10, 12, 14, 16, 16, 8]
        },
        // {
        //     name: "USDT",
        //     img: "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Tether-USDT-icon.png",
        //     value: "usdt",
        //     color: "#26a17b",
        //     graph_values: [8, 9, 16, 7, 20, 8, 12, 14]
        // },
    ]

    return (
        <div style={{marginTop: "1rem"}}>
            <Swiper
                slidesPerView={"1"}
                spaceBetween={0}
                className="mySwiper"
            >
                {currenciesData.map(item => {

                    const Currentlysale = {
                        series: [
                            {
                                name: "crypto price",
                                data: item.graph_values,
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
                            width: "35vw",
                            transition: "250ms"
                        }}>
                            <div style={{ width: "100%", marginTop: "-4.5rem" }}>
                                <Chart id="chart-currently" options={Currentlysale.options} series={Currentlysale.series} type="area" minHeight={"200px"} height={"250px"} width={"118%"} style={{
                                    transform: "translateX(-8%) translateY(46px)",
                                }} />
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}

export default StaticChart;
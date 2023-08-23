import Navbar from "../Components/Navbar"
import Actions from "../Components/Actions";
import Balance from "../Components/Balance";
import CurrenciesList from "../Components/CurrenciesList";
import FixedBar from "../Components/FixedBar";
import { useEffect, useRef, useState } from "react";
import Portfolio from "../Components/Portfolio";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const fixedBarRef = useRef(null);
    const [paddingBottom, setPaddingBottom] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token")
            setPaddingBottom(fixedBarRef?.current?.offsetHeight)
            if (!token) {
                navigate("/login")
            }
        }
    }, [])

    return (
        <div style={{ paddingBottom: `${paddingBottom}px` }}>
            <Navbar />
            <Balance />
            <Actions />
            <Portfolio />
            <CurrenciesList />
            <FixedBar fixedBarRef={fixedBarRef} />
        </div>
    )
}

export default Home
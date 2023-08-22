import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CurrentInvest from "./Components/CurrentInvestment/currentInvestment";
import PastInvestment from './Components/PastInvestment/PastInvestment';
import { StatisticMain } from "./Components/Statistic/StatisticMain";
import 'bootstrap/dist/css/bootstrap.min.css';
import { setUserDetails } from "./store/userSlice";
import { decryptData } from "./helpers/encryption_decryption/Decryption";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import axios from "axios";


const App = () => {
  // const userDetails = useSelector((state) => state.userInfoStore.userDetails);
  const dispatch = useDispatch();
  let token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get(
          `${import.meta.env.VITE_APP_API}/api/users/auth/${token}`
        )
        .then((response) => {
          if (token) {
            dispatch(setUserDetails(decryptData(response.data.data)));
            console.log(response, "responsee");
          }
          else{
            localStorage.removeItem("token");
            return;
          }
        })
        .catch((error) => {
          console.log("micc", error);
          localStorage.removeItem("token");
          return;
        });
    }
  }, [token]);

  // console.log(userDetails)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/currentInvest" element={<CurrentInvest />} />
        <Route path="/pastInvest" element={<PastInvestment />} />
        <Route path="/statistic" element={<StatisticMain />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
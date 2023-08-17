import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CurrentInvest from "./Components/CurrentInvestment/currentInvestment";
import PastInvestment from './Components/PastInvestment/PastInvestment';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/currentInvest" element={<CurrentInvest />} />
        <Route path="/pastInvest" element={<PastInvestment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
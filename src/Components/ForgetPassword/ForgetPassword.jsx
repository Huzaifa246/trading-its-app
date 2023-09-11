import { useEffect, useState } from "react";
import logo from "../../../public/logo.png";
import { Link } from "react-router-dom";
import "./forgetPass.css"
import Loader from "../Loader";

function ForgetPassword() {
    const [email, setEmail] = useState("")
    const [showLoader, setShowLoader] = useState(false);
    const [loginError, setLoginError] = useState("");


    const loginHandler = (e) => {
        e.preventDefault()

        if (!email) {
            setLoginError("Invalid Email")
            return
        }
        const credentials = {
            email
        }

    }
    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: 'column',
                justifyContent: "space-around",
                minHeight: `${window.innerHeight}px`,
                padding: "1rem",
                color: "white"
            }}>
                <img src={logo} alt="logo" style={{ filter: "drop-shadow(9px 0px 50px rgba(33, 200, 215, 0.5))", width: "60vw", margin: "1rem auto" }} />
                <form style={{ maxWidth: "450px", margin: "0 auto", width: "100%" }} onSubmit={loginHandler}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "1.3rem",
                        gap: ".4rem",
                        fontSize: "1rem"
                    }}>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" name="email" id="email" placeholder='enail@gmail.com' className='input_field w-100' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <button className='submit_btn'>
                        Forget Password
                    </button>
                    {
                        showLoader
                        &&
                        <Loader />
                    }
                    {
                        loginError
                        &&
                        <p style={{ margin: "1rem 0 0", color: "red", textAlign: "center" }}>{loginError}</p>
                    }
                </form>
            </div >
        </>
    )
}

export default ForgetPassword

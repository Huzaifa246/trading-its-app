import { useEffect, useState } from "react";
import logo from "../../../public/logo.png";
import { Link } from "react-router-dom";
import "./forgetPass.css";
import Loader from "../Loader";
import OtpInput from "react-otp-input";
import { FcPrevious } from "react-icons/fc";
import ForgetPasswordApi from "./../../helpers/PostApis/ForgetPassword";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [otpValue, setOtpValue] = useState("");
  const [timer, setTimer] = useState(60);
  const [wrongEmailCode, setWrongEmailCode] = useState(false);
  const [passwordResetPage, setPasswordResetPage] = useState(false);

  const isValidEmail = (email) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const credentials = {
    email,
  };

  const handleEmailVerification = () => {
    if (!email) {
      setLoginError("Invalid Email");
      return;
    }
    if (!isValidEmail(email)) {
      setLoginError("Invalid Email Format");
      setTimeout(() => {
        setLoginError("");
      }, 3000);
      return;
    }

    // Call your API for email verification here
    // You can use setShowLoader(true) to show a loading indicator during the API call.

    // Example:
    setShowLoader(true);
    ForgetPasswordApi(credentials)
      .then((response) => {
        console.log(response, "ok")
        if (response.success) {
          // If the API call is successful and email verification is sent, update the state to show the OTP input.
          setPasswordResetPage(true);
        } else {
          console.log(error, "error")
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
        setLoginError("An error occurred while sending the email verification."); // Set a generic error message
      })
      .finally(() => {
        setShowLoader(false);
      });

    // For now, I'm simulating an API call with a setTimeout.
    setShowLoader(true); // Simulate loading
    setTimeout(() => {
      // Simulate API response after 2 seconds
      setShowLoader(false);
      setTimer(60);
      setOtpValue(""); // Clear OTP input
      setPasswordResetPage(false);
    }, 2000);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          minHeight: `${window.innerHeight}px`,
          padding: "1rem",
          color: "white",
        }}
      >
        <img
          src={logo}
          alt="logo"
          style={{
            filter: "drop-shadow(9px 0px 50px rgba(33, 200, 215, 0.5))",
            width: "60vw",
            margin: "1rem auto",
          }}
        />
        <form
          style={{ maxWidth: "450px", margin: "0 auto", width: "100%" }}
          onSubmit={(e) => e.preventDefault()} // Prevent form submission for now
        >
          <h4 className="mb-3 h1-wdraw" style={{ textTransform: "uppercase" }}>Reset Password</h4>
          <p>Enter your email address and we'll send you an OTP to reset your password</p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "1.3rem",
              gap: ".4rem",
              fontSize: "1rem",
            }}
          >
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email@gmail.com"
              className="forgetPass-style"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            className="submit_btn"
            onClick={handleEmailVerification}
            disabled={showLoader} // Disable the button during loading
          >
            Forget Password
          </button>
          {showLoader && <Loader />}
          {loginError && (
            <p
              style={{
                margin: "1rem 0 0",
                color: "red",
                textAlign: "center",
              }}
            >
              {loginError}
            </p>
          )}
        </form>
        {passwordResetPage && (
          <>
            <h4 className="mb-3 h1-wdraw">Enter OTP</h4>
            <div
              className="otp-parent-div"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <p className="txt-center-white">
                Please enter OTP sent on: {email}
              </p>
              <OtpInput
                value={otpValue}
                onChange={setOtpValue}
                numInputs={4}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
              />
              {wrongEmailCode && (
                <p
                  className="text-center"
                  style={{ color: "red", marginTop: "1rem" }}
                >
                  Entered wrong code, please enter the code sent on {email}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ForgetPassword;

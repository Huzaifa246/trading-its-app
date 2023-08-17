import { useEffect, useRef, useState } from "react";
import "./styles/common.css"
import { Link, useNavigate } from "react-router-dom";
import { encryptData } from "../helpers/encryption_decryption/Encryption";
import axios from "axios";
import Loader from "../Components/Loader";
import logo from "../../public/logo.png"
import { FaXmark } from "react-icons/fa6"
import { BiCheck } from "react-icons/bi"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { decryptData } from "../helpers/encryption_decryption/Decryption";

const SignupPage = () => {
    const navigate = useNavigate()
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmpassword] = useState("")
    const [showLoader, setShowLoader] = useState(false)
    const [nameError, setNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [conPasswordError, setConPasswordError] = useState("")
    const [isSignedUp, setIsSignedUp] = useState(false)
    const [passwordType, setPasswordType] = useState("password")
    const submitButtonRef = useRef(null)
    const [timer, setTimer] = useState(3)

    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token")
            if (token) {
                navigate("/")
            }
        }
    }, [])

    useEffect(() => {
        // If the user is signed up, start the countdown timer
        if (isSignedUp && timer > 0) {
            const intervalId = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);

            return () => {
                clearInterval(intervalId); // Clean up the interval when component unmounts
            };
        } else if (isSignedUp && timer === 0) {
            // If the timer reaches 0, navigate to the login page
            navigate("/login");
        }
    }, [isSignedUp, timer, navigate]);
    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const signupHandler = (e) => {
        e.preventDefault()

        if (!fullName || !email || !password || !confirmpassword) {
            return; // All fields are required
        }
        if (!validateEmail(email)) {
            setEmailError("Invalid Email")
            return;
        } else {
            setEmailError("")
        }

        if (!validatePassword(password)) {
            setPasswordError("Password must be at least 8 characters long and should contain a capital, small, special character and a number.")
            return;
        } else {
            setPasswordError("")
        }

        if (confirmpassword !== password) {
            setConPasswordError("Password doesn't match")
            return;
        } else {
            setConPasswordError("")
        }

        setShowLoader(true)
        const credentials = {
            fullName,
            email,
            password,
            confirmpassword
        }

        const encrypted = encryptData(credentials)

        axios.post(`https://itsapp-3606ea51973b.herokuapp.com/api/users/signup`, {
            data: encrypted
        })
            .then((res) => {
                const decrypted = decryptData(res.data.data)
                if (decrypted.message.includes("New User Created Successfully!")) {
                    setIsSignedUp(true)
                    setShowLoader(false)
                }
                setShowLoader(false)
            })
            .catch(err => {
                const decrypted = decryptData(err.response.data.data)
                if (decrypted.message === "This user alerdy exist please login to proceed") {
                    setEmailError("Email Taken.")
                }
                setShowLoader(false)
            })
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: 'column',
            justifyContent: "space-around",
            minHeight: `${window.innerHeight}px`,
            padding: "1rem",
            color: "white"
        }}>
            <img src={logo} alt="logo" style={{ filter: "drop-shadow(9px 0px 50px rgba(33, 200, 215, 0.5))", width: "60vw", margin: "1rem auto" }} />
            {
                isSignedUp
                    ?
                    <div style={{
                        background: "rgba(255,255,255,.1)",
                        backdropFilter: "blur(10px)",
                        padding: "1.5rem",
                        borderRadius: "10px"
                    }}>
                        <div style={{
                            background: "linear-gradient(to right, #1c92fc, #20d6de)",
                            height: "70px",
                            width: "70px",
                            borderRadius: "35px",
                            margin: "0 auto",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <BiCheck size={80} />
                        </div>
                        <h2 style={{ fontSize: "6vw", margin: "2rem 0 1rem", textAlign: "center" }}>Signed Up Successfully!</h2>
                        <p style={{ textAlign: "center", color: "#a7a7a7" }}>Redirecting to login page in {timer}</p>
                    </div>
                    :
                    <form style={{ maxWidth: "450px", margin: "0 auto", width: "100%" }} onSubmit={signupHandler}>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            marginBottom: "1.3rem",
                            gap: ".4rem",
                            fontSize: "1rem",
                            position: "relative"
                        }}>
                            <label htmlFor="full_name">Full Name</label>
                            <input type="text" name="full_name" id="full_name" placeholder='Enter you name' className='input_field' value={fullName} onChange={e => setFullName(e.target.value)} required />
                            {
                                nameError
                                &&
                                <span className="input_error">
                                    <FaXmark style={{
                                        position: "absolute",
                                        right: "10px",
                                        top: "10px"
                                    }} onClick={() => setNameError("")} />{nameError}
                                </span>
                            }
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            marginBottom: "1.3rem",
                            gap: ".4rem",
                            fontSize: "1rem",
                            position: "relative"
                        }}>
                            <label htmlFor="email">Email Address</label>
                            <input type="email" name="email" id="email" placeholder='abc@xyz.com' className='input_field' value={email} onChange={e => setEmail(e.target.value)} required />
                            {
                                emailError
                                &&
                                <span className="input_error">
                                    <FaXmark style={{
                                        position: "absolute",
                                        right: "10px",
                                        top: "10px"
                                    }} onClick={() => setEmailError("")} />{emailError}
                                </span>
                            }
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            marginBottom: "1.3rem",
                            gap: ".4rem",
                            fontSize: "1rem",
                            position: "relative"
                        }}>
                            <label htmlFor="password">Password</label>
                            <input type={passwordType} name="password" id="password" placeholder='Enter your password' className='input_field' value={password} onChange={e => setPassword(e.target.value)} required />
                            {
                                passwordType === "password"
                                    ?
                                    <AiFillEye color="#20d6de" onClick={() => setPasswordType("text")} style={{
                                        position: "absolute",
                                        top: "39px",
                                        fontSize: "1.6rem",
                                        right: "10px"
                                    }} />
                                    :
                                    <AiFillEyeInvisible color="#20d6de" onClick={() => setPasswordType("password")} style={{
                                        position: "absolute",
                                        top: "39px",
                                        fontSize: "1.6rem",
                                        right: "10px"
                                    }} />
                            }
                            {
                                passwordError
                                &&
                                <span className="input_error">
                                    <FaXmark style={{
                                        position: "absolute",
                                        right: "10px",
                                        top: "10px"
                                    }} onClick={() => setPasswordError("")} />{passwordError}
                                </span>
                            }
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            marginBottom: "1.3rem",
                            gap: ".4rem",
                            fontSize: "1rem",
                            position: "relative"
                        }}>
                            <label htmlFor="confirm_password">Confirm Password</label>
                            <input type="password" name="confirm_password" id="confirm_password" placeholder='Confirm password' className='input_field' value={confirmpassword} onChange={e => setConfirmpassword(e.target.value)} required />
                            {
                                conPasswordError
                                &&
                                <span className="input_error">
                                    <FaXmark style={{
                                        position: "absolute",
                                        right: "10px",
                                        top: "10px"
                                    }} onClick={() => setConPasswordError("")} />{conPasswordError}
                                </span>
                            }
                        </div>
                        <button className='submit_btn' ref={submitButtonRef}>
                            Sign Up
                        </button>
                        {
                            showLoader
                            &&
                            <Loader />
                        }
                        <p style={{ textAlign: "center", marginTop: "1rem", fontSize: ".8rem", color: "#a8a8a8" }}>
                            Already have an account? <Link to="/login" style={{ color: "white" }}> Login</Link>
                        </p>
                    </form>
            }
        </div >
    );
};

export default SignupPage;
import "../App.css"
import React,{useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';

// User login page with authentication
const Login = () => {
    const [passwordShow, setPasswordShow] = useState(false)
    const [input, setInput] = useState({email: "", password: ""})
    const history = useNavigate()

    const setValue = (e) =>{
        const {name, value} = e.target
        setInput(()=>{
            return {...input, [name]: value}
        })
    }

    const loginUser = async (e) => {
        e.preventDefault()
        const {email, password} = input
        if (email === "") {
            toast.error("Email is required!", {
                position: "top-center"
            });
        } else if (!email.includes("@")) {
            toast.warning("Invalid email type!", {
                position: "top-center"
            });
        } else if (password === "") {
            toast.error("Password is required!", {
                position: "top-center"
            });
        } else if (password.length < 6) {
            toast.error("Password must have 6 characters!", {
                position: "top-center"
            })
        } else {
            const data = await fetch("/api/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password}),
            });

            const res = await data.json();
            if (res.status === 201) {
                localStorage.setItem("usersdatatoken",res.result.token);
                history("/dash")
                toast.success("Login Successful!", {
                    position: "top-center"
                });
                setInput({ ...input, email: "", password: ""});
            }
        }
    }
    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Welcome Back, Log In</h1>
                        <p>Log In to access your private dashboard</p>
                    </div>
                    <form>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" value={input.email} onChange={setValue} placeholder='Enter Your Email Address'/>
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passwordShow ? "password" : "text"} name="password" id="password" onChange={setValue} value={input.password} placeholder='Enter Your password'/>
                                <div className="showpass" onClick={()=>setPasswordShow(!passwordShow)}>
                                    {!passwordShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <button className='btn' onClick={loginUser}>Login</button>
                        <p>Don't have an Account? <NavLink to="/register">Sign Up</NavLink></p>
                    </form>
                    <ToastContainer/>
                </div>
            </section>
        </>
    )
}

export default Login
import "../App.css"
import React, {useState} from 'react'
import { NavLink } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
    const [passwordShow, setPasswordShow] = useState(false)
    const [passwordConf, setPasswordConf] = useState(false)
    const [input, setInput] = useState({fname: "", email: "", password: "", cpassword: ""})
    const setValue = (e) =>{
        const {name, value} = e.target
        setInput(()=>{
            return {...input, [name]: value}
        })
    }
    const addUserData = async (e)=>{
        e.preventDefault()
        const {fname, email, password, cpassword} = input
        if(fname === ""){
            toast.warning("Name is required!", {
                position: "top-center"
            });
        }else if(email === ""){
            toast.error("Email is required!", {
                position: "top-center"
            });
        }else if(!email.includes("@")){
            toast.warning("includes @ in your email!", {
                position: "top-center"
            });
        }else if(password === ""){
            toast.error("Password is required!", {
                position: "top-center"
            });
        }else if(password.length < 6){
            toast.error("Password must have 6 characters!", {
                position: "top-center"
            });
        }else if(cpassword === ""){
            toast.error("password confirmation is required!", {
                position: "top-center"
            });
        }else if(cpassword.length < 6) {
            toast.error("confirm password must have 6 characters!", {
                position: "top-center"
            });
        }else if(password !== cpassword){
            toast.error("Invalid passwords credentials!", {
                position: "top-center"
            });
        }else{
            const data = await fetch("/api/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({fname, email, password, cpassword}),
            });
            const res = await data.json();
            if (res.status === 201) {
                toast.success("Registration Successful 😃!", {
                    position: "top-center"
                });
                history("/login")
                setInput({ ...input, fname: "", email: "", password: "", cpassword: "" });
            }
        }
    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Project X Registration</h1>
                        <p>Welcome to the most secure digital firm.</p>
                    </div>
                    <form>
                        <div className="form_input">
                            <label htmlFor="fname">Name</label>
                            <input type="text" name="fname" onChange={setValue} value={input.fname} id="fname" placeholder='Enter Your Name'/>
                        </div>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" onChange={setValue} value={input.email} id="email" placeholder='Enter Your Email Address'/>
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passwordShow ? "password" : "text"} name="password" onChange={setValue} value={input.password} id="password"
                                       placeholder='Enter Your password'/>
                                <div className="showpass" onClick={() => setPasswordShow(!passwordShow)}>
                                    {!passwordShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Confirm Password</label>
                            <div className="two">
                                <input type={!passwordConf ? "password" : "text"} name="cpassword" onChange={setValue} value={input.cpassword} id="cpassword"
                                       placeholder='Confirm Password'/>
                                <div className="showpass" onClick={() => setPasswordConf(!passwordConf)}>
                                    {!passwordConf ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <button className='btn' onClick={addUserData}>Sign Up</button>
                        <p>Already have an Account? <NavLink to="/">Login</NavLink></p>
                    </form>
                    <ToastContainer/>
                </div>
            </section>
        </>
    )
}
export default Register
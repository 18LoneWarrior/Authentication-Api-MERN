import "../App.css"
import React, {useContext} from 'react';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import {LoginContext} from "./contextProvider/Context";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate} from "react-router-dom"

const Header = () => {
    const { logindata, setLoginData } = useContext(LoginContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const history = useNavigate();
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const goDash = () => {
        history("/dash")
    }

    const goError = () => {
        history("*")
    }

    const logoutUser = async (user) => {
        let token = localStorage.getItem("usersdatatoken");
        console.log(token);
        const res = await fetch("/api/logout", {
            method: "GET",
            headers: {"Content-Type": "application/json", "Authorization": token, Accept: "application/json"},
            credentials: "include"
        });

        const data = await res.json();
        if (data.status === 201) {
            console.log("user logout");
            let token = localStorage.removeItem("usersdatatoken");
            setLoginData(false)
            history("/");
        } else {
            console.log("error found")
        }
    }
    return (
        <>
            <header>
                <nav>
                    <h1>Project X</h1>
                    <div className="avtar">
                        {
                            logindata.ValidUserOne ? <Avatar onClick={handleClick} style={{ background:"salmon" ,fontWeight:"bold", textTransform:"capitalize"}} sx={{ bgcolor: deepPurple[500] }}>{logindata.ValidUserOne.fname[0].toUpperCase()}</Avatar>:
                                <Avatar sx={{ bgcolor: deepPurple[500] }} onClick={handleClick}/>
                        }
                    </div>
                    <Menu
                        id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}
                        MenuListProps={{'aria-labelledby': 'basic-button',}}>
                        {logindata.ValidUserOne ? (
                            <>
                            <MenuItem onClick={()=>{
                                goDash()
                                handleClose()
                            }}>Profile</MenuItem>
                            <MenuItem onClick={()=>{
                                logoutUser()
                                handleClose()
                            }}>Logout</MenuItem>
                            </>
                            ) :(<MenuItem onClick={()=>{
                                goError()
                                handleClose()
                        }}>Profile</MenuItem>)}
                    </Menu>
                </nav>
            </header>
        </>
    )
}

export default Header
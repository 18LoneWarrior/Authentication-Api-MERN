import React, { useContext, useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './contextProvider/Context';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import logo from "../assets/logo.png";

const Dashboard = () => {
    const { logindata, setLoginData } = useContext(LoginContext);
    const [data, setData] = useState(false);
    const history = useNavigate();
    const DashboardValid = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("/api/validate", {
            method: "GET",
            headers: {"Content-Type": "application/json", "Authorization": token}
        });

        const data = await res.json();
        if (data.status === 401 || !data) {history("*");}
        else {
            setLoginData(data)
            history("/dash");
        }
    }
    // To validate the user and to add loader on screen for 2 seconds
    useEffect(() => {
        setTimeout(()=>{
            DashboardValid();
            setData(true)
        },2000)
    }, [])

    return (
        <>
            {
                data ? <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <h1>Welcome {logindata ? logindata.ValidUserOne.fname : ""}</h1>
                    <img src={logo} style={{width: "200px", marginTop: 20}} alt=""/>
                </div> : <Box sx={{display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    Loading... &nbsp;
                    <CircularProgress />
                </Box>
            }
        </>
    )
}

export default Dashboard
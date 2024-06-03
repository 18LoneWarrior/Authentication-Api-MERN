import './App.css'
import {useState, useEffect, useContext} from 'react'
import {Routes, Route, useNavigate} from "react-router-dom"
import {Header, Login, Register} from "./components"
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import {LoginContext} from "./components/contextProvider/Context";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


function App() {

    const [data, setData] = useState(false)
    const { logindata, setLoginData } = useContext(LoginContext);
    const history = useNavigate();
    
    const DashboardValid = async () => {
        let token = localStorage.getItem("usersdatatoken");
        console.log(token);
        const res = await fetch("/api/validate", {
            method: "GET",
            headers: {"Content-Type": "application/json", "Authorization": token}
        });

        const data = await res.json();
        if (data.status === 401 || !data) {
            history("*");
        } else {
            console.log("user verify");
            setLoginData(data)
            history("/dash");
        }
    }

    useEffect(() => {
        setTimeout(()=>{
            DashboardValid();
            setData(true)
        },2000)
    }, [])

  return (
    <>
        {
            data? (
                <>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<Login />}/>
                        <Route path="/register" element={<Register />}/>
                        <Route path="/dash" element={<Dashboard />}/>
                        <Route path="*" element={<Error />}/>
                    </Routes>
                </>
            ): <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
                Loading... &nbsp;
                <CircularProgress />
            </Box>
        }

    </>
  )
}

export default App

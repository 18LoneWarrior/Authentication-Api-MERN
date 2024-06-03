import './index.css'
import App from './App.jsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"
import Context from "./components/contextProvider/Context";

ReactDOM.createRoot(document.getElementById('root')).render(
    <Context>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Context>
)

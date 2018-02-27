import React from "react";
import { Link } from "react-router-dom";
import Input from "../../components/Form/Input";
import "./LoginNav.css";

const LoginNav = props => {

    return (
        <nav className="row" id="login-nav">
            <h3 id="login-logo">0</h3>
            <ul id="nav-login" className="right chat-nav-links">
                <li><Link to={"/Browse"} className="main-chat-link">BROWSE</Link></li>
                <li><Link to={"/profilelist"} className="main-chat-link">PROFILE LIST</Link></li>
                <li><Link to={"/"} className="main-chat-link" onClick={props.killSession}>{props.session}</Link></li>
            </ul>
        </nav>
    )
}

export default LoginNav;
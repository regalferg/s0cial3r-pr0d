import React, { Component } from "react";
import Input from "../../components/Form/Input";
import LoginNav from "../../components/LoginNav";
import SubmitButton from "../../components/Form/SubmitButton";
import "./Login.css";

class Login extends Component {
    state = {
        search: "",
        transparency: 0,
    };

    componentDidMount() {
        this.setState({
            search: "",
            transparency: 0,
        })
        this.fadeInMessage();
    };

    fadeInMessage = () => {
        let timeoutId;
        clearTimeout(timeoutId);
        this.setState({transparency: this.state.transparency + 0.01});

        if(this.state.transparency < 1) {
            timeoutId = setTimeout(this.fadeInMessage, 10);
        }
    }

    handleInputChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    };

    handleSearchSubmit = event => {
        event.preventDefault();
    }

    render() {
        const messageStyle = {
            color: `rgba(255, 255, 255, ${this.state.transparency}`
        }

        const oStyle = {
            color: `rgba(100, 65, 165, ${this.state.transparency}`
        }

        return (
            
            <div id="main-page-container">
                <video autoPlay loop muted preload="true" className="fullscreen-bg_video">
                    <source src="../../../video/Circuit_Background.mp4"></source>
                </video>
                <div className="row" id="main-page-content-row">
                <div>
                <LoginNav handleInputChange={this.handleInputChange} handleSearchSubmit={this.handleSearchSubmit}/>
                </div>
                    <div className="col s1 m1 l1 xl2" id="left-bar-main">
                    </div>
                    <div className="col s10 m10 l10 xl8" id="main-page-content">
                        <div className="col s12 m12 l12 xl10 offset-xl1" id="card-col">
                            <div id="login-card">
                            <h1 className="welcomeMessage" style={messageStyle}>Welcome to</h1>
                            <h1 id="main-page-title" style={messageStyle}>s<span id="o" style={oStyle}>0</span>cial3r</h1>
                                <div className="card-content white-text" id="card-content">
                                    <div className="row" id="sign-in-row">
                                        <a href="http://localhost:3001/auth/twitch/callback"><SubmitButton className="btn" value="Login with Twitch" id="sign-in-button"/></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col s1 m1 l1 xl2" id="right-bar-main">
                    </div>
                </div>
            </div>
        )
    }
}

export default Login; 
// import React, { Component } from "react";
// import { Link, Route } from "react-router-dom";
// import Nav from "../../components/Nav";
// import "./Dashboard.css";

// // class Dashboard extends Component {
// //     state = {
// //         username: "",
// //         search: ""
// //     }

// //     componentDidMount() {
// //         //API call to get username info from database
// //     }

// //     handleInputChange = event => {
// //         const {name, value} = event.target;
// //         this.setState({
// //             [name]: value
// //         });
// //     };

//     handleSearchSubmit = event => {
//         event.preventDefault();
//     }

    render() {
        return (
            <div id="profile-body">
                <video autoPlay loop muted preload className="fullscreen-bg_video">
                    <source src="../../../video/Circuit_Background.mp4"></source>
                </video>
                <div id="profile-img-container">
                    <img src="" id="profile-img"/>
                    <h1>{/*messages.error*/}</h1>
                    <h1>{/*messages.info*/}</h1>
                </div>
                <div class="row" id="profile-page-header">
                    <h1 id="profile-header-background-type">s0cial3r</h1>
                </div>
                <Nav username={this.state.username} handleInputChange={this.handleInputChange} handleSearchSubmit={this.handleSearchSubmit}/>

                {/*Charle's shiz*/}
                
            </div>
        )
    }
}

export default Dashboard;
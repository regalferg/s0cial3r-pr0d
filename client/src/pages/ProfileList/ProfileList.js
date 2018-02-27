import React, { Component } from "react";
import LoginNav from "../../components/LoginNav";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import ProfileCard from "../../components/ProfileCard";
import "./ProfileList.css";

class ProfileList extends React.Component {

    state = {
        users: [],
        userData: {},
        sessionStatus:""
    }

    componentDidMount = () => {
        this.getUsers();
        this.getSession();
    }

    goToProfile = event => {
        const username = event.target.dataset.username;
        window.location.href = `/Profile/${username}`
    }

    getSession = () => {
        API.getSessionData()
            .then(function (result) {
                this.setState({ userData: result.data });
                if(result.data) {
                    this.setState({sessionStatus: "LOG OUT"});
                }
                else {
                    this.setState({sessionStatus: "LOG IN"});
                }
            }.bind(this))
            .catch(err => console.log(err));
    }

    killSession() {
        API.destroySession()
        .then(res => console.log(res));
    }

    goToChat = event => {
        API.goToChat(event.target.dataset.id).then(res => {
            window.location.href = `/PrivateMessages/${res.data}`
        }).catch(err => console.log(err));
    }

    getUsers = () => {
        API.getAllUsers().then(result => {
            console.log(result);
            this.setState({ users: result.data });
        }).catch(err => console.log(err));
    }

    render = () => {
        return (
            <div>
                <video autoPlay loop muted preload="true" className="fullscreen-bg_video">
                    <source src="../../../video/Circuit_Background.mp4"></source>
                </video>
                <LoginNav killSession={this.killSession} session={this.state.sessionStatus} />
                <div className="profile-list-container">
                    {this.state.users.length > 0 ?
                        this.state.users.map(user => {
                            return (
                                <ProfileCard goToProfile={this.goToProfile} sessionId={this.state.userData._id} key={user._id} goToChat={this.goToChat} id={user._id} banner={user.banner} avatar={user.avatar} username={user.username} />
                            )
                        })
                        : "<h1>No Users Found</h1>"
                    }
                </div>
            </div>
        )
    }
}

export default ProfileList;
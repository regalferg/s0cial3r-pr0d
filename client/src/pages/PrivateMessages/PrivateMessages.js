import React from "react";
import API from "../../utils/API";
import SearchNav from "../../components/SearchNav";
import "./PrivateMessages.css";
import SearchRes from "../../components/SearchRes";
import { Container, Row } from "../../components/Grid/";
import openSocket from 'socket.io-client';
import { Link } from "react-router-dom";

const Navigation = require('react-router').Navigation;
const socket = openSocket('http://localhost:3001');
const dateFormat = require('dateformat');

class PrivateMessages extends React.Component {

    state = {
        userId: "",
        chatId: "",
        chat: {},
        chats: [],
        messages: [],
        avatars: [],
        message: "",
        isTyping: ""
    }

    presentationDate = date => {
        try {
            var f = new Date(date);
            return dateFormat(f, "dddd, mmmm dS, yyyy, h:MM:ss TT");
        } catch (e) {
            console.log(e.message);
        }
    }

    componentDidMount = () => {
        this.setState({ chatId: this.props.match.params.id });
        this.init();
        this.scrollToBottom();
        socket.on('connect', () => {
            socket.emit('adduser', this.state.userId);
            socket.emit('switchRoom', this.state.chatId);
        });
        socket.on("updatechat", (result) => {
            console.log(result);
            const joined = this.state.messages.map(m => m);
            joined.push(result);
            this.setState({ messages: joined });
            this.setState({ message: "" });
        });
        socket.on("iswriting", (username) => {
            const msg = `${username} is typing...`;
            this.setState({ isTyping: msg });
        });
        socket.on("isnotwriting", (username) => {
            const who = this.state.isTyping;
            if (who.indexOf(username) == -1) {
            } else {
                this.setState({ isTyping: "" });
            }
        });
    }

    getChats = () => {
        const userId = this.state.userId;
        API.getChats({ userId: userId }).then(result => {
            this.setState({ chats: result.data });


        }).catch(err => console.log(err));
    }

    getChat = () => {
        const chatId = this.state.chatId;
        API.getChat({ chatId: chatId }).then(result => {
            this.setState({ chat: result.data });
            var avatars = {};
            var usernames = {};
            for (let key in result.data.participants) {
                const user = result.data.participants[key];
                avatars[user._id] = user.avatar;
                usernames[user._id] = user.username;
            }
            this.setState({ avatars: avatars });
            this.setState({ usernames: usernames });
        }).catch(err => console.log(err));
    }


    init = () => {
        API.getSessionData()
            .then(result => {
                const userId = result.data._id;
                const username = result.data.username;
                this.setState({ userId: userId });
                this.setState({ username: username });
                this.getChats();
                this.getChat();
                if (this.state.chatId) {
                    API.isAllowedIntoChat({ userId: userId, chatId: this.state.chatId })
                        .then(res => {
                            if (!res.data) {
                                window.location.href = `/`;
                            } else {
                                this.loadMessages();
                            }
                        })
                        .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
    }

    loadMessages = () => {
        API.getMessages({ chatId: this.state.chatId }).then(result => {
            this.setState({ messages: result.data });
            this.scrollToBottom();
        }).catch(err => console.log(err));
    }

    resolveNames = users => {
        const filters = users.filter(user => {
            if (user._id !== this.state.userId) {
                return user.username;
            }
        });
        const map = filters.map(user => user.username);
        const label = map.join(", ");
        return label;
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }


    componentDidUpdate() {
        this.scrollToBottom();
    }

    sendMessage = () => {
        if (this.state.message !== "" && this.state.message !== null && this.state.message !== false) {
            socket.emit('sendchat', this.state.chatId, this.state.userId, this.state.message);
            socket.emit('notwriting', this.state.usernames[this.state.userId]);
        }
    }

    goToChat = event => {
        // console.log(event.target)
        const chatId = event.target.dataset.id;
        window.location.href = `/PrivateMessages/${chatId}`;
    }

    handleKeyPress = event => {
        if (event.key === "Enter") {
            this.sendMessage();
        }
    }

    handleFormChange = event => {
        this.setState({ message: event.target.value });
        socket.emit('writing', this.state.usernames[this.state.userId]);
    }

    render() {


        return (
            <div>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" type="text/css" />

                <video autoPlay loop muted preload="true" className="fullscreen-bg_video">
                    <source src="../../../video/Circuit_Background.mp4"></source>
                </video>
                {/* <SearchNav handleInputChange={this.handleInputChange} handleSearchSubmit={this.handleSearchSubmit} topGames={this.TopGames} topStreams={this.Top} isUserChecked={this.state.isUserChecked} isGameChecked={this.state.isGameChecked} /> */}

                <div id="pm_container" className="container-fluid">
                    <div className="row pmrow">
                        <div id="chats" className="col-lg-2 col-md-3 col-xs-12">


                            <div id="chatheader">
                                <Link to={"/browse"}>
                                    <h4 class='bold'>Browse</h4>
                                </Link>

                                <Link to={`/profile/${this.state.username}`} className="" >
                                    <h4 class='bold'>Your Profile</h4>
                                </Link>
                                <h4 class='bold'>Chats</h4>
                            </div>
                            {
                                this.state.chats.length > 0 ?
                                    this.state.chats.map(chat => {
                                        return (
                                            <div key={chat._id} data-id={chat._id} onClick={this.goToChat} className="chat">{chat.name ? chat.name : this.resolveNames(chat.participants)}</div>
                                        )
                                    }) : "No Chats"
                            }
                        </div>
                        <div className="col-lg-10 col-xs-12 col-md-9 frame" id="messages">

                            <ul class="message-list">

                                {this.state.messages.length > 0 ?
                                    this.state.messages.map(message => {
                                        if (message.sender === this.state.userId) {
                                            return (
                                                <li key={message._id}>
                                                    <div className="msj-rta macro">
                                                        <div className="text text-r">
                                                            <p className="message">
                                                                <b>   {this.state.usernames[message.sender]}</b><br />
                                                                {message.message}
                                                            </p>
                                                            <p><small className="mright">{this.presentationDate(message.date)}</small></p>
                                                        </div>
                                                        <div className="avatar"><img className="img-circle" src={this.state.avatars[message.sender]} /></div>
                                                    </div>
                                                </li>
                                            )
                                        } else {
                                            return (

                                                <li key={message._id} className="pleft">
                                                    <div className="msj macro">
                                                        <div className="avatar"><img className="img-circle" src={this.state.avatars[message.sender]} /></div>
                                                        <div className="text text-l">
                                                            <p className="message">
                                                                <b> {this.state.usernames[message.sender]}</b><br />
                                                                {message.message}
                                                            </p>
                                                            <p><small>{this.presentationDate(message.date)}</small></p>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        }
                                    })
                                    :
                                    ""
                                }
                                <li ref={(el) => { this.messagesEnd = el; }}>
                                    <br />
                                    <span className="message fright">{this.state.isTyping}</span>
                                    <br /><br /><br />
                                </li>
                            </ul>
                            <div>
                                <div className="msj-rta macro">
                                    <div className="text text-r whitesmoke" >
                                        <input className="mytext" name="message" value={this.state.message} onKeyUp={this.handleKeyPress} onChange={this.handleFormChange} placeholder="Type a message" />
                                    </div>

                                </div>
                                <div className="padding10">
                                    <span className="glyphicon glyphicon-share-alt"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PrivateMessages;
import React from "react";
import { Link } from "react-router-dom";
import Input from "../../components/Form/Input";

const Nav = props =>
    <nav className="row" id="profile-nav">
        <Link to={"/dashboard"} id="profile-logo">
            0
        </Link> 
        <span id="username-display-dashboard">{props.username}Hi</span>
        <span className="input-field col m6 offset-m6 l6 offset-l3" id="post-bar-col">
            <Input 
                placeholder="Search"
                name="search"
                type="text"
                id="search-input"
                onChange={props.handleInputChange}
            />
            <Input 
                className="btn link-button" 
                type="submit" 
                value="SEARCH" 
                id="search-button" 
                onClick={props.handleSearchSubmit}
            />
        </span>
        <ul id="nav-dashboard" className="right hide-on-small-only chat-nav-links">
            <li><Link to={"/profilelist"} className="" id="main-chat-link">PROFILE LIST</Link></li>
        </ul>
    </nav>

export default ProfileNav;
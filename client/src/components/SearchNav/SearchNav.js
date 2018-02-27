import React from "react";
import { Link } from "react-router-dom";
import CustomInput from "../../components/Form/Input";
import { Input, Icon } from "react-materialize";
import "./SearchNav.css";

const SearchNav = props => {

    return (
    <nav className="row" id="search-nav">
        <h3 id="profile-logo">0</h3>
        <span className="input-field col m5 offset-m1 l5 offset-l1" id="post-bar-col">
            <CustomInput 
                placeholder="Search"
                name="search"
                type="text"
                id="search-input"
                onChange={props.handleInputChange}
            />
            <div id="select-wrapper">
            <Input s={3} type='select' label="Search For" defaultValue='users' name="search-dropdown" onChange={props.handleSelectChange}>
                <option value='users'>Users</option>
                <option value='games'>Games</option>
	        </Input>
            </div>
            <CustomInput 
                className="btn" 
                type="submit" 
                value="SEARCH"
                id="search-button" 
                onClick={props.handleSearchSubmit}
            />
        </span>
        <ul id="nav-dashboard" className="right search-nav-links">
            <li onClick={props.topStreams} className="clickable-li">TOP STREAMS</li>
            <li onClick={props.topGames} className="clickable-li">TOP GAMES</li>
            <li><Link to={"/profilelist"} className="" id="main-chat-link">PROFILE LIST</Link></li>
            <li><Link to={"/"} className="main-chat-link" onClick={props.killSession}>{props.session}</Link></li>
        </ul>
        <ul id="nav-mobile" className="right search-nav-links">
            <li onClick={props.topStreams} className="clickable-li"><Icon large>live_tv</Icon></li>
            <li onClick={props.topGames} className="clickable-li"><Icon large>videogame_asset</Icon></li>
            <li><Link to={"/profilelist"} className="" id="main-chat-link"><Icon large>group</Icon></Link></li>
            <li><Link to={"/"} className="main-chat-link" onClick={props.killSession}>{props.session}</Link></li>
        </ul>

    </nav>
    )
}

export default SearchNav;
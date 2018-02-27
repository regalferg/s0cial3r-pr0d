import React from 'react';
import "./ProfileCard.css";
import { Button, Icon, Modal, Row, Col } from "react-materialize";



const ProfileCard = props => (
  <div className="profile-card">
    <img className="banner-list" src={props.banner ? props.banner : "http://www.ehands.ru/bitrix/templates/aspro-allcorp/images/background.png"} />
    <div class="sub-list">
      <img className="avatar-list" src={props.avatar} />
      <h3 className="username-list">{props.username}</h3>
      {
        props.sessionId == props.id ? "" :
        <Button data-class="PM-button" data-id={props.id} onClick={props.goToChat}>PM</Button>
      }
      <Button data-class="Profile-button" data-username={props.username} onClick={props.goToProfile}>Profile</Button>

      <br className="clear" />
    </div>
  </div>
);






export default ProfileCard;
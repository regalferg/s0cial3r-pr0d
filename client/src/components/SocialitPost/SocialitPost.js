import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Col, Card, Row ,CardTitle} from "react-materialize";
import "./SocialitPost.css";

const SocialitPost = props => {

  
  return (
    <div className="SocalitPost">


      <Card className='small socialitCard'
	header={<CardTitle image={props.image}>{props.title}</CardTitle>}
	actions={<Link to={props.link} className="" id="main-chat-link">Comments</Link>}
  >
	    Submited by {props.poster}
        </Card>
 

    </div>
  );
};

export default SocialitPost;

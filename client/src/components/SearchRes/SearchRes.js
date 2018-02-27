import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Col, Card, Row } from "react-materialize";
import "./SearchRes.css";

const SearchRes = props => {
  const fixed = pic => {
    let fixpic = pic.replace("{width}", "200");
    let fixpics = fixpic.replace("{height}", "200");
    return fixpics;
  };

  let cardStyle = {};
  if(props.title) {
    if(props.title[1] === props.title[1].toUpperCase()) {
      cardStyle = {
        "font-size": "13px",
        "background-color": "rgba(255, 255, 255, 0.9)"
      }
    }
    else {
      cardStyle={
        "font-size":"16px",
        "background-color": "rgba(255, 255, 255, 0.9)"
      }
    }
  }


  if(props.kind == "stream"){
  return (
    <div className="SearchRes">
      <Col m={3} s={6}>
        <Card
          className="search-result-card"
          textClassName="black-text"
          style={cardStyle}
        >
          <Row>
            <Col m={12} s={12}>
              <a href={`/${props.userName}`} id="img-col">
                <img alt={"h"}  src={fixed(props.pic)} className="" />
              </a>
            </Col>
            <Col m={12} s={12} id="result-title">
              <p>{props.title}</p>
            </Col>
          </Row>
        </Card>
      </Col>
    </div>
  );
}
else{
  
  return (
    <div className="SearchRes">
      <Col m={3} s={6}>
        <Card
          className="search-result-card"
          textClassName="black-text"
          style={cardStyle}
        >
          <Row>
            <Col m={12} s={12} id="img-col">
                <img alt={"h"} onClick={()=>props.GameStreams(props.id)} src={fixed(props.pic)} className="" />
                
            </Col>
            <Col m={12} s={12} id="result-title">
              <p>{props.title}</p>
            </Col>
          </Row>
        </Card>
      </Col>
    </div>
  );
}
};

export default SearchRes;

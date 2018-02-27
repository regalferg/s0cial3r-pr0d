import React, { Component } from "react";
import FeedCard from "../../components/FeedCard";
import FeedModal from "../../components/FeedModal";
import API from "../../utils/API";
import { Container } from "../../components/Grid";
import { Input2, FormBtn } from "../../components/Form";
import Slider from "../../slider";
import { Button, Icon, Modal, Row, Col } from "react-materialize";
import LoginNav from "../../components/LoginNav";
import feedStyles from "./FeedStyles.css";
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3001');

class Feed extends Component {
  state = {
    feedz: [],
    poster: "",
    link: "",
    modalIsOpen: false,
    channel: {},
    sessionStatus: "",
    memeTitle: ""
  };

  componentDidMount() {
  
    this.loadFeed();
    this.getSessionData();
  const date = new Date();
  const ts = date.getTime();
  const channel = this.props.match.params.channel
    socket.on('connect', function() {
      socket.emit('adduser', ts);
      socket.emit('switchRoom', channel);
    });
    socket.on("updatememe", (result) => {
      const joined = this.state.feedz.map(m => m);
      joined.push(result);
      this.setState({ feedz: joined });
      this.setState({ link: "" });
  });
  }

 


  

killSession() {
  API.destroySession()
  .then(res => console.log(res));
    this.getSessionData();
  }

getSessionData = () => {
  API.getSessionData().then(res => {
    this.setState({User: res.data});
    if(res.data) {
      this.setState({
        sessionStatus: "LOG OUT",
        memeTitle: "Share a Meme"
      });
    }
    else {
      this.setState({
        sessionStatus: "LOG IN",
        memeTitle: "Log In With Twitch to Share a Meme"
      });
    }
  }).catch(err => console.log(err));
}

  loadFeed = () => {
    API.getMemesByChannelName({channelName: this.props.match.params.channel})
      .then(res => {
          console.log("_______________________");
        console.log(res.data);
        this.setState({ feedz: res.data, link: "" });
      }).catch(err => console.log(err));
  }


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleFormSubmit = event => {
    event.preventDefault();
    if ( this.state.link) {
      const meme = {
        // poster: this.state.poster,
        meme: this.state.link,
        channelName:this.props.match.params.channel,
        userId:this.state.User._id,
        username:this.state.User.username
      };
      socket.emit('sendmeme', meme);
    }
  };

  render() {
    let Johnswfvariablename = this.state.feedz.length -1
    let auto = true
    if(Johnswfvariablename  == 0){
      Johnswfvariablename = 1
    }
    if(Johnswfvariablename >= 5){
      Johnswfvariablename = 5
    }


    const settings = {
      showArrows: true,
      dots: true,
      infinite: true,
      slidesToShow: Johnswfvariablename,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1000,
      pauseOnHover: true,
      swipeToSlide: true,
      mobileFirst: true,
      responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: Johnswfvariablename,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      }, {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
    };
    return (
      <div id="main-twitch-container">
        <video autoPlay loop muted preload="true" className="fullscreen-bg_video">
          <source src="../../../video/Circuit_Background.mp4"></source>
        </video>
        <LoginNav killSession={this.killSession} session={this.state.sessionStatus}/>
        <Container fluid>
          <Row>
            <Col s={10} className="offset-s1" id="content">
              <Row>
                <Col s={12} id="twitch-container">
                  <Row className="tv-player">
                    <Col s={8} id="tv-player-col"> 
                      {/* <div id="twitch-embed"></div> */}
                      <iframe
                        className="player"
                        src={`http://player.twitch.tv/?channel=${
                          this.props.match.params.channel
                        }&muted=true   `}
                        frameBorder="<frameborder>"
                        scrolling="<scrolling>"
                        allowFullScreen="<allowfullscreen>"
                        id="stream-embed"
                      />
                    </Col>
                    <Col s={4} id="chat-col">
                      <iframe
                        frameBorder="0"
                        scrolling="no"
                        id="chat_embed"
                        src={`http://www.twitch.tv/embed/${this.props.match.params.channel}/chat`}
                        height="500px"
                        width="100%"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col s={12} id="post-container">
                  <Row>
                    <h4 id="post-title">{this.state.memeTitle}</h4>
                    <form>
                      <Col s={10}>
                       <Input2
                          value={this.state.link}
                          onChange={this.handleInputChange}
                          name="link"
                          placeholder="Meme Link (required)"
                        />
                      </Col>
                      <Col s={2}>
                        <FormBtn
                          disabled={!(this.state.link) || (this.state.sessionStatus === "LOG IN")}
                          onClick={this.handleFormSubmit}
                        >
                          Post Meme
                        </FormBtn>
                      </Col>
                    </form>
                  </Row>
                  <Row>
                    <Col s={12}>
                      <Slider {...settings}>
                        {this.state.feedz.map(feed => (
                          <div key={feed._id}>
                            <FeedModal
                              id={feed._id}
                              poster={feed.poster}
                              link={feed.link}
                              openModal={this.openModal}
                            />
                            <FeedCard
                              id={feed._id}
                              poster={feed.poster}
                              link={feed.link}
                              // openModal={this.openModal}
                            />
                          </div>
                        ))}
                      </Slider>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>      
        </Container>
      </div>
    );
  }
}

export default Feed;

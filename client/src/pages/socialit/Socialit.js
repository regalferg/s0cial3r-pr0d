import React, { Component } from "react";
import LoginNav from "../../components/LoginNav";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/socialitAPI";
import API2 from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row,  } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form2";
import {Container,CardTitle,Card } from 'react-materialize'
import SocialitPost from "../../components/SocialitPost/SocialitPost";

import "./socialit.css";
class socialit extends Component {
  state = {
    posts: [],
    title: "",
    author: "",
    synopsis: ""
  };

  componentDidMount() {
    this.loadposts();
    this.getSessionData();

  }

  getSessionData = () => {
    API2.getSessionData().then(res => {
      this.setState({User: res.data});
      if(res.data) {
        this.setState({sessionStatus: "LOG OUT"});
      }
      else {
        this.setState({sessionStatus: "LOG IN"});
      }
    }).catch(err => console.log(err));
  }

  loadposts = () => {
    
    API.getposts({channelName: this.props.match.params.channel})
      .then(res =>
        this.setState({ posts: res.data, link: "", upvotes: "", body: "" ,body: "", _id:"" })
      )
      .catch(err => console.log(err));
  };

  deletepost = id => {
    API.deletepost(id)
      .then(res => this.loadposts())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.props.match.params.channel)
    console.log(this.state.User._id,)
    if (this.state.title) {
      API.savepost({
        title: this.state.title,
        imageLink: this.state.imageLink,
        body: this.state.body,
        userId:this.state.User._id,
        channelName:this.props.match.params.channel,
        username:this.state.User.username
      })
        .then(res => this.loadposts())
        .catch(err => console.log(err));
    }
  };

  render() {
    const channelName =this.props.match.params.channel
    return (
   

      <div>

       <LoginNav />

       <Container className="MainC">
        <Row>
          
          <Col size="md-6"> 
              <h1>Make a Post </h1>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.imageLink}
                onChange={this.handleInputChange}
                name="imageLink"
                placeholder="imageLink (optional)"
              />
              <TextArea
                value={this.state.body}
                onChange={this.handleInputChange}
                name="body"
                placeholder="Content (Optional)"
              />
              <FormBtn
                disabled={!(this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Post
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
      
              <h1>Posts</h1>
              {this.state.posts.length ? (
                <div>
                {this.state.posts.map(post => (
                <SocialitPost
                  key= {post._id}
                  link ={`/socialit/${channelName}/${post._id}`}
                  title ={post.title} 
                  poster = {post.poster}
                  image ={post.imageLink ? post.imageLink :"https://www.transparenttextures.com/patterns/gplay.png"}
                  // delete ={this.deletepost(post._id)}
               /> ))}
               </div>
              ) : (
                <h3>No Results to Display</h3>
              )}
          
          </Col>
        </Row>
      </Container>
      </div>
    );
  }
}

export default socialit;

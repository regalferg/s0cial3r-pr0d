import React from "react";
import UserMemes from "../../components/UserMemes";
import API from "../../utils/API";
import LoginNav from "../../components/LoginNav";
import "./Profile.css";
import SearchRes from "../../components/SearchRes";
import { Container } from "../../components/Grid/";
import RModal from 'react-modal';
import Slider from "../../slider";
import { Button, Icon, Modal, Row, Col } from "react-materialize";
import FeedCard from "../../components/FeedCard";
import FeedModal from "../../components/FeedModal";
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class Profile extends React.Component {
    state = {
        username: "",
        userData: {},
        isOwn: false,
        modalIsOpen: false,
        banner: "",
        feedz: [],
        sessionStatus: ""
    }


    componentDidMount() {
        this.setState({ username: this.props.match.params.username });
        this.getSession();
        this.loadFeed();
    }

    loadFeed = () => {
        API.getMemesByUser({ username: this.props.match.params.username })
            .then(res => {
                console.log("_______________________");
                console.log(res.data);
                this.setState({ feedz: res.data });
            }).catch(err => console.log(err));
    }

    getSession = () => {
        API.getSessionData()
            .then(function (result) {
                console.log(result.data);
                if (result.data.username === this.props.match.params.username) {
                    this.setState({ isOwn: true });
                }

                if(result.data) {
                    this.setState({sessionStatus: "LOG OUT"});
                }
                else {
                    this.setState({sessionStatus: "LOG IN"});
                }
                this.getUserData();
            }.bind(this))
            .catch(err => console.log(err));
    }

    killSession() {
        API.destroySession()
        .then(res => console.log(res));
    }

    getUserData() {
        API.getUserData({ username: this.state.username }).then(function (result) {
            this.setState({ userData: result.data });
        }.bind(this)).catch(err => console.log(err));
    }
    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    goToChat = event => {
        API.goToChat(event.target.dataset.id).then(res => {
            window.location.href = `/PrivateMessages/${res.data}`
        }).catch(err => console.log(err));
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }
    handleFormInput = event => {
        this.setState({ banner: event.target.value });
    }
    handleFormSubmit = () => {
        API.updateProfile({ banner: this.state.banner }).then(res => {
            this.getUserData();
        }).catch(err => console.log(err));
    }
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
                    slidesToShow: 3,
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
            <div>
                <RModal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Banner"
                    style={customStyles}
                >

                    <div>Please Enter Image URL for your banner</div>
                    <form>
                        <input type="text" name="banner" onChange={this.handleFormInput} />
                        <button onClick={this.handleFormSubmit}>Submit</button>
                    </form>
                </RModal>
                <video autoPlay loop muted preload="true" className="fullscreen-bg_video">
                    <source src="../../../video/Circuit_Background.mp4"></source>
                </video>
                <LoginNav killSession={this.killSession} session={this.state.sessionStatus} />
                {
                    this.state.isOwn ?
                        // is own profile include chat and user management
                        <div className="container profile">

                            <div className="fb-profile">
                                <button onClick={this.openModal} className="btn btn-primary updateBanner">Change Banner</button>

                                <img align="left" className="fb-image-lg" src={this.state.userData.banner ? this.state.userData.banner : "https://wikitravel.org/upload/shared//6/6a/Default_Banner.jpg"} alt="Profile image example" />
                                <img align="left" className="fb-image-profile thumbnail" src={this.state.userData.avatar} alt="Profile image example" />

                                <div className="fb-profile-text">
                                    <h1 className="username">{this.state.userData.username}</h1>
                                    <p className="bio">{this.state.userData.bio}</p>
                                </div>
                            </div>
                            <br className="clear" /><br /><br /><br />
                            <Container fluid>
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
                            </Container>
                        </div>
                        :

                        <div className="container profile">

                            <div className="fb-profile">

                                <img align="left" className="fb-image-lg" src={this.state.userData.banner ? this.state.userData.banner : "https://wikitravel.org/upload/shared//6/6a/Default_Banner.jpg"} alt="Profile image example" />
                                <img align="left" className="fb-image-profile thumbnail" src={this.state.userData.avatar} alt="Profile image example" />

                                <div className="fb-profile-text">
                                    <h1 className="username">{this.state.userData.username}</h1>
                                    <Button data-class="PM-button" data-id={this.state.userData._id} onClick={this.goToChat}>PM</Button>
                                    <p className="bio">{this.state.userData.bio}</p>
                                </div>
                            </div>
                            <br className="clear" /><br /><br /><br />
                            <Container fluid>

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
                            </Container>
                        </div>

                }



            </div>
        )
    }
}

export default Profile;
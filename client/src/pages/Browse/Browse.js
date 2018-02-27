import React, { Component } from "react";
import SearchNav from "../../components/SearchNav";
import twitch from "../../utils/twitchAPI";
import SearchRes from "../../components/SearchRes";
import { Container, Row } from "react-materialize";
import API from "../../utils/API.js"
import "./Browse.css";


class Browse extends Component {
    state = {
        results: [],
        search: "",
        selected: "users",
        sessionStatus: ""
    }
    
    componentDidMount(){
        this.setState({search: ""})
        this.TopGames();
        this.checkSession()
     
    }

    checkSession = () => {
        API.getSessionData()
        .then(res => {
            console.log(res);
            if(res.data) {
                this.setState({sessionStatus: "LOG OUT"});
            }
            else {
                this.setState({sessionStatus: "LOG IN"});
            }
        })
    }
    
    Top = () => {
        twitch.Top()
            .then(res => {
                this.setState({ results: res.data.data })
                console.log(res.data.data);
                this.UserIdFix();
            });
    }

    TopGames = () => {
        twitch.TopGames()
            .then(res => {
                this.setState({ results: res.data.data })
                console.log(res.data.data);

            });
    }

    GameStreams = (search) => {
        twitch.GameStreams(search)
            .then(res => {
                this.setState({ results: res.data.data })
                console.log(res.data.data);
                this.UserIdFix();
            });
    }

    UserIdFix = () => {
        const stream = [...this.state.results]
        const streams = stream
        const fixer = streams => streams.user_id || streams.id
        let fixedarray = streams.map(fixer)
        const ass = fixedarray.join("&id=")


        const getUserById = id => {

            twitch.GetUserById(id).then(res => {
                const balls = res.data.data
                const dicks = balls => balls.login
                let hairy = balls.map(dicks)
                for (let i = 0; i < stream.length; i++) {
                    let thing = stream[i]
                    thing["user_login"] = hairy[i];
                    thing["kind"] = "stream";

                }
                this.setState({ results: stream })
                console.log(this.state.results)
            })
        };
        getUserById(ass)
    }

    Gamesearch = (search) => {
        twitch.GameByName(search)
            .then(res => {
                this.setState({ results: res.data.data })
                console.log(res.data.data);

            });
    }

    UserSearch = (search) => {
        twitch.UserSearch(search)
            .then(res => {
                this.setState({ results: res.data.data })
                console.log(res.data.data);
                this.UserIdFix();
                console.log(this.state.results)
            });
    }

    killSession() {
        API.destroySession()
        .then(res => console.log(res));
    }

    handleInputChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    };

    handleSelectChange = event => {
        this.setState({ selected: event.target.value })
    }

    handleSearchSubmit = (event) => {
        event.preventDefault();
        const selected = this.state.selected;
        if (selected === "users") {
            this.UserSearch(this.state.search);
        }
        else if (selected === "games") {
            this.Gamesearch(this.state.search);
        }
        console.log(this.state.selected);
    }

    render() {
        return (
            <div>
                <video autoPlay loop muted preload="true" className="fullscreen-bg_video">
                    <source src="../../../video/Circuit_Background.mp4"></source>
                </video>
                <SearchNav handleInputChange={this.handleInputChange} handleSearchSubmit={this.handleSearchSubmit} topGames={this.TopGames} topStreams={this.Top} handleSelectChange={this.handleSelectChange} session={this.state.sessionStatus} killSession={this.killSession}/>
                <Container>
                    <Row>
                        <div className="search-results">
                            {this.state.results.map(res => {
                                if(res.title) {
                                    var streamTitle = res.title;
                                    if(streamTitle.length > 45) {
                                        streamTitle = streamTitle.substring(0, 45) + "...";
                                    }
                                }
                                return (
                                <SearchRes
                                    userName={res.user_login}
                                    id={res.id}
                                    pic={res.thumbnail_url ? res.thumbnail_url : res.box_art_url ? res.box_art_url : res.profile_image_url}
                                    title={streamTitle ? streamTitle : res.name}
                                    className="browse-results"
                                    GameStreams={this.GameStreams}
                                    kind={res.kind}
                                />)})}
                        </div>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Browse;

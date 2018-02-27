import API from "../../utils/API";
import React from 'react';
import ReactDOM from 'react-dom';
import Slider from 'react-slick';

var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

class MemeCarousel extends React.Component {

    state = {
        items: [],
        userId: "",
        active: 0,
        direction: ''
    }


    componentDidMount = () => {
        this.loadMemes(this.props.userId);
    }

    loadMemes = userId => {
        API.getMemesByUser({ userId: userId }).then(res => {
            console.log(res.data);
            this.setState({ items: res.data });
        }).catch(err => console.log(err));
    }


    render() {
        return (
            <Slider {...settings}>
            {this.state.items.length > 0 ?
                this.state.items.map(item => {
                    return (
                        <div>
                            <img src={item.link} />
                        </div>
                    )
                })

                : ""
            }
        </Slider>
        )
    }
}


export default MemeCarousel;
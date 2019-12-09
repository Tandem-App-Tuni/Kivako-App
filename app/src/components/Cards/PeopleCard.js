import React, { Component } from 'react';


import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

import img1 from './assets/education.png'

import './card-style.css';

class PeopleCard extends Component {

    constructor() {
        super();
    }

    render() {
        return (

            <div className="card text-center">
                <div className="row no-gutters">
                    <div className="col-md-4 col-sm-4 col-4">
                        <img src={"https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg"} alt='' classNameName="card-img-top custom-image-style  " />
                        <a href="#!">
                            <div className="mask rgba-white-slight"></div>
                        </a>
                    </div>
                    <div className="col-md-8 col-sm-8 col-8">
                        <div classNameName="card-body text-dark">
                            <h5 classNameName="card-title">{this.props.person.name}</h5>
                            <p classNameName="card-text text-secondary">
                                {this.props.person.description}
                            </p>
                            <a href="#" classNameName="btn btn-outline-success">Send Request</a>
                        </div>
                    </div>
                </div>
            </div>



        )
    }

    //Vertical style
    /*
    render() {
        return (

            <div classNameName="card text-center">

                <div classNameName="overflow">
                    <img src={img1} alt='' classNameName="card-img-top custom-image-style" />
                </div>

                <div classNameName="card-body text-dark">
                    <h5 classNameName="card-title">{this.props.person.name}</h5>
                    <p classNameName="card-text text-secondary">
                        {this.props.person.description}
                    </p>
                    <a href="#" classNameName="btn btn-outline-success">Send Request</a>
                </div>

            </div>

        )
    }

    */

}

export default PeopleCard;


/*
 <Card classNameName="text-center" style={{
                margin: "10px",

            }}>
                <CardImg classNameName="overflow" top width="100%" src={img1} alt="Card image cap" />
                <CardBody>
                    <h4 classNameName="card-title"></h4>
                    <CardSubtitle>{this.props.person.company}</CardSubtitle>
                    <p classNameName="card-text text-secondary">{this.props.person.description}</p>
                    <Button>Send Request</Button>
                </CardBody>
            </Card>

*/
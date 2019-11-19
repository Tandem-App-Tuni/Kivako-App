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

            <div class="card text-center">
                <div class="row no-gutters">
                    <div class="col-md-4 col-sm-4 col-4">
                        <img src={"https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg"} alt='' className="card-img-top custom-image-style  " />
                        <a href="#!">
                            <div class="mask rgba-white-slight"></div>
                        </a>
                    </div>
                    <div class="col-md-8 col-sm-8 col-8">
                        <div className="card-body text-dark">
                            <h5 className="card-title">{this.props.person.name}</h5>
                            <p className="card-text text-secondary">
                                {this.props.person.description}
                            </p>
                            <a href="#" className="btn btn-outline-success">Send Request</a>
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

            <div className="card text-center">

                <div className="overflow">
                    <img src={img1} alt='' className="card-img-top custom-image-style" />
                </div>

                <div className="card-body text-dark">
                    <h5 className="card-title">{this.props.person.name}</h5>
                    <p className="card-text text-secondary">
                        {this.props.person.description}
                    </p>
                    <a href="#" className="btn btn-outline-success">Send Request</a>
                </div>

            </div>

        )
    }

    */

}

export default PeopleCard;


/*
 <Card className="text-center" style={{
                margin: "10px",

            }}>
                <CardImg className="overflow" top width="100%" src={img1} alt="Card image cap" />
                <CardBody>
                    <h4 className="card-title"></h4>
                    <CardSubtitle>{this.props.person.company}</CardSubtitle>
                    <p className="card-text text-secondary">{this.props.person.description}</p>
                    <Button>Send Request</Button>
                </CardBody>
            </Card>

*/
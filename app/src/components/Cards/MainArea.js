import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import img1 from './assets/anisul.jpg'
import PeopleCard from './PeopleCard'
class MainArea extends Component {
    constructor() {
        super();
        this.state = {

            //Data From database
            people: [
                {
                    name: "David Davidson",
                    company: "Grameen phone",
                    description: "Magna eos amet dolor at vero. Clita amet consetetur ipsum no justo et justo gubergren. Vero sit et at diam."
                },

                {
                    name: "Mark Markdson",
                    company: "Grameen phone",
                    description: "Magna eos amet dolor at vero. Clita amet consetetur ipsum no justo et justo gubergren. Vero sit et at diam."

                },

                {
                    name: "Anisul Islam",
                    company: "Grameen phone",
                    description: "Magna eos amet dolor at vero. Clita amet consetetur ipsum no justo et justo gubergren. Vero sit et at diam."

                },
                {
                    name: "Anisul Islam",
                    company: "Grameen phone",
                    description: "Magna eos amet dolor at vero. Clita amet consetetur ipsum no justo et justo gubergren. Vero sit et at diam."

                }, {
                    name: "Mark Markdson",
                    company: "Grameen phone",
                    description: "Magna eos amet dolor at vero. Clita amet consetetur ipsum no justo et justo gubergren. Vero sit et at diam."

                },

                {
                    name: "Anisul Islam",
                    company: "Grameen phone",
                    description: "Magna eos amet dolor at vero. Clita amet consetetur ipsum no justo et justo gubergren. Vero sit et at diam."

                }, {
                    name: "Anisul Islam",
                    company: "Grameen phone",
                    description: "Magna eos amet dolor at vero. Clita amet consetetur ipsum no justo et justo gubergren. Vero sit et at diam."

                }, {
                    name: "Mark Markdson",
                    company: "Grameen phone",
                    description: "Magna eos amet dolor at vero. Clita amet consetetur ipsum no justo et justo gubergren. Vero sit et at diam."

                },

                {
                    name: "Anisul Islam",
                    company: "Grameen phone",
                    description: "Magna eos amet dolor at vero. Clita amet consetetur ipsum no justo et justo gubergren. Vero sit et at diam."

                }
            ]

        }
    }

    //HoriZontal Part
    render() {

        //as long as data available this function will continue
        let peopleCards = this.state.people.map(person => {
            return (
                <PeopleCard person={person} />
            )
        })
        return (
            <div classNameName="container">
                {peopleCards}
            </div>


        )
    }


    //Vertical Part
    /*

     render() {
        let peopleCards = this.state.people.map(person => {
            return (

                <Col lg="3" md="6" sm="12">
                    <PeopleCard person={person} />
                </Col>


            )
        })
        return (

            <div classNameName="container-fluid d-flex justify-content-center">
                <div classNameName="row">
                    {peopleCards}
                </div>
            </div>

        )
    }

    */

}

export default MainArea;
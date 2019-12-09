
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import './bootstrap.min.css'
import './style.css'
import 'bootstrap/dist/js/bootstrap.js';


import logo from "./images/logo.png"
import iphone3 from "./images/iphone3.png"
import adobe from "./images/adobe.png"
import airbnb from "./images/airbnb.png"
import ebay from "./images/ebay.png"
import evernote from "./images/evernote.png"
import zappos from "./images/zappos.png"
import zendesk from "./images/zendesk.png"
import iphone from "./images/iphone.png"
import home_1 from "./images/home_1.jpg"
import home_2 from "./images/home_2.jpg"
import home_3 from "./images/home_3.jpg"
import face_2 from "./images/face_2.jpg"
import face_3 from "./images/face_3.jpg"
import face_4 from "./images/face_4.jpg"


class LandingPage extends Component {

  onLoginButtonClicked = () => {
    const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/login");
    //const url = 'http://localhost:3000/login';
    window.open(url);

  };



  render() {
    return (

      <div>
        {/* <!-- first section starts here --> */}
        <section id="first-section" class="colered-section">
          <div class="container-fluid">
            <nav class="navbar navbar-expand-lg navbar-dark">
              <img class="logo" src={logo} alt="logo" />
              <a class="navbar-brand" href="#">Tandem App</a>
              <button class="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                  {/* <!-- <li class="nav-item active">
                            <a class="nav-link" href="#">Home</a>
                        </li> --> */}
                  <li class="nav-item active">
                    <button class="btn btn-danger btn-style">Sign Up</button>
                  </li>
                  <li class="nav-item active">
                    <button class="btn btn-danger btn-style">Sign in</button>
                  </li>
                </ul>
              </div>
            </nav>

            {/* <!-- Title --> */}
            <div class="row">
              <div class="col-lg-6">
                <h1 class="title-heading">Showcase 1 - Be serious about your music.</h1>

                <p class="title-paragraph">PlayIT! will become your favorite. It offers a list of features long
                    enough that we could sit
                    here talking about it all day. But, if you're serious about your music, you should definitely
                        take a look. Find us one every market!</p>

                <button class="btn btn-light btn-lg download-btn" type="button"><i class="fab fa-apple"></i>
                  App store</button>
                <button class="btn btn-light btn-lg download-btn" type="button"><i class="fab fa-android"></i>
                  Play store</button>
                {/* <!-- 
                    <i class="fab fa-windows fa-2x title-icon"></i> --> */}

              </div>
              <div class="col-lg-6">
                <img class="title-image" src={iphone3} alt="iphone-mockup" />
              </div>
            </div>
          </div>
        </section>
        {/* <!-- first section ends here --> */}



        {/* <!-- client section starts --> */}
        <section id="client-section" className="text-center">
          <div className="container-fluid">
            <h4 className="header-text text-muted">They were the first to go PlayIT</h4>
            <p className="p-text text-muted">
              Build customer confidence by listing your users! Anyone who has used your service and has
              been pleased
              with it should have a place here! From Fortune 500 to start-ups, all your app enthusiasts will be glad
              to be featured in this section. Moreover, users will feel confident seing someone vouching for your
                product!<br /></p>
          </div>
          <div className="logos">
            <ul className="list-unstyled">
              <li><img src={adobe} alt="" /></li>
              <li><img src={airbnb} alt="" /></li>
              <li><img src={ebay} alt="" /></li>
              <li><img src={evernote} alt="" /></li>
              <li><img src={zappos} alt="" /></li>
              <li><img src={zendesk} alt="" /></li>
            </ul>
          </div>

        </section>
        {/* <!-- client section ends --> */}


        {/* <!-- presentation section starts --> */}

        <section id="section-presentation" className="section-style">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <div className="description">
                  <h4 className="header-text text-muted">It's beautiful</h4>
                  <p className="p-text text-muted">We are 'Play It!', a startup specialising in funky headphones and
                      speakers. We
                      make and sell
                      the mechanisms that let you listen to your favourite music everywhere! With our prestigious
                      craftsmanship, remarkable client care and passion for design, you could say we’re the ‘all
                        singing, all dancing’ kind. We think you’ll love working with us.</p>
                  <p className="p-text text-muted">We make the objects that bring music closer to you. If you want to
                      play music
                      at home on a
                        bad ass box of take in on the road with headphones, we make all the options possible.</p>
                </div>
              </div>
              <div className="col-md-5">
                <img className="presentation-image" src={iphone} style={{ top: "-10px" }} />
              </div>
            </div>
          </div>
        </section>
        {/* <!-- presentation ends starts --> */}


        {/* <!-- demno section starts here --> */}
        <section id="demo-section" className="section-style">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <div className="bd-example">
                  <div id="carouselExampleCaptions" className="carousel fade" data-ride="carousel">
                    <ol className="carousel-indicators">
                      <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
                      <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                      <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img src={home_1} className="d-block w-100" alt="..." />
                      </div>
                      <div className="carousel-item">
                        <img src={home_2} className="d-block w-100" alt="..." />
                      </div>
                      <div className="carousel-item">
                        <img src={home_3} className="d-block w-100" alt="..." />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5 col-md-offset-1">
                <h4 className="header-text">Easy to use</h4>
                <p>
                  With all the apps that users love! Make it easy for users to share, like, post and tweet their
                  favourite things from the app. Be sure to let users know they continue to remain connected while
                  using your app!
                    </p>
                <a href="https://www.creative-tim.com/product/awesome-landing-page" id="Demo1"
                  className="btn btn-warning btn-fill" data-button="warning">Get Free Demo</a>
              </div>
            </div>

          </div>
        </section>
        {/* <!-- demno section ends here --> */}



        {/* <!-- features section starts here --> */}
        <section id="feature-section">
          <div className="container-fluid">
            <h4 className="header-text text-center">Features</h4>
            <div className="row">
              <div className="col-md-4">
                <div className="card card-orange">
                  <div className="icon">
                    <img className="logo card-icon" src={logo} alt="logo" />

                  </div>
                  <div className="text">
                    <h4>Be serious about your music</h4>
                    <p className="p-text text-muted">All appointments sync with your Google calendar so your
                                availability is always up to date. See your schedule at a glance from any device.</p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card card-orange">
                  <div className="icon">
                    <img className="logo card-icon" src={logo} alt="logo" />
                  </div>
                  <div className="text">
                    <h4>Be serious about your music</h4>
                    <p className="p-text text-muted">All appointments sync with your Google calendar so your
                                availability is always up to date. See your schedule at a glance from any device.</p>
                  </div>
                </div>
              </div>


              <div className="col-md-4">
                <div className="card card-orange">
                  <div className="icon">
                    <img className="logo card-icon" src={logo} alt="logo" />
                  </div>
                  <div className="text">
                    <h4>Be serious about your music</h4>
                    <p className="p-text text-muted">All appointments sync with your Google calendar so your
                                availability is always up to date. See your schedule at a glance from any device.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>
        {/* <!-- features section ends here--> */}



        {/* <!-- testimonial-section starts here --> */}
        <section id="testimonial-section">
          <div className="container-fluid">
            <h4 className="header-text text-center">What people think</h4>
            <div id="carouselExampleCaptions1" className="carousel fade" data-ride="carousel">
              <ol className="carousel-indicators">
                <li data-target="#carouselExampleCaptions1" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleCaptions1" data-slide-to="1"></li>
                <li data-target="#carouselExampleCaptions1" data-slide-to="2"></li>
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="mask">
                    <img src={face_2} alt="..." />
                  </div>
                  <div className="carousel-testimonial-caption">
                    <p>Jay Z, Producer</p>
                    <h3 className="p-text text-muted">"I absolutely love your app! It's truly amazing and looks
                                awesome!"</h3>
                  </div>

                </div>

                <div className="carousel-item">
                  <div className="mask">
                    <img src={face_3} alt="..." />
                  </div>
                  <div className="carousel-testimonial-caption">
                    <p>Jay Z, Producer</p>
                    <h3>"I absolutely love your app! It's truly amazing and looks awesome!"</h3>
                  </div>

                </div>

                <div className="carousel-item">
                  <div className="mask">
                    <img src={face_4} alt="..." />
                  </div>
                  <div className="carousel-testimonial-caption">
                    <p>Jay Z, Producer</p>
                    <h3>"I absolutely love your app! It's truly amazing and looks awesome!"</h3>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </section>
        {/* <!-- testimonial-section ends here --> */}


        {/* footer section starts */}
        <section id="footer">
          <div class="container-fluid">
            <div class="row">
              {/* <div class="col-md-4 col-sm-12 col-style">
                <div class="footer-nav">
                  <a href="#">Home</a>
                  <a href="#">Tutorial</a>
                </div>

              </div> */}
              <div class="col-md-12 col-sm-12 col-style">
                <div class="copyright">
                  © 2016 <a href="https://www.studywithanis.com">Anisul Islam</a>, made with love
                    </div>
              </div>
              {/* <div class="col-md-4 col-sm-12 col-style">
                <div class="social-icon">
                  <a href="#"><i class="fab fa-facebook-f facebook-btn social-icon-style"></i></a>
                  <a href="#"><i class="fab fa-youtube youtube-btn social-icon-style"></i></a>
                  <a href="#"><i class="fab fa-twitter twitter-btn social-icon-style"></i></a>
                </div>
              </div> */}
            </div>



          </div>

        </section>

      </div>

    )
  }



}

export default LandingPage;
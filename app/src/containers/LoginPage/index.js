
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import './bootstrap.min.css'
import './style.css'
import 'bootstrap/dist/js/bootstrap.js';


import address from "./images/address.png"
import arrows from "./images/arrows.png"
import elastic from "./images/elastic.png"
import email from "./images/email.png"
import eyeglass from "./images/eyeglass.jfif"
import friendship from "./images/friendship.png"
import language from "./images/language.jpg"
import logo from "./images/logo.png"
import possibility from "./images/possibility.png"
import smartphone from "./images/smartphone.png"



class LandingPage extends Component {

  onLoginButtonClicked = () => {
    const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/login");
    //const url = 'http://localhost:3000/login';
    window.open(url);

  };



  render() {
    return (

      <div>

        {/* first section starts  */}
        <section id="first-section" className="colured-section">
          <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-dark">
              <img className="website-logo" src={logo} alt="website-logo" />
              <button className="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item active">
                    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>

                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#contact-section">Contact <span
                      className="sr-only">(current)</span></a>

                  </li>

                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Language
                            </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <a className="dropdown-item" href="#">Suomi</a>
                      <a className="dropdown-item" href="#">English</a>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>


            {/* Title */}
            <div className="row">
              <div className="col-lg-6">
                <h1 className="title-heading">Welcome to UniTandem!</h1>

                <p className="title-paragraph">UniTandem provides higher education students in Finland with a chance to
                        learn languages and cultures through tandem learning. </p>

                <button id="signUpButton" className="btn btn-outline-success btn-lg title-btn" type="button">
                  Sign Up</button>
                <button id="signInButton" className="btn btn-outline-success btn-lg title-btn" type="button">
                  Sign In</button>
                <a id="moodle-button" href="https://moodle.tuni.fi/"
                  className="btn btn-outline-success btn-lg title-btn">Go to
                        Moodle</a>
              </div>
              <div className="col-lg-6">
                <img className="title-image" src={eyeglass} alt="iphone-mockup" />
              </div>
            </div>
          </div>
        </section>
        {/* first section ends here  */}



        {/* second section starts here */}
        <section id="second-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">What is UniTandem Learning? </h3>
                    <p className="card-text text-muted">Tandem (also known as Each One Teach One) is a method where
                        two
                        students teach each other their native (or native-like) languages in informal meetings,
                        acting both in the teacher’s and the learner’s roles. Tandem can be utilized from
                        beginner to advanced levels, and it can be used to support regular language studies or
                        taken separately.
                            </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>
        {/* second section ends here  */}



        {/* third section or feature section starts here  */}
        <section id="third-section" className="colured-section">
          <div className="container-fluid">
            <h2>Why Choose UniTandem?</h2>
            <div className="row">
              <div className="feature-box col-lg-4">
                <div className="card">
                  <div className="face face1">
                    <div className="content">
                      <img className="feature-icon" src={arrows} alt="arrows" />
                      <h3 className="feature-title">Possibilities</h3>
                    </div>
                  </div>

                  <div className="face face2">
                    <div className="content">
                      <p>an unmatched selection of languages available – see it yourself ! </p>
                      <a href="#">Click here for avialable languages</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="feature-box col-lg-4">
                <div className="card">
                  <div className="face face1">
                    <div className="content">
                      <img className="feature-icon" src={elastic} alt="elastic" />
                      <h3 className="feature-title">Flexibility</h3>
                    </div>
                  </div>

                  <div className="face face2">
                    <div className="content">
                      <p>you can study 1–5 ECTS .</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="feature-box col-lg-4">
                <div className="card">
                  <div className="face face1">
                    <div className="content">
                      <img className="feature-icon" src={friendship} alt="friendship" />
                      <h3 className="feature-title">Guaranteed to work</h3>
                    </div>
                  </div>

                  <div className="face face2">
                    <div className="content">
                      <p>UniTandem is a great way to make new friends.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* third section or feature section ends here  */}



        {/* fourth section starts here  */}
        <section id="fourth-section">
          <div className="container-fluid">

            <h2> How does UniTandem work?</h2>

            <div className="timeline">
              <ul>
                <li>
                  <div className="content">
                    <h3>Step 1</h3>
                    <p> Take a look at the <a href="#">UniTandem data sheet</a> to see if there are people who
                                could teach you the language you’re interested in learning </p>
                  </div>

                </li>


                <li>
                  <div className="content">
                    <h3>Step 2</h3>
                    <p><a href="#"> Sign up to UniTandem</a> using your university or university of
                                applied sciences email address (HAKA).</p>
                  </div>

                </li>

                <li>
                  <div className="content">
                    <h3>Step 3</h3>
                    <p>Find a language partner .</p>
                  </div>

                </li>


                <li>
                  <div className="content">
                    <h3>Step 4</h3>
                    <p>Sign up to <a href="https://digicampus.fi/course/view.php?id=272">DigiCampus</a> using
                                your university of university of applied sciences email address (HAKA) </p>
                  </div>

                </li>


                <li>
                  <div className="content">
                    <h3>Step 5</h3>
                    <p>Read the instructions and choose the topics or triggers that you find interesting (3
                                triggers as a learner = 1 credit).</p>
                  </div>

                </li>

                <li>
                  <div className="content">
                    <h3>Step 6</h3>
                    <p>Collect the outputs of each trigger you complete in your portfolio and submit it when
                                you’re finished.</p>
                  </div>

                </li>

                <li>
                  <div className="content">
                    <h3>Step 7</h3>
                    <p>Give your partner and yourself feedback after each trigger.</p>
                  </div>

                </li>

                <li>
                  <div className="content">
                    <h3>Step 8</h3>
                    <p>The university coordinating UniTandem awards the credits </p>
                  </div>

                </li>

                <div className="clear-div"></div>
              </ul>
            </div>
          </div>
        </section>
        {/* fourth section ends here  */}


        {/* contact-section starts here  */}
        <section id="contact-section" className="colured-section">
          <div className="container-fluid">

            <div className="row">

              <div className="card">
                <div className="card-body">
                  <h3 className="card-title my-title">Contact Information</h3>

                  <div className="contact-content">

                    <img src={address} alt="address icon" />
                    <p>Tampere University <br />
                      Kalevantie 4<br />
                      33104 Tampere</p>

                  </div>
                  <div className="clear-div"></div>

                  <div className="contact-content">

                    <img src={smartphone} alt="smartphone icon" />
                    <span><a href="tel:+358 (0) 294 5211">+358 (0) 294 5211</a></span>

                  </div>



                  <div className="clear-div"></div>

                  <div className="contact-content">
                    <img src={email} alt="" />
                    <span><a href="mailto:info@unitandem.fi"> info@unitandem.fi</a></span>
                  </div>
                </div>

              </div>
            </div>



          </div>

          <div className="copyright">
            © 2019 <a href="https://www.studywithanis.com">Anisul Islam</a>, made with love
        </div>


        </section >

        {/*  contact-section ends here  */}



      </div >

    )
  }



}

export default LandingPage;
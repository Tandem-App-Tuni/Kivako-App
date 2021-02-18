import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';

import InfoTable from './statiticsTable'

import './bootstrap.min.css'
import './style.css'
import 'bootstrap/dist/js/bootstrap.js';

import arrows from "./images/arrows.png"
import elastic from "./images/elastic.png"
import friendship from "./images/friendship.png"
import kivako_logo from "./images/kivako_logo.png"
import cc_image from "./images/cc.png"
import unitandem_logo from "./images/unitandem_logo.png"
import cover_pic from "./images/cover_photo.png"
import ListOfNews from '../ListOfNews'

import '@fortawesome/fontawesome-free/css/all.min.css';
const useStyles = theme =>
  ({
    '@global':
    {
      body:
      {
        backgroundColor: theme.palette.common.white,
      },
    },
    paper:
    {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    img:
    {
      width: '100%',
      height: 300
    }
  });

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = ({ redirectToSingUp: false, redirectToLogin: false });
  }

  onLoginButtonClicked() {
    this.setState({ redirectToLogin: true });
  };

  onSignUpButtonClicked() {
    this.setState({ redirectToSingUp: true });
  }

  render() {

    if (this.state.redirectToSingUp) return (<Redirect to='/register' />);
    if (this.state.redirectToLogin) return (<Redirect to='/local-login' />);

    return (

      <div className="container">
        <nav className="navbar navbar-expand-md navbar-light">{/* navigation starts here */}
          <a href="."><img className="nav-logo" src={unitandem_logo} alt="unitandem logo" /></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span><i className="fas fa-bars" style={{ color: "#4E008E", fontSize: "28px" }}></i></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav ml-auto navbar-right">
              <a className="nav-text" href=".">Home</a>
              <a className="nav-text" href="#footer-section">Contact</a>
            </ul>
          </div>
        </nav> {/* navigation ends here */}

        <img  className="cover-pic" src={cover_pic} alt="" /> {/*cover photo is added here*/}
        <section id="first-section"> {/* first section starts here */}
          <div className="container-fluid colured-section">
            <div id="title-div">
              <h2>Welcome to UniTandem!</h2>
              <p className="title-paragraph">UniTandem provides higher education students in Finland with a chance to
                learn languages and cultures through tandem learning. </p>
              <button id="signUpButton" className="btn btn-outline-success btn-lg title-btn" type="button" onClick={() => { this.onSignUpButtonClicked() }}>
                Sign Up</button>
              <button id="signInButton" className="btn btn-outline-success btn-lg title-btn" type="button" onClick={() => { this.onLoginButtonClicked() }}>
                Sign In</button>
              <a id="moodle-button" href="http://rebrand.ly/DigiCampus" target="_blank"
                className="btn btn-lg btn-outline-success title-btn">Go to
                DigiCampus</a>
             
              <div>
                <h2>What is tandem learning? </h2>
                <p className="title-paragraph">Tandem (also known as Each One Teach One) is a method where
                    two
                    students teach each other their native (or native-like) languages in informal meetings,
                    acting both in the teacher’s and the learner’s roles. Tandem can be utilized from
                    beginner to advanced levels, and it can be used to support regular language studies or
                    taken separately.
                </p>
              </div>
              
              <div class="embed-responsive embed-responsive-21by9">
                <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/mlwKBF9F-pw"></iframe>
              </div>             

            </div>
          </div>
        </section>  {/* first section ends here */}

        <section id="news-section"> {/* news section or feature section starts here */}
          <div className=" container-fluid white-section">
              <h2>News</h2>
              <ListOfNews/>
            </div>
        </section> {/* news section or feature section ends here */}

        <section id="second-section"> {/* second section or feature section starts here */}
          <div className=" container-fluid white-section">
            <h2>Why UniTandem?</h2>
            <div className="row">
              <div className="feature-box col-lg-4 col-md-4 col-sm-6">
                <div className="card">
                  <div className="face face1">
                    <div className="content">
                      <img className="feature-icon" src={arrows} alt="arrows" />
                      <h3 className="feature-title">Possibilities</h3>
                    </div>
                  </div>
                  <div className="face face2">
                    <div className="content">
                      <p>An unmatched selection of languages available. </p>
                      <a href="#fourth-section">Click here to see the available languages</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="feature-box col-lg-4 col-md-4 col-sm-6">
                <div className="card">
                  <div className="face face1">
                    <div className="content">
                      <img className="feature-icon" src={elastic} alt="elastic" />
                      <h3 className="feature-title">Flexibility</h3>
                    </div>
                  </div>
                  <div className="face face2">
                    <div className="content">
                      <p>You can study 1–5 ECTS .</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="feature-box col-lg-4 col-md-4 col-sm-6">
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
        </section>{/* second section or feature section ends here */}

        <section id="third-section">{/* third section starts here  */}
          <div className="container-fluid third-section-container">
            <h2> How does UniTandem work?</h2>
            <div className="timeline">
              <ul>
                <li>
                  <div className="content">
                    <h3>Step 1</h3>
                    <p> Take a look at the <a href="#fourth-section">UniTandem data sheet</a> to see if there are people who
                              could teach you the language you’re interested in learning. If there isn't, sign up anyway - there might be suitable partners for you later on! </p>
                  </div>
                </li>
                <li>
                  <div className="content">
                    <h3>Step 2</h3>
                    <p><button type="button" className="link-button" onClick={() => { this.onSignUpButtonClicked() }}> Sign up to UniTandem</button> using your university or university of
                              applied sciences email address.</p>
                  </div>
                </li>
                <li>
                  <div className="content">
                    <h3>Step 3</h3>
                    <p>Find a language partner. When somebody has accepted your partner request, fill in the <a href="http://rebrand.ly/UniTandem">registration form</a> to get the password for <a href="http://rebrand.ly/DigiCampus" target="_blank">DigiCampus</a>, where the instructions and materials are available. Every student must fill in the registration form individually.</p>
                  </div>
                </li>
                <li>
                  <div className="content">
                    <h3>Step 4</h3>
                    <p>Sign up to <a href="http://rebrand.ly/DigiCampus" target="_blank">DigiCampus</a> using your university or university of applied sciences email address (HAKA), and when prompted, enter the enrolment key you have received after filling in the registration form.</p>
                  </div>
                </li>
                <li>
                  <div className="content">
                    <h3>Step 5</h3>
                    <p>Read the instructions and choose the topics or triggers that you find interesting (3 triggers as a learner = 1 credit).</p>
                  </div>
                </li>
                <li>
                  <div className="content">
                    <h3>Step 6</h3>
                    <p>Reflect on your study process in the course blog, collect the outputs of each trigger you complete in your portfolio, and submit the portfolio when you’re finished.</p>
                  </div>
                </li>
                <li>
                  <div className="content">
                    <h3>Step 7</h3>
                    <p>Give your partner and yourself feedback at the end.</p>
                  </div>
                </li>
                <li>
                  <div className="content">
                    <h3>Step 8</h3>
                    <p>The university coordinating UniTandem awards the credits and you transfer them to your university. </p>
                  </div>
                </li>
                <div className="clear-div"></div>
              </ul>
            </div>
          </div>
        </section>  {/* third section ends here  */}


        <section id="fourth-section">{/* fourth section starts */}
          <div className="container-fluid colured-section">
            <h2>Languages available in UniTandem</h2>
            <InfoTable></InfoTable><br />
          </div>
        </section> {/* fourt section ends here */}

        <section id="footer-section">{/* footer-section starts her  */}
          <div className="content">
            <a href="."> <img className="footer-logo1" src={unitandem_logo} alt="unitandem logo" /> </a> <br />
            Tampere University <br />
            Kalevantie 4, 33104 Tampere <br />
            <a href="tel:+358 (0) 294 5211">+358 (0) 294 5211</a>
            <a href="mailto:info@unitandem.fi"> info@unitandem.fi</a>
            <div className="footer-logos">
              <img className="footer-logo2" src={kivako_logo} alt="kivako logo" />
              <img className="footer-logo3" src={cc_image} alt="cc logo" />
            </div>
          </div>
        </section>   {/* footer-section ends here  */}       </div >

    )

  }
}

export default withStyles(useStyles)(LandingPage);
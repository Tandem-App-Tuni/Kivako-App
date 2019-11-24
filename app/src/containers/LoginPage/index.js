import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import React, {Component} from 'react';




class LandingPage extends Component {

  /*onLoginButtonClicked = () =>{
      //const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/login");
      const url = 'http://localhost:3000/login';
      console.log(url);
      fetch(url, {
        method: 'GET',
        mode:'no-cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
    }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
    })
    .catch((error) => {
      console.error(error);
    });
  };*/

  onLoginButtonClicked = () =>{
    const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/login");
    //const url = 'http://localhost:3000/login';
    window.open(url);
    /*
    console.log(url);
    fetch(url, {
      method: 'POST',
      mode:'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((responseJson) => {
      console.log(responseJson);
    })
    .catch((error) => {
      console.error(error);
    });*/
  };

  

  render() {
     return ( <div>
       <Button variant="contained" color = "primary" onClick={this.onLoginButtonClicked} >
            Sign in
          </Button>
      </div>)
  }



}
  
  export default LandingPage;
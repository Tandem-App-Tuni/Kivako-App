import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import React, {Component} from 'react';




class LandingPage extends Component {


  onLoginButtonClicked = () =>
  {
    const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/login");
    window.open(url);
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
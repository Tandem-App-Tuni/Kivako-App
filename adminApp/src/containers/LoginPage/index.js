import Button from '@material-ui/core/Button';
import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import {
  withStyles
} from '@material-ui/core/styles';

import logo from '../../tandemlogo.png'
import Typography from '@material-ui/core/Typography';
import {Redirect} from 'react-router-dom';


const useStyles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
,img:{
  width: '100%',
    height: 600
}
});

class LandingPage extends Component 
{
  constructor(props){
    super(props);

    this.state = ({redirectToSingUp: false, redirectToLogin: false});
  }

  onLoginButtonClicked()
  {
    this.setState({redirectToLogin: true});
  };

  

  render() {
    const { classes } = this.props;
    if (this.state.redirectToLogin) return (<Redirect to='/local-login'/>);

     return (
     <div>
         <Container component="main" maxWidth="xs">
  
          <Paper className={classes.paper}>
          <img alt="" src={logo} style={{ maxHeight: 100 , maxWidth: '100%', marginTop: 30,marginLeft: 20,marginRight: 20}}/>
          <Typography component="h1" variant="h6" color="primary">
            Admin page
          </Typography>
          <Button variant="contained" color = "primary" onClick={() => {this.onLoginButtonClicked()}}
          style={{ maxHeight: 100 , maxWidth: '80%', marginTop: 30,marginLeft: 20,marginRight: 20,marginBottom: 20}}>
            Sign in
        </Button>
            </Paper>
            </Container>
       
      </div>)
  }

}
  
export default withStyles(useStyles)(LandingPage);
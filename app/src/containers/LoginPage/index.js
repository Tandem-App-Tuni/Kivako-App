import Button from '@material-ui/core/Button';
import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Redirect} from 'react-router-dom';
import 
{
  withStyles
} from '@material-ui/core/styles';

import logo from '../../tandemlogo.png'

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

class LandingPage extends Component 
{
  constructor(props)
  {
    super(props);

    this.state = ({redirectToSingUp: false, redirectToLogin: false});
  }

  onLoginButtonClicked()
  {
    this.setState({redirectToLogin: true});
  };

  onSignUpButtonClicked()
  {
    this.setState({redirectToSingUp: true});
  }

  render() 
  {
    const { classes } = this.props;

    if (this.state.redirectToSingUp) return (<Redirect to='/local-sign-up'/>);
    if (this.state.redirectToLogin) return (<Redirect to='/local-login'/>);

    return (
    <Container 
      component="main" 
      maxWidth="xs">
      <Paper className={classes.paper}>
      <img 
        src={logo} 
        style={{ maxHeight: 100 , maxWidth: '80%', marginTop: 30,marginLeft: 20,marginRight: 20}}/>
        <Button 
          variant="contained" 
          color = "primary" 
          onClick={() => {this.onLoginButtonClicked()}}
          style={{ maxHeight: 100 , maxWidth: '80%', marginTop: 30, marginLeft: 20, marginRight: 20, marginBottom: 30}}>
          Sign in
        </Button>
        <Typography 
            component="h2">
          Do not have an account yet?
        </Typography>
        <Button 
          variant="contained" 
          color = "primary" 
          onClick={() => {this.onSignUpButtonClicked()}}
          style={{ maxHeight: 100 , maxWidth: '80%', marginTop: 20, marginLeft: 20, marginRight: 20, marginBottom: 30}}>
          Sign up
        </Button>
      </Paper>
    </Container>)
  }
}
  
export default withStyles(useStyles)(LandingPage);
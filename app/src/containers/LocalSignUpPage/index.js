import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import logo from '../../tandemlogo.png'
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles';
import { Redirect } from 'react-router';

/**
 * The login page is based on a template available on: https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in
 * For conveniance it is converted to a non-funcitonal, standard component. The login functionality is authored by Peter Mlakar.
 * The purpose of the page is to collect the users login credentials and create a new user in the database.
 * 
 * 
 * @param {*} theme The default application theme.
 */

const styles = theme => 
({
  paper: 
  {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: 
  {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: 
  {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: 
  {
    margin: theme.spacing(3, 0, 2),
  },
});

class LocalSignUpPage extends Component
{
  constructor(props)
  {
    super(props);

    var localTest = false;

    if (localTest)
    {
      this.state = 
      ({
        email:'', 
        password: '', 
        signUp: 'Sign Up', 
        api: 'http://localhost:3000',
        signUpServer: 'http://localhost:3000/register-user', 
        redirectURL:''});
    }
    else
    {
      this.state = 
      ({
        email:'', 
        password: '', 
        signUp: 'Sign Up', 
        api: 'https://www.unitandem.fi:3000', //'http://localhost:3000',
        signUpServer: 'https://www.unitandem.fi:3000/register-user', //'http://localhost:3000/register-user', 
        redirectURL:''});
    }
  }

  handleEmailFormChange = (e) =>
  {
    this.setState({email: e.target.value});
  };

  handlePasswordFormChange = (e) =>
  {
    this.setState({password: e.target.value});
  };

  /**
   * The function processes the request to sign up by the user.
   * It checks basic validity of the password and email.
   * Then the appropriate request is sent to the server.
   */
  handleSignUpButtonClick = (e) =>
  {
    e.preventDefault();

    let email = this.state.email;
    let password = this.state.password;

    fetch(this.state.signUpServer, 
    {
      method: 'POST',
      headers:
      {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify
      ({
        email:email,
        password:password
      })
    }).then(response => response.text()).then(text => 
      {
        if (text == 'User has registered successfully!')
        {
          fetch(this.state.api + '/login', 
          {
            method: 'POST',
            headers:
            {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify
            ({
              username:email,
              password:password
            }),
            credentials: 'include'
          }).then(response => response.text())
            .then(checkUrl => 
              {
                console.log('CheckUrl', checkUrl);
                fetch(this.state.api + checkUrl, 
                  {
                    method: 'GET',
                    credentials: 'include',
                    headers: 
                    {
                      'Access-Control-Allow-Origin': '*'
                    }
                  }).then(response0 => response0.text())
                    .then(regUrl => 
                      {
                        this.setState({redirectURL: regUrl});
                      });
              });
        }
        else alert(text);

      });
  };

  render()
  {
    const {classes} = this.props;

    if (this.state.redirectURL != '') return(<Redirect to={this.state.redirectURL}/>);

    return(
      <Container 
      component="main" 
      maxWidth="xs">
      <Paper className={classes.paper}>
        <img 
            src={logo} 
            style={{ maxHeight: 100 , maxWidth: '80%', marginTop: 30, marginLeft: 20, marginRight: 20}}/>
        <Typography 
            component="h1" 
            variant="h5">
          {this.state.signUp}
        </Typography>
        <form 
            className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e)=>{this.handleEmailFormChange(e)}}
            autoFocus/>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e)=>{this.handlePasswordFormChange(e)}}/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {this.handleSignUpButtonClick(e)}}>
            {this.state.signUp}
          </Button>
        </form>
      </Paper>
      <Box mt={8}>
        <Typography 
          variant="body2" 
          color="textSecondary" 
          align="center">
          {'Copyright © '}
        <Link 
          color="inherit" 
          href="https://material-ui.com/">
          Unitandem
        </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
    </Container>);
  }
}

export default withStyles(styles)(LocalSignUpPage);
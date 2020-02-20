import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import logo from '../../tandemlogo.png'
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles';
import {Redirect} from 'react-router-dom';

import ConstantsList from '../../config_constants';
import Grid from '@material-ui/core/Grid';

/**
 * The activation page is based on a template available on: https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in
 * For conveniance it is converted to a non-funcitonal, standard component. The login functionality is authored by Peter Mlakar.
 */

const styles = theme => ({
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

class ForgotPasswordPage extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = (
    {
      email: '',
      emailBuffer: '',
      password: '',
      cPassword: '',
      passwordError: false,
      cPasswordError: false,
      token: '',
      renderTokenBox: false,
      redirect: false
    });
  }

  handleEmailFormChange = (e) =>
  {
    this.setState({email: e.target.value});
  }

  handleTokenChange = (e) =>
  {
    this.setState({token: e.target.value});
  }

  handlePasswordChange = (e) =>
  {
    const pass = e.target.value;

    this.setState({password: pass, passwordError: pass.length < 6});
  }

  handleCPasswordChange = (e) =>
  {
    const cPass = e.target.value;

    this.setState({cPassword: cPass, cPasswordError: cPass !== this.state.password});
  }

  handleSignUpButtonClick = (e) =>
  {
    e.preventDefault();

    fetch(window.location.protocol + '//' + window.location.hostname + ConstantsList.PORT_IN_USE + '/api/v1/users/resetPasswordRequest/' + this.state.email,
    {
      method: 'GET'
    })
    .then(response => 
    {
      console.log(response);

      if (response.status !== 200) alert('Something went wrong. Try again later.');
      else 
      {
        alert('Password reset token sent. Do not forget to check the junk/spam mail folder.');
        this.setState({renderTokenBox: true, emailBuffer: this.state.email});
      }
    });
  }

  handleResetButtonClick = (e) =>
  {
    e.preventDefault();

    if (this.state.password.length < 6) 
    {
      alert('Selected password is too short!');
      return;
    }

    if (this.state.cPasswordError)
    {
      alert('Confirmation password does not match the selected password!');
      return;
    }

    fetch(window.location.protocol + '//' + window.location.hostname + ConstantsList.PORT_IN_USE + '/api/v1/users/resetPasswordRequestCheck',
    {
      method: 'POST',
      headers: 
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email:this.state.emailBuffer,
        token:this.state.token,
        password:this.state.password
      })
    })
    .then(response => 
    {
      console.log(response);

      if (response.status === 200) 
      {
        alert('Password was changed successfully!');
        this.setState({redirect: true});
      }
      else alert('Something went wrong. Make sure that the token is correct.');
    });
  }

  renderTokenBox = (classes) =>
  {
    return (
    <form  className={classes.form} noValidate>
      <Grid 
      container 
      spacing={2}>
        <Grid 
        item 
        xs={12}>
          <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Reset token"
          autoFocus
          onChange={(e)=>{this.handleTokenChange(e)}}/>
        </Grid>
        <Grid 
        item 
        xs={12}>
          <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="New password"
          error = {this.state.passwordError}
          inputProps={{maxLength: 21}}
          onChange={(e)=>{this.handlePasswordChange(e)}}/>
        </Grid>
        <Grid 
        item 
        xs={12}>
          <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Confirm password"
          error = {this.state.cPasswordError}
          inputProps={{maxLength: 21}}
          onChange={(e)=>{this.handleCPasswordChange(e)}}/>
        </Grid>
      </Grid>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={(e) => {this.handleResetButtonClick(e)}}>
        {'Reset'}
      </Button>
    </form>);
  }

  render()
  {
    const {classes} = this.props;

    if (this.state.redirect) return(<Redirect to='/local-login'/>)

    return(
      <Container 
      component="main" 
      maxWidth="xs">
      <Paper className={classes.paper}>
        <a href={this.state.initialPage}>
          <img
              alt="" 
              src={logo} 
              style={{ maxHeight: 100 , maxWidth: '80%', marginTop: 30, marginLeft: 20, marginRight: 20}}
          />
        </a>

        <Typography 
            component="h3" 
            variant="h5">
          {'Enter your email address'}
        </Typography>
        
        <form  className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {this.handleSignUpButtonClick(e)}}>
            {'Send'}
          </Button>

          {this.state.renderTokenBox ? this.renderTokenBox(classes) : <div/>}
        </form>
      </Paper>
      <Box mt={8}>
        <Typography 
          variant="body2" 
          color="textSecondary" 
          align="center">
          {'Copyright © Unitandem '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
    </Container>);
  }
}

export default withStyles(styles)(ForgotPasswordPage);
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

import ConstantsList from '../../config_constants';
import Grid from '@material-ui/core/Grid';

import { AlertPopup } from '../../components/AlertView';


/**
 * The login page is based on a template available on: https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in
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

class LocalLoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      signUp: 'Login',
      api: ConstantsList.APPLICATION_URL,
      signUpServer: ConstantsList.APPLICATION_URL + '/login',
      logOut: ConstantsList.APPLICATION_URL + '/logout-user',
      signInCheck: ConstantsList.APPLICATION_URL + '/login/check',
      redirectURL: '',
      initialPage: ConstantsList.APPLICATION_URL,
      showAlert: false,
      alertType: "success",
      alertText: ""
    };

    fetch(this.state.signInCheck,
      {
        method: 'GET',
        credentials: 'include'
      }).then(response => response.text())
      .then(regUrl => {
        if (regUrl !== '/') {
          this.setState({ redirectURL: regUrl });
        }
      });
  }

  handleEmailFormChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordFormChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSignUpButtonClick(e) {
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
        body: JSON.stringify({
          username: email,
          password: password
        }),
        credentials: 'include'
      }).then(response => response.text())
      .then(checkUrl => {
        if (checkUrl === '/') {
          this.toggleAlert(true, "error", 'Wrong credentials!');
        }
        else
          fetch(this.state.api + checkUrl,
            {
              method: 'GET',
              credentials: 'include',
              headers:
              {
                'Access-Control-Allow-Origin': '*'
              }
            }).then(response0 => response0.text())
            .then(regUrl => {
              this.setState({ redirectURL: regUrl });
            });
      });
  }

  onForgotPassword(e) {
    e.preventDefault();
    this.setState({ redirectURL: '/forgot-pass' });
  }

  onReactivate(e) {
    e.preventDefault();
    this.setState({ redirectURL: '/activate-account' });
  }

  toggleAlert(open, type, text) {
    //type is 'error', 'info', 'success', 'warning'
    if (open === true) {
      this.setState({
        showAlert: open,
        alertType: type,
        alertText: text
      })
    }
    else {
      this.setState({
        showAlert: open
      })
    }
  }

  render() {
    const { classes } = this.props;

    if (this.state.redirectURL !== '') return (<Redirect to={this.state.redirectURL} />);

    return (
      <React.Fragment>
        <Container
          component="main"
          maxWidth="xs">
          <Paper className={classes.paper}>
            <a href={this.state.initialPage}>
              <img
                alt=""
                src={logo}
                style={{ maxHeight: 100, maxWidth: '80%', marginTop: 30, marginLeft: 20, marginRight: 20 }}
              />
            </a>
            <Typography
              component="h1"
              variant="h5">
              {this.state.signUp}
            </Typography>

            <form className={classes.form} noValidate>
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
                    onChange={(e) => { this.handleEmailFormChange(e) }}
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
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
                    onChange={(e) => { this.handlePasswordFormChange(e) }}
                  />
                </Grid>

              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(e) => { this.handleSignUpButtonClick(e) }}>
                {this.state.signUp}
              </Button>
            </form>
          </Paper>
          <Box mt={3}>
            <Typography
              variant="body2"
              color="textSecondary"
              align="center">
              <Link
                color="inherit"
                href="#"
                onClick={e => this.onForgotPassword(e)}>
                Forgot password?
          </Link>
              <br />
              <Link
                color="inherit"
                href="#"
                onClick={e => this.onReactivate(e)}>
                Did not receive activation link?
          </Link>
            </Typography>
          </Box>
          <Box mt={5}>
            <Typography
              variant="body2"
              color="textSecondary"
              align="center">
              {'Copyright © Unitandem '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </Box>
        </Container>
        <AlertPopup
          open={this.state.showAlert}
          variant={this.state.alertType}
          message={this.state.alertText}
          onClose={()=>{this.setState({showAlert: false})}}/>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(LocalLoginPage);
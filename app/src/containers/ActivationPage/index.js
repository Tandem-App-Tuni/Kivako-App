import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import logo from '../../tandemlogo.png'
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles';

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

class ActivationPage extends Component
{
  constructor(props)
  {
    super(props);

    this.state = (
    {
      email: '',
    });
  }

  handleEmailFormChange = (e) =>
  {
    this.setState({email: e.target.value});
  }

  handleSignUpButtonClick = (e) =>
  {
    e.preventDefault();

    fetch(window.location.protocol + '//' + window.location.hostname + ConstantsList.PORT_IN_USE + '/api/v1/users/reactivate/' + this.state.email,
    {
      method: 'GET'
    })
    .then(response => 
    {
      console.log(response);

      if (response.status !== 200) alert('Something went wrong. Try again later.');
      else alert('Activation link sent. Do not forget to check the junk/spam mail folder.');
    });
  }

  render()
  {
    const {classes} = this.props;

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
            component="h1" 
            variant="h5">
          {'Resend activation email'}
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
                  autoFocus
                />
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

export default withStyles(styles)(ActivationPage);
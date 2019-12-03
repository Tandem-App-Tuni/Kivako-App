import React, {Component} from 'react';
import ResponsiveDrawer from '../MenuDrawer';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {
  withStyles
} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';

import EditIcon from '@material-ui/icons/Edit';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

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
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    width: 80,
    height: 80,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  avatarUpload: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  uploadBtnWrapper: {
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-block',
    '& input': {
      fontSize: '100px',
      position: 'absolute',
      left: 0,
      top: 0,
      opacity: '0',
    }
  },
  //languages
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    //maxWidth: 300,
    width: '100%'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
  }

});

class RegisterAdminPage extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      profileImg: null,
      languagesToTeach: [],
      languagesToLearn: [],
      firstName: '',
      lastName: '',
      email: '',
      cities: [],
      descriptionText: '',
      showInputTeachLanguage: false,
      showInputLearnLanguage: false,
      editingTeachLanguageIndex: 0,
      editingLearnLanguageIndex: 0,
      isAlreadyregistered : false,
      isAlreadyAuthenticated : false,
      isLoadingPage:true,
      userIsAdmin:false,
      openSnackBar:false,
      snackBarMessageError:""
    };
  }

  onImageChange = (event) => {
    if (event.target.files.length > 0) {
      const url = URL.createObjectURL(event.target.files[0]);
      this.setState({
        profileImg: event.target.files[0],
        profileImgURL: url
      });
    }
  }

  // API Call to insert user
  onSaveButtonClicked = () => {
    const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/api/v1/users/add")
    //console.log(url)
    fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        cors: 'no-cors',
        body: JSON.stringify({
          languagesToTeach: {language: "Admin", level: "", credits: 0},//Send arbitrary values
          languagesToLearn:  {language: "Admin", level: "", credits: 0},//Send arbitrary values
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          cities:["Admin"],
          descriptionText: "Admin User",
          userIsActivie: true,
          isAdmin:true
        })
      }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.update) {
          alert("Admin User added succesfully!");
          window.location.reload();
        } else {
          alert("Update failed! " + responseJson.description);
          this.snackBarMessageError = responseJson.description;
          this.openSnackBar=true;
        }
        //this.uploadPhoto(responseJson.userCreated._id)
      })
      .catch((error) => {
        console.error(error);

      });


    //this.uploadPhoto("5daf39de47435bd5d59687c6");
  }

  uploadPhoto = (userId) => {
    const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/users/updatePicture/" + userId)
    console.log(url)
    var formData = new FormData()
    formData.append('profileImg', this.state.profileImg);
    console.log(formData)
    fetch(url, {
        method: 'POST',
        // headers: {
        //       'Content-Type': 'multipart/form-data',
        //     },
        body: formData
      }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }


  handleChangeFirstName = event => {
    this.setState( {firstNameError: false})

    var formFirstName= (event.target.value);
    const validNameRegex = RegExp(/^.*(?=.{1,})(?=.*[a-zA-Z\\u0080-\\uFFFF])(?=.*\d).*$/);

    if(validNameRegex.test(formFirstName)===true){
      this.setState( {firstNameError: true, firstNameErrorMessage: 'Special characters are not accepted'} )
    }else{
      this.setState( {firstNameError: false, firstNameErrorMessage: ''} )
      this.setState( {firstName: formFirstName} )
    }
      
    
  };

  handleChangeLastName = event => {

    var formLastName= (event.target.value);
    const validNameRegex = RegExp(/^.*(?=.{1,})(?=.*[a-zA-Z\\u0080-\\uFFFF])(?=.*\d).*$/);

    if(validNameRegex.test(formLastName)===true){
      this.setState( {lastNameError: true, lastNameErrorMessage: 'Special characters are not accepted'} );
    }else{
      this.setState( {lastNameError: false, lastNameErrorMessage: ''} );
      this.setState( {lastName: formLastName} );
    }

  };

  handleChangeEmail = event => {
    var value = (event.target.value);

    this.setState({
      email: value
    })
  };


  // Load page functions
  checkIfUserIsAdmin(callback) {
    const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/api/v1/users/isRegistered")

    fetch(url, {
      method: 'GET',
      credentials: 'include',
      cors:'no-cors'
    }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      if(responseJson.isRegistered){
        //User is already registered. Redirect to dashboard in render
        this.setState({ isAlreadyregistered: true });
        this.setState({ userIsAdmin: responseJson.isAdmin });
        
      }else{
        // Continue render normaly to register user
        this.setState({ isAlreadyregistered: false });
        this.setState({ userIsAdmin: responseJson.isAdmin });
      }

      callback();

    })
    .catch((error) => {
      console.error(error);
    });
  }

  checkIfUserIsAuthenticaded (callback){

    const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/isAuthenticated");

    fetch(url, {
      method: 'GET',
      credentials: 'include',
      cors:'no-cors'
    }).then((response) => response.json())
    .then((responseData) => {
      
      if(responseData.isAuthenticated === false){
        // Nothing to do, user will be redirect in render;
      }else{
        // User is already authenticated
        // Set email automaticaly
        this.setState({isAlreadyAuthenticated: true});
        //this.setState({email: responseData.email});
      }

      callback();

    })
    .catch((error) => {
      console.error(error);
    });
  }


  componentDidMount() {
    this._isMounted = true;

    if(this._isMounted){
          
      this.checkIfUserIsAuthenticaded(() => {

        this.checkIfUserIsAdmin( () => {

          this.setState({isLoadingPage:false});

        });

      });
    }

  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleCloseSnackBar() {
    this.openSnackBar = false;
  }


  render() {
    const { classes } = this.props;

    //Wait until all informations be render until continue
    if(this.state.isLoadingPage) {
      return null;
    }
    
    // In case user is not authenticated, redirect to initial page
    if(!this.state.isAlreadyAuthenticated){  
      console.log("entrou 1")
      return  <Redirect  to="/" />
    }

    // In case user is NOT an admin, just redirect to initial system page.
    if(!this.state.userIsAdmin){  
      console.log("entrou 2")
      return  <Redirect  to="/" />
    }
    
    return  (
      <div>
        <ResponsiveDrawer title = 'Profile'>
        
        <Container component="main" maxWidth="xs">
          <CssBaseline />
            <Snackbar
              anchorOrigin={'top','center'}
              key={'top','center'}
              open={this.openSnackBar}
              onClose={this.handleClose}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">{this.snackBarMessageError}</span>}
            />
    
          <div className={classes.paper}>
            <Avatar className={classes.avatar} src={this.state.profileImgURL}>
            
            </Avatar>
            <div className={classes.uploadBtnWrapper}>
            
              <IconButton
                color="primary"
                className={classes.button}
                aria-label="upload picture"
                component="span"
              >
              <PhotoCamera />

              </IconButton>
              <input type="file" name="myfile" onChange={this.onImageChange} />
            </div>

            <form className={classes.form} noValidate>
              <Grid container spacing={2}>

                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required={true}
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    error={this.state.firstNameError}
                    value = {this.state.firstName}
                    helperText={ this.state.firstNameError === false ? '' : this.state.firstNameErrorMessage}
                    onChange =  {this.handleChangeFirstName}
                    inputProps={{maxLength: 21}}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required={true}
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    value = {this.state.lastName}
                    error={this.state.lastNameError}
                    helperText={ this.state.lastNameError === false ? '' : this.state.lastNameErrorMessage}
                    onChange =  {this.handleChangeLastName}
                    inputProps={{maxLength: 21}}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    value = {this.state.email}
                    name="email"
                    autoComplete="email"
                    onChange =  {this.handleChangeEmail}
                    helperText="Insert the email carefully. This needs to match with the user email used during login process!"
                  />
                </Grid>
            
              </Grid>

                <Button
                  //type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.onSaveButtonClicked}
                  >
                  Save
                </Button>
              
            </form>

          </div>
          <Box mt={5}>
          </Box>
        </Container>
          
        </ResponsiveDrawer>
      </div> 
    );
  }

}

export default withStyles(useStyles)(RegisterAdminPage);
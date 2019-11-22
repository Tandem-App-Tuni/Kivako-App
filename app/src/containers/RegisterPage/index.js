
import React, {Component} from 'react';
//import ResponsiveDrawer from '../MenuDrawer';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';

import EditIcon from '@material-ui/icons/Edit';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import Divider from '@material-ui/core/Divider';

/*
//Data
import {municipality} from '../../components/constant/municipality'
import { browserHistory } from 'react-router';
import  { Redirect } from 'react-router-dom'

import { withRouter } from 'react-router-dom';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Fab from '@material-ui/core/Fab';
*/
//Components
import {CityPicker} from '../../components/CityPicker';
import LanguagePicker from '../../components/LanguagePicker'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
/*
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};*/

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
  }
  ,
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
   flexContainer : {
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
}
  
});

class SignUpPage extends Component {
  state = {
    profileImg: null,
    languagesToTeach:[],
    languagesToLearn: [],
    firstName : '',
    lastName : '',
    email : '',
    cities : [],
    descriptionText : '',
    showInputTeachLanguage : false,
    showInputLearnLanguage : false,
    editingTeachLanguageIndex : 0,
    editingLearnLanguageIndex : 0
  }

onImageChange = (event) => {
  if (event.target.files.length > 0){
    const url = URL.createObjectURL(event.target.files[0]);
    this.setState({
      profileImg: event.target.files[0],
      profileImgURL: url
    });
  }
}

onSaveButtonClicked = () =>{
  const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/api/v1/users/add")
  console.log(url)
  fetch(url, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    languagesToTeach: this.state.languagesToTeach,
    languagesToLearn: this.state.languagesToLearn,
    firstName : this.state.firstName,
      lastName : this.state.lastName,
      email : this.state.email,
      cities : this.state.cities,
      descriptionText : this.state.descriptionText,
      userIsActivie: true
  })
}).then((response) => response.json())
.then((responseJson) => {
  console.log(responseJson);
  this.uploadPhoto(responseJson.userCreated._id)
})
.catch((error) => {
  console.error(error);
});


//this.uploadPhoto("5daf39de47435bd5d59687c6");
}

uploadPhoto = (userId) =>{
  const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/users/updatePicture/"+userId)
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

handleChangeTeach = event => {
  const { options } = event.target;

     var value= (event.target.value);
    
  this.setState(
    {
      languagesToTeach: value
        }
    )
};

handleChangeLearn = event => {
  const { options } = event.target;

     var value= (event.target.value);
    
  this.setState(
    {
      languagesToLearn: value
        }
    )
};

handleChangeFirstName = event => {
  
  var formFirstName= (event.target.value);
  const validNameRegex = RegExp(/^.*(?=.{1,})(?=.*[a-zA-Z\\u0080-\\uFFFF])(?=.*\d).*$/);

  if(validNameRegex.test(formFirstName)===true){
    this.setState( {firstNameError: true, firstNameErrorMessage: 'Special characters are not accepted'} )
  }else if(formFirstName.length <= 2 || formFirstName.length >=20){
    this.setState( {firstNameError: true, firstNameErrorMessage: 'Number of characters not accepted'} )
  }else{
    this.setState( {firstNameError: false, firstNameErrorMessage: ''} )
    this.setState( {firstName: formFirstName} )
  }
    
  
};

handleChangeLastName = event => {

  var formLastName= (event.target.value);
  const validNameRegex = RegExp(/^.*(?=.{1,})(?=.*[a-zA-Z\\u0080-\\uFFFF])(?=.*\d).*$/);

  if(validNameRegex.test(formLastName)===true){
    this.setState( {lastNameError: true, lastNameErrorMessage: 'Special characters are not accepted'} )
  }else if(formLastName.length <= 2 || formLastName.length >=20){
    this.setState( {lastNameError: true, lastNameErrorMessage: 'Number of characters not accepted'} )
  }else{
    this.setState( {lastNameError: false, lastNameErrorMessage: ''} )
    this.setState( {lastName: formLastName} )
  }

};

handleChangeEmail = event => {
  
  var value= (event.target.value);
 
this.setState(
 {
   email: value
     }
 )
};

handleChangeCities = value => {
 if (value.length > 2) {

 }else{
this.setState(
 {
   cities: value
  }
 )
}
};

handleChangeIntroduction = event => {
  
  var value= (event.target.value);
 
this.setState(
 {
   descriptionText: value
  }
 )
};

checkUserIsRegistered = () =>{
  const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/api/v1/users/isRegistered")
  console.log('Checking is the user is registered...');
  console.log(url);

  fetch(url, {
    method: 'GET',
    credentials: 'include',
    cors:'no-cors'
  }).then((response) => response.json())
  .then((responseJson) => {
    //console.log("log");
    //console.log(responseJson.email);
    this.setState({email: responseJson.email})
  })
  .catch((error) => {
    console.error(error);
  });
}

checkIfUserIsAuthenticaded = () =>{

  const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/isAuthenticated")
  console.log('Checking if the user is authenticated...');
  //console.log(url);

  fetch(url, {
    method: 'GET',
    credentials: 'include',
    cors:'no-cors'
  }).then((response) => response.json())
  .then((responseData) => {
    //console.log("log");
    console.log(responseData);
    if(responseData === false){
        // User not authenticated
        console.log("oi");
        // Redirect to inicial page.
        // TODO IMPLEMENT THIS REDIRECT
        //browserHistory.push('/');
    }else{
        // Continue page render
    }

  })
  .catch((error) => {
    console.error(error);
  });
}


onShowInputTeachLanguage = (open, index, newValue) =>  {
  if (open === true){
    this.setState(
      {
        editingTeachLanguageIndex: index
      }
    )
  }
  else{
    if (newValue != null){
      var arr = this.state.languagesToTeach
      if (index < this.state.languagesToTeach.length){
        arr[index] = newValue
      }
      else{
        arr.push(newValue)
      }     
      this.setState(
        {
          languagesToTeach: arr
        }
      )
    }
  }
  this.setState(
    {
      showInputTeachLanguage: open
    }
  )
};

onShowInputLearnLanguage = (open, index, newValue) =>  {
  if (open === true){
    this.setState(
      {
        editingLearnLanguageIndex: index
      }
    )
  }
  else{
    if (newValue != null){
      var arr = this.state.languagesToLearn
      if (index < this.state.languagesToLearn.length){
        arr[index] = newValue
      }
      else{
        arr.push(newValue)
      }  
      this.setState(
        {
          languagesToLearn: arr
        }
      )
    }
  }
  this.setState(
    {
      showInputLearnLanguage: open
    }
  )
};

toExcludeLanguages = () =>{
  var langs = [];
  
  this.state.languagesToTeach.forEach(item => {
    langs.push(item.language);
  }
  )
  
  return langs
}

handleTermsAndConditionsCheckboxChange = name => event => {
  this.setState({
    termsAndConditionsAccept : name,
  })

};

componentDidMount(){
  this.checkIfUserIsAuthenticaded();
  this.checkUserIsRegistered();

  //Disable button until conditions been accepted
  this.state.termsAndConditionsAccept = false;
  
}


render() {
  const { classes } = this.props;
  const excludedLanguages = this.toExcludeLanguages();

  
    return  (
      <div>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div align = "center" className={classes.paper} style={{backgroundColor: '#400075', color: 'white', borderRadius:16}}>
              <Typography variant="h3" >
                    Register
              </Typography>
              <br></br>
              <Typography variant="caption" >
                    Please, fill just some more informations to use Tandem App and confirm your registration!
              </Typography>
              <br></br>
        </div>

        <div className={classes.paper} >

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
                  helperText={ this.state.firstNameError === false ? 'Empty field!' : this.state.firstNameErrorMessage}
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
                  error={this.state.lastNameError}
                  helperText={ this.state.lastNameError === false ? 'Empty field!' : this.state.lastNameErrorMessage}
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
                    //disabled = {true}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

              <Grid item xs={12}>
                  <CityPicker classes = {classes}
                    selectedItem = {this.state.cities}
                    onChange = {this.handleChangeCities}
  
                  />
              </Grid>

              <Grid item xs={12}>
                  <TextField
                      variant="outlined"
                      id="introduction"
                      label="Short introduction about you"
                      value = {this.state.descriptionText}
                      multiline
                      fullWidth
                      ={true}
                      rows="4"
                      defaultValue=""
                      className={classes.textField}
                      maxlength = {500}
                      margin="normal"
                      onChange =  {this.handleChangeIntroduction}
                      helperText = "The max number of characters is 500."
                    />
                </Grid>
             
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Languages I can teach (maximum of 3)
                </Typography>

                <List>
                      {this.state.languagesToTeach.map(item => {
                        return (
                            <ListItem button key={item.language} onClick={() =>this.onShowInputTeachLanguage(true, this.state.languagesToTeach.indexOf(item))}>
                              <ListItemText primary={item.language + ", Level: " + item.level  + ", Credits: " + item.credits} />
                              <ListItemIcon>
                                <EditIcon />
                              </ListItemIcon>
                            </ListItem>
                        )
                      })}
                  </List>
                  <div align="center">
                    <IconButton disabled={this.state.languagesToTeach.length>=3} className={classes.margin} onClick={() =>this.onShowInputTeachLanguage(true, this.state.languagesToTeach.length)}>
                      <AddCircleOutlineIcon fontSize="small" /> <Typography align="center"  variant="button"> Add more languages to teach</Typography>
                    </IconButton>
                  </div>
              </Grid>

              <LanguagePicker open = {this.state.showInputTeachLanguage} 
                    type = "teach"
                    language = {this.state.languagesToTeach[this.state.editingTeachLanguageIndex]}  
                    onClose={(value) =>this.onShowInputTeachLanguage(false, this.state.editingTeachLanguageIndex, value)}
                    excludedLanguages = {excludedLanguages}
                />

              <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                          Languages I want to learn (maximum of 3)
                    </Typography>

                    <List>
                      {this.state.languagesToLearn.map(item => {
                        return (
                            <ListItem button key={item.language} onClick={() =>this.onShowInputLearnLanguage(true, this.state.languagesToLearn.indexOf(item))}>
                              <ListItemText primary={item.language + ", Level " + item.level + ", Credits: " + item.credits } />
                              <ListItemIcon>
                                <EditIcon />
                              </ListItemIcon>
                            </ListItem>
                        )
                      })}
                    </List>
                    <div align="center">
                      <IconButton disabled={this.state.languagesToLearn.length>=3} align="center" className={classes.margin} onClick={() =>this.onShowInputLearnLanguage(true, this.state.languagesToLearn.length)}>
                        <AddCircleOutlineIcon fontSize="small" />  <Typography align="center"  variant="button"> Add more languages to learn</Typography>
                      </IconButton>
                    </div>
              </Grid>

              <LanguagePicker open = {this.state.showInputLearnLanguage} 
                        type = "learn"
                        language = {this.state.languagesToLearn[this.state.editingLearnLanguageIndex]}  
                        onClose={(value) =>this.onShowInputLearnLanguage(false, this.state.editingLearnLanguageIndex, value)}
                        excludedLanguages = {excludedLanguages}
                  />
              </Grid>

              <br></br>

              <Divider variant="fullWidth" />

              <br></br>

            
          </form>

          <div>
            <div>
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-label="Expand"
                    aria-controls="additional-actions1-content"
                    id="additional-actions1-header"
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="teste"
                          checked = {this.state.termsAndConditionsAccept}
                          onChange={this.handleTermsAndConditionsCheckboxChange(!this.state.termsAndConditionsAccept)}
                          color="primary"
                        />
                      }
                      label="I accept the terms and conditions"
                    />
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography color="textSecondary">
                      Terms and conditions can be see in <a href="url">link text</a>
                    </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>

            </div>

            <Button
                //type="submit"
                disabled={!this.state.termsAndConditionsAccept}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.onSaveButtonClicked}
                >
                SIGN UP
            </Button>

          </div>
        </div>

        <Box mt={5}>
        </Box>
      </Container>
          
      </div> 
    );
}
}
  
  export default withStyles(useStyles) (SignUpPage);

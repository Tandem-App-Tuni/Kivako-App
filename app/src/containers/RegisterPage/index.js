
import React, {Component} from 'react';
//import ResponsiveDrawer from '../MenuDrawer';

import Typography from '@material-ui/core/Typography';
//import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//import PhotoCamera from '@material-ui/icons/PhotoCamera';
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
import {Redirect} from 'react-router-dom';

//Components
import {CityPicker} from '../../components/CityPicker';
import LanguagePicker from '../../components/LanguagePicker'


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
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
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
      editingLearnLanguageIndex : 0,
      isAlreadyregistered : false,
      termsAndConditionsAccept : false,
      isAlreadyAuthenticated : false,
      isLoadingPage:true
    };
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

  handleChangeTeach = event => {
    //const { options } = event.target;
    var value= (event.target.value);
    this.setState({languagesToTeach: value});
  };

  handleChangeLearn = event => {
    //const { options } = event.target;
    var value= (event.target.value);
    this.setState({languagesToLearn: value});
  
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
      this.setState( {lastNameError: true, lastNameErrorMessage: 'Special characters are not accepted'} );
    }else if(formLastName.length <= 2 || formLastName.length >=20){
      this.setState( {lastNameError: true, lastNameErrorMessage: 'Number of characters not accepted'} );
    }else{
      this.setState( {lastNameError: false, lastNameErrorMessage: ''} );
      this.setState( {lastName: formLastName} );
    }

  };

  handleChangeEmail = event => {
    
    var value= (event.target.value);
    this.setState({email: value});
  };

  handleChangeCities = value => {
    if (value.length > 2) {
      this.setState( {citiesError: true, citiesErrorMessage: 'Maximum number of cities is 2'} );
    }else if(value.length < 1){
      this.setState( {citiesError: true, citiesErrorMessage: 'Minimun number of cities is 1'} );
    }else{
      this.setState( {citiesError: false, citiesErrorMessage: ''} );
      this.setState({cities: value});
    }
  };

  handleChangeIntroduction = event => {
    
    var value= (event.target.value);
    this.setState({descriptionText: value});

    
    if (value.length < 5 && value.length > 0) {
      this.setState( {introError: true, introErrorMessage: 'We recommend to write about you'} );
    }else if(value.length > 500){
      this.setState( {introError: true, introErrorMessage: 'Maximum number of characters is 500!'} );
    }else{
      this.setState( {introError: false, introErrorMessage: ''} );
      this.setState({descriptionText: value});
    }
  

  };

  handleTermsAndConditionsCheckboxChange = name => event => {
    this.setState({
      termsAndConditionsAccept : name,
    })

  };

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

  // API Call to insert user
  //TODO -> MAKE A CHECK, IF ALL FIELDS ARE NOT VALID, DON'T SEND API CALL
  onSaveButtonClicked = () =>{
    const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/api/v1/users/add")
    //console.log(url)
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
      console.log(responseJson.userAdded);
      if (responseJson.userAdded) {
        alert("User registered succesfully!");
        this.setState({ isAlreadyregistered: true });
      } else {
        alert("Register failed. Please try again later");
      }

    })
    .catch((error) => {
      console.error(error);
    });

  }

  // Load page functions
  checkIfUserIsRegistered(callback) {
    const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/api/v1/users/isRegistered")

    fetch(url, {
      method: 'GET',
      credentials: 'include',
      cors:'no-cors'
    }).then((response) => response.json())
    .then((responseJson) => {
      console.log("aqui")
      console.log(responseJson.isRegistered);

      if(responseJson.isRegistered){
        console.log("entrou")
        //User is already registered. Redirect to dashboard
        this.setState({ isAlreadyregistered: true });
      }else{
        // Continue render to register user
        this.setState({ isAlreadyregistered: false });
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
        this.setState({email: responseData.email});
        this.setState({isAlreadyAuthenticated: true});    
      }

      callback();

    })
    .catch((error) => {
      console.error(error);
    });
  }

  componentDidMount(){
    this._isMounted = true;
    if(this._isMounted){   
      this.checkIfUserIsAuthenticaded(() => {
        //console.log("Authentication control finished");

        this.checkIfUserIsRegistered( () => {
          //console.log("Register control finished");
          console.log("aqui2")
          console.log(this.state.isAlreadyregistered)

          this.setState({isLoadingPage:false});
        });

      });

    }

  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { classes } = this.props;
    const excludedLanguages = this.toExcludeLanguages();

    //Wait until all informations be render until continue
    if(this.state.isLoadingPage) {
      return null;
    }

    // In case user is not authenticated, redirect to initial page.
    if(!this.state.isAlreadyAuthenticated){  
      return  <Redirect  to="/" />
    }

    // In case user is ALREADY registered, just redirect to other system page.
    if(this.state.isAlreadyregistered){  
      return  <Redirect  to="/browse-match" />
    }

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
                    //value = {this.state.descriptionText}
                    multiline
                    fullWidth={true}
                    rows="4"
                    defaultValue=""
                    className={classes.textField}
                    maxLength = {500}
                    margin="normal"
                    onChange =  {this.handleChangeIntroduction}
                    //helperText = "The max number of characters is 500."
                    error={this.state.introError}
                    helperText={ this.state.introError === false ? 'The max number of characters is 500.' : this.state.introErrorMessage}
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

              <LanguagePicker 
                    open = {this.state.showInputLearnLanguage} 
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

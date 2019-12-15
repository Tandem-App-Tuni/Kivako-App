
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
                    <TermsAndConditions></TermsAndConditions>
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

class TermsAndConditions extends Component {

  render(){


    return(
      <div>

      <Typography color="textSecondary">
        Terms and conditions can be see in the following languages:
      </Typography>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography >English</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div>
              <Typography variant='h4' align='center' gutterBottom> UNITANDEM PRIVACY POLICY  </Typography>
              <br></br>
              <Typography variant='subtitle1' align='left' gutterBottom> <b>Name of the service</b></Typography>
              <Typography variant='body' gutterBottom> UniTandem website </Typography>
              <br></br>
              <Typography variant='subtitle1' align='left' gutterBottom> <b>Description of the service</b> </Typography>
              <Typography variant='body' gutterBottom> A website for tandem language and culture learning aimed at Finnish university students.  </Typography>
              <br></br>
              <Typography variant='subtitle1' align='left' gutterBottom> <b>Data controllers and contact persons</b> </Typography>
              <Typography variant='body' gutterBottom> 
                Tampere universities<br></br>
                Henri Annala, Emmanuel Abruquah<br></br>
                unitandemfinland@gmail.com<br></br>
                http://www.tuni.fi/en <br></br>
                Tampere University,Kalevantie 4, 33014 Tampere,  tel. +358 (0) 294 5211 
              </Typography>
              <br></br> 


              <Typography variant='subtitle1' align='left' gutterBottom> <b>Jurisdiction</b> </Typography>
              <Typography variant='body' gutterBottom> FI – Finland </Typography>
              <br></br>
              <Typography variant='subtitle1' align='left' gutterBottom> <b>Personal data processed </b> </Typography>
              <Typography variant='body' gutterBottom>
                Data in the log files of the server is used for technical maintenance, service security and collecting general statistics. 
                <br></br>
                The website stores and processes the following personal data gained through HAKA login: name, username, role (e.g. student/staff), email address, university, photo of user (if available) 
              </Typography>
              <br></br>
              <Typography variant='subtitle1' align='left' gutterBottom> <b>Third parties to whom personal data is disclosed </b> </Typography>
              <Typography variant='body' gutterBottom> Personal data is not disclosed to third parties. </Typography>
              <br></br>
              <Typography variant='subtitle1' align='left' gutterBottom> <b>How to access, rectify or delete personal data </b> </Typography>
              <Typography variant='body' gutterBottom> Contact the data controller. </Typography>
              <br></br>
              <Typography variant='subtitle1' align='left' gutterBottom> <b>Data retention </b> </Typography>
              <Typography variant='body' gutterBottom> Logged data is removed after the user has not logged in to the service for a year. </Typography>
              <br></br>
              <Typography variant='subtitle1' align='left' gutterBottom> <b>Data Protection Code of Conduct </b> </Typography>
              <Typography variant='body' gutterBottom>Personal data is protected according to the Code of Conduct for Service Providers (http://www.geant.net/uri/dataprotection-code-of-conduct/v1/Pages/default.aspx), a common standard for the research and higher education sector to protect privacy.  </Typography>
              <br></br>
              <Typography variant='subtitle1' align='left' gutterBottom> <b>Statistics </b> </Typography>
              <Typography variant='body' gutterBottom>UniTandem uses first-party cookies for collecting usage data of its website. The data is used for improving the functionality of services and it is not disclosed to third parties.  </Typography>
              <br></br>
              <br></br>
              <p><strong><span data-contrast="auto">TERMS OF USE OF UNITANDEM</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">1 Scope</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">1.1 To whom do these Terms of Use apply?</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">The Terms of Use apply to and bind all&nbsp;</span><span data-contrast="auto">users of the&nbsp;</span><span data-contrast="auto">UniTandem</span><span data-contrast="auto">&nbsp;website</span><span data-contrast="auto">&nbsp;(hereinafter &ldquo;Service&rdquo;)</span><span data-contrast="auto">.</span><span data-contrast="auto">&nbsp;</span><span data-contrast="auto">Any use of the Service by means of&nbsp;</span><span data-contrast="auto">a Finnish university or university of applied sciences email address</span><span data-contrast="auto">&nbsp;also signifies the&nbsp;</span><span data-contrast="auto">u</span><span data-contrast="auto">ser</span><span data-contrast="auto">&rsquo;</span><span data-contrast="auto">s acceptance of the Terms of Use and the&nbsp;</span><span data-contrast="auto">u</span><span data-contrast="auto">ser&rsquo;s agreement to be bound by them.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">1.2 Other norms applied to usage</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">In addition to these Terms of Use, the following norms must be complied with:</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<ul>
<li data-leveltext="" data-font="Symbol" data-listid="1" data-aria-posinset="1" data-aria-level="1"><span data-contrast="auto">legislation in force in Finland at each time</span><span data-ccp-props="{&quot;134233279&quot;:true,&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></li>
</ul>
<ul>
<li data-leveltext="" data-font="Symbol" data-listid="1" data-aria-posinset="1" data-aria-level="1"><span data-contrast="auto">the&nbsp;</span><span data-contrast="auto">Privacy Policy of&nbsp;</span><span data-contrast="auto">UniTandem</span><span data-contrast="auto">&nbsp;and any other policies that are applied to the use of the services</span><span data-ccp-props="{&quot;134233279&quot;:true,&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></li>
<li data-leveltext="" data-font="Symbol" data-listid="1" data-aria-posinset="2" data-aria-level="1"><span data-contrast="auto">any general and service-specific terms and conditions and rules that complement these Terms of Use</span><span data-ccp-props="{&quot;134233279&quot;:true,&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></li>
</ul>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">2 Authorisation</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">2.1 What is an authorisation?</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">If a service is public and available for use on the Internet, all Internet users are authorised to use it. Other services are intended for a limited user group, and a duly granted user identification and authorisation is required in order to use them.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">Authorisation means</span><span data-contrast="auto">&nbsp;in this case</span><span data-contrast="auto">&nbsp;the right to use&nbsp;</span><span data-contrast="auto">the S</span><span data-contrast="auto">ervice. The term &ldquo;user right&rdquo; is often used when talking about authorisation.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">The period of&nbsp;</span><span data-contrast="auto">authorisation&nbsp;</span><span data-contrast="auto">is&nbsp;</span><span data-contrast="auto">the same as the user&rsquo;s period of study right.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">An authorisation is personal.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">2.2 On which grounds is authorisation granted?</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">An authorisation is&nbsp;</span><span data-contrast="auto">automatically&nbsp;</span><span data-contrast="auto">granted</span><span data-contrast="auto">&nbsp;</span><span data-contrast="auto">if the user has a Finnish university&nbsp;</span><span data-contrast="auto">user id.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">2.3 Restricted authorisation</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">It is possible to restrict a user&rsquo;s authorisation if there is a good reason to suspect that compromised information security or abuse is taking place.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">2.4 Beginning of authorisation</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">Authorisation begins when the&nbsp;</span><span data-contrast="auto">user receives a Finnish university user id.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">2.5 Expiry of authorisation</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">The authorisation ends&nbsp;</span><span data-contrast="auto">when the users&rsquo;&nbsp;</span><span data-contrast="auto">studies&nbsp;</span><span data-contrast="auto">at a Finnish university&nbsp;</span><span data-contrast="auto">end</span><span data-contrast="auto">.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">2.6 The responsibilities of a user in the event of the expiry of an authorisation</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">The user must store any personal information they will need</span><span data-contrast="auto">&nbsp;(e.g. chat history)</span><span data-contrast="auto">&nbsp;before their username for the service expires.&nbsp;</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">3 Username</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">3.1 What is a username and why is one needed?</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">The username is used to identify and authenticate a user.</span><span data-contrast="auto">&nbsp;</span><span data-contrast="auto">In order to carry out authorisation, each user must have an identifier with which they can be identified</span><span data-contrast="auto">.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">3.</span></strong><strong><span data-contrast="auto">2</span></strong><strong><span data-contrast="auto">&nbsp;User responsibility</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">A user bears liability for damages and criminal responsibility for any harm or damage resulting from the use of the username. The responsibility also applies to situations where the username is used by a party that received the necessary information and tools from the user, whether on purpose or by negligence.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">3.</span></strong><strong><span data-contrast="auto">3</span></strong><strong><span data-contrast="auto">&nbsp;Prohibition of disclosure and usage</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">It is prohibited to disclose one&rsquo;s username to another person or to use someone else&rsquo;s username.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">4 Rights and responsibilities of&nbsp;</span></strong><strong><span data-contrast="auto">Service users</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">4.1 Primary purposes of use</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">The Service is aimed a</span><span data-contrast="auto">t studying languages and cultures through the&nbsp;</span><span data-contrast="auto">joint&nbsp;</span><span data-contrast="auto">UniTandem</span><span data-contrast="auto">&nbsp;course&nbsp;</span><span data-contrast="auto">of all Finnish universities. The Services is used for finding a study partner and for contacting him/her.</span><span data-contrast="auto">&nbsp;The course is completed according to the instructions in&nbsp;</span><span data-contrast="auto">DigiCampus</span><span data-contrast="auto">&nbsp;Moodle.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">4.</span></strong><strong><span data-contrast="auto">2</span></strong><strong><span data-contrast="auto">&nbsp;Prohibited purposes of use</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">Users must&nbsp;</span><span data-contrast="auto">be respectful</span><span data-contrast="auto">&nbsp;towards other users. The Service is&nbsp;</span><span data-contrast="auto">not for dating</span><span data-contrast="auto">&nbsp;purposes.&nbsp;</span><span data-contrast="auto">Spamming is prohibited.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">It is not allowed to use the Service for non-study purposes (i.e. not completing the&nbsp;</span><span data-contrast="auto">UniTandem</span><span data-contrast="auto">&nbsp;course).</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">Storing, publishing, transmitting or distributing material that is unlawful or against good practice is prohibited.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">Use for agitation of all types is prohibited.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">Usage authorisations must never be used for any illegal or forbidden activities, such as searching for vulnerabilities in information security, unauthorised decryption of data, copying or modifying network communications, or unauthorised access to&nbsp;</span><span data-contrast="auto">the Service</span><span data-contrast="auto">&nbsp;or preparations thereof.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">Parts and features of&nbsp;</span><span data-contrast="auto">the Service</span><span data-contrast="auto">&nbsp;that are not clearly made available for public use must not be used. Such parts and features include tools intended for administration or functions that have been disabled in the system settings.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">Unnecessary usage and loading of resources are prohibited.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">4.</span></strong><strong><span data-contrast="auto">3</span></strong><strong><span data-contrast="auto">&nbsp;Reporting duty</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">A report must be made immediately if a breach of information security or data protection is detected or suspected. The report must be submitted to:</span><span data-contrast="auto">&nbsp;info (at) unitandem.fi</span><span data-contrast="auto">.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">4.4</span></strong><span data-contrast="auto">&nbsp;</span><strong><span data-contrast="auto">Prohibition of phishing</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">Phishing, abuse, copying and distribution of other users' private information is forbidden.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">4.</span></strong><strong><span data-contrast="auto">5</span></strong><strong><span data-contrast="auto">&nbsp;Safe storage and use of passwords</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">Each user is under an obligation to keep their username and the connected password safe and use it in such a manner that they do not come to anyone else&rsquo;s knowledge. You must never disclose your password to anyone.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">It is prohibited to use the password used in the&nbsp;</span><span data-contrast="auto">S</span><span data-contrast="auto">ervice for any other service.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">4.</span></strong><strong><span data-contrast="auto">6</span></strong><strong><span data-contrast="auto">&nbsp;Restrictions on the use of&nbsp;</span></strong><strong><span data-contrast="auto">the</span></strong><strong><span data-contrast="auto">&nbsp;</span></strong><strong><span data-contrast="auto">S</span></strong><strong><span data-contrast="auto">ervice</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">The&nbsp;</span><span data-contrast="auto">service administrators</span><span data-contrast="auto">&nbsp;</span><span data-contrast="auto">are</span><span data-contrast="auto">&nbsp;entitled to restrict or revoke the right to use&nbsp;</span><span data-contrast="auto">the Service</span><span data-contrast="auto">&nbsp;as a precaution.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">4.7 Availability of the Service</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">The Service administrators</span><span data-contrast="auto">&nbsp;disclaim all responsibility and liability for the availability, timeliness, security or reliability of the&nbsp;</span><span data-contrast="auto">Service</span><span data-contrast="auto">&nbsp;or&nbsp;</span><span data-contrast="auto">the</span><span data-contrast="auto">&nbsp;content provided through the Service.&nbsp;</span><span data-contrast="auto">The Service administrators</span><span data-contrast="auto">&nbsp;reserve the right to modify, suspend, or discontinue the&nbsp;</span><span data-contrast="auto">S</span><span data-contrast="auto">ervice or access to the&nbsp;</span><span data-contrast="auto">S</span><span data-contrast="auto">ervice without any notice at any time and without any liability to&nbsp;</span><span data-contrast="auto">the user</span><span data-contrast="auto">.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>



          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Finnish</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            <div>
              <Typography variant='h4' align='center' gutterBottom>UNITANDEM TIETOSUOJASELOSTE   </Typography>
              <br></br>
              <Typography variant='subtitle1' align='left' gutterBottom> <b>Palvelun nimi </b></Typography>
              <Typography variant='body' gutterBottom>UniTandem-sivusto </Typography>
              <br></br>
              <Typography variant='subtitle1' align='left' gutterBottom> <b>Palvelun kuvaus </b> </Typography>
              <Typography variant='body' gutterBottom> Suomalaisille korkeakouluopiskelijoille tarkoitetun kielten ja kulttuurin vertaisoppimiskurssin sivusto. </Typography>
              <br></br>
              <Typography variant='subtitle1' align='left' gutterBottom> <b>Henkilörekisterin rekisterinpitäjät ja yhteyshenkilöt </b> </Typography>
              <Typography variant='body' gutterBottom> 
                Tampereen korkeakouluyhteisö <br></br>
                Henri Annala, Emmanuel Abruquah<br></br>
                unitandemfinland@gmail.com<br></br>
                http://www.tuni.fi/en <br></br>
                Tampereen yliopisto,Kalevantie 4, 33100 Tampereen yliopisto , puh. 0294 5211 
              </Typography>
              <br></br>
              <Typography variant='subtitle1' align='left' gutterBottom> <b>Hallintoalue</b> </Typography>
              <Typography variant='body' gutterBottom> Suomi</Typography>
              <br></br>
              <Typography variant='subtitle1' align='left' gutterBottom> <b>Käsiteltävät henkilötiedot </b> </Typography>
              <Typography variant='body' gutterBottom>
                Palvelun lokitiedostoissa olevia tietoja käsitellään teknisten ongelmien ratkaisemiseksi, palvelun turvallisuuden takaamiseksi sekä yleisten tilastotietojen keräämiseksi 
                <br></br>
                Sivusto tallentaa ja käsittelee seuraavia HAKA-kirjautumisen kautta saatavia henkilötietoja: nimi, rooli (esim. opiskelija/henkilökunta), korkeakoulu, sähköpostiosoite, käyttäjän valokuva (jos saatavilla).
              </Typography>
              <br></br>
              <Typography variant='subtitle1' align='left' gutterBottom> <b>Säännönmukaiset tietolähteet </b> </Typography>
              <Typography variant='body' gutterBottom>Henkilötietoja ei luovuteta kolmansille osapuolille.  </Typography>
              <br></br>
              <Typography variant='subtitle1' align='left' gutterBottom> <b>Henkilötietojen saanti, oikaisu ja poistaminen </b> </Typography>
              <Typography variant='body' gutterBottom> Kaikissa tapauksissa otettava yhteys rekisterin pitäjään.  </Typography>
              <br></br>
              <Typography variant='subtitle1' align='left' gutterBottom> <b>Tietojen säilytys </b> </Typography>
              <Typography variant='body' gutterBottom> Kaikki tallennetut tiedot poistetaan vuoden kuluttua käyttäjän viimeisestä kirjautumisesta palveluun.  </Typography>
              <br></br>
              <Typography variant='subtitle1' align='left' gutterBottom> <b>Tietosuojakäytäntö </b> </Typography>
              <Typography variant='body' gutterBottom>Henkilötietojen suojaamiseksi on sitouduttu noudattamaan seuraavaa tietosuojakäytäntöä: Code of Conduct for Service Providers (http://www.geant.net/uri/dataprotection-code-of-conduct/v1/Pages/default.aspx) </Typography>
              <br></br>
              <Typography variant='subtitle1' align='left' gutterBottom> <b>Tilastointi </b> </Typography>
              <Typography variant='body' gutterBottom>UniTandem käyttää omia evästeitään kerätäkseen käyttötietoja sivustostaan. Kerättyjä tietoja käytetään palvelun parantamiseksi. Tietoja ei luovuteta kolmansille osapuolille. </Typography>
              <br></br>
              <p><strong><span data-contrast="auto">UNITANDEMIN K&Auml;YTT&Ouml;EHDOT</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">1 Soveltamisala</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">1.1 Ket&auml; s&auml;&auml;nn&ouml;t koskevat?</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">K&auml;ytt&ouml;s&auml;&auml;nn&ouml;t sitovat ja velvoittavat kaikkia&nbsp;</span><span data-contrast="auto">UniTandem</span><span data-contrast="auto">-sivuston</span><span data-contrast="auto">&nbsp;(jatkossa Palvelu)</span><span data-contrast="auto">&nbsp;k&auml;ytt&auml;ji&auml;</span><span data-contrast="auto">.</span><span data-contrast="auto">&nbsp;</span><span data-contrast="auto">P</span><span data-contrast="auto">alvelun k&auml;ytt&auml;minen&nbsp;</span><span data-contrast="auto">suomalaisen korkeakoulun s&auml;hk&ouml;postiosoitteella</span><span data-contrast="auto">&nbsp;on merkki siit&auml;, ett&auml; k&auml;ytt&auml;j&auml; on hyv&auml;ksynyt k&auml;ytt&ouml;ehdot ja sitoutuu noudattamaan niit&auml;.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">1.2 Muut k&auml;ytt&ouml;&auml; koskevat normit</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">N&auml;iden k&auml;ytt&ouml;s&auml;&auml;nt&ouml;jen&nbsp;</span><span data-contrast="auto">lis&auml;ksi&nbsp;</span><span data-contrast="auto">P</span><span data-contrast="auto">alvelua</span><span data-contrast="auto">&nbsp;k&auml;ytett&auml;ess&auml; on noudatettava</span><span data-contrast="auto">:</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<ul>
<li data-leveltext="" data-font="Symbol" data-listid="2" data-aria-posinset="1" data-aria-level="1"><span data-contrast="auto">Suomessa voimassa olevaa lains&auml;&auml;d&auml;nt&ouml;&auml;,</span><span data-ccp-props="{&quot;134233279&quot;:true,&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></li>
<li data-leveltext="" data-font="Symbol" data-listid="2" data-aria-posinset="2" data-aria-level="1"><span data-contrast="auto">Palvelun tietosuojaselostetta</span><span data-contrast="auto">&nbsp;ja muita palvelun k&auml;ytt&ouml;&ouml;n soveltuvia politiikkoja sek&auml;</span><span data-ccp-props="{&quot;134233279&quot;:true,&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></li>
<li data-leveltext="" data-font="Symbol" data-listid="2" data-aria-posinset="3" data-aria-level="1"><span data-contrast="auto">n&auml;it&auml; t&auml;ydent&auml;vi&auml; yleisi&auml; ja palvelukohtaisia s&auml;&auml;nt&ouml;j&auml; ja ohjeita.</span><span data-ccp-props="{&quot;134233279&quot;:true,&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></li>
</ul>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">2 K&auml;ytt&ouml;valtuus</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">2.1 Mik&auml; on k&auml;ytt&ouml;valtuus?</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">Julkisen avoimesti k&auml;ytett&auml;v&auml;n palvelun k&auml;ytt&ouml;valtuus on kaikilla internetin k&auml;ytt&auml;jill&auml;. Muut palvelut on tarkoitettu rajatulle k&auml;ytt&auml;j&auml;ryhmille ja edellytt&auml;v&auml;t k&auml;ytt&auml;j&auml;n tunnistamista ja asianmukaisesti my&ouml;nnetty&auml; k&auml;ytt&ouml;valtuutta.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">K&auml;ytt&ouml;valtuus on&nbsp;</span><span data-contrast="auto">t&auml;ss&auml; tapauksessa&nbsp;</span><span data-contrast="auto">oikeus k&auml;ytt&auml;&auml;&nbsp;</span><span data-contrast="auto">Palvelua</span><span data-contrast="auto">. Usein k&auml;ytt&ouml;valtuudesta puhuttaessa k&auml;ytet&auml;&auml;n sanaa &rdquo;k&auml;ytt&ouml;oikeus&rdquo;.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">K&auml;ytt&ouml;valtuu</span><span data-contrast="auto">den kesto on sama kuin k&auml;ytt&auml;j&auml;n opiskeluoikeuden kesto.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">K&auml;ytt&ouml;valtuus on henkil&ouml;kohtainen.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">2.2 K&auml;ytt&ouml;valtuuden my&ouml;nt&auml;misen peruste</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">K&auml;ytt&ouml;valtuus my&ouml;nnet&auml;&auml;n automaattisesti, jos k&auml;ytt&auml;j&auml;ll&auml; on suomalaisen korkeakoulun k&auml;ytt&auml;j&auml;tunnus.&nbsp;</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">2.3 K&auml;ytt&ouml;valtuuden rajoittaminen</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">K&auml;ytt&ouml;valtuutta voidaan rajoittaa, jos siihen liittyen on perusteltu ep&auml;ily tietoturvallisuuden vaarantumisesta tai v&auml;&auml;rink&auml;yt&ouml;st&auml;.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">2.4 K&auml;ytt&ouml;valtuuden alkaminen</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">K&auml;ytt&ouml;valtuus alkaa, kun&nbsp;</span><span data-contrast="auto">k&auml;ytt&auml;j&auml; saa suomalaisen korkeakoulun k&auml;ytt&auml;j&auml;tunnuksen.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">2.5 K&auml;ytt&ouml;valtuuden p&auml;&auml;ttyminen</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">K&auml;ytt&ouml;valtuus p&auml;&auml;ttyy, kun&nbsp;</span><span data-contrast="auto">k&auml;ytt&auml;j&auml;n opinnot suomalaisessa korkeakoulussa p&auml;&auml;ttyv&auml;t.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">2.6 K&auml;ytt&auml;j&auml;n vastuu k&auml;ytt&ouml;valtuuden p&auml;&auml;ttyess&auml;</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">K&auml;ytt&auml;j&auml;n tulee ottaa talteen tarvitsemansa henkil&ouml;kohtaiset tiedot</span><span data-contrast="auto">&nbsp;(esim. keskusteluhistoria)</span><span data-contrast="auto">&nbsp;ennen palvelun k&auml;ytt&auml;j&auml;tunnusten sulkemista.&nbsp;</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">3 K&auml;ytt&auml;j&auml;tunnus</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">3.1 Mik&auml; k&auml;ytt&auml;j&auml;tunnus on ja mihin sit&auml; tarvitaan?</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">K&auml;ytt&auml;j&auml; tunnistetaan (identifioidaan, autentikoidaan) k&auml;ytt&auml;j&auml;tunnuksen perusteella.</span><span data-contrast="auto">&nbsp;</span><span data-contrast="auto">K&auml;ytt&ouml;valtuuksien toteuttamiseksi jokaisella k&auml;ytt&auml;j&auml;ll&auml; tulee olla yksil&ouml;iv&auml; tunniste</span><span data-contrast="auto">.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">3.</span></strong><strong><span data-contrast="auto">2</span></strong><strong><span data-contrast="auto">&nbsp;K&auml;ytt&auml;j&auml;n vastuu</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">K&auml;ytt&auml;j&auml; on vahingonkorvaus- ja rikosoikeudellisessa vastuussa tunnuksen k&auml;yt&ouml;n aiheuttamasta haitasta tai vahingosta. Vastuu koskee my&ouml;s tilanteita, joissa tunnusta k&auml;ytt&auml;&auml; sivullinen, jolle henkil&ouml; on tahallisesti tai huolimattomuuttaan luovuttanut tunnuksen k&auml;ytt&ouml;&ouml;n tarvittavat tiedot tai v&auml;lineet.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">3.</span></strong><strong><span data-contrast="auto">3</span></strong><strong><span data-contrast="auto">&nbsp;Luovutus- ja k&auml;ytt&ouml;kielto</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">K&auml;ytt&auml;j&auml;tunnusta ei saa antaa toisen henkil&ouml;n k&auml;ytt&ouml;&ouml;n, eik&auml; toisen henkil&ouml;n tunnuksen k&auml;ytt&auml;minen ole luvallista.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">4&nbsp;</span></strong><strong><span data-contrast="auto">P</span></strong><strong><span data-contrast="auto">alvelun k&auml;ytt&auml;jien oikeudet ja vastuut</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">4.1 P&auml;&auml;asialliset k&auml;ytt&ouml;tarkoitukset</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">Palvelu on tarkoitettu kielten ja kulttuurien opiskeluun suomalaisten korkeakoulujen yhteisen&nbsp;</span><span data-contrast="auto">UniTandem</span><span data-contrast="auto">-kurssin kautta.&nbsp;</span><span data-contrast="auto">Palvelua k&auml;ytet&auml;&auml;n opiskeluparin l&ouml;yt&auml;miseen ja yhteydenpitoon h&auml;nen kanssaan.&nbsp;</span><span data-contrast="auto">Kurss</span><span data-contrast="auto">i suoritetaan&nbsp;</span><span data-contrast="auto">DigiCampus</span><span data-contrast="auto">-Moodlessa olevien ohjeiden avulla.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">4.</span></strong><strong><span data-contrast="auto">2</span></strong><strong><span data-contrast="auto">&nbsp;Kielletyt k&auml;ytt&ouml;tarkoitukset</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">K&auml;ytt&auml;jien tulee&nbsp;</span><span data-contrast="auto">kohdella toisia k&auml;ytt&auml;ji&auml; kun</span><span data-contrast="auto">nioittavasti.&nbsp;</span><span data-contrast="auto">Palvelu ei ole tarkoitettu seuranhakuun.&nbsp;</span><span data-contrast="auto">Roskapostit</span><span data-contrast="auto">us</span><span data-contrast="auto">&nbsp;on kielletty.&nbsp;</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">Palvelua ei ole sallittu k&auml;ytt&auml;&auml; ei-opinnollisiin tarkoituksiin (ts. muuhun kuin&nbsp;</span><span data-contrast="auto">UniTandem</span><span data-contrast="auto">-kurssin suorittamiseen).</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">Laitonta tai hyv&auml;n tavan vastaista materiaalia ei saa tallentaa, julkaista, v&auml;litt&auml;&auml; eik&auml; jaella.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">K&auml;ytt&ouml; kaikkeen julistavaan toimintaan on kielletty.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">Mit&auml;&auml;n k&auml;ytt&ouml;valtuutta ei saa k&auml;ytt&auml;&auml; laittomaan tai luvattomaan toimintaan, kuten esimerkiksi tietoturva-aukkojen etsimiseen, oikeudettomaan salauksen purkamiseen, tietoliikenteen kopiointiin tai muuttamiseen, tai tietoj&auml;rjestelmiin tunkeutumiseen tai sen valmistelemiseen.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">Tietoj&auml;rjestelmien osia tai piirteit&auml;, joita ei ole selke&auml;sti tuotu yleisesti k&auml;ytett&auml;viksi, ei saa k&auml;ytt&auml;&auml;. T&auml;llaisia ovat esimerkiksi yll&auml;pitoon tarkoitetut ty&ouml;kalut tai j&auml;rjestelm&auml;n asetuksilla estetyt toiminnot.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">Resurssien tarpeeton k&auml;ytt&ouml; ja kuormittaminen on kielletty.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">4.</span></strong><strong><span data-contrast="auto">3</span></strong><strong><span data-contrast="auto">&nbsp;Ilmoitusvelvollisuus</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">Havaituista tai ep&auml;illyist&auml; v&auml;&auml;rink&auml;yt&ouml;ksist&auml; ja tietoturvallisuuden tai tietosuojan puutteista tulee viipym&auml;tt&auml; ilmoittaa osoitteella&nbsp;</span><span data-contrast="auto">info (at) unitandem.fi</span><span data-contrast="auto">.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">4.</span></strong><strong><span data-contrast="auto">4</span></strong><strong><span data-contrast="auto">&nbsp;Urkkimiskielto</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">Muille kuuluvien tietojen urkkiminen, hyv&auml;ksik&auml;ytt&ouml;, talteenotto ja levitt&auml;minen on kielletty.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">4.</span></strong><strong><span data-contrast="auto">5</span></strong><strong><span data-contrast="auto">&nbsp;Salasanojen huolellinen s&auml;ilytt&auml;minen ja k&auml;ytt&ouml;</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">Jokainen on velvollinen s&auml;ilytt&auml;m&auml;&auml;n ja k&auml;ytt&auml;m&auml;&auml;n k&auml;ytt&auml;j&auml;tunnukseensa liittyv&auml;&auml; salasanaa niin, ett&auml; se ei tule kenenk&auml;&auml;n toisen henkil&ouml;n tietoon. Salasanaa ei koskaan pid&auml; kertoa kenellek&auml;&auml;n.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">P</span><span data-contrast="auto">alvelussa k&auml;ytett&auml;v</span><span data-contrast="auto">&auml;</span><span data-contrast="auto">&auml; salasan</span><span data-contrast="auto">a</span><span data-contrast="auto">a ei saa k&auml;ytt&auml;&auml; muissa palveluissa.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">4.</span></strong><strong><span data-contrast="auto">6</span></strong><strong><span data-contrast="auto">&nbsp;</span></strong><strong><span data-contrast="auto">Palvelun</span></strong><strong><span data-contrast="auto">&nbsp;k&auml;yt&ouml;n rajoittaminen</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">Palvelun yll&auml;pit&auml;jill&auml;</span><span data-contrast="auto">&nbsp;on oikeus suojatoimena rajoittaa tai est&auml;&auml;&nbsp;</span><span data-contrast="auto">Palvelun</span><span data-contrast="auto">&nbsp;k&auml;ytt&ouml;&auml;.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><strong><span data-contrast="auto">4.7 Palvelun saatavuus</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
<p><span data-contrast="auto">Palvelun yll&auml;pit&auml;j&auml;t</span><span data-contrast="auto">&nbsp;ei</span><span data-contrast="auto">v&auml;t</span><span data-contrast="auto">&nbsp;ole vastuussa&nbsp;</span><span data-contrast="auto">Palvelun</span><span data-contrast="auto">&nbsp;tai&nbsp;</span><span data-contrast="auto">sen</span><span data-contrast="auto">&nbsp;sis&auml;ll&ouml;n saatavuudesta, ajantasaisuudesta, turvallisuudesta tai luotettavuudesta.&nbsp;</span><span data-contrast="auto">Palvelun yll&auml;pit&auml;j&auml;t</span><span data-contrast="auto">&nbsp;pid&auml;tt&auml;</span><span data-contrast="auto">v&auml;t</span><span data-contrast="auto">&nbsp;oikeuden muuttaa, keskeytt&auml;&auml; tai lakkauttaa palvelut tai p&auml;&auml;syn palveluihin ilman&nbsp;</span><span data-contrast="auto">erillist&auml; ilmoitusta,</span><span data-contrast="auto">&nbsp;milloin tahansa ja ilman mit&auml;&auml;n velvollisuuksia k&auml;ytt&auml;j&auml;&auml; kohtaan.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            </div>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      </div>

      
    )
  }
}
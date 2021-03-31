
import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';

import EditIcon from '@material-ui/icons/Edit';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import Divider from '@material-ui/core/Divider';
import { Redirect } from 'react-router-dom';

//Components
import { CityPicker } from '../../components/CityPicker';
import LanguagePicker from '../../components/LanguagePicker'
import { AlertPopup } from '../../components/AlertView';
import ConstantsList from '../../config_constants';
import TermsEnglishDialog from './privacy_policy_en'
import TermsFinnishDialog from './privacy_policy_fi'
import { getApiData } from '../../helpers/networkRequestHelpers';

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
  flexContainer: {
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
      languagesToTeach: [],
      languagesToLearn: [],
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: '',
      email: '',
      emailConfirmation: '',
      cities: [],
      descriptionText: '',
      showInputTeachLanguage: false,
      showInputLearnLanguage: false,
      editingTeachLanguageIndex: 0,
      editingLearnLanguageIndex: 0,
      isAlreadyregistered: false,
      termsAndConditionsAccept: false,
      isAlreadyAuthenticated: false,
      isLoadingPage: true,
      showAlert: false,
      alertType: "success",
      alertText: ""
    };

    this.toggleAlert = this.toggleAlert.bind(this);
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

  handleChangeTeach = event => {
    //const { options } = event.target;
    var value = (event.target.value);
    this.setState({ languagesToTeach: value });
  };

  handleChangeLearn = event => {
    //const { options } = event.target;
    var value = (event.target.value);
    this.setState({ languagesToLearn: value });

  };

  handleChangeFirstName = event => {

    var formFirstName = (event.target.value);
    const validNameRegex = RegExp(/^.*(?=.{1,})(?=.*[a-zA-Z\\u0080-\\uFFFF])(?=.*\d).*$/);

    if(validNameRegex.test(formFirstName)===true){
      this.setState( {firstNameError: true, firstNameErrorMessage: 'Special characters are not accepted'} )
    }else if(formFirstName.length <= 1 || formFirstName.length >=20){
      this.setState( {firstNameError: true, firstNameErrorMessage: 'Number of characters not accepted'} )
    }else{
      this.setState( {firstNameError: false, firstNameErrorMessage: ''} )
      this.setState( {firstName: formFirstName} )
    }


  };

  handleChangeLastName = event => {

    var formLastName = (event.target.value);
    const validNameRegex = RegExp(/^.*(?=.{1,})(?=.*[a-zA-Z\\u0080-\\uFFFF])(?=.*\d).*$/);

    if(validNameRegex.test(formLastName)===true){
      this.setState( {lastNameError: true, lastNameErrorMessage: 'Special characters are not accepted'} );
    }else if(formLastName.length <= 1 || formLastName.length >=20){
      this.setState( {lastNameError: true, lastNameErrorMessage: 'Number of characters not accepted'} );
    }else{
      this.setState( {lastNameError: false, lastNameErrorMessage: ''} );
      this.setState( {lastName: formLastName} );
    }

  };

  handleChangeEmail = event => {

    var value = (event.target.value);
    this.setState({ email: value });
  };

  handleChangeConfirmEmail = event => {
    var value = event.target.value;
    this.setState({ emailConfirmation: value });
  };

  handleChangeCities = value => {
    if (value.length > 2) {
      this.setState({ citiesError: true, citiesErrorMessage: 'Maximum number of municipilities is 2' });
    } else if (value.length < 1) {
      this.setState({ citiesError: true, citiesErrorMessage: 'Minimun number of municipilities is 1' });
    } else {
      this.setState({ citiesError: false, citiesErrorMessage: '' });
      this.setState({ cities: value });
    }
  };

  handleChangeIntroduction = event => {

    var value = (event.target.value);
    this.setState({ descriptionText: value });


    if (value.length < 5 && value.length > 0) {
      this.setState({ introError: true, introErrorMessage: 'We recommend to write about you' });
    } else if (value.length > 500) {
      this.setState({ introError: true, introErrorMessage: 'Maximum number of characters is 500!' });
    } else {
      this.setState({ introError: false, introErrorMessage: '' });
      this.setState({ descriptionText: value });
    }


  };

  handleFirstPasswordField = event => {

    var value = (event.target.value);
    this.setState({ password: value });

    if (value.length < 6 || value.length > 20) {
      this.setState({ passwordError: true, passwordErrorMessage: 'The password must have at least 6 characters and a maximum of 20' });
    } else {
      this.setState({ passwordError: false, passwordErrorMessage: '' });
      this.setState({ password: value });
    }

  };

  handleConfirmationPasswordField = event => {

    var value = (event.target.value);
    this.setState({ passwordConfirmation: value });

    if (value.length < 6 || value.length > 20) {
      this.setState({ passwordConfirmationError: true, passwordConfirmationErrorMessage: 'The password must have at least 6 characters and a maximum of 20' });
    } else if (value !== this.state.password) {
      this.setState({ passwordConfirmationError: true, passwordConfirmationErrorMessage: 'The password must be equal' });
      this.setState({ passwordError: true, passwordErrorMessage: 'The password must be equal' });
    } else {
      this.setState({ passwordConfirmationError: false, passwordConfirmationErrorMessage: '' });
      this.setState({ passwordError: false, passwordErrorMessage: '' });
      this.setState({ passwordConfirmation: value });
    }

  };


  handleTermsAndConditionsCheckboxChange = name => event => {
    this.setState({
      termsAndConditionsAccept: name,
    })

  };

  onShowInputTeachLanguage = (open, index, newValue) => {
    if (open === true) {
      this.setState(
        {
          editingTeachLanguageIndex: index
        }
      )
    }
    else {
      if (newValue != null) {
        var arr = this.state.languagesToTeach
        if (index < this.state.languagesToTeach.length) {
          arr[index] = newValue
        }
        else {
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

  onShowInputLearnLanguage = (open, index, newValue) => {
    if (open === true) {
      this.setState(
        {
          editingLearnLanguageIndex: index
        }
      )
    }
    else {
      if (newValue != null) {
        var arr = this.state.languagesToLearn
        if (index < this.state.languagesToLearn.length) {
          arr[index] = newValue
        }
        else {
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

  onDeleteLanguage = (type, itemIndex) => {
    switch (type) {
      case "teach":
        const oldTeachList = this.state.languagesToTeach;
        let newTeachList = oldTeachList.filter((x, index) => index !== itemIndex);
        this.setState({
          languagesToTeach: newTeachList
        })
        break;
      case "learn":
        const oldLearnList = this.state.languagesToLearn;
        let newLearnList = oldLearnList.filter((x, index) => index !== itemIndex);
        this.setState({
          languagesToLearn: newLearnList
        })
        break;
      default:
        break;
    }
  }

  toExcludeLanguages = () => {
    var langs = [];

    this.state.languagesToTeach.forEach(item => {
      langs.push(item.language);
    })
    /*
    this.state.languagesToLearn.forEach(item => {
      langs.push(item.language);
    })
    */
    console.log("Excluded languages list: ")
    console.log(langs)
    return langs
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

  // API Call to insert user
  onSaveButtonClicked = () => {
    getApiData({
      version: 'v1',
      endpoint: 'users/add',
    }, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        languagesToTeach: this.state.languagesToTeach,
        languagesToLearn: this.state.languagesToLearn,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        cities: this.state.cities,
        descriptionText: this.state.descriptionText,
        userIsActivie: true,
        password: this.state.password
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.userAdded) {
          setTimeout(()=>{
            this.setState({ isAlreadyregistered: true });
          }, 5000);
          this.toggleAlert(true, "success", "User registered succesfully. Please check your email for an activation link. \nYou will redirect to login page in 5 seconds ...");
        }
        else
          this.toggleAlert(true, "error", responseJson.description);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  checkIfUserIsAuthenticaded(callback) {
    console.log('Checking authentication...');

    getApiData({
      endpoint: 'isAuthenticated',
    }, {
        method: 'GET',
        credentials: 'include'
    }).then((response) => response.json())
      .then((responseData) => {
        if (responseData.isAuthenticated === false) {
          // Nothing to do, user will be redirect in render;
        }
        else {
          // User is already authenticated
          // Set email automaticaly
          this.setState({ email: responseData.email });
          this.setState({ isAlreadyAuthenticated: true });
        }

        callback();

      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    this._isMounted = true;

    if (this._isMounted) {
      this.checkIfUserIsAuthenticaded(() => {
        this.setState({ isLoadingPage: false });
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
    if (this.state.isLoadingPage) {
      return null;
    }

    // In case user is not authenticated, redirect to initial page.
    if (this.state.isAlreadyAuthenticated) {
      return <Redirect to="/browse-match" />
    }

    if (this.state.isAlreadyregistered) {
      return <Redirect to='/local-login' />
    }

    return (
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div align="center" className={classes.paper} style={{ backgroundColor: '#400075', color: 'white', borderRadius: 16 }}>
            <Typography variant="h3" >
              Register
              </Typography>
            <br></br>
            <Typography variant="caption" >
              Please fill in the following information to confirm your registration!
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
                    label="First name"
                    autoFocus
                    error={this.state.firstNameError}
                    helperText={this.state.firstNameError === false ? '' : this.state.firstNameErrorMessage}
                    onChange={this.handleChangeFirstName}
                    inputProps={{ maxLength: 21 }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required={true}
                    fullWidth
                    id="lastName"
                    label="Last name"
                    name="lastName"
                    autoComplete="lname"
                    error={this.state.lastNameError}
                    helperText={this.state.lastNameError === false ? '' : this.state.lastNameErrorMessage}
                    onChange={this.handleChangeLastName}
                    inputProps={{ maxLength: 21 }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email address"
                    value={this.state.email}
                    name="email"
                    autoComplete="email"
                    onChange={this.handleChangeEmail}
                    helperText="Please use your university email (firstname.lastname@university.fi)"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="confirmEmail"
                    label="Email address confirmation"
                    value={this.state.emailConfirmation}
                    name="confirmEmail"
                    error={this.state.emailConfirmation !== this.state.email}
                    onChange={this.handleChangeConfirmEmail}
                    helperText={(this.state.emailConfirmation === this.state.email) ? '' : 'The email and confirm email must be same'}
                  />
                </Grid>


                <Grid item xs={12}>
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    required
                    fullWidth
                    onChange={this.handleFirstPasswordField}
                    helperText={this.state.passwordError === false ? '' : this.state.passwordErrorMessage}
                    error={this.state.passwordError}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    id="passwordConfirmation"
                    label="Password confirmation"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    required
                    fullWidth
                    onChange={this.handleConfirmationPasswordField}
                    helperText={this.state.passwordConfirmationError === false ? '' : this.state.passwordConfirmationErrorMessage}
                    error={this.state.passwordConfirmationError}
                  />
                </Grid>

                <Grid item xs={12} mt={5}>
                  <CityPicker classes={classes}
                    selectedItem={this.state.cities}
                    onChange={this.handleChangeCities}
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
                    maxLength={500}
                    margin="normal"
                    onChange={this.handleChangeIntroduction}
                    //helperText = "The max number of characters is 500."
                    error={this.state.introError}
                    helperText={this.state.introError === false ? 'The max number of characters is 500.' : this.state.introErrorMessage}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Languages I can teach (max 3) (Note: you need to be a native or a near-native speaker to teach)
                </Typography>

                  <List>
                    {this.state.languagesToTeach.map(item => {
                      return (
                        <ListItem button key={item.language} onClick={() => this.onShowInputTeachLanguage(true, this.state.languagesToTeach.indexOf(item))}>
                          <ListItemText primary={item.language + ", Level: " + item.level + ", Credits: " + item.credits} />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="add" onClick={() => this.onShowInputTeachLanguage(true, this.state.languagesToTeach.indexOf(item))}>
                              <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => this.onDeleteLanguage("teach", this.state.languagesToTeach.indexOf(item))}>
                              <DeleteRoundedIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      )
                    })}
                  </List>
                  <div align="center">
                    <IconButton disabled={this.state.languagesToTeach.length >= 3} className={classes.margin} onClick={() => this.onShowInputTeachLanguage(true, this.state.languagesToTeach.length)}>
                      <AddCircleOutlineIcon fontSize="small" /> <Typography align="center" variant="button"> Add more languages to teach</Typography>
                    </IconButton>
                  </div>
                </Grid>

                <LanguagePicker open={this.state.showInputTeachLanguage}
                  type="teach"
                  language={this.state.languagesToTeach[this.state.editingTeachLanguageIndex]}
                  onClose={(value) => this.onShowInputTeachLanguage(false, this.state.editingTeachLanguageIndex, value)}
                  excludedLanguages={excludedLanguages}
                />

                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Languages I want to learn (max. 3)
                    </Typography>

                  <List>
                    {this.state.languagesToLearn.map(item => {
                      return (
                        <ListItem button key={item.language} onClick={() => this.onShowInputLearnLanguage(true, this.state.languagesToLearn.indexOf(item))}>
                          <ListItemText primary={item.language + ", Level " + item.level + ", Credits: " + item.credits} />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="add" onClick={() => this.onShowInputLearnLanguage(true, this.state.languagesToLearn.indexOf(item))}>
                              <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => this.onDeleteLanguage("learn", this.state.languagesToLearn.indexOf(item))}>
                              <DeleteRoundedIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      )
                    })}
                  </List>
                  <div align="center">
                    <IconButton disabled={this.state.languagesToLearn.length >= 3} align="center" className={classes.margin} onClick={() => this.onShowInputLearnLanguage(true, this.state.languagesToLearn.length)}>
                      <AddCircleOutlineIcon fontSize="small" />  <Typography align="center" variant="button"> Add more languages to learn</Typography>
                    </IconButton>
                  </div>
                </Grid>

                <LanguagePicker
                  open={this.state.showInputLearnLanguage}
                  type="learn"
                  language={this.state.languagesToLearn[this.state.editingLearnLanguageIndex]}
                  onClose={(value) => this.onShowInputLearnLanguage(false, this.state.editingLearnLanguageIndex, value)}
                  excludedLanguages={excludedLanguages}
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
                          checked={this.state.termsAndConditionsAccept}
                          onChange={this.handleTermsAndConditionsCheckboxChange(!this.state.termsAndConditionsAccept)}
                          color="primary"
                        />
                      }
                      label="I accept the following terms."
                    />
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <TermsAndConditions></TermsAndConditions>
                  </ExpansionPanelDetails>
                </ExpansionPanel>

              </div>

              <Button
                //type="submit"
                disabled={!(this.state.termsAndConditionsAccept && (this.state.emailConfirmation === this.state.email))}
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
        <AlertPopup
          open={this.state.showAlert}
          variant={this.state.alertType}
          message={this.state.alertText}
          onClose={()=>{this.setState({showAlert: false})}}/>
      </div>
    );
  }

}

export default withStyles(useStyles)(SignUpPage);

class TermsAndConditions extends Component {

  render() {

    return (
      <div>

        <Typography color="textSecondary">
          Terms and conditions and Privacy Policy can be see in the following languages:
      </Typography>
        <br></br>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography >English</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <TermsEnglishDialog></TermsEnglishDialog>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography >Finnish</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <TermsFinnishDialog></TermsFinnishDialog>
          </ExpansionPanelDetails>
        </ExpansionPanel>

      </div>


    )
  }
}
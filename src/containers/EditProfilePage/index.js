import React, { Component } from 'react';
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
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Tooltip from '@material-ui/core/Tooltip';
import DOMPurify from "dompurify";

//Components
import { CityPicker } from '../../components/CityPicker';
import LanguagePicker from '../../components/LanguagePicker'
import { AlertPopup, ConfirmDialog } from '../../components/AlertView';

import ConstantsList from '../../config_constants';
import { getApiData, getApiUrl } from '../../helpers/networkRequestHelpers';

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
  },
  cardMedia: {
    minHeight: '300px'
  },
  includeInMatchingButton: {
    backgroundColor: 'green'
  }
});

class EditProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImgURL: getApiUrl({
        version: 'v1',
        endpoint: 'avatar/getAvatar',
      }),
      languagesToTeach: [],
      languagesToLearn: [],
      firstName: '',
      lastName: '',
      email: '',
      cities: [],
      descriptionText: '',
      profileVideoURL: '',
      showInputTeachLanguage: false,
      showInputLearnLanguage: false,
      showConfirm: false,
      showAlert: false,
      alertType: "success",
      alertText: '',
      editingTeachLanguageIndex: 0,
      editingLearnLanguageIndex: 0,
      videoError: false,
      isExcludeFromMatching: false,
    };

    this.toggleAlert = this.toggleAlert.bind(this);
  }

  onImageChange = (event) => {
    if (event.target.files.length > 0) {
      if (!event.target.files[0].name.match(/.(jpg|jpeg|png|gif)$/))
        this.toggleAlert(true, "error", "Selected file is not an image.")
      else {
        let form = new FormData()
        form.append('avatar', event.target.files[0]);

        getApiData({
          version: 'v1',
          endpoint: 'avatar/uploadAvatar',
        }, {
          method: 'POST',
          credentials: 'include',
          body: form
        })
          .then(response => response.json())
          .then(responseJson => {
            if (responseJson.message === 'Avatar saved!') {
              console.log('Fetching image...');

              this.setState({
                profileImgURL: getApiUrl({
                  version: 'v1',
                  endpoint: 'avatar/getAvatar',
                })
              });
              window.location.reload();
            }
          });
      }
    }
  }

  onSaveButtonClicked = () => {

    getApiData({
      version: 'v1',
      endpoint: 'users/update',
    }, {
      method: 'POST',
      headers:
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      cors: 'no-cors',
      body: JSON.stringify({
        languagesToTeach: this.state.languagesToTeach,
        languagesToLearn: this.state.languagesToLearn,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        cities: this.state.cities,
        descriptionText: this.state.descriptionText,
        userIsActivie: true,
        profileVideoURL: this.state.profileVideoURL
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.update) {
          this.toggleAlert(true, 'success', 'User informations updated succesfully!');
        }
        else
          this.toggleAlert(true, 'error', 'Update failed. Please try again later');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onDeleteProfile = () => {
    getApiData({
      version: 'v1',
      endpoint: 'users/delete',
    }, {
      method: 'DELETE',
      headers:
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    }).then((response) => {
      if (response.status === 200) {
        this.setState({
          showAlert: true,
          showConfirm: false,
          alertText: "You can always create a new account by signing in again. Goodbye!",
          alertType: "info"
        })
      }
      else
        this.setState({
          showAlert: true,
          showConfirm: false,
          alertText: "Something went wrong. Please try again later.",
          alertType: "error"
        })
    })
      .catch(err => {
        console.log(err)
        this.setState({
          showAlert: true,
          showConfirm: false,
          alertText: "Something went wrong. Please try again later.",
          alertType: "error"
        })
      });
  }

  handleChangeTeach = event => {
    var value = (event.target.value);
    this.setState({ languagesToTeach: value })
  };

  handleChangeLearn = event => {
    var value = (event.target.value);
    this.setState({ languagesToLearn: value });
  };

  handleChangeFirstName = event => {
    var formFirstName = (event.target.value);
    const validNameRegex = RegExp(/^.*(?=.{1,})(?=.*[a-zA-Z\\u0080-\\uFFFF])(?=.*\d).*$/);

    if (validNameRegex.test(formFirstName)) this.setState({ firstNameError: true, firstNameErrorMessage: 'Special characters are not accepted' });
    else if (formFirstName.length >= 20) this.setState({ firstNameError: true, firstNameErrorMessage: 'Number of characters not accepted' });
    else this.setState({ firstNameError: false, firstNameErrorMessage: '', firstName: formFirstName });
  };

  handleChangeLastName = event => {

    var formLastName = (event.target.value);
    const validNameRegex = RegExp(/^.*(?=.{1,})(?=.*[a-zA-Z\\u0080-\\uFFFF])(?=.*\d).*$/);

    if (validNameRegex.test(formLastName) === true) {
      this.setState({ lastNameError: true, lastNameErrorMessage: 'Special characters are not accepted' });
    } else if (formLastName.length >= 20) {
      this.setState({ lastNameError: true, lastNameErrorMessage: 'Number of characters not accepted' });
    } else {
      this.setState({ lastNameError: false, lastNameErrorMessage: '' });
      this.setState({ lastName: formLastName });
    }

  };

  handleChangeEmail = event => {
    var value = DOMPurify.sanitize((event.target.value));

    this.setState({
      email: value
    })
  };

  handleChangeProfileVideo = event => {
    var value = (event.target.value);
    // ex: https://www.youtube.com/watch?v=2ZjcBwlZSxI
    if (value.includes("www.youtube.com/watch?v=")) {
      let id = value.split("watch?v=")[1];
      value = `https://www.youtube.com/embed/${id}`;
      this.setState({
        profileVideoURL: value,
        videoError: false
      })
    }
    else {
      this.setState({
        videoError: true
      })
    }
  };

  handleChangeCities = value => {
    value = DOMPurify.sanitize(value);
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
    var value = DOMPurify.sanitize((event.target.value));
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

  checkIfUserIsAuthenticaded(callback) {
    getApiData({
      endpoint: 'isAuthenticated',
    }, {
      method: 'GET',
      credentials: 'include',
      cors: 'no-cors'
    }).then((response) => response.json())
      .then((responseData) => {
        if (responseData.isAuthenticated) {
          this.setState({ email: responseData.email });

          callback();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  preLoadUserInformations = () => {
    console.log('[INFO]Loading user information...');

    getApiData({
      version: 'v1',
      endpoint: 'users/userInfo',
    }, {
      method: 'GET',
      credentials: 'include',
      cors: 'no-cors'
    }).then((response) => response.json())
      .then((responseData) => {
        console.log('Load user info:', responseData.data.firstName);

        this.setState({
          firstName: responseData.data.firstName,
          lastName: responseData.data.lastName,
          email: responseData.data.email,
          languagesToLearn: responseData.data.languagesToLearn.filter(language => language.language != null),
          languagesToTeach: responseData.data.languagesToTeach.filter(language => language.language != null),
          descriptionText: responseData.data.descriptionText,
          cities: responseData.data.cities,
          profileVideoURL: responseData.data.profileVideoURL ? responseData.data.profileVideoURL : '',
          isExcludeFromMatching: responseData.data.excludeFromMatching,
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.checkIfUserIsAuthenticaded(() => {
      this.preLoadUserInformations();
    });
  }

  onShowInputTeachLanguage = (open, index, newValue) => {
    if (open === true) {
      this.setState({
        editingTeachLanguageIndex: index
      })
    } else {
      if (newValue != null) {
        var arr = this.state.languagesToTeach
        if (index < this.state.languagesToTeach.length) {
          arr[index] = newValue
        } else {
          arr.push(newValue)
        }
        this.setState({
          languagesToTeach: arr
        })
      }
    }
    this.setState({
      showInputTeachLanguage: open
    })
  };

  onShowInputLearnLanguage = (open, index, newValue) => {
    if (open === true) {
      this.setState({
        editingLearnLanguageIndex: index
      })
    } else {
      if (newValue != null) {
        var arr = this.state.languagesToLearn
        if (index < this.state.languagesToLearn.length) {
          arr[index] = newValue
        } else {
          arr.push(newValue)
        }
        this.setState({
          languagesToLearn: arr
        })
      }
    }
    this.setState({
      showInputLearnLanguage: open
    })
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
  onExcludeIncludeButtonClicked = async flagValue => {
    try {
      const response = await getApiData({
        version: 'v1',
        endpoint: 'users/setMatchingVisibility',
      }, {
        method: 'POST',
        credentials: 'include',
        cors: 'no-cors',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flag: flagValue,
        })
      });
      const responseData = await response.json();
      if (responseData.excludeFromMatching) {
        this.setState({ isExcludeFromMatching: true })
        this.toggleAlert(true, 'success', 'Exclude from matching succesfully!');
      }
      else {
        this.setState({ isExcludeFromMatching: false })
        this.toggleAlert(true, 'success', 'Include in matching succesfully!');
      }
    }
    catch (e) {
      this.toggleAlert(true, "error", 'Something went wrong. Try again later.');
    }
  }

  toExcludeLanguages = () => {
    var langs = [];

    this.state.languagesToTeach.forEach(item => {
      langs.push(item.language);
    })

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

  render() {
    const { classes } = this.props;
    const excludedLanguages = this.toExcludeLanguages();
    const mediaCard = this.state.profileVideoURL
      ? <Grid item xs={12} >
        <Card>
          <CardHeader title="Profile video URL" subheader="Note: Remember to click save changes button if you updated your profile video">
          </CardHeader>
          <CardMedia className={classes.cardMedia} component="iframe" src={this.state.profileVideoURL}></CardMedia>
        </Card>
      </Grid>
      : <></>

    return (
      <div>
        <Container component="section" aria-label="Edit profile" maxWidth="xs">
          <CssBaseline />

          <div className={classes.paper}>
            <Avatar className={classes.avatar} src={this.state.profileImgURL} />

            <div className={classes.uploadBtnWrapper}>

              <input accept="image/*"
                id="icon-button-file"
                type="file"
                name="myfile"
                onChange={this.onImageChange}
                aria-label="upload-image"
              />
              <label htmlFor="icon-button-file">
                <Tooltip title="Upload image" placement="top">
                  <IconButton
                    color="primary"
                    className={classes.button}
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </Tooltip>
              </label>

            </div>

            <form className={classes.form} noValidate>
              <Grid container spacing={2}>

                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    variant="outlined"
                    required={true}
                    fullWidth
                    id="firstName"
                    label="First name"
                    autoFocus
                    error={this.state.firstNameError}
                    value={this.state.firstName}
                    helperText={this.state.firstNameError === false ? '2-19 characters required' : this.state.firstNameErrorMessage}
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
                    autoComplete="family-name"
                    value={this.state.lastName}
                    error={this.state.lastNameError}
                    helperText={this.state.lastNameError === false ? '2-19 characters required' : this.state.lastNameErrorMessage}
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
                    InputProps={{
                      readOnly: true,
                    }} />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="video"
                    label="Video profile URL"
                    value={this.state.profileVideoURL}
                    name="video"
                    autoComplete="url"
                    onChange={this.handleChangeProfileVideo}
                    error={this.state.videoError}
                    helperText={
                      this.state.videoError ? "URL is not supported. Only youtube Url is supported at the moment."
                        : "Please make sure the video is publicly accessible. A YouTube link is recommended."
                    }
                  />
                </Grid>

                {mediaCard}

                <Grid item xs={12}>
                  <CityPicker
                    classes={classes}
                    selectedItem={this.state.cities}
                    onChange={this.handleChangeCities}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    id="introduction"
                    label="Short introduction about you"
                    value={this.state.descriptionText}
                    multiline
                    fullWidth={true}
                    rows="4"
                    className={classes.textField}
                    maxLength={500}
                    margin="normal"
                    onChange={this.handleChangeIntroduction}
                    error={this.state.introError}
                    helperText={this.state.introError === false ? 'The max number of characters is 500.' : this.state.introErrorMessage}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle1" component="subtitle" gutterBottom>
                    Languages I can teach (max 3) (Note: you need to be a native or a near-native speaker to teach)
                  </Typography>

                  <List>
                    {this.state.languagesToTeach.map(item => {
                      return (
                        <ListItem key={item.language} >
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
                      <AddCircleOutlineIcon fontSize="small" /> <Typography align="center" variant="button">Add more languages to teach</Typography>
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
                  <Typography variant="subtitle1" component="subtitle" gutterBottom>
                    Languages I want to learn (max. 3)
                    </Typography>

                  <List>
                    {this.state.languagesToLearn.map(item => {
                      return (
                        <ListItem key={item.language} >
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

              <Button
                //type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.onSaveButtonClicked}
                disabled={(this.state.lastName.length < 2 || this.state.firstName.length < 2) ? true : false}
              >
                Save changes
              </Button>

              {this.state.isExcludeFromMatching ?
                <Tooltip title="Your profile will be visible in find partner page. Other users will be able to send you a partner request.">
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.includeInMatchingButton}
                    onClick={() => this.onExcludeIncludeButtonClicked(false)}>
                    Include In Matching
                    </Button>
                </Tooltip>
                :
                <Tooltip title="Your profile will be excluded from find partner page. Other users won't be able to send you a partner request.">
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={() => this.onExcludeIncludeButtonClicked(true)}>
                    Exclude From Matching
                    </Button>
                </Tooltip>
              }
              <br /><br />

              <ExpansionPanel
                defaultExpanded={false}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header">
                  <Typography>Delete your profile</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Button
                    fullWidth
                    variant='contained'
                    color='primary'
                    className={classes.submit}
                    onClick={() => { this.setState({ showConfirm: true }) }}>
                    Delete profile
                    </Button>
                </ExpansionPanelDetails>
              </ExpansionPanel>

            </form>

          </div>
          <Box mt={5}>
          </Box>
        </Container>
        <AlertPopup
          open={this.state.showAlert}
          onClose={() => { this.setState({ showAlert: false }) }}
          variant={this.state.alertType}
          message={this.state.alertText}
        />
        <ConfirmDialog
          open={this.state.showConfirm}
          onClose={() => { this.setState({ showConfirm: false }) }}
          title="Are you sure you want to delete your profile ?"
          onConfirm={this.onDeleteProfile} />
      </div>
    );
  }
}

export default withStyles(useStyles)(EditProfilePage);

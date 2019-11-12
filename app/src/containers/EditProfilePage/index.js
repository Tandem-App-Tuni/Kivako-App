
import React, {Component} from 'react';
import ResponsiveDrawer from '../MenuDrawer';

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

//Data
import {municipality} from '../../components/constant/municipality'

//Components
import {CityPicker} from '../../components/CityPicker';
import LanguagePicker from '../../components/LanguagePicker'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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
  }
  
});

const languages = [
  "English",
  "Finnish",
  "Swedish",
  "French",
  "German"
];

class EditProfilePage extends Component {
  state = {
    profileImg: null,
    languagesToTeach:[],
    languagesToLearn: [],
    firstName : '',
    lastName : '',
    email : '',
    cities : [],
    descriptionText : '',
    showInputLanguage : false
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
  const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/users/add")
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

handleChangeStudy = event => {
  const { options } = event.target;

     var value= (event.target.value);
    
  this.setState(
    {
      languagesToLearn: value
        }
    )
};

handleChangeFirstName = event => {
  
     var value= (event.target.value);
    
  this.setState(
    {
      firstName: value
        }
    )
};

handleChangeLastName = event => {
  
  var value= (event.target.value);
 
this.setState(
 {
   lastName: value
     }
 )
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
  console.log(value);
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

onShowInputLanguage = event =>  {
  this.setState(
    {
      showInputLanguage: true
    }
  )
};

render() {
  const { classes } = this.props;
    return  (
      <div>
          <ResponsiveDrawer title = 'Profile'>
         
          <Container component="main" maxWidth="xs">
        <CssBaseline />
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
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange =  {this.handleChangeFirstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange =  {this.handleChangeLastName}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange =  {this.handleChangeEmail}
                  // disabled = {true}
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
                  label="Introduction"
                  multiline
                  fullWidth
                  rows="4"
                  defaultValue=""
                  className={classes.textField}
                  margin="normal"
                  onChange =  {this.handleChangeIntroduction}
                />
              </Grid>
             
              <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Languages I can teach
              </Typography>
              <IconButton aria-label="delete" className={classes.margin} onClick={this.onShowInputLanguage}>
                 <EditIcon fontSize="small" />
              </IconButton>
              </Grid>

              <LanguagePicker open = {this.state.showInputLanguage}/>

              <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                    Languages I want to learn
                    </Typography>
                    <IconButton aria-label="delete" className={classes.margin}>
              <EditIcon fontSize="small" />
              </IconButton>
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
  
  export default withStyles(useStyles) (EditProfilePage);
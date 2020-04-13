import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';

import { Redirect } from 'react-router';
import { History } from 'react-router';

//Components
import {AlertView} from '../../components/AlertView'

import ConstantsList from '../../config_constants';


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
    margin: theme.spacing(1, 0, 2),
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
  },
  cardMedia:  {
    minHeight: '300px'
  }
});



class ViewProfile extends Component {

    constructor(props) {
      super(props);
      let imgUrl = props.userEmail ? "/" + props.userEmail : "";
      this.state = {
      profileImgURL: window.location.protocol + '//' + window.location.hostname + ConstantsList.PORT_IN_USE + '/api/v1/avatar/getAvatar' + imgUrl,
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
      showAlert: false,
      alertType: 'error',
	  alertText: '',
      editingTeachLanguageIndex: 0,
      editingLearnLanguageIndex: 0,
    videoError: false,
    //This will be used to fetch the user info from backend
    userEmail: props.userEmail,
	  redirectURL: '',
      portOption: ConstantsList.PORT_IN_USE //set to 3000 for local testing
    };
  }


  preLoadUserInformations = () => 
  {
    console.log('[INFO]Loading user information...');
    let queryParameter = this.state.userEmail ? "?userEmail=" + this.state.userEmail : "";

    fetch(window.location.protocol + '//' + window.location.hostname + this.state.portOption + "/api/v1/users/userInfo" + queryParameter, 
    {
        method: 'GET',
        credentials: 'include',
        cors: 'no-cors'
    })
    .then((response) => response.json())
    .then((responseData) => 
    {
      console.log('Load user info:', responseData.data.firstName);

      this.setState({
        firstName: responseData.data.firstName,
        lastName: responseData.data.lastName,
        email: responseData.data.email,
        languagesToLearn: responseData.data.languagesToLearn.filter(language => language.language != null),
        languagesToTeach: responseData.data.languagesToTeach.filter(language => language.language != null),
        descriptionText: responseData.data.descriptionText,
        cities: responseData.data.cities,
        profileVideoURL: responseData.data.profileVideoURL ? responseData.data.profileVideoURL : ''
      })
    })
    .catch((error) => 
    {
      console.error(error);
    });
  }

  componentDidMount() 
  {
    this.checkIfUserIsAuthenticaded(() => 
    {
      this.preLoadUserInformations();
    });
  }

  checkIfUserIsAuthenticaded (callback)
  {
    fetch(window.location.protocol + '//' + window.location.hostname + this.state.portOption + '/isAuthenticated', 
    {
      method: 'GET',
      credentials: 'include',
      cors:'no-cors'
    })
    .then((response) => response.json())
    .then((responseData) => 
    {
      if(responseData.isAuthenticated)
      {
        this.setState({email: responseData.email});

        callback();
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
    
  render() 
  {
    const { classes } = this.props;
    const mediaCard =  this.state.profileVideoURL 
                          ? <Grid item xs={12} >
                              <Card>
                              <CardHeader title="Profile video URL">
                              </CardHeader>
                              <CardMedia className={classes.cardMedia} component="iframe" src={this.state.profileVideoURL}></CardMedia>
                              </Card>
                            </Grid> 
                          : <Typography variant='caption'>
                              Video profile URL
                                <Typography variant='body1'>
                                  {this.state.profileVideoURL}
                                </Typography>
                            </Typography>

    return  (
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
  
          <div className={classes.paper}>
            <Avatar className={classes.avatar} src={this.state.profileImgURL}>
            </Avatar>


        <form className={classes.form} noValidate>
          <Grid container spacing={2}>

          <Grid item xs={12}>
	    <Typography variant='caption'>
	      First name
              <Typography variant='body1'>
	        {this.state.firstName}
              </Typography>
            </Typography>
                </Grid>

          <Grid item xs={12}>
	    <Typography variant='caption'>
	      Last name
              <Typography variant='body1'>
	        {this.state.lastName}
              </Typography>
            </Typography>
                </Grid>

          <Grid item xs={12}>
	    <Typography variant='caption'>
	      Email address
              <Typography variant='body1'>
	        {this.state.email}
              </Typography>
            </Typography>
          </Grid>

          <Grid item xs={12}>
	    
            {mediaCard}
          </Grid>

          <Grid item xs={12}>
	    <Typography variant='caption'>
	      Municipalities
              <Typography variant='body1'>
	        {this.state.cities.join(', ')}
              </Typography>
            </Typography>
          </Grid>
                
          <Grid item xs={12}>
	    <Typography variant='caption'>
	      Short introduction about you
              <Typography variant='body1'>
	        {this.state.descriptionText}
              </Typography>
            </Typography>
          </Grid>
              
          <Grid item xs={12}>
            <Typography variant="caption" gutterBottom>
            Languages I can teach
            <List>
              {this.state.languagesToTeach.map(item => {
                 return (
                   <ListItem key={item.language} >
                   <ListItemText primary={item.language + ", Level: " + item.level  + ", Credits: " + item.credits} />
                   </ListItem>
                 )
               })}
             </List>
	     </Typography>
	    </Grid>

            <Grid item xs={12}>
              <Typography variant="caption" gutterBottom>
                Languages I want to learn
	        <List>
                  {this.state.languagesToLearn.map(item => {
                     return (
                        <ListItem key={item.language} >
                        <ListItemText primary={item.language + ", Level " + item.level + ", Credits: " + item.credits } />
                        </ListItem>
                     )
                   })}
                </List>
	       </Typography>


                </Grid>
            
              </Grid>
            { !this.state.userEmail ? <Button
	      //type="submit"
              fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={event => window.location.href='/edit-profile'}
                  >
                  Edit profile
                </Button> : <div/>}
            

              
            </form>

          </div>
          <Box mt={5}>
          </Box>
        </Container>
        <AlertView
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.showAlert}
        autoHideDuration={6000}
        onClose={() => {this.setState({showAlert: false})}}
        variant={this.state.alertType}
        message={this.state.alertText}
      />
      </div> 
    );
  }


}

export default withStyles(useStyles)(ViewProfile);

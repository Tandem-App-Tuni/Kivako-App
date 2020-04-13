import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import CardMedia from '@material-ui/core/CardMedia';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import ProfilePage from '../../containers/ViewProfile'
import ConstantsList from '../../config_constants';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

  const useStyles = theme => ({
    card: {
      display: 'flex',
      padding: "1px",
      borderRadius: 16,
      backgroundColor: "#FAFAFA",
      },
    media: {
      flexShrink: 0,
      backgroundColor: "#F4F4F4",
      borderRadius: "80%",
      boxShadow: '0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9',
      marginRight:"2%",
      [theme.breakpoints.between('lg','xl')]: {
        minWidth: '35%',
        maxWidth: '35%',
        maxHeight:"190px",
        marginTop:"20px",
        marginRight: "5%",
      },
      [theme.breakpoints.down('lg')]: {
        minWidth: '30%',
        maxWidth: '30%',
        maxHeight: '10rem',
        marginRight: "5px",
        borderRadius: "50%",
      },
      [theme.breakpoints.down('1462')]: {
        minWidth: '30%',
        maxWidth: '30%',
        maxHeight: '9rem',
        marginRight: "5px",
        borderRadius: "60%",
      },
      [theme.breakpoints.down('1346')]: {
        maxHeight: '8rem',
      },
      [theme.breakpoints.down('md')]: {
        display: "none"
      },
    },
    content: {
      padding: "0px, 0, 0, 0",
    },
    heading: {
      fontSize: 17,
      fontWeight: 'bold',
      letterSpacing: '0.5px',
      marginBottom: 0,
      marginRight: "1.5em",
      display: 'inline-block',
    },
    
    email: {
      fontSize: 14,
      fontWeight: 'bold',
      letterSpacing: '0.5px',
      marginBottom: 0,
      marginTop:'1rem',
      marginRight: "1.5em",
      display: 'block',
    },
    body : {
      fontSize: 14,
      wordWrap: "break-word",
    },
    icon: {
      fontSize: '0.8rem',
    },
    chip: {
      marginLeft: "5px"
    },
    buttonGroup: {
      marginTop: "1.1rem"
    },
    button: {
      marginRight: "10px"
    },
    descriptionText: {
      fontSize: 14,
      wordWrap: "break-word",
      minHeight: "120px",
      minWidth: "321.77px",
      maxWidth: "321.77px",
      [theme.breakpoints.down('lg')]: {
        minWidth: "285.77px",
        maxWidth: "285.77px"
      },
      [theme.breakpoints.down('1346')]: {
        minWidth: "235.77px",
        maxWidth: "235.77px"
      },
      [theme.breakpoints.down('md')]: {
        minWidth: "auto",
        maxWidth: "auto",
        minHeight: "auto"
      }
    },
    circleIcon: {
      minWidth: '35%',
      maxWidth: '35%',
      maxHeight:"190px",
      minHeight:"190px",
      [theme.breakpoints.between('lg','xl')]: {
        minWidth: '35%',
        maxWidth: '35%',
        maxHeight:"190px",
        marginTop:"10px",
        marginRight: "0%",
      },
      [theme.breakpoints.down('lg')]: {
        minWidth: '51%',
        maxWidth: '51%',
        minHeight: '190px',
        maxHeight: '170px',
      },
      [theme.breakpoints.down('1462')]: {
        minWidth: '38%',
        maxWidth: '38%',
        maxHeight: '5rem',
      },
      [theme.breakpoints.down('1354')]: {
        minWidth: '33%',
        maxWidth: '33%'
      },
      [theme.breakpoints.down('md')]: {
        display: "none"
      }
    }
  });
  
  class UserStyleCard extends Component 
  {
    constructor(props) {
      super(props);
      this.handleOnYesClick = this.handleOnYesClick.bind(this);
      this.handleOnError = this.handleOnError.bind(this);

      this.state = 
      {
        detailProfileOpen: false,
        portOption:ConstantsList.PORT_IN_USE,
        showDefaultAvatar: false
      };
    }
    
    handleDetailProfileOpen = () => {
      this.setState({
        detailProfileOpen: true
      })
    }
    handleClose = () => {
      this.setState({
        detailProfileOpen: false
      })
    };

    handleOnYesClick= () => {
      switch(this.props.page) {
        case "browse-match": 
          this.props.yesFunction(this.props.user, this.props.matchingLanguage);
          break;
        case "pending-match":
          this.props.yesFunction(this.props.match);
          break;
        case "partner-list": 
          this.props.yesFunction(this.props.matchId);
          break;
        default:
          break;
      }
    }

    handleOnNoClick= () => {
      switch(this.props.page) {
        case "pending-match":
          this.props.noFunction(this.props.match);
          break;
        case "partner-list":
          this.props.noFunction();
          break;
        default:
          break;
      }
    }

    handleOnError() {
      this.setState({
        showDefaultAvatar: true
      })
    }

    renderAvatar = (classes) => {
      const defaultAvatar = (<CardMedia
        className={classes.circleIcon}
        component={AccountCircleIcon}
        children=" " />);
      
      const UserAvatar = (<CardMedia
        className={classes.media}
            component="img"
            onError={this.handleOnError}
            image={window.location.protocol + '//' + window.location.hostname + this.state.portOption + '/api/v1/avatar/getAvatar/' + this.props.user.email}
      />);

      if(this.state.showDefaultAvatar) return defaultAvatar;
      else return UserAvatar
    }

    renderButtonGroup = (yesText, yesFunction, noText, noFunction, cssClasses) => {
        const yesButton = (yesText && yesFunction) 
        ? (  <Button className={cssClasses.button} onClick={this.handleOnYesClick} variant="outlined" size="medium" color="primary" >
                {yesText}
              </Button>
          )
        : (<></>);
        const noButton = (noText && noFunction) 
        ? (  <Button className={cssClasses.button} onClick={this.handleOnNoClick} variant="outlined" size="medium" color="secondary" >
                {noText}
              </Button>
          )
        : (<></>);

        return(
          <div className={cssClasses.buttonGroup}> 
            <Grid>
              {yesButton}
              {noButton}
            </Grid>
          </div>
        )
    }

    render ()
    {  
        const { classes, user, yesText, yesFunction, noText, noFunction } = this.props;
        const userDescription = (user.descriptionText == null || user.descriptionText === "") 
                                ? "< User has no description >" : `${user.descriptionText.substr(0,180)} ...`
        return(
          <div>
            <Card className={classes.card} elevation={0}>
            <CardContent className={classes.content}>


              <Box mb={1}>
                <h2 className={classes.heading}>{user.firstName} {user.lastName}</h2>
                <Link
                  component={'button'}  onClick={this.handleDetailProfileOpen}
                >
                  Full profile <ArrowForwardIos className={classes.icon}/>
                </Link>
              </Box>
              <Box mb={1}>
                <h6 className={classes.heading}> { user.cities.join(', ') }  </h6>
                <h6 className={classes.email}> { user.email}  </h6>
              </Box>
              <p className={classes.descriptionText}>
                {userDescription}     
              </p>
              <div>
                
              </div>
              <div className={classes.body}>   
                <div className={classes.chipGroup}>
                  Want to learn
                  {user.languagesToLearn.map(lang => {
                    return ( <Chip key={lang.language} className={classes.chip} color="primary" variant="outlined" size="small" 
                             label={`${lang.language} - ${lang.level} - ${lang.credits} credits`} /> )
                  })}
                </div>
              </div>
              {this.renderButtonGroup(yesText,yesFunction,noText,noFunction,classes)}

            </CardContent>
            {this.renderAvatar(classes)}

          </Card>
            <Dialog
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.detailProfileOpen}
            onClose={this.handleClose}
            maxWidth={'md'}
            fullWidth={true}
            >
              <ProfilePage userEmail={user.email}></ProfilePage>
            </Dialog>
        </div>
        );
    }
        
  }


  export default withStyles(useStyles) (UserStyleCard);


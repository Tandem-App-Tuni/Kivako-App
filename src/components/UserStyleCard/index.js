import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import ReportIcon from '@material-ui/icons/Report';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import ProfilePage from '../../containers/ViewProfile'
import ConstantsList from '../../config_constants';
import WarningIcon from '@material-ui/icons/Warning';
import Tooltip from '@material-ui/core/Tooltip';
import Moment from 'moment';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import Dialog from '@material-ui/core/Dialog';
import { getApiUrl } from '../../helpers/networkRequestHelpers';

const useStyles = theme => ({
   expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
         duration: theme.transitions.duration.shortest,
      }),
   },
   expandOpen: {
      transform: 'rotate(180deg)',
   },
   avatar: {
      backgroundColor: red[500],
   },
   summaryDetails: {
      paddingTop: '0px',
      height: '130px'
   },
   chip: {
      margin: '2px',
   },
   purple: {
      backgroundColor: theme.palette.primary.main,
      fontColor: "white"
   }
});

class UserCard extends Component {
   constructor(props) {
      super(props);
      this.handleOnYesClick = this.handleOnYesClick.bind(this);
      this.handleOnNoClick = this.handleOnNoClick.bind(this);
      this.handleOnError = this.handleOnError.bind(this);
      this.state =
      {
         detailProfileOpen: false,
         portOption: ConstantsList.PORT_IN_USE,
         showDefaultAvatar: false,
         detailsExpanded: false,
         menuOpen: false,
      };
   }

   handleOnError() {
      this.setState({
         showDefaultAvatar: true
      })
   }

   // expands the user's description and list of languages they want to learn
   handleExpandClick = () => {
      const expanded = this.state.detailsExpanded;
      this.setState({
         detailsExpanded: !expanded
      });
   }

   handleOnYesClick = () => {
      switch (this.props.page) {
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

   handleOnNoClick = () => {
      switch (this.props.page) {
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

   renderButtonGroup = (yesText, yesFunction, noText, noFunction, classes) => {
      const yesButton = (yesText && yesFunction)
         ? ((this.props.page == "pending-match")
            ? <Tooltip title="Accept" placement="top-start">
               <IconButton aria-label="accept" >
                  <DoneIcon onClick={this.handleOnYesClick} />
               </IconButton>
              </Tooltip>
            : (this.props.page == "browse-match")
               ? <Tooltip title="Add partner" placement="right">
                  <IconButton aria-label="add partner">
                     <PersonAddIcon onClick={this.handleOnYesClick} />
                  </IconButton>
                 </Tooltip>
               : <Tooltip title="Unmatch" placement="top-start">
                  <IconButton aria-label="unmatch">
                     <PersonAddDisabledIcon onClick={this.handleOnYesClick} />
                  </IconButton>
                 </Tooltip>

         )
         : (<></>);

      const noButton = (noText && noFunction)
         ? ((this.props.page == "pending-match")
            ? <Tooltip title="Reject" placement="top">
               <IconButton aria-label="reject">
                  <CloseIcon onClick={this.handleOnNoClick} />
               </IconButton>
            </Tooltip>
            :
            <Tooltip title="Report" placement="top">
               <IconButton aria-label="report">
                  <ReportIcon onClick={this.handleOnNoClick} />
               </IconButton>
            </Tooltip>

         )
         : (<></>);

      return (
         <CardActions disableSpacing>
            {yesButton}
            {noButton}

            <Tooltip title="Show more" placement="left">
               <IconButton
                  className={clsx(classes.expand, {
                     [classes.expandOpen]: this.state.detailsExpanded,
                  })}
                  onClick={this.handleExpandClick}
                  aria-expanded={this.state.detailsExpanded}
                  aria-label="show more"
               >
                  <ExpandMoreIcon />
               </IconButton>
            </Tooltip>
         </CardActions>
      )
   }

   /* one way match tag nex to email */
   renderCities = (cities) => {
      if (cities != "") {
         return <div>{cities.join(', ')}<br /></div>
      }
   }



   render() {
      const { classes, user, yesText, yesFunction, noText, noFunction } = this.props;
      const userDescription = (user.descriptionText == null || user.descriptionText === "")
                               ? "< User has no description >" : `${user.descriptionText}`


      return (
         <div>
            <Card>
               {/* profile picture, name and full profile (icon) */}
               <CardHeader
                  avatar={
                     <Avatar className={classes.avatar} src={getApiUrl({ version: 'v1', endpoint: 'avatar/getAvatar/' + user.email })}></Avatar>
                  }
                  action={
                     <Tooltip title="Full profile" placement="bottom-end">
                        <IconButton
                           aria-label="Full Profile"
                           onClick={this.handleDetailProfileOpen}>
                           <ZoomInIcon />
                        </IconButton>
                     </Tooltip>
                  }
                  title={<div>{user.firstName + ' ' + user.lastName} {(this.props.fitQuality !== null && this.props.fitQuality === 0)
                           ?  <Tooltip title="One way match means you cannot teach any language(s) that this student wants to learn.">
                                 <Chip
                                 icon={<WarningIcon />}
                                 label="One way match!"
                                 size="small"
                                 />
                              </Tooltip>
                           :  <></>
                        }</div>}


                  subheader={(this.props.match) ? 'Request Date: ' + Moment(this.props.match.requestDate).format('DD.MM.yyyy') : ''}

               />

               <CardContent className={classes.summaryDetails}>
                  {/* city, email */}
                  <Typography variant="body2" color="textSecondary" component="p" >

                     {this.renderCities(user.cities)}
                     {user.email}

                     {/* which languages user wants to learn */}
                     <div>
                        Wants to learn: <br />
                        {user.languagesToLearn.slice(0, 3).map(lang => {
                           return (<Chip key={lang.language} className={classes.chip} color="primary" variant="outlined" size="small"
                                    label={`${lang.language} - ${lang.level} - ${lang.credits ? lang.credits : 0} credits`} />)
                        })}
                     </div>
                  </Typography>
               </CardContent>

               {this.renderButtonGroup(yesText, yesFunction, noText, noFunction, classes)}

               {/* open user description */}
               <Collapse in={this.state.detailsExpanded} timeout="auto" unmountOnExit>
                  <CardContent>
                     <Typography paragraph>Details About Me: </Typography>
                     <Typography paragraph>{userDescription}</Typography>
                  </CardContent>
               </Collapse>
            </Card>

            <Dialog
               aria-labelledby="View profile information"
               open={this.state.detailProfileOpen}
               onClose={this.handleClose}
               maxWidth={'md'}
               fullWidth={true}
            >
               <ProfilePage userEmail={user.email}></ProfilePage>
               <Button variant="filled" color="primary" onClick={this.handleClose}>Close</Button>
            </Dialog>
         </div>
      );
   }
}

export default withStyles(useStyles)(UserCard);
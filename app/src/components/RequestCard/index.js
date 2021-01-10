import React, {Component} from 'react';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Accordion from '@material-ui/core/Accordion';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ProfilePage from '../../containers/ViewProfile'
import ConstantsList from '../../config_constants';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import WarningIcon from '@material-ui/icons/Warning';
import Tooltip from '@material-ui/core/Tooltip';
import Moment from 'moment';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupMenu from '../../components/PopupMenu'



const useStyles = theme => ({
    root: {      
      width: '99%',
      height: '99%',
    },
    media: {
      height: '40px',
      width: '40px',
       // 16:9
    },
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
      height: '100px'
    },
    chip: {
      margin: '2px',
    },
});
  
class RequestCard extends Component {

    constructor(props) {
        super(props);
        this.handleOnYesClick = this.handleOnYesClick.bind(this);
        this.handleOnNoClick = this.handleOnNoClick.bind(this);
        this.handleOnError = this.handleOnError.bind(this);    
        this.state = 
        {
            detailProfileOpen: false,
            portOption:ConstantsList.PORT_IN_USE,
            showDefaultAvatar: false,
            detailsExpanded: false,
            menuOpen: false,
        };
    }

   
    handleExpandClick = () => {
        const expanded = this.state.detailsExpanded;
        this.setState({
            detailsExpanded: !expanded
        });      
    }

    renderAvatar = (classes) => {
        const defaultAvatar = (<CardMedia
          className={classes.Avatar}
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

    renderButtonGroup = (yesText, yesFunction, noText, noFunction, classes) => {
        const yesButton = (yesText && yesFunction) 
        ? (  
            <IconButton aria-label="accept" >
                <DoneIcon onClick={this.handleOnYesClick} />
            </IconButton>
                
          )
        : (<></>);
        const noButton = (noText && noFunction) 
        ? (  
            <IconButton aria-label="reject">
                <CloseIcon onClick={this.handleOnNoClick} />
            </IconButton>
          )
        : (<></>);

        return(
            <CardActions disableSpacing>
                {yesButton}
                {noButton}           
                
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
            </CardActions>
        )
    }
 

    render ()
    {
        const { classes, user, yesText, yesFunction, noText, noFunction, match } = this.props;
        const userDescription = (user.descriptionText == null || user.descriptionText === "") 
                                ? "< User has no description >" : `${user.descriptionText}`
        
        
        return (            
            <Card className={classes.root}>               
                <CardHeader
                avatar={
                    <Avatar className={classes.avatar} src={window.location.protocol + '//' + window.location.hostname + this.state.portOption + '/api/v1/avatar/getAvatar/' + this.props.user.email}>                    
                    </Avatar>
                }
                action={
                    <IconButton 
                      aria-label="settings"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={this.handleClick}>
                        <MoreVertIcon />
                    </IconButton>
                      /* <Menu
                        id="long-menu"
                        keepMounted
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}                        
                        onClose={this.handleClose} 
                        PaperProps={{
                          style: {
                            maxHeight: 48 * 4.5,
                            width: '20ch',
                          },
                        }}                       
                      >
                        
                      <MenuItem>
                        Complete Profile
                      </MenuItem>
                    
                      </Menu> */
               
                    
                }
                title={user.firstName +' '+ user.lastName}
                subheader={'Request Date: ' + Moment(this.props.match.requestDate).format('DD.MM.yyyy')}
                />
                
                <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.summaryDetails}>
                    { user.cities.join(', ') }<br/>
                    { user.email}<br/>
                    <Box mb={1} className={classes.thirdRow}>
                        {(this.props.fitQuality !== null && this.props.fitQuality === 0) ?
                            <Tooltip title="One way match means you cannot teach any language(s) that this student wants to learn.">
                            <Chip
                            icon={<WarningIcon />}
                            label="One way match!"
                            size="small"
                            /> 
                            </Tooltip> : <></>
                        }
                    </Box>
                    
                    <div className={classes.chipGroup}>
                        Wants to learn: <br/>                                               
                        {user.languagesToLearn.slice(0,2).map(lang => {
                            return ( <Chip key={lang.language} className={classes.chip} color="primary" variant="outlined" size="small" 
                                    label={`${lang.language} - ${lang.level} - ${lang.credits ? lang.credits : 0} credits`} /> )
                        })}
                        {(user.languagesToLearn.length > 2) ? <Typography variant="body2" color="textSecondary" component="span"> and more... </Typography> : ''}
                    </div>
                </Typography>
                </CardContent>

                {this.renderButtonGroup(yesText,yesFunction,noText,noFunction, classes)}

                <Collapse in={this.state.detailsExpanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Details About Me: </Typography>
                    <Typography paragraph>{userDescription}</Typography>
                    <div className={classes.chipGroup}>
                        Wants to learn: <br/>                                               
                        {user.languagesToLearn.map(lang => {
                            return ( <Chip key={lang.language} className={classes.chip} color="primary" variant="outlined" size="small" 
                                    label={`${lang.language} - ${lang.level} - ${lang.credits ? lang.credits : 0} credits`} /> )
                        })}                       
                    </div>

                </CardContent>
                </Collapse>
            </Card>
        );
      
    }
}
export default withStyles(useStyles) (RequestCard);
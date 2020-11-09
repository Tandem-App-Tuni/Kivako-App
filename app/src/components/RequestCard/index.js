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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ProfilePage from '../../containers/ViewProfile'
import ConstantsList from '../../config_constants';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import WarningIcon from '@material-ui/icons/Warning';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = theme => ({
    root: {
      maxWidth: 345,
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
});
    
class RequestCard extends Component {

        
        state = 
        {
            detailProfileOpen: false,
            portOption:ConstantsList.PORT_IN_USE,
            showDefaultAvatar: false,
            detailsExpanded: false
        };
    
    handleExpandClick = () => {
        const expanded = this.state.detailsExpanded;
        this.setState({
            detailsExpanded: !expanded
        });      
    }

    renderAvatar = (classes) => {
        const defaultAvatar = (<CardMedia
          className={classes.Avatar}
          component={AccountCircleIcon}s
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
  
    render ()
    {
        const { classes, user, yesText, yesFunction, noText, noFunction } = this.props;
        // const classes = useStyles();
        // const [expanded, setExpanded] = React.useState(false);

        return (
            <Card className={classes.root}>
                <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                    {this.renderAvatar(classes)}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                    <MoreVertIcon />
                    </IconButton>
                }
                title={user.name}
                subheader="September 14, 2016"
                />
                <CardMedia
                className={classes.media}
                image="/static/images/cards/paella.jpg"
                title="Paella dish"
                />
                <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
                </Typography>
                </CardContent>
                <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
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
                <Collapse in={this.state.detailsExpanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                    minutes.
                    </Typography>
                    <Typography paragraph>
                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                    heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                    browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                    and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                    pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                    saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                    </Typography>
                    <Typography paragraph>
                    Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                    without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                    medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                    again without stirring, until mussels have opened and rice is just tender, 5 to 7
                    minutes more. (Discard any mussels that don’t open.)
                    </Typography>
                    <Typography>
                    Set aside off of the heat to let rest for 10 minutes, and then serve.
                    </Typography>
                </CardContent>
                </Collapse>
            </Card>
        );
      
    }
}
export default withStyles(useStyles) (RequestCard);
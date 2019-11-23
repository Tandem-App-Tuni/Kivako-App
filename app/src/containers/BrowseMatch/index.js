
import React from 'react';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	Material UI
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import GridListTileBar from '@material-ui/core/GridListTileBar';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	Styles

import ResponsiveDrawer from '../MenuDrawer';

import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import { makeStyles } from '@material-ui/core/styles';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Card from '@material-ui/core/Card';

import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Icon from '@material-ui/core/Icon';


import Grid from '@material-ui/core/Grid'


const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));


const styles = ({
    root: {
        //display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        width: "30%",
        height: "350"
    },
    fullWidth: {
        width: "100%",
    },
    bottomMargin: {
        marginBottom: '5em',
    },
    title: {
        color: '#fff',
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    preferencesLink: {
        color: '#3f51b5'
    },
    cardContent: {
        padding: '0'
    },
    gridListTile: {
        height:"100%",
        width:"10%",   
        minHeight: "300px",
        maxWidth: "150px",
        minWidth: "400px",
        space:3,
        marginBottom: 10,
        marginLeft: 5
    },
    gridListTileBar: {
        background: "#3f51b5",
    },
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	Class
    /*
    {"cities":["Tammela"],
    "_id":"5dd874cb523c731b688846cf",
    "firstName":"User One",
    "lastName":"Test Case",
    "email":"user1@example.com",
    "descriptionText":"Hi, i'm a user test case",
    "languagesToTeach":[{"language":"Albanian","level":"C1","credits":2}],
    "languagesToLearn":[{"language":"Arbëresh","level":"A2","credits":1}
    */
class BrowseMatch extends React.Component {

    _isMounted = false;

    constructor(props) {
      super(props);
      this.state = {
        userMatches:[],
        isAlreadyregistered : false,
        isAlreadyAuthenticated : false,
        isLoadingPage:true
      };
    }


    state = {
        userMatches: [
        {
            languageName: "English",
            matches:
            [
                {_id: "1", name:"Nam",firstName:"User Test",lastName:"lastName",cities:["Tammela","Tampere"],languagesToTeach:[{"language":"Albanian","level":"C1","credits":2}],
                languagesToLearn:[{"language":"Arbëresh","level":"A2","credits":1}],descriptionText:"Hi, i'm a user test case"},
                {name:"Peter"},
                {name:"Jp"},
                {name:"Nam"},
                {name:"Peter"},
                {name:"Jp"},
                {name:"Nam"},
                {name:"Peter"},
                {name:"Jp"},
                {name:"Nam"},
                {name:"Peter"},
                {name:"Jp"}
            ]
        },
        {
            languageName: "Finnish",
            matches:
            [
                {name:"Nam"},
                {name:"Peter"},
                {name:"Jp"}
            ]
        }
    ],
        open: false,
    };
    
    getUserPossibleMatchsList = () =>{
        const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/api/v1/usersMatch/possibleMatchs");
    
        fetch(url, {
            method: 'GET',
            credentials: 'include',
            cors:'no-cors'
        }).then((response) => response.json())
        .then((responseJson) => {
            // Resposta
            console.log(responseJson);
        }).catch((error) => {
            console.error(error);
        });
    };

    componentWillReceiveProps(nextProps) {
        const matches = nextProps.languageMatches;
        this.setState(
            {
                userMatches: matches
            }
        );
    }

    openModal = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false});
    };

    getMatchesTiles(item, classes) {
        const cardStyle =makeStyles(theme => ({
            card: {
              maxWidth: 345
            },
            media: {
              height: 0,
              paddingTop: '56.25%', // 16:9
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
          }));

        const gridListStyle = makeStyles(theme => ({
            root: {
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              overflow: 'hidden',
              backgroundColor: theme.palette.background.paper,
            },
            gridList: {
              flexWrap: 'nowrap',
              // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
              transform: 'translateZ(0)',
            },
            title: {
              color: theme.palette.primary.light,
            },
            titleBar: {
              background:
                'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
            },
          }));

        return (
            item.matches.length === 0 ? (
                <Typography variant="h5" gutterBottom>
                    <Typography variant="overline" gutterBottom>
                        {"No_matches_found_for"} {item.languageName}
                    </Typography>
                    <Link href="/languagePreferences" className={classes.preferencesLink}>
                        {"Edit_your_preferences"}
                    </Link>
                </Typography>
            ) : (
                <div className={classes.fullWidth}>
                <GridList className={classes.gridList} >
                    {
                        item.matches.map((match, key) =>
                            
                            <GridListTile key={key} className={classes.gridListTile}>
                                <Card className={cardStyle.card}>
                                        <CardHeader
                                        avatar={
                                            <Avatar src={"https://pickaface.net/gallery/avatar/unr_test_161024_0535_9lih90.png"} 
                                                    aria-label="recipe" 
                                                    className={classes.bigAvatar}>
                                            </Avatar>
                                        }
                                        action={
                                            <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                            </IconButton>
                                        }
                                        title={match.firstName + match.lastName}
                                        subheader={ match.cities}
                                        />
                                        
                                        <CardContent>

                                        <Typography variant="body1" color="textSecondary" component="p">
                                             
                                            {match.descriptionText}

                                        </Typography>
                                        <br></br>
                                        <Divider variant="middle" />
                                        <br></br>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            <Icon fontSize="small">home</Icon>Cities: {match.cities}<br></br>
                                            <Icon fontSize="small">language</Icon>Languages want to learn:<br></br>

                                         </Typography>
                                        </CardContent>
                                        <CardActions disableSpacing >
       
                                            <div align="center">
                                                <Button variant="contained" color="primary">Request Match</Button>
                                            </div>
                                           
                                        </CardActions>
                                </Card>
                            </GridListTile>
                        )
                    }
                </GridList>
            </div>
                
            )
        )
    }

    getAlreadyExistsDiv(item, classes) {
        return (
        <ListItem key={item.languageName} className={classes.fullWidth + ' ' + classes.bottomMargin}>
            <Typography variant="h5" gutterBottom>
                <Typography variant="overline" gutterBottom>
                    {"Existing_match_found_for"} {item.languageName}
                </Typography>
                <Link href="/listMatches" className={classes.preferencesLink}>
                    {"See_your_matches"}
                </Link>
            </Typography>
        </ListItem>)
    }

    getMatchesList(item, classes){
        return (<ListItem
            key={item.languageName}
            >
            <div key={item.languageName}>
                <div >
                    <ListItemText className={classes.bottomMargin}>
                        <Typography variant="h3" gutterBottom>
                            {"Possible matches to learn " + ' ' + item.languageName + ":"}
                        </Typography>
                        
                    </ListItemText>

                </div>
                {
                    this.getMatchesTiles(item, classes)
                }
                <br></br>
                <Divider variant="middle" />
            </div>
        </ListItem>);
    }


    onInviteAction (user) {
        console.log(user)
    }

    componentDidMount(){
        this.getUserPossibleMatchsList();
    }


    render() {
        const {classes} = this.props;
        const classesTest =makeStyles(theme => ({
            root: {
              width: '100%',
              maxWidth: 360,
              backgroundColor: theme.palette.background.paper,
            },
            inline: {
              display: 'inline',
            },
          }));

        return (
            <div>
                <div className={classes.root}>
                    <ResponsiveDrawer title = "Find a new language partner">
                        <List component="nav" className={classes.fullWidth}>
                            {
                                this.state.userMatches.map(item => {
                                    return item.alreadyExists ? (
                                        this.getAlreadyExistsDiv(item, classes)
                                    ) : (
                                        this.getMatchesList(item, classes)
                                    )
                                })
                            }
                        </List>
                    </ResponsiveDrawer>

                </div>

            </div>

        );
    }
}

BrowseMatch.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BrowseMatch);


import React from 'react';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	Material UI
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
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

import {Redirect} from 'react-router-dom';


import Grid from '@material-ui/core/Grid'




const styles = ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden'
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        width: 'calc(-120px + 100vw)'
    },
    fullWidth: {
        width: "100%",
    },
    bottomMargin: {
        marginBottom: '2em',
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
    introduction:{
        flexWrap: 'wrap',
        height: "50px", 
        overflow: 'hidden'
    },

    gridListTile: {
        // height:"100%",
        // width:"100%",   
        minHeight: "450px",
        maxHeight: "450px",
        maxWidth: "280px",
        minWidth: "280px",
        space:2,
        marginBottom: 5,
        marginRight: 5,
    },
    gridListTileBar: {
        background: "#3f51b5",
    },
    action: {
        justifyContent: 'center',
        marginBottom: 5,
      }
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
        //Test purposes
        const userMatchesTest = [
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
        ]


      super(props);
      this.state = {
        userMatches:[],
        isAlreadyregistered : false,
        isAlreadyAuthenticated : false,
        isLoadingPage:true,
        open:false
      };
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
          }));

        return (
            item.matches.length === 0 ? (
                <Typography variant="h5" gutterBottom>
                    <Typography variant="overline" gutterBottom>
                        {"No matches found for "} {item.languageName}
                    </Typography>
                    <Link href="/edit-profile" className={classes.preferencesLink}>
                        {"Edit_your_preferences"}
                    </Link>
                </Typography>
            ) : (
                <div className={classes.root}>
                <GridList className={classes.gridList} >
                    {
                        item.matches.map((match, key) =>
                            <GridListTile key={key} className={classes.gridListTile}>
                                <Card className={cardStyle.card}>
                                        <CardHeader
                                        avatar={
                                            <Avatar src={match.avatar} 
                                                    aria-label="recipe" 
                                                    className={classes.bigAvatar}>
                                            </Avatar>
                                        }
                                        // action={
                                        //     <IconButton aria-label="settings">
                                        //     <MoreVertIcon />
                                        //     </IconButton>
                                        // }
                                        title={match.firstName + " " + match.lastName}
                                        subheader={ " Cities: " + (match.cities && match.cities.join(", "))}
                                        />
                                        
                                        <CardContent>
                                                <div className={classes.introduction}>
                                        <Typography  variant="body1" color="textSecondary" component="p">
                                             
                                            {match.descriptionText}

                                        </Typography>
                                        </div>
                                        <br></br>
                                        <Divider variant="middle" />
                                        <br></br>
                                       
                                        <List>
                                        <ListItem>
                                        <ListItemIcon><Icon fontSize="small">home</Icon></ListItemIcon>
                                        <ListItemText primary={"Cities: " + (match.cities && match.cities.join(", "))}/>
                                        </ListItem>

                                        <ListItem>
                                        <ListItemIcon> <Icon fontSize="small">language</Icon></ListItemIcon>
                                        <ListItemText primary={"Learn: " + (match.languagesToLearn && match.languagesToLearn.map(e => e.language).join(", "))}/>
                                        </ListItem></List>
                                        </CardContent>
                                        <CardActions disableSpacing className={classes.action} >
       
                                            <div >
                                                <Button variant="contained" 
                                                        color="primary"
                                                        onClick = {this.onInviteAction.bind(this, match,item.languageName)}
                                                >
                                                    Request Match
                                                </Button>
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
                        <Typography variant="h6" gutterBottom>
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

    onInviteAction(user,language) {
        //console.log(user)
        //console.log(language)
        alert("convite para: " + user.firstName + " no idioma " + language);

        const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/api/v1/usersMatch/sendRequest")
        //console.log(url)
        
        fetch(url, {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            credentials: 'include',
            cors: 'no-cors',
            body: JSON.stringify({
                recipientID: user._id,
                matchLanguage: language
            })
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            if (responseJson.requested) {
                alert("Match request sended to the user!");
                //window.location.reload();
            } else {
                alert("Match request failed! Please, try again later")
            }
        })
        .catch((error) => {
            console.error(error);
        });

    }

    getUserPossibleMatchsListAPI = (callback) =>{
        const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/api/v1/usersMatch/possibleMatchs");
    
        fetch(url, {
            method: 'GET',
            credentials: 'include',
            cors:'no-cors'
        }).then((response) => response.json())
        .then((responseJson) => {
            // Resposta
            console.log(this.state.userMatches);
            console.log(responseJson.userPossibleMatches)
            this.setState({userMatches: responseJson.userPossibleMatches})
           
        }).catch((error) => {
            console.error(error);
        });

        callback();
    };

    checkIfUserIsRegistered(callback) {
        const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/api/v1/users/isRegistered")
    
        fetch(url, {
          method: 'GET',
          credentials: 'include',
          cors:'no-cors'
        }).then((response) => response.json())
        .then((responseJson) => {
    
          if(responseJson.isRegistered){
            //User is already registered. Redirect to dashboard in render
            this.setState({ isAlreadyregistered: true });
          }else{
            // Continue render normaly to register user
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
        this.setState({isAlreadyAuthenticated: true});
        this.setState({email: responseData.email});
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
      
              this.checkIfUserIsRegistered( () => {
      
                this.getUserPossibleMatchsListAPI( () => {
                  this.setState({isLoadingPage:false});
                });
      
              });
      
            });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
      }


    render() {
        const {classes} = this.props;
        
        //Wait until all informations be render until continue
        if(this.state.isLoadingPage) {
            return null;
        }
    
        // In case user is not authenticated, redirect to initial page
        if(!this.state.isAlreadyAuthenticated){  
            return  <Redirect  to="/" />
        }
    
        // In case user is NOT registered yet, just redirect to initial system page.
        if(!this.state.isAlreadyregistered){  
            return  <Redirect  to="/" />
        }

        return (
            <div>
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

        );
    }
}

BrowseMatch.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BrowseMatch);

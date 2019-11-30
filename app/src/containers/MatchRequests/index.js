
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

import {Redirect} from 'react-router-dom';


import Grid from '@material-ui/core/Grid'


const styles = ({
    root: {
        display: 'inline',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: {
        //flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        width: "auto",
        height: "auto"
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
    gridListTile: {
        height:"100%",
        width:"100%",   
        minHeight: "300px",
        maxWidth: "150px",
        minWidth: "400px",
        space:2,
        marginBottom: 5,
        marginLeft: 1
    },
    gridListTileBar: {
        background: "#3f51b5",
    },
});

class MatchRequests extends React.Component {

    _isMounted = false;
    
    constructor(props) {
      super(props);
      this.state = {
        userRequestMatches:[],
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

    acceptMatchRequest(match) {
        //console.log(user)
        //console.log(language)
        alert("Match "+match._id);

        const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/api/v1/usersMatch/acceptMatchRequest/"+match._id);

        if (window.confirm("Confirm the accept of match request?")) {
            fetch(url, {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
                credentials: 'include',
                cors: 'no-cors',
            }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.requested) {
                    alert("Match request accepted!");
                    //window.location.reload();
                } else {
                    alert("Request failed! Please, try again later")
                }
            })
            .catch((error) => {
                console.error(error);
            }); 
        }
        //console.log(url)
    }

    denyMatchRequest(match) {
        //console.log(user)
        //console.log(language)
        alert("Match "+ match._id);

        const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/api/v1/usersMatch/denyMatchRequest/"+match._id);

        if (window.confirm("Confirm the deny of match request?")) {
            fetch(url, {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
                credentials: 'include',
                cors: 'no-cors',
            }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.requested) {
                    alert("Match request denied!");
                    //window.location.reload();
                } else {
                    alert("Request failed! Please, try again later")
                }
            })
            .catch((error) => {
                console.error(error);
            }); 
        }
        //console.log(url)
    }

    getUserMatchsRequestListAPI = (callback) =>{
        const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/api/v1/usersMatch/receiptMatchsRequests");
    
        fetch(url, {
            method: 'GET',
            credentials: 'include',
            cors:'no-cors'
        }).then((response) => response.json())
        .then((responseJson) => {
            // Resposta
            //console.log(this.state.userRequestMatches);
            console.log(responseJson.userReceiptMatches)
            this.setState({userRequestMatches: responseJson.userReceiptMatches})
           
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
      
                this.getUserMatchsRequestListAPI( () => {
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
        const cardStyle =makeStyles(theme => ({
            card: {
              maxWidth: 345
            },
            media: {
              height: 0,
              paddingTop: '56.25%', // 16:9
            },
          }));
        
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
                <div className={classes.root}>
                    <ResponsiveDrawer title = "Matches requests!">
                        <List component="nav" className={classes.fullWidth}>
                            {

                                this.state.userRequestMatches.map((match, key) =>
                                    <ListItem>
                                    
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
                                            title={match.requesterUser.firstName + ' ' + match.requesterUser.lastName}
                                            subheader={ match._id}
                                            />
                                            
                                            <CardContent>

                                            <Typography variant="body1" color="textSecondary" component="p">
                                                
                                                {match.requesterUser.descriptionText}

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
        
                                                <div align="left">
                                                    <Button variant="contained" 
                                                            color="primary"
                                                            onClick = {this.acceptMatchRequest.bind(this,match)}
                                                    >
                                                        Accept
                                                    </Button>
                                                </div>
                                                <div align="right">
                                                    <Button variant="outlined" 
                                                                color="secondary"
                                                                onClick = {this.denyMatchRequest.bind(this,match)}
                                                        >
                                                        Deny
                                                    </Button>
                                                </div>
                                            
                                            </CardActions>
                                        </Card>

                                    </ListItem>
                                


                                )
                                /*
                                this.state.userRequestMatches.map(item => {
                                    return item.alreadyExists ? (
                                        this.getAlreadyExistsDiv(item, classes)
                                    ) : (
                                        this.getMatchesList(item, classes)
                                    )
                                })*/
                            }
                        </List>
                    </ResponsiveDrawer>

                </div>

            </div>

        );

    }
}

MatchRequests.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MatchRequests);

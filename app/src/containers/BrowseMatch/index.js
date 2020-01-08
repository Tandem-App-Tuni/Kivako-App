
import React from 'react';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	Material UI
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListItem from '@material-ui/core/ListItem';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	Styles

import ResponsiveDrawer from '../MenuDrawer';

import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';

import {Redirect} from 'react-router-dom';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import ConstantsList from '../../config_constants';


const styles = ({
    root: {
        display: 'inline',
        //flexWrap: 'wrap',
        // justifyContent: 'space-around',
        //overflow: 'hidden',
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
    card:{
        margin: '5px'
    },
    gridListTileBar: {
        background: "#3f51b5",
    },
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	Class
class BrowseMatch extends React.Component {

    _isMounted = false;
    

    constructor(props) {

      super(props);
      this.state = {
        userMatches:[],
        isAlreadyregistered : false,
        isAlreadyAuthenticated : false,
        isLoadingPage:true,
        portOption:ConstantsList.PORT_IN_USE,
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
        // eslint-disable-next-line
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
                    <Typography variant="overline" gutterBottom>
                        {"No matches found for "} {item.languageName} :( !
                    </Typography>
      
            ) : (
                <div >
                <GridList className={classes.gridList} >
                    {
                        item.matches.map((match, key) =>
                            
                            <GridListTile key={key} className={classes.gridListTile}>
                                <Card className={classes.card}>
                                        <CardHeader
                                        avatar={
                                            <Avatar src={"https://pickaface.net/gallery/avatar/unr_test_161024_0535_9lih90.png"} 
                                                    aria-label="recipe" 
                                                    className={classes.bigAvatar}>
                                            </Avatar>
                                        }
                                        // action={
                                        //     <IconButton aria-label="settings">
                                        //     <MoreVertIcon />
                                        //     </IconButton>
                                        // }
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
                                            <Icon fontSize="small">language</Icon>Languages want to learn: 
                                    {" " + match.languagesToLearn.map(e => e.language).join(", ")}
                                            <br></br>

                                         </Typography>
                                        </CardContent>
                                        <CardActions disableSpacing >
       
                                            <div align="center">
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
        return (
                <div key={item.languageName}>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                        <Typography className={classes.heading}>Possible matches to learn {item.languageName}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            {
                                this.getMatchesTiles(item, classes)
                            }
                            <br></br>
                            <Divider variant="middle" />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <br></br>
                </div>
            );
    }

    onInviteAction(user,language) {

        const url = new URL(window.location.protocol + '//' + window.location.hostname + this.state.portOption + "/api/v1/usersMatch/sendRequest")
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
        const url = new URL(window.location.protocol + '//' + window.location.hostname + this.state.portOption + "/api/v1/usersMatch/possibleMatchs");
    
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
        const url = new URL(window.location.protocol + '//' + window.location.hostname + this.state.portOption + "/api/v1/users/isRegistered")
    
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

    const url = new URL(window.location.protocol + '//' + window.location.hostname + this.state.portOption + "/isAuthenticated");

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
        const classesPanel = makeStyles(theme => ({
            root: {
              width: '100%',
            },
            heading: {
              fontSize: theme.typography.pxToRem(15),
              fontWeight: theme.typography.fontWeightRegular,
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
                    <ResponsiveDrawer title = "Find a new language partner">
                        
                        <div className={classesPanel.root}>
 
                                {
                                    this.state.userMatches.map(item => {
                                        return item.alreadyExists ? (
                                            this.getAlreadyExistsDiv(item, classes)
                                        ) : (
                                            this.getMatchesList(item, classes)
                                        )
                                    })
                                }
                        </div>
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


import React from 'react';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	Material UI
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListItem from '@material-ui/core/ListItem';
import {withStyles} from '@material-ui/core/styles';
import {CircularProgress} from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	Styles

import ResponsiveDrawer from '../MenuDrawer';

import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import ConstantsList from '../../config_constants';
import UserActionCard from '../../components/UserActionCard';

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
        minHeight: "310px",
        maxHeight: "310px",
        maxWidth: "310px",
        minWidth: "310px",
        space:2,
        marginBottom: 5,
        marginLeft: 1
    },
    card:{
        margin: '5px',
        height:"300px",
        width:"300px"
    },
    gridListTileBar: {
        background: "#3f51b5",
    },
    leftText:{
        textAlign: 'left'
    }
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	Class
class BrowseMatch extends React.Component 
{ 
    constructor(props) 
    {
      super(props);
      this.state = {
        userMatches:[],
        isAlreadyregistered : false,
        isAlreadyAuthenticated : false,
        isLoadingPage:true,
        portOption:ConstantsList.PORT_IN_USE,
        open:false,
        modalData: null,
        modalLanguage: null
      };
    }


    openModal = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false});
    };

    getMatchesTiles(item, classes) 
    {
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
                    {
                        let r = 255*(1 - match.fitQuality) + 149*(match.fitQuality);
                        let g = 255*(1 - match.fitQuality) + 117*(match.fitQuality);
                        let b = 255*(1 - match.fitQuality) + 205*(match.fitQuality);

                        return (<GridListTile 
                            key={key} 
                            className={classes.gridListTile}>
                                <Card 
                                onClick = {() => this.onShowActionCard(true, match, item.languageName)}
                                className={classes.card}
                                style={{backgroundColor: 'rgb('+r+','+g+','+b+')'}}>
                                    <CardHeader
                                    avatar=
                                    {
                                        <Avatar 
                                        src={window.location.protocol + '//' + window.location.hostname + this.state.portOption + '/api/v1/avatar/getAvatar/' + match.email} 
                                        aria-label="recipe" 
                                        className={classes.bigAvatar}>
                                        </Avatar>
                                    }
                                    className = {classes.leftText}
                                    title={match.firstName + ' ' + match.lastName}
                                    subheader={ match.cities}/>
                                    <CardContent>  
                                        <Divider variant="middle" />
                                        <List>
                                        <ListItem>
                                        <ListItemIcon><Icon fontSize="small">home</Icon></ListItemIcon>
                                        <ListItemText primary={"Cities: " + (match.cities && match.cities.join(", "))}/>
                                        </ListItem>
                                        <ListItem>
                                        <ListItemIcon><Icon fontSize="small">language</Icon></ListItemIcon>
                                        <ListItemText primary={"Wants to learn: " + (match.languagesToLearn && match.languagesToLearn.map(e => e.language).join(", "))}/>
                                        </ListItem></List>
                                    </CardContent>      
                                </Card>
                            </GridListTile>);
                    }
                )}
                </GridList>
                {this.state.modalData != null && 
                    <UserActionCard 
                    type = "invite"
                    open = {this.state.open} 
                    data = {this.state.modalData}
                    onClose = {(data) =>this.onShowActionCard(false, null, data)}/>}
            </div>   
            )
        )
    }

    onShowActionCard= (open, data, action) =>  
    {
        if (open === true) 
        {
            this.setState({modalData: data});
            this.setState({modalLanguage: action});
        }
        else
        {
            if (action === "invite") 
            {
                console.log(this.state.modalData, this.state.modalLanguage);

                this.onInviteAction(this.state.modalData, this.state.modalLanguage);
            }
        }

        this.setState({open: open});
    };

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

    onInviteAction = (user,language) =>
    {
        const url = new URL(window.location.protocol + '//' + window.location.hostname + this.state.portOption + "/api/v1/usersMatch/sendRequest")
        //console.log(url)
        
        fetch(url, 
        {
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
            if (responseJson.requested) 
            {
                alert("Match request sended to the user!");
                window.location.reload();
            } else {
                alert("Match request failed! Please, try again later")
            }
        })
        .catch((error) => {
            console.error(error);
        });

    }

    getUserPossibleMatchsListAPI = (callback) =>
    {
        const url = new URL(window.location.protocol + '//' + window.location.hostname + this.state.portOption + "/api/v1/usersMatch/possibleMatchs");
    
        fetch(url, {
            method: 'GET',
            credentials: 'include',
            cors:'no-cors'
        })
        .then((response) => response.json())
        .then((responseJson) => 
        {
            if (responseJson.userPossibleMatches !== undefined) this.setState({userMatches: responseJson.userPossibleMatches})
        })
        .catch((error) => {
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

    componentDidMount()
    {
        this.getUserPossibleMatchsListAPI(() => 
        {
            this.setState({isLoadingPage:false});
        });
    }


    render() 
    {
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
        
        if(this.state.isLoadingPage) return(<CircularProgress/>);
            
        return (
            <div>
                <div className={classes.root}>
                    <ResponsiveDrawer title = "Find a new language partner">
                        <div className={classesPanel.root}>
                            {
                                this.state.userMatches.map(item => 
                                {
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

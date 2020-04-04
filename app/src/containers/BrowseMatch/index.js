
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
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	Styles

import Divider from '@material-ui/core/Divider';

import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import ConstantsList from '../../config_constants';
import {AlertView} from '../../components/AlertView';
import {clone} from "ramda";

import UserStyleCard from '../../components/UserStyleCard';
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
        isLoadingPage:true,
        portOption:ConstantsList.PORT_IN_USE,
        open:false,
        modalData: null,
        modalLanguage: null,
        alertType: "",
        alertOpen: false,
        isDefaultExpand: false
      };
    }

    handleAlertClose() {
        this.setState({alertOpen: false})
    }

    openModal() {
        this.setState({open: true})
    };

    handleClose() {
        this.setState({open: false});
    };

    getMatchesTiles(item, classes) {
        return (
            item.matches.length === 0 ? (
                <Typography variant="overline" gutterBottom>
                    {"No matches found for "} {item.languageName} :( !
                </Typography>
            ) : (
            <div className={classes.fullWidth}>
                <GridList cellHeight="auto" spacing={25} >
                {
                    item.matches.map((match, key) =>  
                    {
                        return(<GridListTile key={key} className={classes.gridListTile} rows={2}>
                                    <UserStyleCard  user={match} yesText="Send invitation" yesFunction={this.onInviteAction} 
                                     page="browse-match" matchingLanguage={item.languageName}> 
                                    </UserStyleCard>
                                </GridListTile>)
                    }
                )}
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

    getMatchesList(item, classes)
    {
        const languageTooltip = 'Matches are sorted by compatibility relative to your language preferences. ' +
                                'Matches on the left are rated higher with a descending compatibility going right.';

        return (
                <div key={item.languageName}>
                    <ExpansionPanel defaultExpanded={this.state.isDefaultExpand}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                        <Typography className={classes.heading}>
                            Possible matches who can teach you {item.languageName} - <strong>{item.matches.length} match(es) &nbsp;&nbsp;&nbsp;&nbsp;</strong> 
                            <Tooltip title={languageTooltip} arrow>
                                <InfoIcon>Arrow</InfoIcon>
                            </Tooltip>
                        </Typography>
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
        const url = new URL(window.location.protocol + '//' + window.location.hostname + this.state.portOption + "/api/v1/usersMatch/sendRequest");

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
        })
        .then((response) => 
            {
                let cloneUserMatches = clone(this.state.userMatches);
                let languageMatch = cloneUserMatches.find(item=>item.languageName === language)
                cloneUserMatches.matches = languageMatch.matches.splice(languageMatch.matches.indexOf(user), 1);
                this.setState({alertType: "success", alertOpen: true, userMatches: cloneUserMatches});
            })
            .catch((error) => 
            {
                this.setState({alertType: "error", alertOpen: true})
                console.error(error);
            }); 

    }

    getUserPossibleMatchsListAPI(callback) {
        const url = new URL(window.location.protocol + '//' + window.location.hostname + this.state.portOption + "/api/v1/usersMatch/possibleMatchs");
    
        fetch(url, {
            method: 'GET',
            credentials: 'include',
            cors:'no-cors'
        })
        .then((response) => response.json())
        .then((responseJson) => 
        {
            if (responseJson.userPossibleMatches !== undefined) this.setState(
                { userMatches: responseJson.userPossibleMatches,
                  isDefaultExpand: responseJson.userPossibleMatches.length > 1 
                                   ? false : true     
                })
            
        })
        .catch((error) => {
            console.error(error);
        });

        callback();
    };

    componentDidMount()
    {
        this.getUserPossibleMatchsListAPI(() => 
        {
            this.setState(
                {
                    isLoadingPage:false,
                }
            );
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
        <div className={classes.root}>
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
            <AlertView
                open={this.state.alertOpen}
                onClose={this.handleAlertClose.bind(this)}
                variant={this.state.alertType}
                message={this.state.alertType === "success" ?
                    "Invitation sent"
                    : "Failed to send invitation"
                }
            />
        </div>
        );
    }
}

BrowseMatch.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BrowseMatch);

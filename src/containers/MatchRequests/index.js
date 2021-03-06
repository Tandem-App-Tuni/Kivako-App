
import React from 'react';

import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import { AlertPopup, ConfirmDialog } from '../../components/AlertView';
import ConstantsList from '../../config_constants';
import UserStyleCard from '../../components/UserStyleCard';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {AppContext} from "../../components/context/context";
import Hidden from '@material-ui/core/Hidden';
import { getApiData } from '../../helpers/networkRequestHelpers';

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
    gridListTileBar: {
        background: "#3f51b5",
    },
    leftText: {
        textAlign: 'left'
    }
});

class MatchRequests extends React.Component {
    static contextType = AppContext;

    constructor(props)
    {
      super(props);
      this.state = {
        userRequestMatches:[],
        isLoadingPage:true,
        showAlert:false,
        alertType: "success",
        alertText:"",
        showAcceptConfirm: false,
        showDenyConfirm: false,
        matchId: "",
      };
      this.acceptMatchRequest = this.acceptMatchRequest.bind(this);
      this.denyMatchRequest = this.denyMatchRequest.bind(this);
      this.toggleAlert = this.toggleAlert.bind(this);
    }

    closeAllDialogs = () => {
        this.setState({
            showAcceptConfirm: false,
            showDenyConfirm: false,
            matchId: ""
        })
    }

    acceptMatchRequest() {
        this.setState({isLoadingPage: true})
        getApiData({
            version: 'v1',
            endpoint: 'usersMatch/acceptMatchRequest/' + this.state.matchId,
        },{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            cors: 'no-cors',
            body: JSON.stringify({})
        }).then((response) => {
                if (response.status === 200) {
                    this.getUserMatchsRequestListAPI(()=>{
                        this.toggleAlert(true, "success", "Match request accepted.")
                        this.setState({isLoadingPage: false})
                    });
                }
                else {
                    this.toggleAlert(true, "error", "Something went wrong.");
                }
        }).catch((error) => {
            this.setState({isLoadingPage: false})
            console.log('Error');
            console.error(error);
        });
        this.closeAllDialogs();
    }

    denyMatchRequest() {
        this.setState({isLoadingPage: true})
        getApiData({
            version: 'v1',
            endpoint: 'usersMatch/denyMatchRequest/' + this.state.matchId,
        }, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            cors: 'no-cors',
        })
        .then((response) => {
            if (response.status === 200) {
                this.getUserMatchsRequestListAPI(()=>{
                    this.toggleAlert(true, "success", "Match request denied.")
                    this.setState({isLoadingPage: false})
                });
            }
            else
                this.toggleAlert(true, "error", "Something went wrong.");
        })
        .catch((error) => {
            console.error(error);
        });
        this.closeAllDialogs();
    }

    getUserMatchsRequestListAPI(callback) {
        getApiData({
            version: 'v1',
            endpoint: 'usersMatch/receiptMatchsRequests',
        }, {
            method: 'GET',
            credentials: 'include',
            cors: 'no-cors'
        }).then((response) => response.json())
            .then((responseJson) => {
                const {updateContext} = this.context;
                this.setState({ userRequestMatches: responseJson.userReceiptMatches })
                updateContext("requestAmount", responseJson.userReceiptMatches.length)
            }).catch((error) => {
                console.error(error);
            });

        callback();
    }


    componentDidMount() {
        this.getUserMatchsRequestListAPI(() => {
            this.setState({ isLoadingPage: false });
        });
    }

    getMatchesTiles(matches, classes) {
        return (
            <div className={classes.fullWidth}>
                <Hidden xsDown>
                    <GridList cellHeight="auto" spacing={25} >
                    {
                        matches.map((match, key) =>
                        {
                            return(<GridListTile key={key} rows={2}>
                                        <UserStyleCard  user={match.requesterUser} yesText="Accept" yesFunction={()=>{this.setState({showAcceptConfirm: true, matchId: match._id})}}
                                        noText="Deny" noFunction={()=>{this.setState({showDenyConfirm: true, matchId: match._id})}}  page="pending-match" match={match}>
                                        </UserStyleCard>
                                    </GridListTile>)
                        }
                    )}
                    </GridList>
                </Hidden>
                <Hidden smUp>
                    <GridList cellHeight="auto" cols={1} spacing={25} >
                    {
                        matches.map((match, key) =>
                        {
                            return(<GridListTile key={key} rows={2}>
                                        <UserStyleCard  user={match.requesterUser} yesText="Accept" yesFunction={()=>{this.setState({showAcceptConfirm: true, matchId: match._id})}}
                                        noText="Deny" noFunction={()=>{this.setState({showDenyConfirm: true, matchId: match._id})}}  page="pending-match" match={match}>
                                        </UserStyleCard>
                                    </GridListTile>)
                        }
                    )}
                    </GridList>
                </Hidden>

            </div>
            )
    }


    toggleAlert(open, type, text) {
        //type is 'error', 'info', 'success', 'warning'
        if (open === true) {
            this.setState({
                showAlert: open,
                alertType: type,
                alertText: text
            })
        }
        else {
            this.setState({
                showAlert: open
            })
        }
    }

    render() {
        const { classes } = this.props;
        const cardStyle = makeStyles(theme => ({
            card: {
                maxWidth: 345,
            },
            media: {
                height: 0,
                paddingTop: '56.25%', // 16:9
            }
        }));

        //Wait until all informations be render until continue
        if (this.state.isLoadingPage) return null;

        if (this.state.userRequestMatches.length === 0) {
            return (
                <div className={classes.root}>
                    <div align="center">
                        <Paper>

                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <Typography variant="h5" gutterBottom>
                                No pending requests
                                </Typography>
                            <br></br>
                            <Typography variant="h6" gutterBottom>
                                Click the button below to search for language partners
                                </Typography>
                            <br></br>
                            <Button component={Link} to="/browse-match" variant="contained" color="primary">Search!</Button>
                            <br></br>
                            <br></br>
                        </Paper>
                        <br></br>
                        <br></br>
                        <br></br>
                    </div>
                    <AlertPopup
                        open={this.state.showAlert}
                        variant={this.state.alertType}
                        message={this.state.alertText}
                        onClose={() => { this.setState({ showAlert: false }) }} />
                </div>

            )
        }

        return (
            <div className={classes.root}>
                <ExpansionPanel defaultExpanded={true}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                        <Typography variant="h6">
                            Your pending request(s)
                        </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            {
                                this.getMatchesTiles(this.state.userRequestMatches, classes)
                            }
                            <br></br>
                            <Divider variant="middle" />
                        </ExpansionPanelDetails>
                </ExpansionPanel>
                <AlertPopup
                    open={this.state.showAlert}
                    variant={this.state.alertType}
                    message={this.state.alertText}
                    onClose={() => { this.setState({ showAlert: false }) }} />
                <ConfirmDialog
                    open={this.state.showAcceptConfirm || this.state.showDenyConfirm}
                    onClose={this.closeAllDialogs}
                    title={(this.state.showAcceptConfirm ? "Accept" : "Deny") +  " this request ?"}
                    onConfirm={()=>{(this.state.showAcceptConfirm && this.acceptMatchRequest()) || (this.state.showDenyConfirm && this.denyMatchRequest())}}/>
            </div>
        );
    }
}
MatchRequests.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MatchRequests);
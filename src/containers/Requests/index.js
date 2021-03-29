
import React from 'react';

import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import { AlertPopup, ConfirmDialog } from '../../components/AlertView';
import ConstantsList from '../../config_constants';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { AppContext } from "../../components/context/context";
import Hidden from '@material-ui/core/Hidden';
import UserStyleCard from '../../components/UserStyleCard';

const styles = ({
    expansionPan: {
        backgroundColor: '#f5f5f5',
    },
    fullWidth: {
        width: "100%",
    },
    root: {
        display: 'inline',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    /* these ones aren't actually used
    
    expansionSummary: { //hdjsv
        backgroundColor: '#fff',
    },
    gridList: {
        //flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        width: "auto",
        height: "auto"
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
    }, 
    chip: {
        margin: 2,
    }*/
});

class Requests extends React.Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            userRequestMatches: [],
            userSentMatchRequests: [],
            isLoadingPage: true,
            showAlert: false,
            alertType: "success",
            alertText: "",
            showAcceptConfirm: false,
            showDenyConfirm: false,
            showCancelConfirm: false,
            matchId: "",
            portOption: ConstantsList.PORT_IN_USE
        };
        this.acceptMatchRequest = this.acceptMatchRequest.bind(this);
        this.denyMatchRequest = this.denyMatchRequest.bind(this);
        this.cancelSentRequest = this.cancelSentRequest.bind(this);
        this.toggleAlert = this.toggleAlert.bind(this);
    }

    abortController = new AbortController();

    closeAllDialogs = () => {
        this.setState({
            showAcceptConfirm: false,
            showDenyConfirm: false,
            showCancelConfirm: false,
            matchId: ""
        })
    }

    acceptMatchRequest() {
        this.setState({ isLoadingPage: true })
        fetch(window.location.protocol + '//' + window.location.hostname + this.state.portOption + '/api/v1/usersMatch/acceptMatchRequest/' + this.state.matchId,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                cors: 'no-cors',
                body: JSON.stringify({})
            })
            .then((response) => {
                if (response.status === 200) {
                    this.getUserMatchsRequestListAPI(() => {
                        this.toggleAlert(true, "success", "Match request accepted.")
                        this.setState({ isLoadingPage: false })
                    });
                }
                else {
                    this.toggleAlert(true, "error", "Something went wrong.");
                }
            })
            .catch((error) => {
                this.setState({ isLoadingPage: false })
                console.log('Error');
                console.error(error);
            });
        this.closeAllDialogs();
    }

    denyMatchRequest() {
        this.setState({ isLoadingPage: true })
        const url = new URL(window.location.protocol + '//' + window.location.hostname + this.state.portOption + "/api/v1/usersMatch/denyMatchRequest/" + this.state.matchId);
        fetch(url, {
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
                    this.getUserMatchsRequestListAPI(() => {
                        this.toggleAlert(true, "success", "Match request denied.")
                        this.setState({ isLoadingPage: false })
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

    cancelSentRequest() {
        const url = new URL(window.location.protocol + '//' + window.location.hostname + this.state.portOption + "/api/v1/usersMatch/cancelSendRequest/" + this.state.matchId);
        fetch(url, {
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
                    this.getUserSentRequestListAPI(() => {
                        this.toggleAlert(true, "success", "Sent match request cancelled.")
                        this.setState({ isLoadingPage: false })
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
        const url = new URL(window.location.protocol + '//' + window.location.hostname + this.state.portOption + "/api/v1/usersMatch/receiptMatchsRequests");

        fetch(url, {
            method: 'GET',
            credentials: 'include',
            cors: 'no-cors'
        }).then((response) => response.json())
            .then((responseJson) => {
                const { updateContext } = this.context;
                this.setState({ userRequestMatches: responseJson.userReceiptMatches })
                updateContext("requestAmount", responseJson.userReceiptMatches.length)
            }).catch((error) => {
                console.error(error);
            });

        callback();
    }

    getUserSentRequestListAPI(callback) {
        console.log('getUserSentRequestListAPI');
        const url = new URL(window.location.protocol + '//' + window.location.hostname + this.state.portOption + "/api/v1/usersMatch/requestedMatchsRequests");

        fetch(url, {
            method: 'GET',
            credentials: 'include',
            cors: 'no-cors'
        }).then((response) => response.json())
            .then((responseJson) => {
                const { updateContext } = this.context;
                this.setState({ userSentMatchRequests: responseJson.matchs })
                updateContext("sentRequestAmount", responseJson.matchs.length)
            }).catch((error) => {
                console.error(error);
            });

        callback();
    }


    componentDidMount() {
        this.getUserMatchsRequestListAPI(() => {
            this.setState({ isLoadingPage: false });
        });

        this.getUserSentRequestListAPI(() => {
            this.setState({ isLoadingPage: false });
        });
    }

    getMatchesTiles(matches, classes) {
        return (
            <div className={classes.fullWidth}>
                <Hidden smDown>
                    <GridList cellHeight="auto" cols={3} >
                        {matches.map((match, key) => {
                            return (
                                <GridListTile key={key}>
                                    <UserStyleCard
                                        user={match.requesterUser} 
                                        yesText="Accept" 
                                        yesFunction={() => { this.setState({ showAcceptConfirm: true, matchId: match._id }) }}
                                        noText="Deny" 
                                        noFunction={() => { this.setState({ showDenyConfirm: true, matchId: match._id }) }} 
                                        page="pending-match" 
                                        match={match}>
                                    </UserStyleCard>
                                </GridListTile>
                            )
                        })}
                    </GridList>
                </Hidden>
                <Hidden mdUp>
                    <GridList cellHeight="auto" cols={1} spacing={25} >
                        {matches.map((match, key) => {
                            return (
                                <GridListTile key={key}>
                                    <UserStyleCard 
                                        user={match.requesterUser} 
                                        yesText="Accept" 
                                        yesFunction={() => { this.setState({ showAcceptConfirm: true, matchId: match._id }) }}
                                        noText="Deny" 
                                        noFunction={() => { this.setState({ showDenyConfirm: true, matchId: match._id }) }} 
                                        page="pending-match" match={match}>
                                    </UserStyleCard>
                                </GridListTile>
                            )
                        })}
                    </GridList>
                </Hidden>
            </div>
        )
    }

    getSentRequestsTiles(requests, classes) {
        return (
            <div className={classes.fullWidth}>
                <Hidden smDown>
                    <GridList cellHeight="auto" cols={3}>
                        {requests.map((request, key) => {
                            return (
                                <GridListTile key={key} >
                                    <UserStyleCard 
                                        user={request.recipientUser} 
                                        noText="Cancel" 
                                        noFunction={() => { this.setState({ showCancelConfirm: true, matchId: request._id }) }}
                                        page="pending-match" 
                                        match={request}>
                                    </UserStyleCard>
                                </GridListTile>
                            )
                        })}
                    </GridList>
                </Hidden>
                <Hidden mdUp>
                    <GridList cellHeight="auto" cols={1} spacing={25} >
                        {requests.map((match, key) => {
                            return (
                                <GridListTile key={key} rows={2}>
                                    <UserStyleCard 
                                        user={match.recipientUser} 
                                        noText="cancel" noFunction={() => { this.setState({ showCancelConfirm: true, matchId: match._id }) }}
                                        page="pending-match" 
                                        match={match}>
                                    </UserStyleCard>
                                </GridListTile>
                            )
                        })}
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
        /*const cardStyle = makeStyles(theme => ({
            card: {
                maxWidth: 345,
            },
            media: {
                height: 0,
                paddingTop: '56.25%', // 16:9
            }
        }));*/

        //Wait until all informations be render until continue
        if (this.state.isLoadingPage) return null;

        if (this.state.userRequestMatches.length === 0 && this.state.userSentMatchRequests === 0) {
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
                        onClose={() => { this.setState({ showAlert: false }) }}
                    />
                </div>
            )
        }

        return (
            <div className={classes.root}>
                <ExpansionPanel className={classes.expansionPan} defaultExpanded={this.state.userRequestMatches.length > 0}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant="h6">
                            You have recieved {this.state.userRequestMatches.length} pending request(s)
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        {
                            this.getMatchesTiles(this.state.userRequestMatches, classes)
                        }
                        <br></br>
                        {/*<Divider variant="middle" />*/}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <br></br>
                <ExpansionPanel className={classes.expansionPan}
                    defaultExpanded={this.state.userRequestMatches.length === 0 && this.state.userSentMatchRequests.length !== 0}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant="h6">
                            Your have sent {this.state.userSentMatchRequests.length} request(s)
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        {
                            this.getSentRequestsTiles(this.state.userSentMatchRequests, classes)
                        }
                        <br></br>
                        {/*<Divider variant="middle" />*/}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <AlertPopup
                    open={this.state.showAlert}
                    variant={this.state.alertType}
                    message={this.state.alertText}
                    onClose={() => { this.setState({ showAlert: false }) }}
                />
                <ConfirmDialog
                    open={this.state.showAcceptConfirm || this.state.showDenyConfirm}
                    onClose={this.closeAllDialogs}
                    title={(this.state.showAcceptConfirm ? "Accept" : "Deny") + " this request?"}
                    onConfirm={() => { (this.state.showAcceptConfirm && this.acceptMatchRequest()) || (this.state.showDenyConfirm && this.denyMatchRequest()) }}
                />
                <ConfirmDialog
                    open={this.state.showCancelConfirm}
                    onClose={this.closeAllDialogs}
                    title={"Cancel the sent request?"}
                    onConfirm={() => { this.cancelSentRequest() }}
                />
            </div>
        );
    }
}

Requests.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Requests);
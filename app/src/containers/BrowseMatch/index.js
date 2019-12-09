
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
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import GridListTileBar from '@material-ui/core/GridListTileBar';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	Styles

import ResponsiveDrawer from '../MenuDrawer';



const styles = ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    fullWidth: {
        width: "100%",
    },
    bottomMargin: {
        marginBottom: '2.5em',
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
        // height: "100% !important",
        maxWidth: "300px",
        minWidth: 60
    },
    gridListTileBar: {
        background: "#3f51b5",
    },
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	className

class BrowseMatch extends React.Component {


    state = {
        userMatches: [
            {
                languageName: "English",
                matches:
                    [
                        { user: { _id: "1", name: "Nam" } },
                        { user: { name: "Peter" } },
                        { user: { name: "Jp" } },
                        { user: { name: "Nam" } },
                        { user: { name: "Peter" } },
                        { user: { name: "Jp" } },
                        { user: { name: "Nam" } },
                        { user: { name: "Peter" } },
                        { user: { name: "Jp" } },
                        { user: { name: "Nam" } },
                        { user: { name: "Peter" } },
                        { user: { name: "Jp" } }
                    ]
            },
            {
                languageName: "Finnish",
                matches:
                    [
                        { user: { name: "Nam" } },
                        { user: { name: "Peter" } },
                        { user: { name: "Jp" } }
                    ]
            }
        ],
        open: false,
    };
    // =========================================== FUNCTIONS ======================================
    // Load possible matches list
    loadDataPossibleUserMatches() {
        // http://localhost:3000/api/v1/usersMatch/possibleMatchs
        const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/api/v1/usersMatch/possibleMatchs")
        console.log(url)
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });

    }

    // Send a new match invitation
    requestNewUserMatch() {
        // http://localhost:3000/api/v1/usersMatch/sendRequest
        // The requester user ID will be collect automatic by the server
        const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/api/v1/usersMatch/sendRequest")
        console.log(url)
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                recipientUserID: this.state.recipientUserID,//User that will receive the request
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // Get all the match requests made to the user by other users
    getMatchRequestsReceivedByTheUser() {
        // http://localhost:3000/api/v1/usersMatch/receiptMatchsRequests
        const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/api/v1/usersMatch/receiptMatchsRequests")
        console.log(url)
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });

    }

    // Get the match requests made by the user to other users
    getMatchRequestsRequestedByTheUser() {
        // http://localhost:3000/api/v1/usersMatch/requestedMatchsRequests
        const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/api/v1/usersMatch/requestedMatchsRequests")
        console.log(url)
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });

    }

    // Get the current matches of the user
    getUserCurrentMatchs() {
        // http://localhost:3000/api/v1/usersMatch/getUserActiveMatches
        const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/api/v1/usersMatch/getUserActiveMatches")
        console.log(url)
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });

    }

    acceptNewMatchRequest() {
        // need the match ID
        const matchID = 123456;

        // http://localhost:3000/api/v1/usersMatch/acceptMatchRequest/:matchid
        const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/api/v1/usersMatch/acceptMatchRequest" + matchID);

        console.log(url)
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });

    }

    denyNewMatchRequest() {
        // need the match ID
        const matchID = 123456;

        // http://localhost:3000/api/v1/usersMatch/denyMatchRequest/:matchid
        const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/api/v1/usersMatch/denyMatchRequest" + matchID);

        console.log(url)
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });

    }

    // ================================================================================================

    getUserPossibleMatchsList = () => {
        const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/api/v1/usersMatch/possibleMatchs");

        fetch(url, {
            method: 'GET',
            credentials: 'include',
            cors: 'no-cors'
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
        this.setState({ open: true })
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    getMatchesTiles(item, classNamees) {
        return (
            item.matches.length === 0 ? (
                <Typography variant="h5" gutterBottom>
                    <Typography variant="overline" gutterBottom>
                        {"No_matches_found_for"} {item.languageName}
                    </Typography>
                    <Link href="/languagePreferences" classNameName={classNamees.preferencesLink}>
                        {"Edit_your_preferences"}
                    </Link>
                </Typography>
            ) : (
                    <div classNameName={classNamees.fullWidth}>
                        <GridList classNameName={classNamees.gridList} cols={4}>
                            {
                                item.matches.map((match, key) =>
                                    <GridListTile key={key}
                                        classNameName={classNamees.gridListTile}>
                                        <Typography variant="overline" gutterBottom>
                                            {match.user.name}
                                        </Typography>
                                        <GridListTileBar
                                            //   title={"aaa"}
                                            classNamees={{
                                                root: classNamees.titleBar,
                                                title: classNamees.title,
                                            }}
                                            actionIcon={
                                                <Button variant="contained" color="primary" onClick={this.onInviteAction.bind(this, match)}>
                                                    Invite
                </Button>
                                            }
                                        />
                                    </GridListTile>
                                )
                            }
                        </GridList>
                    </div>
                )
        )
    }

    getAlreadyExistsDiv(item, classNamees) {
        return (<ListItem key={item.languageName}
            classNameName={classNamees.fullWidth + ' ' + classNamees.bottomMargin}>
            <Typography variant="h5" gutterBottom>
                <Typography variant="overline" gutterBottom>
                    {"Existing_match_found_for"} {item.languageName}
                </Typography>
                <Link href="/listMatches" classNameName={classNamees.preferencesLink}>
                    {"See_your_matches"}
                </Link>
            </Typography>
        </ListItem>)
    }

    getMatchesList(item, classNamees) {
        return (<ListItem
            key={item.languageName}
            classNameName={classNamees.fullWidth + ' ' + classNamees.bottomMargin}>
            <div classNameName={classNamees.fullWidth} key={item.languageName}>
                <div classNameName={classNamees.fullWidth}>
                    <ListItemText classNameName={classNamees.bottomMargin}>
                        <Typography variant="overline" gutterBottom>
                            {"Can_teach" + ' ' + item.languageName + ":"}
                        </Typography>

                    </ListItemText>
                </div>
                {
                    this.getMatchesTiles(item, classNamees)
                }
            </div>
        </ListItem>);
    }


    onInviteAction(user) {
        console.log(user)
    }

    componentDidMount() {
        this.getUserPossibleMatchsList();
    }


    render() {
        const { classNamees } = this.props;

        return (

            <div classNameName={classNamees.root}>
                <ResponsiveDrawer title="Find a new language partner">
                    <List component="nav" classNameName={classNamees.fullWidth}>
                        {
                            this.state.userMatches.map(item => {
                                return item.alreadyExists ? (
                                    this.getAlreadyExistsDiv(item, classNamees)
                                ) : (
                                        this.getMatchesList(item, classNamees)
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
    classNamees: PropTypes.object.isRequired,
};

export default withStyles(styles)(BrowseMatch);

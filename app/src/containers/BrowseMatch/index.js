
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	Class

class BrowseMatch extends React.Component {
    state = {
        userMatches: [{
            languageName: "English",
            matches:
            [{user:{_id: "1", name:"Nam"}},
            {user:{name:"Peter"}},
            {user:{name:"Jp"}},
            {user:{name:"Nam"}},
            {user:{name:"Peter"}},
            {user:{name:"Jp"}},
            {user:{name:"Nam"}},
            {user:{name:"Peter"}},
            {user:{name:"Jp"}},
            {user:{name:"Nam"}},
            {user:{name:"Peter"}},
            {user:{name:"Jp"}}
            ]
        
        },
        {
            languageName: "Finnish",
            matches:
            [{user:{name:"Nam"}},
            {user:{name:"Peter"}},
            {user:{name:"Jp"}}
        ]
        }
    ],
        open: false,
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
                    <GridList className={classes.gridList} cols={4}>
                        {
                            item.matches.map((match, key) =>
                                <GridListTile key={key}
                                              className={classes.gridListTile}>
                                   <Typography variant="overline" gutterBottom>
                                   {match.user.name}
                    </Typography>  
                    <GridListTileBar
            //   title={"aaa"}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <Button variant="contained" color = "primary" onClick = {this.onInviteAction.bind(this, match)}>
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

    getAlreadyExistsDiv(item, classes) {
        return (<ListItem key={item.languageName}
                          className={classes.fullWidth + ' ' + classes.bottomMargin}>
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

    getMatchesList(item, classes) {
        return (<ListItem
            key={item.languageName}
            className={classes.fullWidth + ' ' + classes.bottomMargin}>
            <div className={classes.fullWidth} key={item.languageName}>
                <div className={classes.fullWidth}>
                    <ListItemText className={classes.bottomMargin}>
                        <Typography variant="overline" gutterBottom>
                            {"Can_teach" + ' ' + item.languageName + ":"}
                        </Typography>
                        
                    </ListItemText>
                </div>
                {
                    this.getMatchesTiles(item, classes)
                }
            </div>
        </ListItem>);
    }


    onInviteAction (user) {
        console.log(user)
    }


    render() {
        const {classes} = this.props;

        return (
            
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
        );
    }
}

BrowseMatch.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BrowseMatch);
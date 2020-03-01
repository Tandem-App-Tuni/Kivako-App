
import React from 'react';

import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import GridList from '@material-ui/core/GridList';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import ResponsiveDrawer from '../MenuDrawer';

import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Icon from '@material-ui/core/Icon';

import logo from '../../tandemlogo.png'
import Grid from '@material-ui/core/Grid'

import ConstantsList from '../../config_constants';


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
    leftText:{
        textAlign: 'left'
    }
});

class MatchRequests extends React.Component 
{
    constructor(props) 
    {
      super(props);
      this.state = {
        userRequestMatches:[],
        isLoadingPage:true,
        open:false,
        portOption:ConstantsList.PORT_IN_USE
      };
    }

    openModal = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false});
    };

    acceptMatchRequest(match) 
    {
        if (window.confirm("Accept match request?")) 
        {
            fetch(window.location.protocol + '//' + window.location.hostname + this.state.portOption + '/api/v1/usersMatch/acceptMatchRequest/' + match._id, 
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
            .then(response => 
            {
                if (response.status === 200)
                {
                    alert('Match request accepted.');
                    window.location.reload();
                }
                else alert('Something went wrong.')
            })
            .catch((error) => 
            {
                console.log('Error');
                console.error(error);
            }); 
        }
    }

    denyMatchRequest(match) 
    {
        //console.log(user)
        //console.log(language)
        //alert("Match "+ match._id);

        const url = new URL(window.location.protocol + '//' + window.location.hostname + this.state.portOption + "/api/v1/usersMatch/denyMatchRequest/"+match._id);

        if (window.confirm("Deny match request?")) {
            fetch(url, {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
                credentials: 'include',
                cors: 'no-cors',
            })
            .then(response => 
            {
                if (response.status === 200) 
                {
                    alert('Match request denied.');
                    window.location.reload();
                } 
                else alert('Something went wrong.')
            })
            .catch((error) => {
                console.error(error);
            }); 
        }
        //console.log(url)
    }

    getUserMatchsRequestListAPI = (callback) =>
    {
        const url = new URL(window.location.protocol + '//' + window.location.hostname + this.state.portOption + "/api/v1/usersMatch/receiptMatchsRequests");
    
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
    

    componentDidMount()
    {      
        this.getUserMatchsRequestListAPI( () => 
        {
            this.setState({isLoadingPage:false});
        });
    }

    render() {
        const {classes} = this.props;
        const cardStyle =makeStyles(theme => ({
            card: {
              maxWidth: 345,
            },
            media: {
              height: 0,
              paddingTop: '56.25%', // 16:9
            }
          }));
        
        //Wait until all informations be render until continue
        if(this.state.isLoadingPage) return null;
        
        if(this.state.userRequestMatches.length === 0)
        {  
            return  (
                <div className={classes.root}>
                    <ResponsiveDrawer title = "Matches requests!">
                        <div align = "center">
                            <Paper>
                                <img alt="" src={logo} style={{ maxHeight: 100 , maxWidth: '80%', marginTop: 30,marginLeft: 20,marginRight: 20}}/>
      
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <Typography variant="h5" gutterBottom>
                                    At the moment any matches requests were found in the system!
                                </Typography>
                                <br></br>
                                <Typography variant="h6" gutterBottom>
                                    Click in the button to search some partners!
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

                    </ResponsiveDrawer>
                </div>
                )
        }

        return (
            <div className={classes.root}>
                <ResponsiveDrawer title = "Matches requests!">
                    <GridList container='true' cols={1} spacing={30} cellHeight={'auto'}>
                        {
                            this.state.userRequestMatches.map((match, key) =>
                        
                                <Grid container spacing={3} key={key}>
                                    <Grid item xs >
                                        <Card border={1} className={cardStyle.card} key={key}>
                                                <CardHeader
                                                className = {classes.leftText}
                                                    avatar={
                                                        <Avatar src={window.location.protocol + '//' + window.location.hostname + this.state.portOption + '/api/v1/avatar/getAvatar/' + match.requesterUser.email} 
                                                                aria-label="recipe" 
                                                                className={classes.bigAvatar}>
                                                        </Avatar>
                                                    }
                                                    
                                                    title={match.requesterUser.firstName + ' ' + match.requesterUser.lastName}
                                                    //subheader={ match._id}
                                                />
                                                
                                                <CardContent className = {classes.leftText}>
        
                                                    <Typography variant="body1" color="textSecondary" component="p">
                                                        
                                                        {match.requesterUser.descriptionText}
        
                                                    </Typography>
                                                    <br></br>
                                                    <Divider variant="middle" />
                                                    <br></br>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        <Icon fontSize="small">home</Icon> Cities: {match.requesterUser.cities.join(', ')}<br></br>
                                                        <Icon fontSize="small">language</Icon> Languages want to learn: {(match.requesterUser.languagesToLearn && match.requesterUser.languagesToLearn.map(e => e.language).join(", "))}<br></br>
                                                    </Typography>                                                    
                                                </CardContent>
                                                <CardActions disableSpacing >
                                                    <Grid container>
                                                    <Grid item xs={12} sm={4}>
                                                        <Button variant="contained" 
                                                                color="primary"
                                                                onClick = {this.acceptMatchRequest.bind(this,match)}
                                                        >
                                                            Accept
                                                        </Button>
                                                    </Grid>
                                                    <Grid item xs>
            
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        <Button variant="outlined" 
                                                                color="secondary"
                                                                onClick = {this.denyMatchRequest.bind(this,match)}
                                                            >
                                                            Deny
                                                        </Button>
                                                    </Grid>
                                                    </Grid>
                                                </CardActions>
                                        </Card>
                                    </Grid>
                                </Grid>
                            )
                        }
                    </GridList>
                </ResponsiveDrawer>
            </div>
        );
    }
}

MatchRequests.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MatchRequests);
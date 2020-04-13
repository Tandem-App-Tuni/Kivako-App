import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import UserActionCard from '../../components/UserActionCard';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import UserStyleCard from '../../components/UserStyleCard';
import Constants from '../../config_constants';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import logo from '../../tandemlogo.png';
import Grid from '@material-ui/core/Grid';
import { AlertView } from '../../components/AlertView';
import ConstantsList from '../../config_constants';


const styles =  theme => 
({
  root: 
  {
    display: 'inline',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    
    // backgroundColor: theme.palette.background.paper,
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
  },
  inline: 
  {
    display: 'inline',
  },
  inline: 
  {
    display: 'block',
  },
  item: 
  {
    backgroundColor: 'white',
  },
  divider:{
    height:'2px',
  }
});

/**
 * Displays the current partners from the
 * match data returned from the server.
 * The user can the choose to unadd the partner,
 * resulting in the match being removed from the server.
 */
class PartnerListPage extends Component 
{

  
  state = 
  {
    openAction: false,
    actionIndex: 0,
    partnerList: []
  };
  

  componentDidMount()
  {
  fetch(window.location.protocol + '//' + window.location.hostname + Constants.PORT_IN_USE + '/api/v1/usersMatch/getUserActiveMatches',
    {
      method: 'GET',
      headers: 
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
    .then(responseSecond => responseSecond.json())
    .then(jsonResponse => 
    {
      if (jsonResponse.data === undefined) 
      {
        this.setState({partnerList: []});
        return;
      }

      const userId = jsonResponse.userId;
      let partners = [];

      /**
       * Loop through all the matches and
       * and extract important data to be displayed.
       */
      for (let i = 0; i < jsonResponse.data.length; i++)
      {
        let match = jsonResponse.data[i];
        const user = match.requesterUser._id === userId ? match.recipientUser : match.requesterUser;

        let ltt = [];
        let ltl = [];

        user.languagesToTeach.forEach(item => 
        {
          ltt.push(item.language);
        });

        user.languagesToLearn.forEach(item => 
        {
          ltl.push(item.language);
        });

        partners.push(
        {
           
            firstName:user.firstName,
            lastName:user.lastName,
            _id: i,
            matchId: match._id,            
            cities: user.cities,
            teachLanguages: ltt,
            studyLanguages: ltl,
            email:user.email,
            languagesToLearn:user.languagesToLearn,
            descriptionText:user.descriptionText,
            photo_url:window.location.protocol + '//' + window.location.hostname + Constants.PORT_IN_USE + '/api/v1/avatar/getAvatar/' + user.email,
        });
      }

      this.setState({partnerList: partners});
    });
  }

  onShowActionCard= (open, index, action) =>  
  {
    if (open === true) this.setState({actionIndex: index});
    else
    {
      let data = this.state.partnerList[index];

      if (action === "unmatch") this.onUnmatchUser(data);
    }

    this.setState({openAction: open});
  };



  reportPartnerRequest(partner) {
      console.log("report button is clicked");
  }

  unmatchRequest(partner) {
    console.log("unmatch button is clicked");
  }


  getPartnersTiles(partnerList, classes) {
    console.log(partnerList)
    return (
      
        <div className={classes.fullWidth}>
          <GridList cellHeight="auto" spacing={25} >
            {
                partnerList.map((partner, _id) =>  
                {
                                   
                    return(<GridListTile key={_id} rows={2}>
                                <UserStyleCard  user={partner} yesText="Unmatch" yesFunction={this.unmatchRequest} noText="Report" noFunction={this.reportPartnerRequest} partner={partner}> 
                                </UserStyleCard>

                            </GridListTile>)
                }
            )}
            </GridList>
        </div>   
        )
}

  getPartnerDiv(list, classes) 
  {
    if (this.state.partnerList.length === 0) return <div/>;
    else
    {
      return (
      <div className={classes.root}>

          <ExpansionPanel defaultExpanded={true}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
            <Typography variant="h6">
                Your current partner(s)
            </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                  { 
                      this.getPartnersTiles(this.state.partnerList, classes)
                  }
                  <br></br>
                  <Divider variant="middle" />
            </ExpansionPanelDetails>
          
        </ExpansionPanel>     
      </div>
      );
    }
  }

  onUnmatchUser = (data) =>
  {
    fetch(window.location.protocol + '//' + window.location.hostname + Constants.PORT_IN_USE + '/api/v1/usersMatch/removeExistingMatch', 
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({matchId: data.matchId})
    })
    .then((response) => 
    {
      console.log('Removed!');
      window.location.reload();
    });
  }

  render()
  {
   
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
    return (
      <div className={classes.root}>
       {this.getPartnerDiv(this.state.partnerList, classes)}
      </div>
    );
  }

}
PartnerListPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles) (PartnerListPage);

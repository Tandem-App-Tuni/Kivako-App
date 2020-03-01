import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import ResponsiveDrawer from '../MenuDrawer';
import UserActionCard from '../../components/UserActionCard';

import Constants from '../../config_constants';
import Divider from '@material-ui/core/Divider';

const useStyles =  theme => 
({
  root: 
  {
    width: '100%',
    // backgroundColor: theme.palette.background.paper,
  },
  inline: 
  {
    display: 'inline',
  },
  item: 
  {
    backgroundColor: 'white',
  },
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
  }

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
            name: user.firstName + ' ' + user.lastName,
            _id: i,
            matchId: match._id,
            city: user.cities,
            teachLanguages: ltt,
            studyLanguages: ltl,
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

  getPartnerDiv(list, classes) 
  {
    if (this.state.partnerList.length === 0) return <div/>;
    else
    {
      return (
      <div>
      <Typography variant="h6" gutterBottom>
         Partners
      </Typography>  
      <List 
        className={classes.root}>
        {list.map(item => 
        {
          return (
            <div  key = {item._id}>
            <ListItem 
              className = {classes.item}
              alignItems="flex-start"
              onClick={() => this.onShowActionCard(true, this.state.partnerList.indexOf(item), null)}>
            <ListItemAvatar>
              <Avatar src={item.photo_url} />
            </ListItemAvatar>
            <ListItemText
              primary={item.name}
              secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary">
                  Teach: {item.teachLanguages.join(", ")}. Learn: {item.studyLanguages.join(", ")}
                </Typography>
              {" — " + item.city.join(", ")}
            </React.Fragment>}/>
          </ListItem>
          <Divider variant="inset" component="li" />
          </div>
          );
        })}
      </List>
      <UserActionCard 
          type = "partner"
          open = {this.state.openAction} 
          data = {this.state.partnerList[this.state.actionIndex]}
          onClose = {(value) =>this.onShowActionCard(false, this.state.actionIndex, value)}/>
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
    return (
      <div className={classes.root}>
      <ResponsiveDrawer title = "Current Partners">
       {this.getPartnerDiv(this.state.partnerList, classes)}
      </ResponsiveDrawer>
      </div>
    );
  }

}

export default withStyles(useStyles) (PartnerListPage);
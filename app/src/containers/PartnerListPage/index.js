import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import ResponsiveDrawer from '../MenuDrawer';
import InviteCard from '../../components/InviteCard';

import LanguagePicker from '../../components/LanguagePicker'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const testInviteData = [
    {
      user:{
        _id: 100,
        name: "Nam Nguyen",
        city: ["Tampere", "Helsinki"],
        teachLanguages: ["English", "Vietnamese"],
        photo_url: "https://pickaface.net/gallery/avatar/unr_test_161024_0535_9lih90.png",
        intro: "The quick brown fox jumps over the lazy dog"
      },
      studyLanguage: "English"
    },
    {
      user:{
        _id: 101,
        name: "Tom Holland",
        city: ["Helsinki"],
        teachLanguages: ["English", "Chinese"],
        photo_url:"https://cdn.icon-icons.com/icons2/582/PNG/512/woen-2_icon-icons.com_55032.png",
        intro: "The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog"
      },
      studyLanguage: "French"
    }
];

const partnerListData = [
  {
    user:{
      _id: 100,
      name: "Nam Nguyen",
      city: ["Tampere", "Helsinki"],
      teachLanguages: ["English", "Vietnamese"],
      photo_url: "https://pickaface.net/gallery/avatar/unr_test_161024_0535_9lih90.png",
      intro: "The quick brown fox jumps over the lazy dog"
    },
    "lastMessage" : "The quick brown fox jumps over the lazy dog"
  },
  {
    user:{
      _id: 101,
      name: "Tom Holland",
      city: ["Helsinki"],
      teachLanguages: ["English", "Chinese"],
      photo_url:"https://cdn.icon-icons.com/icons2/582/PNG/512/woen-2_icon-icons.com_55032.png",
      intro: "The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog"
    }
    , "lastMessage" : "Hey hey you you"
  }
]

class PartnerListPage extends Component {
  state = {
    inviteList: testInviteData,
    openInvite: false,
    inviteIndex: 0,
    partnerList: partnerListData
  }
  componentDidMount(){
    //load data
  }

  onShowInviteCard= (open, index, accept) =>  {
    console.log(open, index, accept);
    if (open === true){
      this.setState(
        {
          inviteIndex: index
        }
      )
    }
    else{
      let data = this.state.inviteList[index];
      this.responseToInvite(data, accept);
    }
    this.setState(
      {
        openInvite: open
      }
    )
  };

  responseToInvite = (data, accept) =>{
    console.log("response " + accept + " to "+data.user.name)
  }

  getInviteDiv(list, classes) {
    if (list.length == 0){
      return null
    }
    else{
      return (
      <div>
      <Typography variant="h6" gutterBottom>
         Requests
      </Typography>  
      <List className={classes.root}>
        {list.map(item => {
          return (<ListItem key = {item.user._id} alignItems="flex-start"
          onClick={() => 
            this.onShowInviteCard(true, this.state.inviteList.indexOf(item), null)
          }
          >
        <ListItemAvatar>
          <Avatar src={item.user.photo_url} />
        </ListItemAvatar>
        <ListItemText
          primary={item.user.name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Teach: {item.user.teachLanguages.join(", ")}. Learn: {item.studyLanguage}
              </Typography>
              {" — " + item.user.city.join(", ")}
            </React.Fragment>
            
          }
        />
      </ListItem>);
        }
        )}
      </List>
      </div>
      );
    }
  }

  onShowConversation = (data) =>{
    console.log("view message for: " + data.user.name)
  }

  getMessageDiv(list, classes) {
    if (list.length == 0){
      return null
    }
    else{
      return (
      <div>
      <Typography variant="h6" gutterBottom>
         Conversations
      </Typography>  
      <List className={classes.root}>
        {list.map(item => {
          return (<ListItem key = {item.user._id} alignItems="flex-start"
          onClick={() => 
            this.onShowConversation(item)
          }
          >
        <ListItemAvatar>
          <Avatar src={item.user.photo_url} />
        </ListItemAvatar>
        <ListItemText
          primary={item.user.name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {item.lastMessage}
              </Typography>
            </React.Fragment>
            
          }
        />
      </ListItem>);
        }
        )}
      </List>
      </div>
      );
    }
  }


  render(){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <ResponsiveDrawer title = "Find a new language partner">
       {this.getInviteDiv(this.state.inviteList, classes)}
       <InviteCard 
          open = {this.state.openInvite} 
          data = {this.state.inviteList[this.state.inviteIndex]}
          onClose = {(value) =>this.onShowInviteCard(false, this.state.inviteIndex, value)}
       />
      {this.getMessageDiv(this.state.partnerList, classes)}
      </ResponsiveDrawer>
      </div>
    );
  }

}

export default withStyles(useStyles) (PartnerListPage);

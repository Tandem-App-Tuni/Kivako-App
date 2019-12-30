import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import ResponsiveDrawer from '../MenuDrawer';
import UserActionCard from '../../components/UserActionCard';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const partnerListData = [
  {
    user:{
      _id: 100,
      name: "Nam Nguyen",
      city: ["Tampere", "Helsinki"],
      teachLanguages: ["English", "Vietnamese"],
      studyLanguages: ["English", "Vietnamese"],
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
      studyLanguages: ["English", "Vietnamese"],
      photo_url:"https://cdn.icon-icons.com/icons2/582/PNG/512/woen-2_icon-icons.com_55032.png",
      intro: "The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog"
    }
    , "lastMessage" : "Hey hey you you"
  }
]

class PartnerListPage extends Component {
  state = {
    openAction: false,
    actionIndex: 0,
    partnerList: partnerListData
  }
  componentDidMount(){
    //load data
  }

  onShowActionCard= (open, index, action) =>  {
    console.log(open, index, action);
    if (open === true){
      this.setState(
        {
          actionIndex: index
        }
      )
    }
    else{
      let data = this.state.partnerList[index];
      if (action === "chat"){
        this.onShowConversation(data)
      }
      else if (action === "unmatch"){
        this.onUnmatchUser(data)
      }
    }
    this.setState(
      {
        openAction: open
      }
    )
  };

  getPartnerDiv(list, classes) {
    if (list.length === 0){
      return null
    }
    else{
      return (
      <div>
      <Typography variant="h6" gutterBottom>
         Partners
      </Typography>  
      <List className={classes.root}>
        {list.map(item => {
          return (<ListItem key = {item.user._id} alignItems="flex-start"
          onClick={() => 
            this.onShowActionCard(true, this.state.partnerList.indexOf(item), null)
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
                Teach: {item.user.teachLanguages.join(", ")}. Learn: {item.user.studyLanguages.join(", ")}
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

  onUnmatchUser = (data) =>{
    console.log("unmatch user: " + data.user.name)
  }



  render(){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <ResponsiveDrawer title = "Current Partners">
       {this.getPartnerDiv(this.state.partnerList, classes)}
       <UserActionCard 
          type = "partner"
          open = {this.state.openAction} 
          data = {this.state.partnerList[this.state.actionIndex]}
          onClose = {(value) =>this.onShowActionCard(false, this.state.actionIndex, value)}
       />
      </ResponsiveDrawer>
      </div>
    );
  }

}

export default withStyles(useStyles) (PartnerListPage);
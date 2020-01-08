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

import ConstantsList from '../../config_constants';

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
    actionIndex: -1,
    partnerList: [],
    isAlreadyregistered : false,
        isAlreadyAuthenticated : false,
        isLoadingPage:true,
        portOption:ConstantsList.PORT_IN_USE,
  }
  
  componentDidMount() {
    this._isMounted = true;

    if(this._isMounted){
          
      this.checkIfUserIsAuthenticaded(() => {

        this.checkIfUserIsRegistered( () => {

          this.loadPartnersData( () => {
            this.setState({isLoadingPage:false});
          });

        });

      });
    }

  }

  // Load page functions
  checkIfUserIsRegistered(callback) {
    const url = new URL(window.location.protocol + '//' + window.location.hostname + this.state.portOption + "/api/v1/users/isRegistered")

    fetch(url, {
      method: 'GET',
      credentials: 'include',
      cors:'no-cors'
    }).then((response) => response.json())
    .then((responseJson) => {

      if(responseJson.isRegistered){
        //User is already registered. Redirect to dashboard in render
        this.setState({ isAlreadyregistered: true });
      }else{
        // Continue render normaly to register user
        this.setState({ isAlreadyregistered: false });
      }

      callback();

    })
    .catch((error) => {
      console.error(error);
    });
  }

  checkIfUserIsAuthenticaded (callback){

    const url = new URL(window.location.protocol + '//' + window.location.hostname + this.state.portOption + "/isAuthenticated");

    fetch(url, {
      method: 'GET',
      credentials: 'include',
      cors:'no-cors'
    }).then((response) => response.json())
    .then((responseData) => {
      
      if(responseData.isAuthenticated === false){
        // Nothing to do, user will be redirect in render;
      }else{
        // User is already authenticated
        // Set email automaticaly
        this.setState({isAlreadyAuthenticated: true});
        this.setState({email: responseData.email});
      }

      callback();

    })
    .catch((error) => {
      console.error(error);
    });
  }

  loadPartnersData = (callback) => {
    const url = new URL(window.location.protocol + '//' + window.location.hostname + this.state.portOption + "/api/v1/usersMatch/getUserActiveMatches")
    console.log('[INFO]Loading user information...');
    //console.log(url);

    fetch(url, {
        method: 'GET',
        credentials: 'include',
        cors: 'no-cors'
      }).then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState({
          partnerList: responseData.data
        })

      })
      .catch((error) => {
        console.error(error);
      });

      callback();
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
       {this.actionIndex >= 0 && <UserActionCard 
          type = "partner"
          open = {this.state.openAction} 
          data = {this.state.partnerList[this.state.actionIndex]}
          onClose = {(value) =>this.onShowActionCard(false, this.state.actionIndex, value)}
       />}
      </ResponsiveDrawer>
      </div>
    );
  }

}

export default withStyles(useStyles) (PartnerListPage);
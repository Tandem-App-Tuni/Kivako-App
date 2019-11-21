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
        intro: "The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog"
      },
      studyLanguage: "French"
    }
];

class PartnerListPage extends Component {
  state = {
    inviteList: testInviteData,
    openInvite: false,
    inviteIndex: 0
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
      let data = this.state[index];
      this.responseToInvite(data, accept);
    }
    this.setState(
      {
        openInvite: open
      }
    )
  };

  responseToInvite = (data, accept) =>{

  }

  getInviteDiv(list, classes) {
    if (list.length === 0){
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


  render(){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <ResponsiveDrawer title = "Find a new language partner">
       {this.getInviteDiv(this.state.inviteList, classes)}
       <InviteCard 
          open = {this.state.openInvite} 
          data = {this.state.inviteList[this.state.inviteIndex]}
       />
       {/* <LanguagePicker open = {this.state.openInvite} 
                      type = "learn"
                      language = {null}  
                      excludedLanguages = {[]}
                      /> */}
      </ResponsiveDrawer>
      </div>
    );
  }

}

export default withStyles(useStyles) (PartnerListPage);

// export default function PartnerListPage() {
//   const classes = useStyles();

//   return (
//     <ResponsiveDrawer title = 'Conversations'>

    

//     <List className={classes.root}>
//       <ListItem alignItems="flex-start">
//         <ListItemAvatar>
//           <Avatar alt="Remy Sharp" src="https://pickaface.net/gallery/avatar/unr_test_161024_0535_9lih90.png" />
//         </ListItemAvatar>
//         <ListItemText
//           primary="Remy Sharp"
//           secondary={
//             <React.Fragment>
//               <Typography
//                 component="span"
//                 variant="body2"
//                 className={classes.inline}
//                 color="textPrimary"
//               >
//                 Teach: English. Learn: Finnish
//               </Typography>
//               {" — Helsinki, Tampere"}
//             </React.Fragment>
//           }
//         />
//       </ListItem>
//     </List>


//     <Typography variant="h6" gutterBottom>
//                 Partners
//     </Typography>    
//     <List className={classes.root}>
//       <ListItem alignItems="flex-start">
//         <ListItemAvatar>
//           <Avatar alt="Remy Sharp" src="https://pickaface.net/gallery/avatar/unr_test_161024_0535_9lih90.png" />
//         </ListItemAvatar>
//         <ListItemText
//           primary="Brunch this weekend?"
//           secondary={
//             <React.Fragment>
//               <Typography
//                 component="span"
//                 variant="body2"
//                 className={classes.inline}
//                 color="textPrimary"
//               >
//                 Ali Connors
//               </Typography>
//               {" — I'll be in your neighborhood doing errands this…"}
//             </React.Fragment>
//           }
//         />
//       </ListItem>
//       <Divider variant="inset" component="li" />
//       <ListItem alignItems="flex-start">
//         <ListItemAvatar>
//           <Avatar alt="Travis Howard" src="https://pickaface.net/gallery/avatar/unr_test_161024_0535_9lih90.png" />
//         </ListItemAvatar>
//         <ListItemText
//           primary="Summer BBQ"
//           secondary={
//             <React.Fragment>
//               <Typography
//                 component="span"
//                 variant="body2"
//                 className={classes.inline}
//                 color="textPrimary"
//               >
//                 to Scott, Alex, Jennifer
//               </Typography>
//               {" — Wish I could come, but I'm out of town this…"}
//             </React.Fragment>
//           }
//         />
//       </ListItem>
//       <Divider variant="inset" component="li" />
//       <ListItem alignItems="flex-start">
//         <ListItemAvatar>
//           <Avatar alt="Cindy Baker" src="https://pickaface.net/gallery/avatar/unr_test_161024_0535_9lih90.png" />
//         </ListItemAvatar>
//         <ListItemText
//           primary="Oui Oui"
//           secondary={
//             <React.Fragment>
//               <Typography
//                 component="span"
//                 variant="body2"
//                 className={classes.inline}
//                 color="textPrimary"
//               >
//                 Sandra Adams
//               </Typography>
//               {' — Do you have Paris recommendations? Have you ever…'}
//             </React.Fragment>
//           }
//         />
//       </ListItem>
//     </List>
//     </ResponsiveDrawer>
//   );
// }
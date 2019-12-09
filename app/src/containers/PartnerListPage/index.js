import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import ResponsiveDrawer from '../MenuDrawer';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function PartnerListPage() {
  const classNamees = useStyles();

  return (
    <ResponsiveDrawer title = 'Conversations'>

    <Typography variant="h6" gutterBottom>
                Requests
    </Typography>   

    <List classNameName={classNamees.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="https://pickaface.net/gallery/avatar/unr_test_161024_0535_9lih90.png" />
        </ListItemAvatar>
        <ListItemText
          primary="Remy Sharp"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                classNameName={classNamees.inline}
                color="textPrimary"
              >
                Teach: English. Learn: Finnish
              </Typography>
              {" — Helsinki, Tampere"}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>


    <Typography variant="h6" gutterBottom>
                Partners
    </Typography>    
    <List classNameName={classNamees.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="https://pickaface.net/gallery/avatar/unr_test_161024_0535_9lih90.png" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                classNameName={classNamees.inline}
                color="textPrimary"
              >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="https://pickaface.net/gallery/avatar/unr_test_161024_0535_9lih90.png" />
        </ListItemAvatar>
        <ListItemText
          primary="Summer BBQ"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                classNameName={classNamees.inline}
                color="textPrimary"
              >
                to Scott, Alex, Jennifer
              </Typography>
              {" — Wish I could come, but I'm out of town this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="https://pickaface.net/gallery/avatar/unr_test_161024_0535_9lih90.png" />
        </ListItemAvatar>
        <ListItemText
          primary="Oui Oui"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                classNameName={classNamees.inline}
                color="textPrimary"
              >
                Sandra Adams
              </Typography>
              {' — Do you have Paris recommendations? Have you ever…'}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
    </ResponsiveDrawer>
  );
}
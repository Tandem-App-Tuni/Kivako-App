import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ForumIcon from '@material-ui/icons/Forum';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import TimerIcon from '@material-ui/icons/Timer';
import PersonIcon from '@material-ui/icons/Person';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Badge from '@material-ui/core/Badge';

import { Link } from 'react-router-dom';
import ConstantsList from '../../config_constants';

export const mainListItems = chatNotification => (
  <div>
    <ListItem button component={Link} 
      to={"/view-profile"}>
      <ListItemIcon>
        <PersonIcon/>
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItem>

    <ListItem button component={Link} 
      to={"/chat-page"}>
      <ListItemIcon>
        {chatNotification ? <Badge color='secondary' variant='dot'><ForumIcon/></Badge> : <ForumIcon/>}
      </ListItemIcon>
      <ListItemText primary="Chat" />
    </ListItem>

  </div>
);

export const secondaryListItems = requestAmount => (
  <div>
    <ListItem button component={Link} 
      to={"/browse-match"}>
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="Find a partner" />
    </ListItem>

    <ListItem button component={Link} 
          to={"/partner-list"}>
      <ListItemIcon>
        <PersonPinIcon/>
      </ListItemIcon>
      <ListItemText primary="Partners" />
    </ListItem>

    <ListItem button component={Link}
          to={"/requests"}>
      <ListItemIcon>
      <Badge badgeContent={requestAmount} color="secondary">
        <TimerIcon />
      </Badge>
      </ListItemIcon>
      <ListItemText primary="Requests" />
    </ListItem>

  </div>
);

export const thirdListItems = (
    <div>
      <ListSubheader inset></ListSubheader>

      <ListItem button component="a" href="http://rebrand.ly/DigiCampus">
        <ListItemIcon>
          <CollectionsBookmarkIcon/>
        </ListItemIcon>
        <ListItemText primary="DigiCampus" />
      </ListItem>

      <ListItem button  component="a" href={ConstantsList.APPLICATION_URL + '/logout'}>
        <ListItemIcon>
            <ExitToAppIcon/>
        </ListItemIcon>
          <ListItemText primary="Log out"/>
      </ListItem>
    </div>
  );

export const adminListItems = (
  <div>
    <ListItem button component={Link} 
      to={'/list-admins'}>
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="List of administrators" />
    </ListItem>

    <ListItem button component={Link} 
      to={'/list-students'}>
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="List of students" />
    </ListItem>
    
    <ListItem button component={Link} 
      to={'/list-matches'}>
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="List of matches" />
    </ListItem>

    <ListItem button component={Link} 
      to={'/statistics'}>
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="Statistics" />
    </ListItem>

    <ListItem button component={Link} 
      to={'/news-dashboard'}>
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="News dasboard" />
    </ListItem>
  </div>
);

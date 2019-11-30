import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

import ForumIcon from '@material-ui/icons/Forum';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import TuneIcon from '@material-ui/icons/Tune';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import TimerIcon from '@material-ui/icons/Timer';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PersonIcon from '@material-ui/icons/Person';
import PersonPinIcon from '@material-ui/icons/PersonPin';

import { Link } from "react-router-dom";


export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>

    <ListItem button component="a" href="https://moodle.tuni.fi/">
      <ListItemIcon>
        <CollectionsBookmarkIcon/>
      </ListItemIcon>
      <ListItemText primary="DigiCampus" />
    </ListItem>

    <ListItem button component={Link} 
          to={"/partner-list"}>
      <ListItemIcon>
        <PersonPinIcon/>
      </ListItemIcon>
      <ListItemText primary="Learning partners" />
    </ListItem>

    <ListItem button component={Link} 
      to={"/edit-profile"}>
      <ListItemIcon>
        <PersonIcon/>
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItem>

    <ListItem button component={Link} 
      to={"/chat-page"}>
      <ListItemIcon>
        <ForumIcon/>
      </ListItemIcon>
      <ListItemText primary="Chat" />
    </ListItem>

  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Matches</ListSubheader>
    <ListItem button component={Link} 
      to={"/browse-match"}>
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="Find a Partner!" />
    </ListItem>

    <ListItem button component={Link} to={"/match-requests"}>
      <ListItemIcon>
        <TimerIcon />
      </ListItemIcon>
      <ListItemText primary="Pending Requests" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <DateRangeIcon />
      </ListItemIcon>
      <ListItemText primary="Old Matches" />
    </ListItem>
  </div>
);

export const thirdListItems = (
    <div>
      <ListSubheader inset></ListSubheader>
      <ListItem button  component="a" href="http://localhost:3000/logout">
        <ListItemIcon>
            <ExitToAppIcon/>
        </ListItemIcon>
        <ListItemText primary="Log out!" />
      </ListItem>
  
    </div>
  );
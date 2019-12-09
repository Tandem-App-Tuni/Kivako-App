import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupIcon from '@material-ui/icons/Group';

import { Link } from "react-router-dom";


export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>

    <ListItem button component={Link} 
          to={"/statitics"}>
      <ListItemIcon>
        <BarChartIcon/>
      </ListItemIcon>
      <ListItemText primary="Statistics" />
    </ListItem>

    <ListItem button >
      <ListItemIcon>
        <ReportProblemIcon/>
      </ListItemIcon>
      <ListItemText primary="Support" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <SettingsIcon/>
      </ListItemIcon>
      <ListItemText primary="Settings"/>
    </ListItem>

  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Users Management</ListSubheader>
    <ListItem button component={Link} 
      to={"/list-students"}>
      <ListItemIcon>
        <GroupIcon />
      </ListItemIcon>
      <ListItemText primary="Students" />
    </ListItem>

    <ListItem button component={Link} to={"/list-admins"}>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Admins"/>
    </ListItem>

    <ListItem button component={Link} to={"/register-admin"}>
      <ListItemIcon>
        <PersonAddIcon />
      </ListItemIcon>
      <ListItemText primary="Add Admin" />
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
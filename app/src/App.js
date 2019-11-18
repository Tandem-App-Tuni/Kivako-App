import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {Colors} from './components/constant/index'

import './App.css';
import LoginPage from './containers/LoginPage'
import EditProfilePage from './containers/EditProfilePage'
import PreferencePage from './containers/PreferencePage'
import PartnerListPage from './containers/PartnerListPage'
import BrowseMatch from './containers/BrowseMatch'
import RegisterPage from './containers/RegisterPage'

const theme = createMuiTheme({
  palette: {
    primary: {
        main: Colors.mainColor
      }
    }
  },
)

function App() {
  return (
    <MuiThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route exact path="/">
            <LoginPage />
        </Route>
        <Route exact path="/edit-profile">
            <EditProfilePage />
        </Route>
        <Route exact path="/partner-list">
            <PartnerListPage />
        </Route>
        <Route exact path="/browse-match">
            <BrowseMatch />
        </Route>
        <Route exact path="/register">
            <RegisterPage />
        </Route>
      </Switch>
    </Router>
    </MuiThemeProvider>
  );
}

export default App;

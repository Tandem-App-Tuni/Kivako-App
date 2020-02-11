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
import PartnerListPage from './containers/PartnerListPage'
import BrowseMatch from './containers/BrowseMatch'
import ChatPage from './containers/ChatPage'
import RegisterPage from './containers/RegisterPage'
import MatchRequests from './containers/MatchRequests'
import LocalLoginPage from './containers/LocalLoginPage'
import ActivationPage from './containers/ActivationPage'
import Checker from './containers/Checker'
import CheckerAdmin from './containers/CheckerAdmin'

import ListOfAdmins from './containers/ListOfAdmins'
import ListOfStudents from './containers/ListOfStudents'
import Statitics from './containers/Statitics'

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
          <Checker>
            <EditProfilePage />
          </Checker>
        </Route>
      
        <Route exact path="/partner-list">
          <Checker>
            <PartnerListPage />
          </Checker>
        </Route>
      
        <Route exact path="/browse-match">
          <Checker>
            <BrowseMatch />
          </Checker>
        </Route>
      
        <Route exact path="/chat-page">
          <Checker>
            <ChatPage/>
          </Checker>
        </Route>
      
        <Route exact path="/register">
            <RegisterPage />
        </Route>

        <Route exact path="/match-requests">
          <Checker>
            <MatchRequests/>
          </Checker>
        </Route>
      
        <Route exact path="/local-login">
            <LocalLoginPage />
        </Route>

        <Route exact path="/activate-account">
          <ActivationPage/>
        </Route>

        <Route exact path="/list-admins">
          <CheckerAdmin>
            <ListOfAdmins />
          </CheckerAdmin>
        </Route>
      
        <Route exact path="/list-students">
          <CheckerAdmin>
            <ListOfStudents />
          </CheckerAdmin>
        </Route>

        <Route exact path="/statistics">
          <CheckerAdmin>
            <Statitics />
          </CheckerAdmin>
        </Route>

      </Switch>
    </Router>
    </MuiThemeProvider>
  );
}

export default App;

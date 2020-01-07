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
import RegisterAdminPage from './containers/RegisterAdmin'
//import RegisterPage from './containers/RegisterPage'
import ListOfAdmins from './containers/ListOfAdmins'
import ListOfStudents from './containers/ListOfStudents'
import Statitics from './containers/Statitics'
import LocalLoginPage from './containers/LocalLoginPage'


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
        <Route exact path="/register-admin">
            <RegisterAdminPage />
        </Route>
        <Route exact path="/list-admins">
            <ListOfAdmins />
        </Route>

        <Route exact path="/list-students">
            <ListOfStudents />
        </Route>
        <Route exact path="/statitics">
            <Statitics />
        </Route>
        <Route exact path="/local-login">
            <LocalLoginPage />
        </Route>
        

      </Switch>
    </Router>
    </MuiThemeProvider>
  );
}

export default App;

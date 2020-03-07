import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

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
import ForgotPasswordPage from './containers/ForgotPasswordPage'

import ListOfAdmins from './containers/ListOfAdmins'
import ListOfStudents from './containers/ListOfStudents'
import Statitics from './containers/Statitics'

import openSocket from 'socket.io-client';
import ConstantsList from './config_constants';

import ResponsiveDrawer from './containers/MenuDrawer';

class App extends React.Component 
{
  constructor(props)
  {
    super(props);

    this.state = {theme: createMuiTheme({palette: {primary: {main: Colors.mainColor}}}), socket: undefined, chatNotification: false};
  }

  activeSocket = () =>
  {
    return this.state.socket !== undefined;
  }

  setSocket = () =>
  {
    this.setState({socket: openSocket(ConstantsList.APPLICATION_URL)});
  }

  getChatNotification = () =>
  {
    return this.state.chatNotification;
  }

  setChatNotification = (v) => 
  {
    this.setState({chatNotification: v});
  }

  render()
  {
    const chatBundle = {socket: this.state.socket, getChatNotification: this.getChatNotification, setChatNotification: this.setChatNotification};

    return (
      <MuiThemeProvider theme={this.state.theme}>
      <Router>
        <Switch>
          <Route exact path='/'>
              <LoginPage />
          </Route>
  
          <Route exact path='/edit-profile'>
            <Checker activeSocket={this.activeSocket} setSocket={this.setSocket}>
              <ResponsiveDrawer title = 'Profile' chatBundle={chatBundle}>
                <EditProfilePage />
              </ResponsiveDrawer>
            </Checker>
          </Route>
        
          <Route exact path='/partner-list'>
            <Checker activeSocket={this.activeSocket} setSocket={this.setSocket}>
              <ResponsiveDrawer title='Current Partners' chatBundle={chatBundle}>
                <PartnerListPage />
              </ResponsiveDrawer>
            </Checker>
          </Route>
        
          <Route exact path='/browse-match'>
            <Checker activeSocket={this.activeSocket} setSocket={this.setSocket}>
              <ResponsiveDrawer title='Find a new language partner' chatBundle={chatBundle}>
                <BrowseMatch />
              </ResponsiveDrawer>
            </Checker>
          </Route>
        
          <Route exact path='/chat-page'>
            <Checker activeSocket={this.activeSocket} setSocket={this.setSocket}>
              <ResponsiveDrawer title='Conversations' chatBundle={chatBundle}>
                <ChatPage socket={this.state.socket} setChatNotification={this.setChatNotification}/>
              </ResponsiveDrawer>
            </Checker>
          </Route>
        
          <Route exact path='/register'>
              <RegisterPage />
          </Route>
  
          <Route exact path='/match-requests'>
            <Checker activeSocket={this.activeSocket} setSocket={this.setSocket}>
              <ResponsiveDrawer title ='Matches requests!' chatBundle={chatBundle}>
                <MatchRequests/>
              </ResponsiveDrawer>
            </Checker>
          </Route>
        
          <Route exact path='/local-login'>
              <LocalLoginPage />
          </Route>
  
          <Route exact path='/activate-account'>
            <ActivationPage/>
          </Route>
  
          <Route exact path='/list-admins'>
            <CheckerAdmin>
              <ResponsiveDrawer title='List of admins' chatBundle={chatBundle}>
                <ListOfAdmins />
              </ResponsiveDrawer>
            </CheckerAdmin>
          </Route>
        
          <Route exact path='/list-students'>
            <CheckerAdmin>
              <ResponsiveDrawer title='List of students' chatBundle={chatBundle}>
                <ListOfStudents />
              </ResponsiveDrawer>
            </CheckerAdmin>
          </Route>
  
          <Route exact path='/statistics'>
            <CheckerAdmin>
              <ResponsiveDrawer title='Statistics' chatBundle={chatBundle}>
                <Statitics />
              </ResponsiveDrawer>
            </CheckerAdmin>
          </Route>
  
          <Route exact path='/forgot-pass'>
            <ForgotPasswordPage/>
          </Route>
        </Switch>
      </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;

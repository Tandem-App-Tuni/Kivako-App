import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {Colors} from './components/constant/index'

import './App.css';
import LoginPage from './containers/LoginPage'
import EditProfilePage from './containers/EditProfilePage'
import ViewProfile from './containers/ViewProfile'
import PartnerListPage from './containers/PartnerListPage'
import BrowseMatch from './containers/BrowseMatch'
import ChatPage from './containers/ChatPage'
import RegisterPage from './containers/RegisterPage'
import MatchRequests from './containers/MatchRequests'
import Requests from './containers/Requests'
import LocalLoginPage from './containers/LocalLoginPage'
import ActivationPage from './containers/ActivationPage'
import Checker from './containers/Checker'
import CheckerAdmin from './containers/CheckerAdmin'
import ForgotPasswordPage from './containers/ForgotPasswordPage'
import NewsDashboard from "./containers/NewsDashboard"

import ListOfAdmins from './containers/ListOfAdmins'
import ListOfStudents from './containers/ListOfStudents'
import Statitics from './containers/Statitics'
import ListOfMatches from './containers/ListOfMatches'

import openSocket from 'socket.io-client';
import ConstantsList from './config_constants';

import ResponsiveDrawer from './containers/MenuDrawer';
import AppContextProvider from "./components/context/context";

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
    if (this.state.socket === undefined) 
    {
      let socket = openSocket(ConstantsList.APPLICATION_URL);
      socket.on('broadcast', (e) => alert(e.message));
      this.setState({socket: socket});
    }
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
        <AppContextProvider>
          <Router>
            <Route exact path='/'>
                <LoginPage />
            </Route>
            
            <Route exact path='/register'>
                <RegisterPage />
            </Route>

            <Route exact path='/local-login'>
                <LocalLoginPage />
            </Route>

            <Route exact path='/activate-account'>
              <ActivationPage/>
            </Route>

            <Route exact path='/forgot-pass'>
              <ForgotPasswordPage/>
            </Route>

            <Route exact path='/edit-profile'>
              <Checker activeSocket={this.activeSocket} setSocket={this.setSocket}>
                <ResponsiveDrawer title = 'Edit Profile' chatBundle={chatBundle}>
                  <EditProfilePage />
                </ResponsiveDrawer>
              </Checker>
            </Route>

            <Route exact path='/view-profile'>
              <Checker activeSocket={this.activeSocket} setSocket={this.setSocket}>
                <ResponsiveDrawer title = 'Profile' chatBundle={chatBundle}>
                  <ViewProfile />
                </ResponsiveDrawer>
              </Checker>
            </Route>
          
            <Route exact path='/partner-list'>
              <Checker activeSocket={this.activeSocket} setSocket={this.setSocket}>
                <ResponsiveDrawer title='Partners' chatBundle={chatBundle}>
                  <PartnerListPage />
                </ResponsiveDrawer>
              </Checker>
            </Route>
          
            <Route exact path='/browse-match'>
              <Checker activeSocket={this.activeSocket} setSocket={this.setSocket}>
                <ResponsiveDrawer title='Find a partner' chatBundle={chatBundle}>
                  <BrowseMatch />
                </ResponsiveDrawer>
              </Checker>
            </Route>
          
            <Route exact path='/chat-page'>
              <Checker activeSocket={this.activeSocket} setSocket={this.setSocket}>
                <ResponsiveDrawer title='Chat' chatBundle={chatBundle}>
                  <ChatPage socket={this.state.socket} setChatNotification={this.setChatNotification}/>
                </ResponsiveDrawer>
              </Checker>
            </Route>

            <Route exact path='/match-requests'>
              <Checker activeSocket={this.activeSocket} setSocket={this.setSocket}>
                <ResponsiveDrawer title ='Requests' chatBundle={chatBundle}>
                  <MatchRequests/>
                </ResponsiveDrawer>
              </Checker>
            </Route>

            <Route exact path='/list-admins'>
              <CheckerAdmin activeSocket={this.activeSocket} setSocket={this.setSocket}>
                <ResponsiveDrawer title='List of admins' chatBundle={chatBundle}>
                  <ListOfAdmins />
                </ResponsiveDrawer>
              </CheckerAdmin>
            </Route>

            <Route exact path='/requests'>
              <Checker activeSocket={this.activeSocket} setSocket={this.setSocket}>
                <ResponsiveDrawer title ='Requests' chatBundle={chatBundle}>
                  <Requests/>
                </ResponsiveDrawer>
              </Checker>
            </Route>
          
            <Route exact path='/list-students'>
              <CheckerAdmin activeSocket={this.activeSocket} setSocket={this.setSocket}>
                <ResponsiveDrawer title='List of students' chatBundle={chatBundle}>
                  <ListOfStudents socket={this.state.socket}/>
                </ResponsiveDrawer>
              </CheckerAdmin>
            </Route>

            <Route exact path='/list-matches'>
              <CheckerAdmin activeSocket={this.activeSocket} setSocket={this.setSocket}>
                <ResponsiveDrawer title='List of matches' chatBundle={chatBundle}>
                  <ListOfMatches />
                </ResponsiveDrawer>
              </CheckerAdmin>
            </Route>

            <Route exact path='/statistics'>
              <CheckerAdmin activeSocket={this.activeSocket} setSocket={this.setSocket}>
                <ResponsiveDrawer title='Statistics' chatBundle={chatBundle}>
                  <Statitics />
                </ResponsiveDrawer>
              </CheckerAdmin>
            </Route>

            <Route exact path='/news-dashboard'>
              <CheckerAdmin activeSocket={this.activeSocket} setSocket={this.setSocket}>
                <ResponsiveDrawer title='News dashboard' chatBundle={chatBundle}>
                  <NewsDashboard />
                </ResponsiveDrawer>
              </CheckerAdmin>
            </Route>
          </Router>
        </AppContextProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;

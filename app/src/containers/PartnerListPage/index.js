import React from 'react';
import {Redirect} from 'react-router-dom';
import {Box, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Tooltip, CircularProgress, Zoom} from '@material-ui/core'
import Chat from '../ChatBox'
import openSocket from 'socket.io-client';
import ResponsiveDrawer from '../MenuDrawer';

/**
 * Author: Peter Mlakar
 * 
 * The PartnerListPage renders the current partners and request the user might have.
 * There are two arrays that need to be recieved from the
 * api called on the url /user/request&partner, the request array and the partners array.
 * There are is one parrameter that can be set: peekWordCount which controlls how many words of the last message of the conversation are shown in the preview.
 * The request array has the following structure:
 * 
 * requests = [{
 *   name: 'Remy Sharp',
 *   teach: 'English',
 *   learn: 'Finnish',
 *   city0: 'Helsinki',
 *   city1: 'Tampere'
 *  },...];
 * 
 * The name property holds the name of the user requesting the connection.
 * The teach, learn properties are self evident. The city0 is the city where the user lives, city1 is the
 * city in which the user studies.
 * 
 * The second array holds all the partners with which the user is conversing.
 * It has the following structure:
 * 
 * this.partners = [
 *  {
 *    name: 'Ali Connors',
 *    conversationName: 'Brunch this weekend?',
 *    conversationId: 0,
 *    messages: [...]
 *  },...];
 * 
 * The name property holds the name of the user with which we are conversing. The conversationName describes the
 * topic of conversation. ConversationId property is the index in the array of this.parent where this conversation is located.
 * By this nature it should be unique.
 * The messages array holds the messages of this conversation in the structue described in the Chat class.
 * 
 * The PartnerListPage state contains the following parameters:
 * currentOpenConversation -> contains the reference to the currently open conversation
 * peekWordCount -> explained above
 * chatWindow -> the exact chat window object rendered on the screen
 * socket -> the openSocket connecting to the conversatin thread of this user
 * loadedServerInformation -> a flag set to true when the conversation data has been recieved from the server
 */
class PartnerListPage extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      currentOpenConversation: undefined,
      peekWordCount: 5,
      user: undefined,
      chatWindow: undefined,
      socket: openSocket('http://localhost:3000'),
      loadedServerInformation: false
    }; 

    /**
     * Function listens for initialization events
     * and creates the list of partners based on the
     * data recieved from the server via the socket io
     * connection.
     */
    this.state.socket.on('initialization', (data) => 
    {
      var messages = data.messages;
      var roomInformation = data.rooms;

      var i;
      for (i = 0; i < roomInformation.length; i++)
      {
        var room = roomInformation[i];
        var partner = {name: room.name, 
                       roomId: room.roomId,
                       conversationName: 'Conversation with ' + room.name,
                       conversationId: i,
                       messages: messages[i]};

        this.partners.push(partner);               
      }

      this.setState({loadedServerInformation: true, user: data.user});
    });

    /**
     * Function listens to roomUpdate events when subscribing to
     * a specific room. 
     */
    this.state.socket.on('roomUpdate', (data) => 
    {
      this.partners.forEach((element) => 
      {
        if (element.roomId == data.roomId)
        {
          element.messages = data.room.messages;
        }
      });
      
      this.setState({peekWordCount: 5});
    });

    this.partners = [];
    this.requests = [];

    this.renderRequestArray = this.renderRequestArray.bind(this);
    this.renderPartnerArray = this.renderPartnerArray.bind(this);
    this.renderChatWindow = this.renderChatWindow.bind(this);
    this.getMessagePeek = this.getMessagePeek.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  /**
   * Handle socket disconnection events that are triggered uppon
   * component unmounting events (switching pages).
   */
  componentWillUnmount()
  {
    this.state.socket.disconnect();
  }

  /**
   * renderRequestArray renders the request array stored in this.requests, defined in the constructor.
   */
  renderRequestArray()
  {
    let requestArray = [];

    if (!this.state.loadedServerInformation) return <CircularProgress variant='indeterminate' color='primary'/>

    this.requests.forEach((element, index) => {
      requestArray.push(
        <Zoom 
          in={true}
          key={index}>
          <ListItem 
            alignItems="flex-start" 
            key={index}>
            <ListItemAvatar>
              <Avatar 
                alt={element.name} 
                key={index}
                src='https://www.stickees.com/files/avatars/male-avatars/1697-andrew-sticker.png'/>
            </ListItemAvatar>
            <ListItemText
              primary={element.name}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                    display='inline'>
                    Teach: {element.teach}. Learn: {element.learn}
                  </Typography>
                  -{element.city0},{element.city1}
                </React.Fragment>
              }/>
          </ListItem>
        </Zoom>
      );
    })

    return requestArray;
  }

  /**
   * renderPartnerArray renders the request array stored in this.partners, defined in the constructor.
   * These elements also contain a handleClick function, which if clicked, opens the chat window with the
   * specific conversation.
   */
  renderPartnerArray()
  {
    let parnerArray = [];

    if (!this.state.loadedServerInformation) return <CircularProgress variant='indeterminate' color='primary'/>

    this.partners.forEach((element, index) => {
      parnerArray.push(
        <Zoom 
          in={true}
          key={index}>
          <Box 
            onClick={() => this.handleClick(element.conversationId)}>
            <Tooltip 
              title='Click to open conversation...'
              placement='left'>
              <ListItem 
                alignItems="flex-start"
                key={index}>
                <ListItemAvatar>
                  <Avatar 
                    alt={element.name} 
                    src='https://www.stickees.com/files/avatars/male-avatars/1697-andrew-sticker.png'/>
                </ListItemAvatar>
                <ListItemText
                  primary={element.conversationName}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        display='inline'
                        color="textPrimary">
                        {element.name}
                      </Typography>
                      {"  " + this.getMessagePeek(element.messages)}
                    </React.Fragment>
                  }
              />
            </ListItem>
          </Tooltip>
          </Box>
        </Zoom>
      );
    });

    return parnerArray;
  }

  /**
   * getMessagePeek constructs the preview of the conversation that has the length peekWordCount of words of the
   * last message of the conversation.
   * 
   * @param {*} messages Messages of the specific conversation for which the peek should be retrieved.
   */
  getMessagePeek(messages)
  {
    var msg = messages[messages.length - 1];

    var peekSplit = msg.text.split(" ");
    var peek = "";

    peekSplit.forEach((element, index) => 
    {
      if (index > this.state.peekWordCount) return;
      peek+= " " + element;
    });

    return peek + "...";
  }

  /**
   * 
   * handleClick funtion handles the click event on the components 
   * generated by the renderPartnerArray function. The currently selected
   * conversation is stored in the this.state.currentOpenConversation reference.
   * If no conversation is open, the reference is undefined. Clicking the same
   * conversation twice closes the conversation.
   * 
   * @param {*} id id of the clicked conversation.
   */
  handleClick(id)
  {
    var currentId;

    if (typeof this.state.currentOpenConversation == 'undefined') currentId = -1;
    else currentId = this.state.currentOpenConversation.conversationId;

    if (id != currentId) this.setState({currentOpenConversation: this.partners[id]})
    else this.setState({currentOpenConversation: undefined})

    if (id != currentId) 
    {
      this.state.socket.emit('subscribe', 
          {to: this.partners[id].roomId, 
           from: currentId != -1 ? this.partners[currentId].roomId : 'null'});
    }
    else 
    {
      this.state.socket.emit('subscribe', 
          {to: 'null', 
           from: currentId != -1 ? this.partners[currentId].roomId : 'null'});
    }
  }

  /**
   * The authentication check to the backend server checking if the
   * user is logged in. Currently always returns true. TODO
   */
  isAuthenticated()
  {
    return true;
  }

  /**
   * Renders the apropriate chat window
   * if one is open.
   */
  renderChatWindow()
  {
    if (typeof this.state.currentOpenConversation == 'undefined') return(<div></div>);
    else return(<Chat user={this.state.user} roomId={this.state.currentOpenConversation.roomId} socket={this.state.socket} messages={this.state.currentOpenConversation.messages} conversationName={this.state.currentOpenConversation.conversationName}/>);
  }

  /**
   * The render function only renders this page
   * if the user is logged by checking the isAuthenticated function return value.
   * If the user is not logged in, he or she is redirected to the '/' page.
   * Else the conversation page is rendered.
   */
  render()
  {
    if (!this.isAuthenticated()) 
      return (
        <Redirect  to="/"/>
      )

    return(
      <ResponsiveDrawer title = 'Conversations'>
        <Box
          width='80%'>
          <Typography variant="h6" gutterBottom>
                      Requests
          </Typography>   

          <List 
            width='100%'
            color='paper'>
            {this.renderRequestArray()}
          </List>

          <Typography variant="h6" gutterBottom>
                  Partners
          </Typography> 
          <List 
            width='100%'
            color='paper'>
            {this.renderPartnerArray()}
          </List>
        </Box>
        {this.renderChatWindow()}
      </ResponsiveDrawer>
    )}
}

export default PartnerListPage;
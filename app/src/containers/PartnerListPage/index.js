import React from 'react';
import {Redirect} from 'react-router-dom';
import {Box, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, makeStyles} from '@material-ui/core'
import Chat from '../ChatPage'

import ResponsiveDrawer from '../MenuDrawer';

/**
 * The PartnerListPage renders the current partners and new request the user might have.
 * There are two arrays that need to be set, the request array and the partners array.
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
 */
class PartnerListPage extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      currentOpenConversation: undefined,
      peekWordCount: 5
    };

    this.requests = [{
      name: 'Remy Sharp',
      teach: 'English',
      learn: 'Finnish',
      city0: 'Helsinki',
      city1: 'Tampere'
    }];

    this.partners = [
    {
      name: 'Ali Connors',
      conversationName: 'Are you really good at English?',
      conversationId: 0,
      messages: [
        {
          id: 1,
          timestamp: new Date(),
          text: 'Hey how are you?'
        },
        {
          id: 0,
          timestamp: new Date(),
          text: 'Good, you?'
        },
          {id: 1,
          timestamp: new Date(),
          text: 'I\'ll be in your neighborhood doing errands this weedkend. Can I stop by?'
        }
      ]
    },
    {
      name: 'Scott McScotland',
      conversationName: 'Summer school',
      conversationId: 1,
      messages: [
        {
          id: 0,
          timestamp: new Date(),
          text: 'Wish I could come, but I\'m out of town this weekend and I really don\'t care.'
        }
      ]
    },
    {
      name: 'Sandra Adams',
      conversationName: 'Studying',
      conversationId: 2,
      messages: [
        {
          id:1,
          timestamp: new Date(),
          text: 'I really would like to study with you but unfortunatelly I can\'t. Bye.'
        }
      ]
    }]

    this.renderRequestArray = this.renderRequestArray.bind(this);
    this.renderPartnerArray = this.renderPartnerArray.bind(this);
    this.rednerChatWindow = this.renderChatWindow.bind(this);
    this.getMessagePeek = this.getMessagePeek.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.isAuthenticated = this.isAuthenticated.bind(this);

    console.log(this.partners);
  }

  /**
   * renderRequestArray renders the request array stored in this.requests, defined in the constructor.
   */
  renderRequestArray()
  {
    let requestArray = [];

    this.requests.forEach((element, index) => {
      requestArray.push(
        <ListItem alignItems="flex-start" key={index}>
          <ListItemAvatar>
            <Avatar alt={element.name} src="https://pickaface.net/gallery/avatar/unr_test_161024_0535_9lih90.png" />
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

    this.partners.forEach((element, index) => {
      parnerArray.push(
        <Box 
          onClick={() => this.handleClick(element.conversationId)}
          key={index}>
          <ListItem 
            alignItems="flex-start">
            <ListItemAvatar>
              <Avatar 
                alt={element.name} 
                src="https://pickaface.net/gallery/avatar/unr_test_161024_0535_9lih90.png"/>
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
        </Box>
      );
    });

    return parnerArray;
  }

  /**
   * renderChatWindow renders the chat window if a chat window is open.
   */
  renderChatWindow()
  {
    if (typeof this.state.currentOpenConversation == 'undefined') return(<div></div>);

    var tmp = <Chat messages={this.state.currentOpenConversation.messages}/>;
    
    return(tmp)
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
  }

  /**
   * The authentication check to the backend server checking if the
   * user is logged in. Currently always returns true.
   */
  isAuthenticated()
  {
    return true;
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
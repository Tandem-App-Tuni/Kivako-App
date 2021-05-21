import React from 'react';
import { Box, Grid, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Tooltip, CircularProgress, Zoom } from '@material-ui/core'
import Chat from '../ChatBox'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

import ConstantsList from '../../config_constants';
import { getApiUrl } from '../../helpers/networkRequestHelpers';

/**
 * Author: Peter Mlakar
 *
 * The PartnerListPage renders the current partners and request the user might have.
 * There are two arrays that need to be recieved from the
 * api called on the url /user/request&partner, the request array and the partners array.
 * There are is one parrameter that can be set: peekWordCount which controlls how many words of the last message of the conversation are shown in the preview.
 *
 * The name property holds the name of the user requesting the connection.
 * The teach, learn properties are self evident. The city0 is the city where the user lives, city1 is the
 * city in which the user studies.
 *
 * The second array holds all the partners with which the user is conversing.
 *
 * The name property holds the name of the user with which we are conversing. The conversationName describes the
 * topic of conversation. ConversationId property is the index in the array of this.parent where this conversation is located.
 * By this nature it should be unique.
 * The messages array holds the messages of this conversation in the structue described in the Chat class.
 *
 * The ChatPage state contains the following parameters:
 * currentOpenConversation -> contains the reference to the currently open conversation
 * peekWordCount -> explained above
 * chatWindow -> the exact chat window object rendered on the screen
 * socket -> the openSocket connecting to the conversatin thread of this user
 * loadedServerInformation -> a flag set to true when the conversation data has been recieved from the server
 */

class ChatPage extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      currentOpenConversation: undefined,
      peekWordCount: 5,
      chatRooms: 0,
      user: undefined,
      chatWindow: undefined,
      socket: props.socket,
      loadedServerInformation: false,
      setChatNotification: props.setChatNotification
    };

    this.partners = [];
  }

  componentDidMount() {
    this._isMounted = true;
    /**
     * Function listens for initialization events
     * and creates the list of partners based on the
     * data recieved from the server via the socket io
     * connection.
     */

    this.state.setChatNotification(false);

    this.state.socket.on('chatData', (data) => {
      let roomInformation = data.roomInformation;

      this.partners.push({
        name: data.name,
        roomId: roomInformation.roomId,
        conversationName: data.name,
        conversationId: this.state.chatRooms,
        messages: roomInformation.messages,
        email: data.email
      });

      if (this._isMounted) this.setState({ loadedServerInformation: true, user: data.user, chatRooms: this.state.chatRooms + 1 });
    });

    /**
     * Function listens to roomUpdate events when subscribing to
     * a specific room.
     */
    this.state.socket.on('roomUpdate', (data) => {
      this.partners.forEach((element) => {
        if (element.roomId === data.roomId) {
          element.messages = data.room.messages;
        }
      });

      if (this._isMounted) this.setState({ peekWordCount: 5 });
    });

    this.state.socket.emit('chatInitialization', {});
  }

  componentWillUnmount() {
    this._isMounted = false;

    this.state.socket.emit('chatLeave', {});
  }

  capitalizeWords = (str) => {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
  }

  /**
   * renderPartnerArray renders the request array stored in this.partners, defined in the constructor.
   * These elements also contain a handleClick function, which if clicked, opens the chat window with the
   * specific conversation.
   */
  renderPartnerArray = () => {
    let parnerArray = [];

    if (!this.state.loadedServerInformation) return <CircularProgress variant='indeterminate' color='primary' />

    this.partners.forEach((element, index) => {
      parnerArray.push(
        <li>
          <Zoom
            in={true}
            key={index}>
            <Box onClick={() => this.handleClick(element.conversationId)}>
              <Tooltip
                title='Click to open conversation...'
                placement='left'>
                <ListItem
                  alignItems="flex-start"
                  key={index}
                  divider style={{ cursor: 'pointer' }}
                  component="div">
                  <ListItemAvatar>
                    <Avatar
                      alt={element.name}
                      src={getApiUrl({
                        version: 'v1',
                        endpoint: 'avatar/getAvatar/' + element.email,
                      })} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={this.capitalizeWords(element.conversationName)}
                    secondary={
                      <React.Fragment>
                        <p style={{ overflowWrap: "break-word" }}>{"  " + this.getMessagePeek(element.messages)}</p>
                      </React.Fragment>
                    }
                  />
                </ListItem>

              </Tooltip>
            </Box>

          </Zoom>
        </li>
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
  getMessagePeek = (messages) => {
    if (messages.length === 0) return '...';

    var msg = messages[messages.length - 1];

    var peekSplit = msg.text.split(" ");
    var peek = "";

    peekSplit.forEach((element, index) => {
      if (index > this.state.peekWordCount) return;
      peek += " " + element;
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
  handleClick = (id) => {
    var currentId;

    if (typeof this.state.currentOpenConversation == 'undefined') currentId = -1;
    else currentId = this.state.currentOpenConversation.conversationId;

    if (id !== currentId) this.setState({ currentOpenConversation: this.partners[id] })
    else this.setState({ currentOpenConversation: undefined })

    if (id !== currentId) {
      this.state.socket.emit('subscribe',
        {
          to: this.partners[id].roomId,
          from: currentId !== -1 ? this.partners[currentId].roomId : 'null'
        });
    }
    else {
      this.state.socket.emit('subscribe',
        {
          to: 'null',
          from: currentId !== -1 ? this.partners[currentId].roomId : 'null'
        });
    }
  }

  /**
   * Renders the apropriate chat window
   * if one is open.
   */
  renderChatWindow = () => {
    if (typeof this.state.currentOpenConversation == 'undefined') return (<div className="left_bg"><p>Please click on the partner name to view the conversation.</p></div>);
    else return (<Chat partner={this.state.currentOpenConversation.email} user={this.state.user}
      roomId={this.state.currentOpenConversation.roomId} socket={this.state.socket} messages={this.state.currentOpenConversation.messages}
      conversationName={this.state.currentOpenConversation.conversationName}
    />);
  }

  /**
   * The render function only renders this page
   * if the user is logged by checking the isAuthenticated function return value.
   * If the user is not logged in, he or she is redirected to the '/' page.
   * Else the conversation page is rendered.
   */
  render() {
    const classes = makeStyles(theme => ({
      root: {
        width: '100%',
      },
      heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
      },
    }));

    return (
      <div style={{ height: "88vh" }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Partners
        </Typography>
        <div>
          <ExpansionPanel defaultExpanded={true}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <Typography className={classes.heading}>Current active chats</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid
                spacing={1}
                container
                direction='row'
                justify='space-around'
                alignItems={this.state.side} style={{ height: '72vh' }}>
                <Grid item xs={12} sm={3}>
                  <Box borderRadius={10}>

                    <List
                      width='100%'
                      color='paper'>
                      {this.renderPartnerArray()}
                    </List>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={8} >
                  {this.renderChatWindow()}
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </div>
    )
  }
}

export default ChatPage;
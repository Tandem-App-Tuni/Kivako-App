import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MessageIcon from '@material-ui/icons/Message';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { mainListItems, secondaryListItems, thirdListItems, adminListItems } from './listItems';
import { Link } from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import logo from '../../tandemlogo.png'
import ConstantsList from '../../config_constants';

import {AppContext} from "../../components/context/context";

const drawerWidth = 240;

const useStyles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
});

class Dashboard extends React.Component
{
  _isMounted = false;

  static contextType = AppContext;

  constructor(props)
  {
    super(props);

    this.state = {open:true, isAdmin:false, requestAmount:0 , socket: props.chatBundle.socket, getChatN: props.chatBundle.getChatNotification, setChatN: props.chatBundle.setChatNotification,};
    this.resizeScreen = this.resizeScreen.bind(this); 

  }

  handleDrawerOpen = () => 
  {
    this.setState({open:true});
  }

  handleDrawerClose = () => 
  {
    this.setState({open:false});
  }

  logoClick = () => 
  {
    window.location.href="/";
  }

  resizeScreen() {
    if(window.innerWidth <= 850)
    {
      this.setState({open:false});
    }
    else {
      this.setState({open:true});
    }
  }
  async componentDidMount()
  {
    try 
    {
      window.addEventListener("resize", this.resizeScreen);
      this.resizeScreen();

      this._isMounted = true;

      this.state.socket.on('notification', () => this.state.setChatN(true));
      
      this.state.socket.emit('checkNotifications', {});

      const p0 = fetch(window.location.protocol + '//' + window.location.hostname + ConstantsList.PORT_IN_USE + '/api/v1/users/isAdmin', 
      {
          method: 'GET',
          credentials: 'include',
          cors: 'no-cors'
      });

      const p1 = fetch(window.location.protocol + '//' + window.location.hostname + ConstantsList.PORT_IN_USE + "/api/v1/usersMatch/receiptMatchsRequests", 
      {
        method: 'GET',
        credentials: 'include',
        cors:'no-cors'
      });

      const results = await Promise.all([p0, p1]);
      const responseResults = await Promise.all([results[0].json(), results[1].json()]);
      this.context.updateContext("requestAmount", responseResults[1].userReceiptMatches.length)
      this.setState({isAdmin: responseResults[0].isAdmin, requestAmount: responseResults[1].userReceiptMatches.length});
    }
    catch(e) 
    {
      console.log("Error when menu mounted:", e)
    }
  }

  render()
  {
    const { classes } = this.props;
    return(
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, this.state.open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={this.handleDrawerOpen}
            className={clsx(classes.menuButton, this.state.open && classes.menuButtonHidden)}>
            <MenuIcon/>
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {this.props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
        }}
        open={this.state.open}> 
          <div className={classes.toolbarIcon}>     
            <img alt="" src={logo}  onClick={this.logoClick} style={{ maxHeight: 100, maxWidth: '70%', align: 'center' }} />
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon/>
            </IconButton>
          </div>
          <Divider/>
          <List>{mainListItems(this.state.getChatN())}</List>
          <Divider />
          <List>{secondaryListItems(this.context.requestAmount)}</List>
          {this.state.isAdmin ? <div><Divider /><List>{adminListItems}</List></div> : <div/>}
          <Divider />
          <List>{thirdListItems}</List>
      </Drawer>
      <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
          {this.props.children}
      </Container>
      </main>
    </div>
    );
  }
}

export default withStyles(useStyles)(Dashboard);
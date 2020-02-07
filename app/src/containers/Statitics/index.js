import React, {Component} from 'react';
import ResponsiveDrawer from '../MenuDrawer';

import {
  withStyles
} from '@material-ui/core/styles';

import {Redirect} from 'react-router-dom';
import MaterialTable from "material-table";

import Constants from '../../config_constants';

const useStyles = theme => ({
  '@global': {
    body: {
      backgroundColor: "theme.palette.common.white",
    },
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },

  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
  },
  tableRoot: {
    width: '100%',
  },
  tableWrapper: {
    maxHeight: 440,
    overflow: 'auto',
  },

});

class Statitics extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      profileImg: null,
      isAlreadyregistered : false,
      isAlreadyAuthenticated : false,
      isLoadingPage:true,
      userIsAdmin:false,
      openSnackBar:false,
      snackBarMessageError:""
    };
  }

  onImageChange = (event) => {
    if (event.target.files.length > 0) {
      const url = URL.createObjectURL(event.target.files[0]);
      this.setState({
        profileImg: event.target.files[0],
        profileImgURL: url
      });
    }
  }


  // Load page functions
  checkIfUserIsAdmin(callback)
  {  
    fetch(window.location.protocol + '//' + window.location.hostname + Constants.PORT_IN_USE + '/api/v1/users/isRegistered', 
    {
      method: 'GET',
      credentials: 'include',
      cors:'no-cors'
    })
    .then((response) => response.json())
    .then((responseJson) => 
    {
      //console.log(responseJson)
      if(responseJson.isRegistered && responseJson.isAdmin ){
        //User is already registered. Redirect to dashboard in render
        this.setState({ isAlreadyregistered: true });
        this.setState({ userIsAdmin: true });
      }else{
        // Continue render normaly to register user
        this.setState({ isAlreadyregistered: false });
        this.setState({ userIsAdmin: responseJson.isAdmin });
      }

      callback();
    })
    .catch((error) => {
      console.error(error);
    });
  }

  checkIfUserIsAuthenticaded (callback)
  {
    fetch(window.location.protocol + '//' + window.location.hostname + Constants.PORT_IN_USE + '/isAuthenticated', 
    {
      method: 'GET',
      credentials: 'include',
      cors:'no-cors'
    })
    .then((response) => response.json())
    .then((responseData) => {
      
      if(responseData.isAuthenticated === true) this.setState({isAlreadyAuthenticated: true});

      callback();
    })
    .catch((error) => {
      console.error(error);
    });
  }


  componentDidMount() 
  {  
    this.checkIfUserIsAuthenticaded(() => 
    {
      this.checkIfUserIsAdmin(() => 
      {
        this.setState({isLoadingPage:false});
      });
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleCloseSnackBar() {
    this.openSnackBar = false;
  }

  render() 
  {
    //Wait until all informations be render until continue
    if(this.state.isLoadingPage) {
      return null;
    }

    // In case user is not authenticated, redirect to initial page
    if(!this.state.isAlreadyAuthenticated){  
      return  <Redirect  to="/local-login" />
    }

    // In case user is NOT an registered admin, just redirect to initial system page.
    if(!this.state.userIsAdmin){  
      return  <Redirect  to="/local-login" />
    }
    
    return  (
      <div>
        <ResponsiveDrawer title = 'Statistics'>
        <StatiticsTable></StatiticsTable>
 
          
        </ResponsiveDrawer>
      </div> 
    );
  }

}


class StatiticsTable extends Component 
{
  columns = [
    { field: 'language', title: 'Language',  align: 'center'},
    { field: 'numberWantToLearn', title: 'Want to learn', align: 'center' },
    { field: 'numberWantToTeach', title: 'Want to teach' },
    {
      field: 'activeMatches',
      title: 'Number of Active Matches'
    }
  ]
  
  constructor(props) {
    super(props);
    this.state = {
      isLoadingTable:true,
      page: 0,
      setPage: 0,
      rowsPerPage: 30,
      setRowsPerPage : 10,
      rows: [ 
        
      ],
     
    };
  }

  componentDidMount() 
  {
    fetch(window.location.protocol + '//' + window.location.hostname + Constants.PORT_IN_USE + '/api/v1/admin/statitics', 
    {
      method: 'GET',
      credentials: 'include',
      cors:'no-cors'
    })
    .then((response) => response.json())
    .then((responseJson) => 
    {
      this.setState({rows:responseJson.data, isLoadingTable:false});
    })
    .catch((error) => 
    {
      console.error(error);
    });
  }

  render()
  {
    if(this.isLoadingTable) return null;
  
    return (
      <MaterialTable
        title="Language Data"
        columns={this.columns}
        data={this.state.rows}
        options={{
          sorting: true,
          exportButton: true,
          exportAllData: true,
          exportFileName: "languages",
          pageSize:20,
          pageSizeOptions:[5, 10, 20, 30, 40, 50, 100, 200],
          emptyRowsWhenPaging:false
        }}
      />
    );
  }

}

export default withStyles(useStyles)(Statitics);
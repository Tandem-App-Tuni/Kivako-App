import React, {Component} from 'react';
import ResponsiveDrawer from '../MenuDrawer';


import {
  withStyles
} from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import {Redirect} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';

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

class ListOfAdmins extends Component {
  _isMounted = false;

  constructor(props) 
  {
    super(props);
    this.state = {
      profileImg: null,
      languagesToTeach: [],
      languagesToLearn: [],
      firstName: '',
      lastName: '',
      email: '',
      cities: [],
      descriptionText: '',
      showInputTeachLanguage: false,
      showInputLearnLanguage: false,
      editingTeachLanguageIndex: 0,
      editingLearnLanguageIndex: 0,
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
    .then((responseJson) => {
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
    .then((responseData) => 
    {
      if(responseData.isAuthenticated === true) this.setState({isAlreadyAuthenticated: true});

      callback();
    })
    .catch((error) => {
      console.error(error);
    });
  }


  componentDidMount() 
  {
    this._isMounted = true;

    if(this._isMounted)
    {   
      this.checkIfUserIsAuthenticaded(() => 
      {
        this.checkIfUserIsAdmin( () => 
        {
          this.setState({isLoadingPage:false});

        });
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleCloseSnackBar() {
    this.openSnackBar = false;
  }


  render() 
  {    
    if(this.state.isLoadingPage) return null;

    if(!this.state.isAlreadyAuthenticated) return  <Redirect  to="/local-login" />

    if(!this.state.userIsAdmin) return  <Redirect  to="/local-login" />
    
    return  (
      <div>
        <ResponsiveDrawer 
        title = 'List of admins'>
          <AdminTable></AdminTable>
        </ResponsiveDrawer>
      </div> 
    );
  }

}


class AdminTable extends Component 
{
  _isTableMounted=false;
  columns = [
    { id: 'firstName', label: 'First Name', minWidth: 100 },
    { id: 'lastName', label: 'Last  Name', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 200 },
    {
      id: 'lastUserAccess',
      label: 'Last Access',
      minWidth: 170,
      align: 'center',
      format: value => value.toLocaleString('fi-FI', { timeZone: 'UTC' })
    },
    {
      id: 'userIsActivie',
      label: 'Active',
      minWidth: 170,
      align: 'center',
      format: value => value.toString()
    },
  ]

  
  constructor(props) {
    super(props);
    this.state = {
      isLoadingTable:true,
      page: 0,
      setPage: 0,
      rowsPerPage: 10,
      setRowsPerPage : 10,
      rows: [ 
        
      ],
     
    };
  }

  handleChangePag = event =>  {
    this.setState({page:this.page+1});
  };

  handleChangeRowsPerPage = event => {

    this.setState({rowsPerPage:+event.target.value});
    this.setState({page:0});
  };

  loadDataInTable(callback)
  {
    fetch(window.location.protocol + '//' + window.location.hostname + Constants.PORT_IN_USE + '/api/v1/admin/adminUsers', 
    {
      method: 'GET',
      credentials: 'include',
      cors:'no-cors'
    })
    .then((response) => response.json())
    .then((responseJson) => 
    {
      this.setState({ rows: responseJson.data });
      callback();

    })
    .catch((error) => {
      console.error(error);
    });
  

    callback();
  }

  componentDidMount() {
    this._isTableMounted = true;

    if(this._isTableMounted){
      this.loadDataInTable( () => {
        this.setState({isLoadingTable:false});
      });
      
    }

  }

  render(){
    const classes  = useStyles();

    if(this.isLoadingTable){
      return null;
    }

    return (
      <Paper className={classes.tableRoot}>
        <div>
          <Table stickyHeader aria-label="sticky table" className={classes.tableWrapper}>
            <TableHead>
              <TableRow>
                {this.columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.rows.slice(this.state.page * this.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(row => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {this.columns.map(column => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={this.state.rows.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }

}

export default withStyles(useStyles)(ListOfAdmins);
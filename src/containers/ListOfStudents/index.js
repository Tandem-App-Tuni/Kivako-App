import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DeleteForever from '@material-ui/icons/DeleteForever';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import { AlertPopup, ConfirmDialog } from '../../components/AlertView';
import Constants from '../../config_constants';
import { getApiData } from '../../helpers/networkRequestHelpers';

var userActivity;

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

class ListOfStudents extends Component {
  _isTableMounted = false;
  columns = [
    { id: 'firstName', label: 'First Name', minWidth: 100 },
    { id: 'lastName', label: 'Last  Name', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 200 },
    {
      id: 'lastUserAccess',
      label: 'Last Access',
      minWidth: 170,
      align: 'center',
      format: value =>  {
        if(value) {
          let time = new Date(value);
          return +time.getDate()+ '.' +(time.getMonth()+1)+'.' +time.getFullYear()+' '+time.getHours()+'.'+time.getMinutes();
        }
      }
    },

    {
      id: 'isActive',
      label: 'Active',
      minWidth: 170,
      align: 'center',
      format: value => {
        value ? userActivity = true : userActivity = false;
      }
    },

    {
      id: 'languagesToTeach',
      label: 'Teach',
      minWidth: 170,
      align: 'center',
      format: value => {
        let langs = "";
        value.forEach(item => {
          if(item) {
            langs = langs + item.language + ", ";
          }
        })
        return langs.slice(0, -2);
      }
    },

    {
      id: 'languagesToLearn',
      label: 'Learn',
      minWidth: 170,
      align: 'center',
      format: value => {
        let langs = "";
        value.forEach(item => {
          if(item) {
            langs = langs + item.language + ", ";
          }
        })
        return langs.slice(0, -2);
      }
    },

    {
      id: 'removeUserButton',
      label: 'Remove user',
      minWidth: 170,
      align: 'center'
    }
  ]


  constructor(props) {
    super(props);
    this.state = {
      isLoadingTable: true,
      page: 0,
      rowsPerPage: 10,
      rows: [],
      data: [],
      searchValue: "",
      message: '',
      socket: props.socket,
      showConfirm: false,
      deleteData:{},
      showAlert: false,
      alertType: "success",
      alertText: ""
    };

    this.toggleAlert = this.toggleAlert.bind(this);
  }

  handleChangePage = (event, page) => {
    this.setState({ page: page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value, page: 0 });
  };

  handleChangeMessage = (e) => {
    this.setState({ message: e.target.value });
  };

  componentDidMount() {
    this.fetchUserList();
  }

  fetchUserList = () => {
    getApiData({
      version: 'v1',
      endpoint: 'admin/studentUsers',
    }, {
        method: 'GET',
        credentials: 'include',
        cors: 'no-cors'
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({data: responseJson.data, rows: responseJson.data, isLoadingTable: false });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onSendMessage = () => {
    this.state.socket.emit('adminGlobal', { message: this.state.message });
  }

  toggleAlert(open, type, text) {
    //type is 'error', 'info', 'success', 'warning'
    if (open === true) {
      this.setState({
        showAlert: open,
        alertType: type,
        alertText: text
      })
    }
    else {
      this.setState({
        showAlert: open
      })
    }
  }

  onDeleteUser = () => {
      getApiData({
        version: 'v1',
        endpoint: 'users/deleteAdmin/' + this.state.deleteData.email,
      }, {
          method: 'GET',
          credentials: 'include',
          cors: 'no-cors'
      }).then((response) => {
          if (response.status === 200)
            this.fetchUserList();
          else
            this.toggleAlert(true, "error", "Something went wrong");
      }).catch((error) => {
          console.error(error);
      });
    this.setState({showConfirm: false, deleteData: {}})
  }
  handleSearchChange = (event) => {
    this.setState({searchValue: event.target.value})
    let searchValue = event.target.value.toLowerCase();
    if (event.target.value.length >= 2){
      let searchResult = this.state.data.filter(item => {
        return item.lastName.toLowerCase().includes( searchValue)
        ||item.firstName.toLowerCase().includes( searchValue)
        ||item.email.toLowerCase().includes( searchValue)
        ||this.languagesIntoString(item, 1).includes( searchValue)
        ||this.languagesIntoString(item, 2).includes( searchValue);
      })
      this.setState({rows:searchResult})
    }
    if (searchValue.length == 0){
      this.setState({rows:this.state.data})
    }
  }

  languagesIntoString = (item, role) => {
    let languagestr = "";
    if (role == 1){
      for (let index = 0; index < item.languagesToTeach.length; index++) {
        languagestr = languagestr + item.languagesToTeach[index].language.toLowerCase() + " ";
      }
    }
    else{
      for (let index = 0; index < item.languagesToLearn.length; index++) {
        languagestr = languagestr + item.languagesToLearn[index].language.toLowerCase() + " ";
      }
    }
    return languagestr.slice(0, -1);
  }

  render() {
    const { classes } = this.props;

    if (this.state.isLoadingTable) return null;

    return (
      <Paper className={classes.tableRoot}>

        <Grid
          container
          direction='row'
          justify='center'
          alignItems='center'>
          <Grid item xs={9}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='message'
              label='Message for students'
              name='message'
              autoComplete='message'
              onChange={(e) => { this.handleChangeMessage(e) }}
              autoFocus />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant='contained'
              margin='normal'
              color='primary'
              fullWidth
              className={classes.chip}
              onClick={this.onSendMessage}>
              Send
            </Button>
          </Grid>
        </Grid>
        <TextField
        variant='outlined'
        margin='normal'
        fullWidth
        id='search'
        label='Search for students by name, email or language'
        name='search'
        onChange = {this.handleSearchChange} value={this.state.searchValue}
        />
          <Table stickyHeader aria-label="sticky table" className={classes.tableWrapper}>
            <TableHead>
              <TableRow>
                {this.columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.rows.length ? this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {this.columns.map(column => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <div>
                            {column.format ? column.format(value) : value}

                            {column.id === 'isActive' ?
                              userActivity ?
                              <CheckIcon
                                fullWidth
                                variant='contained'
                                color = 'primary'
                                style={{ fill: "green" }}
                                className={classes.chip}>
                              </CheckIcon> : 
                              <CloseIcon
                                fullWidth
                                variant='contained'
                                color = 'primary'
                                style={{ fill: "red" }}
                                className={classes.chip}>
                              </CloseIcon> : <div/>}

                            {column.id === 'removeUserButton' ?
                              <DeleteForever
                                fullWidth
                                variant='contained'
                                color='primary'
                                className={classes.chip}
                                onClick={() => {this.setState({showConfirm: true, deleteData: row})}}>
                              </DeleteForever> : <div/>}
                          </div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              }): null}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={this.state.rows.length}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}/>
        <AlertPopup
          open={this.state.showAlert}
          variant={this.state.alertType}
          message={this.state.alertText}
          onClose={()=>{this.setState({showAlert: false})}}/>
        <ConfirmDialog
          open={this.state.showConfirm}
          onClose={()=>{this.setState({showConfirm: false, deleteData: {}})}}
          title="Are you sure you want to delete the user?"
          onConfirm={this.onDeleteUser}/>
      </Paper>
    );
  }

}

export default withStyles(useStyles)(ListOfStudents);
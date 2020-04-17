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

import { AlertPopup, ConfirmDialog } from '../../components/AlertView';
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
      format: value => value.toLocaleString('fi-FI', { timeZone: 'UTC' })
    },
    {
      id: 'userIsActivie',
      label: 'Active',
      minWidth: 170,
      align: 'center',
      format: value => value.toString()
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
    fetch(window.location.protocol + '//' + window.location.hostname + Constants.PORT_IN_USE + '/api/v1/admin/studentUsers',
      {
        method: 'GET',
        credentials: 'include',
        cors: 'no-cors'
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ rows: responseJson.data, isLoadingTable: false });
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
      fetch(window.location.protocol + '//' + window.location.hostname + Constants.PORT_IN_USE + '/api/v1/users/deleteAdmin/' + this.state.deleteData.email,
        {
          method: 'GET',
          credentials: 'include',
          cors: 'no-cors'
        })
        .then((response) => {
          if (response.status === 200) 
            this.fetchUserList();
          else
            this.toggleAlert(true, "error", "Something went wrong");
        })
        .catch((error) => {
          console.error(error);
        });
    this.setState({showConfirm: false, deleteData: {}})
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
            {this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {this.columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        <div>
                          {column.format && typeof value === ('number' || 'bool') ? column.format(value) : value}
                          {column.id === 'removeUserButton' ?
                            <Button
                              fullWidth
                              variant='contained'
                              color='primary'
                              className={classes.chip}
                              onClick={() => {this.setState({showConfirm: true, deleteData: row})}}>
                              Remove
                              </Button> : <div />}
                        </div>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={this.state.rows.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage} />
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
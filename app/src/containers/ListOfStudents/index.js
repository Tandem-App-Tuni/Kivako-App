import React, {Component} from 'react';
import {
  withStyles
} from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
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

class ListOfStudents extends Component 
{
  constructor(props) {
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
      isLoadingPage:true,
      openSnackBar:false,
      snackBarMessageError:""
    };
  }

  onImageChange = (event) => 
  {
    if (event.target.files.length > 0) 
    {
      const url = URL.createObjectURL(event.target.files[0]);
      this.setState({
        profileImg: event.target.files[0],
        profileImgURL: url
      });
    }
  }

  handleCloseSnackBar() 
  {
    this.openSnackBar = false;
  }

  render() 
  {    
    return  ( 
      <StudentsTable></StudentsTable>
    );
  }
}

class StudentsTable extends Component {
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

  componentDidMount() 
  {
    fetch(window.location.protocol + '//' + window.location.hostname + Constants.PORT_IN_USE + '/api/v1/admin/studentUsers', 
    {
      method: 'GET',
      credentials: 'include',
      cors:'no-cors'
    })
    .then((response) => response.json())
    .then((responseJson) => 
    {
      this.setState({rows: responseJson.data, isLoadingTable:false});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  onRemoveClick(data)
  {
    console.log('Remove user:',data.email);

    if (window.confirm('Are you sure you want to delete the user?'))
      fetch(window.location.protocol + '//' + window.location.hostname + Constants.PORT_IN_USE + '/api/v1/users/deleteAdmin/' + data.email,
      {
        method: 'GET',
        credentials: 'include',
        cors:'no-cors'
      })
      .then((response) => 
      {
        if (response.status === 200) window.location.reload();
        else alert('Something went wrong.');
      })
      .catch((error) => {
        console.error(error);
      });
    else console.log('Not removed!');
  }

  render()
  {
    const classes  = useStyles();

    if(this.isLoadingTable) return null;

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
                          {column.format && typeof value === ('number' || 'bool') ? column.format(value) : value}
                          {column.id === 'removeUserButton' ? <Button
                            fullWidth
                            variant='contained'
                            color='primary'
                            className={classes.chip}
                            onClick={() => this.onRemoveClick(row)}>
                            Remove
                          </Button> : <div/>}
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

export default withStyles(useStyles)(ListOfStudents);
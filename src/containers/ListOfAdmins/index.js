import React from 'react';
import {withStyles} from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import Paper from '@material-ui/core/Paper';

import Constants from '../../config_constants';
import { getApiData } from '../../helpers/networkRequestHelpers';
import { AlertPopup, ConfirmDialog } from '../../components/AlertView';
import DeleteForever from '@material-ui/icons/DeleteForever';

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
  }
});

class ListOfAdmins extends React.Component
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
      format: value =>  {
        if (value){
          let time = new Date(value);
          return +time.getDate()+ '.' +(time.getMonth()+1)+'.' +time.getFullYear()+' '+time.getHours()+'.'+time.getMinutes();
        }

        }
    },
    
    {
      id: 'removeAdminButton',
      label: 'Remove admin',
      minWidth: 170,
      align: 'center'
    }
  ]

  constructor(props)
  {
    super(props);

    this.state = {
      isLoadingTable:true,
      page: 0,
      rowsPerPage: 10,
      rows: [],
    };

    console.log('[ListOfAdmins] Constructor');
  }

  handleChangePage = (event, page) =>
  {
    this.setState({page: page});
  };

  handleChangeRowsPerPage = event =>
  {
    this.setState({rowsPerPage:event.target.value, page:0});
  };

  componentDidMount()
  {
    this._isTableMounted = true;

    console.log('[ListOfAdmins] Mounting');

    getApiData({
      version: 'v1',
      endpoint: 'admin/adminUsers',
    }, {
      method: 'GET',
      credentials: 'include',
      cors:'no-cors'
    })
    .then((response) => response.json())
    .then((responseJson) =>
    {
      if(this._isTableMounted) this.setState({ rows: responseJson.data, isLoadingTable:false});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  componentDidMount() {
    this.fetchAdminList();
  }

  fetchAdminList = () => {
    getApiData({
      version: 'v1',
      endpoint: 'admin/adminUsers',
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

  onRemoveAdmin = () => {
    getApiData({
      version: 'v1',
      endpoint: 'users/removeAdminStatus/' + this.state.deleteData.email,
    }, {
        method: 'POST',
        credentials: 'include',
        cors: 'no-cors'
    }).then((response) => {
        if (response.status === 200)
          this.fetchAdminList();
        else
          this.toggleAlert(true, "error", "Something went wrong");
    }).catch((error) => {
        console.error(error);
    });
  this.setState({showConfirm: false, deleteData: {}})
}
  render()
  {
    console.log('[ListOfAdmins] Render');

    if(this.state.isLoadingTable) return null;

    const { classes } = this.props;

    return (
      <Paper className={classes.tableRoot}>
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
            {this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row, index) =>
            {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {this.columns.map(column =>
                  {
                    const value = row[column.id];

                    return (
                      <TableCell key={column.id} align={column.align}>
                        <div>
                          {column.format ? column.format(value) : value}
                          {column.id === 'removeAdminButton' ?
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
            })}
          </TableBody>
        </Table>
        <TablePagination
            rowsPerPageOptions={[1, 10, 25, 100]}
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
          title="Are you sure you want to remove this user from admin?"
          onConfirm={this.onRemoveAdmin}/>
      </Paper>
    );
  }

}

export default withStyles(useStyles)(ListOfAdmins);
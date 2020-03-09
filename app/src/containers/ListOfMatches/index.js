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

class ListOfMatches extends React.Component 
{
  _isTableMounted=false;

  columns = [
    { id: 's0', label: 'Request sender', minWidth: 100 },
    { id: 's1', label: 'Recipient', minWidth: 100 }]

  constructor(props) 
  {
    super(props);

    this.state = {
      isLoadingTable:true,
      page: 0,
      setPage: 0,
      rowsPerPage: 10,
      setRowsPerPage : 10,
      rows: [],
    };

    console.log('[ListOfMatches] Constructor');
  }

  handleChangePage = event =>  
  {
    this.setState({page:this.page+1});
  };

  handleChangeRowsPerPage = event => {

    this.setState({rowsPerPage:+event.target.value});
    this.setState({page:0});
  };

  componentDidMount() 
  {
    this._isTableMounted = true;

    console.log('[ListOfMatches] Mounting');

    fetch(window.location.protocol + '//' + window.location.hostname + Constants.PORT_IN_USE + '/api/v1/admin/matches', 
    {
      method: 'GET',
      credentials: 'include',
      cors:'no-cors'
    })
    .then((response) => response.json())
    .then((responseJson) => 
    {
      if(this._isTableMounted) this.setState({rows: responseJson.data, isLoadingTable:false});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render()
  {
    console.log('[ListOfMatches] Render');

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
            {this.state.rows.slice(this.state.page * this.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row, index) => 
            {
              console.log(row);

              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell key='s0'><div>{row.requesterUser.firstName + ' ' + row.requesterUser.lastName}</div></TableCell>
                  <TableCell key='s1'><div>{row.recipientUser.firstName + ' ' + row.recipientUser.lastName}</div></TableCell>
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
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }

}
export default withStyles(useStyles)(ListOfMatches);
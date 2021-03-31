import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import MaterialTable from "material-table";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { format, parseISO, isAfter, isBefore, isEqual } from 'date-fns'

import Paper from '@material-ui/core/Paper';
import Constants from '../../config_constants';
import { getApiData } from '../../helpers/networkRequestHelpers';
import { getDisplayDate } from '@material-ui/pickers/_helpers/text-field-helper';
import { CompareArrowsOutlined } from '@material-ui/icons';

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

const currentDate = new Date();

class ListOfMatches extends React.Component
{
  _isTableMounted=false;

  columns = [
    { id: 's0', label: 'Partner 1', minWidth: 100 },
    { id: 's1', label: 'Partner 1 email', minWidth: 100 },
    { id: 's2', label: 'Partner 2', minWidth: 100 },
    { id: 's3', label: 'Partner 2 email', minWidth: 100 },
    { id: 's4', label: 'Match languages', minWidth: 100 },
    { id: 's5', label: 'Matched date', minWidth: 100 },
    ]

  constructor(props)
  {
    super(props);

    this.state = {
      isLoadingTable:true,
      page: 0,
      setPage: 0,
      rowsPerPage: 30,
      setRowsPerPage : 10,
      rows: [],
      data: [],
      searchValue: "",
      disableToDate: true,
      fromDateValue: null,
      toDateValue: null,
      };


    console.log('[ListOfMatches] Constructor');
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

    console.log('[ListOfMatches] Mounting');

    getApiData({
      version: 'v1',
      endpoint: 'admin/matches',
    }, {
      method: 'GET',
      credentials: 'include',
      cors:'no-cors'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(this._isTableMounted) this.setState({data: responseJson.data, rows: responseJson.data, isLoadingTable:false});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  textfieldChange = (event) =>{
    //This is to fix asynchronization issue
    this.setState({searchValue: event.target.value}, function(){
      console.log("searchValue's setState completed", this.state);
      this.handleAllSearchChanges();
    })
  }

  handleAllSearchChanges = () => {
    let taulu = this.state.data;
    //If dates are set, we'll filter by them first
    if(!(this.state.toDateValue == null)){
      taulu = this.state.data.filter(item =>{
        return this.compareDateRange(item.matchStartDate);
      })
    }
    //Check if we need to filer by the textfield as well
    //If textfield has been emptied (length = 0) we still have to keep the selected date filtering
    let searchValue = this.state.searchValue.toLowerCase();
    if (this.state.searchValue.length >= 2){
      let searchResult = taulu.filter(item => {
        return item.requesterUser.lastName.toLowerCase().includes( searchValue) || item.recipientUser.lastName.toLowerCase().includes( searchValue)
      ||item.requesterUser.firstName.toLowerCase().includes( searchValue) || item.recipientUser.firstName.toLowerCase().includes( searchValue)
      ||item.requesterUser.email.toLowerCase().includes( searchValue) || item.recipientUser.email.toLowerCase().includes( searchValue);
      })
      this.setState({rows:searchResult})
    }
    if (searchValue.length == 0){
      this.setState({rows:taulu})
    }
  }

  //Check whether a date is included in the specified range
  //Used in filtering the table according to date search criteria
  compareDateRange = (dateval) =>{
    let targetdate = parseISO(dateval).setHours(0, 0, 0, 0);;
    let date1 = this.state.fromDateValue.setHours(0, 0, 0, 0);
    let date2 = this.state.toDateValue.setHours(0, 0, 0, 0);
    if(isAfter(targetdate, date1) || isEqual(targetdate, date1)){
      if(isBefore(targetdate, date2) || isEqual(targetdate, date2)){
        return true;
      }
      return false;
    }
    else{
      return false;
    }
  }

  handleFromDateChange = (date) => {
    this.setState({fromDateValue:date}, function(){
      console.log("handleFromDateChange's setState completed", this.state);
    //If to is null when from is set, or if from is set to something AFTER to,
    //we need to update to
      if(this.state.disableToDate){
        this.setState({disableToDate:false});
        this.handleToDateChange(currentDate)
      }
      else if(isAfter(this.state.fromDateValue.setHours(0, 0, 0, 0), 
      this.state.toDateValue.setHours(0, 0, 0, 0))){
        this.handleToDateChange(currentDate);
      }
      else{
        this.handleAllSearchChanges();
      }
    });
  }

  handleToDateChange = (date) => {
    //Fixing another asynchronization issue
    this.setState({toDateValue:date}, function(){
      console.log("handleToDateChange's setState completed", this.state);
      //this.handleDateSearchChange(date);});
      this.handleAllSearchChanges();});
  }

  //Handles the date reset button
  onResetDates = () =>{
    if(!(this.state.toDateValue == null)){
      this.setState({toDateValue: null}, function(){
        console.log("toDateValue's setState completed", this.state);
        this.setState({fromDateValue: null})
        this.setState({disableToDate: true})
        this.handleAllSearchChanges();
      })
    }
  }

  render()
  {
    console.log('[ListOfMatches] Render');

    if(this.state.isLoadingTable) return null;

    const { classes } = this.props;

    return (

      <Paper className={classes.tableRoot}>

        <TextField
        variant='outlined'
        margin='normal'
        style = {{width: '46%'}}
        fullWidth
        id='search'
        label='Search matches by name or email'
        onChange = {this.textfieldChange} 
        value={this.state.searchValue}
        />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            id = 'fromdate'
            inputProps={{readOnly: true}}
            label= "From date"
            format="dd.MM.yyyy"
            style = {{marginLeft: '0.8em'}}
            maxDate={currentDate}
            onChange={this.handleFromDateChange}
            value ={this.state.fromDateValue}
          />
          <KeyboardDatePicker
            id = 'todate'
            inputProps={{readOnly: true}}
            label= "To date"
            disabled={this.state.disableToDate}
            format="dd.MM.yyyy"
            style = {{marginLeft: '0.8em'}}
            minDate={this.state.fromDateValue}
            onChange={this.handleToDateChange}
            value ={this.state.toDateValue}
          />
        </MuiPickersUtilsProvider>

        <Button
          variant='contained'
          style={{marginLeft: '2em', marginTop: '2em', size: 'xx-small', fontSize: 'xx-small'}}
          margin='normal'
          color='gray'
          className={classes.chip}
          onClick={this.onResetDates}>
          Reset dates
        </Button>

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


            {this.state.rows.length ? this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row, index) =>
            {
              console.log(row, index);

              const languageArray = row.requesterUser.languagesToLearn.filter(e =>
                {
                  for (let i = 0; i < row.recipientUser.languagesToTeach.length; i++)
                    if (e.language === row.recipientUser.languagesToTeach[i].language) return true;
                  return false;
                });

                const languageArray2 = row.requesterUser.languagesToTeach.filter(e =>
                  {
                    for (let i = 0; i < row.recipientUser.languagesToLearn.length; i++)
                      if (e.language === row.recipientUser.languagesToLearn[i].language) return true;
                    return false;
                  });

              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell key='s0'><div>{row.requesterUser.firstName + ' ' + row.requesterUser.lastName}</div></TableCell>
                  <TableCell key='s1'><div>{row.requesterUser.email}</div></TableCell>
                  <TableCell key='s2'><div>{row.recipientUser.firstName + ' ' + row.recipientUser.lastName}</div></TableCell>
                  <TableCell key='s3'><div>{row.recipientUser.email}</div></TableCell>
                  <TableCell key='s4'><div>{languageArray.map((e, i) => e.language + (i === (languageArray.length - 1) ? '' : ', '))}</div>
                  <div> {languageArray2.map((e, i) => e.language + (i === (languageArray2.length - 1) ? '' : ', '))}</div></TableCell>
                  <TableCell key='s5'><div>{format(new Date(Date.parse(row.matchStartDate)), "dd.MM.yyyy")}</div></TableCell>
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
      </Paper>
          );
  }
}

export default withStyles(useStyles)(ListOfMatches);
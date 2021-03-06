import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import MaterialTable from "material-table";
import Constants from '../../config_constants';
import { getApiData } from '../../helpers/networkRequestHelpers';

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

class Statitics extends Component
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

  constructor(props)
  {
    super(props);
    this.state = {
      isLoadingTable:true,
      page: 0,
      setPage: 0,
      rowsPerPage: 30,
      setRowsPerPage : 10,
      rows: []
    };
  }

  componentDidMount()
  {
    getApiData({
      version: 'v1',
      endpoint: 'admin/statitics',
    }, {
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
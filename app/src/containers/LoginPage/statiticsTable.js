
import React, {Component} from 'react';
import MaterialTable from "material-table";
import Constants from '../../config_constants';

export default class StatiticsTable extends Component {
    _isTableMounted=false;
    columns = [
      { field: 'language', title: 'Language',  align: 'center'},
      { field: 'numberWantToLearn', title: 'Students', align: 'center' },
      { field: 'numberWantToTeach', title: 'Teachers', align: 'center'},
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
  
  
    loadDataInTable(callback)
    {
      fetch(window.location.protocol + '//' + window.location.hostname + Constants.PORT_IN_USE +'/api/v1/admin/statiticsOpen', 
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      .then((response) => 
      {
        return response.json();
      })
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
      if(this.isLoadingTable){
        return null;
      }
  
      return (
        <MaterialTable
          title=""
          columns={this.columns}
          data={this.state.rows}
          options={{
            sorting: true,
            exportButton: false,
            exportAllData: false,
            exportFileName: "languages",
            pageSize:10,
            pageSizeOptions:[5, 10, 20, 30, 40, 50, 100, 200],
            emptyRowsWhenPaging:false
          }}
        />
      );
    }
  
  }

import React, {Component} from 'react';
import MaterialTable from "material-table";

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
      // http://localhost:3000/api/v1/admin/statiticsOpen
      const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/api/v1/admin/statiticsOpen")
  
      fetch(url, {
        method: 'GET',
        credentials: 'include',
        cors:'no-cors'
      }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ rows: responseJson.data });
        //console.log(responseJson.data)
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
      //console.log(this.columns)
  
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
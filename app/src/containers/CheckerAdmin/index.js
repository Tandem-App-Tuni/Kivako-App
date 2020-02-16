import React from 'react';
import Constants from '../../config_constants';
import {CircularProgress} from '@material-ui/core'
import {Redirect} from 'react-router-dom';

class CheckerAdmin extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {isAuthenticated: false, isAdmin: false, retrievedData: false};

        console.log('Checker initialized...');
    }

    componentDidMount()
    {
        fetch(window.location.protocol + '//' + window.location.hostname + Constants.PORT_IN_USE + '/isAuthenticated', 
        {
            method: 'GET',
            credentials: 'include',
            cors: 'no-cors'
        })
        .then((response) => response.json())
        .then((responseData) => 
        {
            if (responseData.isAuthenticated)
            {
                fetch(window.location.protocol + '//' + window.location.hostname + Constants.PORT_IN_USE + '/api/v1/users/isAdmin', 
                {
                    method: 'GET',
                    credentials: 'include',
                    cors: 'no-cors'
                })
                .then((response) => response.json())
                .then((responseData) => 
                {
                   this.setState({isAdmin:responseData.isAdmin, isAuthenticated: true, retrievedData: true});
                })
                .catch((error) => 
                {
                    console.error(error);
                });
            }
            else this.setState({retrievedData: true});
        })
        .catch((error) => 
        {
            console.error(error);
        });
    }
    
    render()
    {
        if (!this.state.retrievedData) return(<CircularProgress/>)

        if (!this.state.isAuthenticated) return(<Redirect to='/'/>)

        if (!this.state.isAdmin) return(<Redirect to='/local-login'/>);

        console.log('Admin check passed!');

        return(
            <div>
                {this.props.children}
            </div>
        )
    }
}


export default CheckerAdmin;
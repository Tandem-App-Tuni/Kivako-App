import React from 'react';
import Constants from '../../config_constants';
import {CircularProgress} from '@material-ui/core'
import {Redirect} from 'react-router-dom';

import { getApiData } from '../../helpers/networkRequestHelpers'

class CheckerAdmin extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {isAuthenticated: false, isAdmin: false, retrievedData: false, activeSocket: props.activeSocket, setSocket: props.setSocket};

        console.log('[CheckerAdmin] Constructor');
    }

    componentDidMount()
    {
        console.log('[CheckerAdmin] Mounting');

        getApiData({
            endpoint: 'isAuthenticated',
        }, {
            method: 'GET',
            credentials: 'include',
            cors: 'no-cors'
        })
        .then((response) => response.json())
        .then((responseData) =>
        {
            if (responseData.isAuthenticated)
            {
                getApiData({
                    version: 'v1',
                    endpoint: 'users/isAdmin',
                }, {
                    method: 'GET',
                    credentials: 'include',
                    cors: 'no-cors'
                })
                .then((response) => response.json())
                .then((responseData) =>
                {
                    if (responseData.isAdmin) this.setState({isAdmin:responseData.isAdmin, isAuthenticated: true, retrievedData: true}, this.state.setSocket());
                    else this.setState({retrievedData: true});
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
        console.log('[CheckerAdmin] Render');

        if (!this.state.retrievedData) return(<CircularProgress/>)

        if (!this.state.isAuthenticated) return(<Redirect to='/'/>)

        if (!this.state.isAdmin) return(<Redirect to='/local-login'/>);

        console.log('[CheckerAdmin] Render done');

        return(
            <div>
                {this.props.children}
            </div>
        )
    }
}


export default CheckerAdmin;
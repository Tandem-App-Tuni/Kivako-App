import React from 'react';
import Constants from '../../config_constants';
import {CircularProgress} from '@material-ui/core'
import {Redirect} from 'react-router-dom';

import { getApiData } from '../../helpers/networkRequestHelpers';

class Checker extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {isAuthenticated: false, retrievedData: false, activeSocket: props.activeSocket, setSocket: props.setSocket};
    }

    componentDidMount()
    {
        getApiData({
            version: 'v1',
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
                this.setState({isAuthenticated: true, retrievedData: true}, this.state.setSocket());
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

        if (!this.state.isAuthenticated) return(<Redirect path='/'/>)

        return(
            <div>
                {this.props.children}
            </div>
        )
    }
}


export default Checker;
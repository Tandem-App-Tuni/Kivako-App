import React from 'react';
import Constants from '../../config_constants';
import {CircularProgress} from '@material-ui/core'
import {Redirect} from 'react-router-dom';

class Checker extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {isAuthenticated: false, retrievedData: false, activeSocket: props.activeSocket, setSocket: props.setSocket};
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

        if (!this.state.isAuthenticated) return(<Redirect to='/'/>)

        console.log('State socket', this.state.activeSocket());

        return(
            <div>
                {this.props.children}
            </div>
        )
    }
}


export default Checker;
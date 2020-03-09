import openSocket from 'socket.io-client';
import ConstantsList from '../config_constants';

const chatUrl = ConstantsList.APPLICATION_URL;

let socket = undefined;

function checkSocket()
{
    return undefined !== socket;
}

function connectSocket()
{
    socket = openSocket(chatUrl);
}

const functions = {checkSocket, connectSocket};

export default functions;